'use strict';

import AppDispatcher from '../Dispatcher/App.Dispatcher';
import QuotesConstants from '../Constants/Constants.Quotes';

var QuotesStoreActions = {
	loadQuotes: function (data) {
		var socket = io.connect('http://gcp.dev:3000');

		socket.on('quotes', function (quotes) {
console.log('[quotes]', quotes);
			AppDispatcher.handleAction({
				actionType: QuotesConstants.LOAD_QUOTES,
				data: quotes
			});
		});
	}
};

export default QuotesStoreActions;
