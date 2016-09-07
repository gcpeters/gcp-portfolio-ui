import React from 'react';
import _ from 'lodash';

// Create our component class
var Quote = React.createClass({

	// Use getAppState method to set initial state
	getInitialState: function () {
		return {};
	},

	render: function () {
		var quote = this.props.quote;

		if (_.isEmpty(quote)) {

			return null;
		}

		return (
			<div className="quote flex-grid-3">
				<p>
					{quote.symbol}<br />
					${quote.price}<br />
					${quote.change}
				</p>
			</div>
		);
	}
});

export default Quote;
