'use strict';

import { Dispatcher } from 'flux';

var AppDispatcher = new Dispatcher();

AppDispatcher.handleAction = function (action) {
	this.dispatch({
		source: 'QOUTE_ACTION',
		action: action
	});
}

export default AppDispatcher;
