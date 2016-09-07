'use strict';

import _ from 'lodash';
import EventEmitter from 'events';

import AppDispatcher from '../dispatcher/App.Dispatcher';
import QuotesConstants from '../constants/Constants.Quotes';

// Internal object of shoes
var _quotes = {};

// Method to load shoes from action data
function loadQuotes (data) {
  _quotes = data.quotes;
}

// Merge our store with Node's Event Emitter
const QuotesStore = _.extend({
	getQuotes: function () {
		return _quotes;
	},

	emitChange: function () {
		this.emit('change');
	},

	addChangeListener: function (callback) {
		this.on('change', callback);
	},

	removeChangeListener: function (callback) {
		this.removeListener('change', callback);
	}
}, EventEmitter.prototype);

// Register dispatcher callback
console.log('[AppDispatcher.register]');
AppDispatcher.register(function (payload) {
	var action = payload.action;

	console.log('[action.actionType]', action.actionType);

	// Define what to do for certain actions
	switch (action.actionType) {
		case QuotesConstants.LOAD_QUOTES:
			console.log(QuotesConstants.LOAD_QUOTES);
			loadQuotes(action.data);
			break;

		default:
			return true;
	}

	// If action was acted upon, emit change event
	QuotesStore.emitChange();

	return true;
});

export default QuotesStore;
