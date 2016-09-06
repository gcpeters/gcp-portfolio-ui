import React from 'react';
import { render } from 'react-dom';
import QuoteList from './Components/Component.Quote_List';
import PortfolioPerformanceChart from './Components/Component.Portfolio_Performance_Chart';

render(
	<PortfolioPerformanceChart />,
	document.getElementById('appRoot')
);
