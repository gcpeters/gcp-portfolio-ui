'use strict';

const QUOTE_URL = 'http://gcp.dev:8080/api/finance/quotes?symbols=FB,SHOP,NXPI,ORAN',
	VIEWS_DIR = 'src/server/views';

var _ = require('lodash'),
	express = require('express'),
	app = express(),
	server = require('http').Server(app),
	io = require('socket.io')(server),
	request = require('request'),
	handlebars  = require('express-handlebars'),
	path = require('path');

var _lastRawResponseBody;

server.listen(3000);

app.engine('.hbs', handlebars({
	layoutsDir: [VIEWS_DIR, 'layouts'].join('/'),
	defaultLayout: 'main',
	extname: '.hbs'
}));

app.set('view engine', '.hbs');
app.set('views', VIEWS_DIR);

app.use(express.static(path.join(__dirname, '../../build')));

app.get('/', function (req, res) {
	res.render('portfolio', {});
});

app.get('/api/finance/charts/portfolio-performance', (req, res) => {
	var url = 'http://gcp.dev:8080/api/finance/charts/portfolio-performance?symbols=SHOP';
	request(url, (error, response, body) => {
		try {
			let jsonBody = JSON.parse(body);
			res.json(jsonBody);
		} catch (err) {}
	});
});

io.on('connection', (socket) => {
	(function checkForStocks () {
		request(QUOTE_URL, (error, response, body) => {
			if (_.isNull(error) !== true || response.statusCode !== 200) {

				console.error('Error connecting to quote service, will try in 500ms.', error);
				setTimeout(checkForStocks, 500);

				return;
			}

			try {

				let jsonBody = JSON.parse(body),
					quoteList = _.values(jsonBody.quoteList);

				console.log('QUOTES ~ ', quoteList.length);

				socket.volatile.emit('quotes', {
					quotes: quoteList
				});

				// Store results so we can check for changes
				_lastRawResponseBody = body;
			} catch (err) {

				console.log(err);
			}

			setTimeout(checkForStocks, 5000);
		});
	}());
});
