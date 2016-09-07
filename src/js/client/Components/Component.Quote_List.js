import React from 'react';
import Quote from './Component.Quote';
import _ from 'lodash';

var _socket;

// Create our component class
var QuoteList = React.createClass({

	// Use getAppState method to set initial state
	getInitialState: function () {
		return {
			quotes: []
		};
	},

	// Listen for changes
	componentDidMount: function () {
		_socket = io.connect('http://gcp.dev:3000');
		_socket.on('quotes', this._onChange);
	},

	render: function () {
		var quotes = this.state.quotes;

		if (_.isEmpty(quotes)) {

			return null;
		}

		return (
			<div className="flex-grid-container quote-list">
				{quotes.map((quote, i) => <Quote quote={quote} key={i} />)}
			</div>
		);
	},

	// Update view state when change event is received
	_onChange: function (data) {
		this.setState(data);
	}
});

export default QuoteList;
