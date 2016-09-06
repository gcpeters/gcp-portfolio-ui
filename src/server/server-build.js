/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {const _ = __webpack_require__(1),
		app = __webpack_require__(2)(),
		server = __webpack_require__(3).Server(app),
		io = __webpack_require__(4)(server),
		request = __webpack_require__(5);

	const QUOTE_URL = 'https://query.yahooapis.com/v1/public/yql?q=select symbol,LastTradePriceOnly from yahoo.finance.quotes where symbol in ("FB", "SHOP", "NXPI", "ORAN", "VDIGX")&format=json&env=store://datatables.org/alltableswithkeys&callback=';

	server.listen(3000);

	app.get('/', function (req, res) {
		res.sendfile(__dirname + '/src/server/index.html');
	});

	io.on('connection', function (socket) {
		setTimeout(function checkForStocks () {
			request(QUOTE_URL, function (error, response, body) {
				if (_.isNull(error) !== true || response.statusCode !== 200) {

					console.log('ERROR ~ ', error);
					return;
				}

				socket.emit('quotes', {
					quotes: JSON.parse(body).query.results.quote
				});

				setTimeout(checkForStocks, 5000);
			});
		}, 5000);
	});

	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("lodash");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("http");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("socket.io");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("request");

/***/ }
/******/ ]);