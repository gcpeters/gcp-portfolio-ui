import React from 'react';
import ReactDOM from 'react-dom';
import Quote from './Component.Quote';
import _ from 'lodash';

var _socket;

function type(d, i, columns) {
	// d.date = parseDate(d.date);
	//
	// for (var i = 1, n = columns.length; i < n; ++i) {
	// 	d[columns[i]] = d[columns[i]] / 100;
	// }
debugger;
	return d;
}

// Create our component class
var PortfolioPerformanceChart = React.createClass({

	// Use getAppState method to set initial state
	getInitialState: function () {
		return {
			quotes: []
		};
	},

	// Listen for changes
	componentDidMount: function () {
		d3.json("http://gcp.dev:3000/api/finance/charts/portfolio-performance", (error, data) => {

			if (error) throw error;

			nv.addGraph(() => {
				var chart = nv.models.lineChart()
                .margin({left: 100})  //Adjust chart margins to give the x-axis some breathing room.
                .useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
                .showLegend(true)       //Show the legend, allowing users to turn on/off line series.
                .showYAxis(true)        //Show the y-axis
                .showXAxis(true)        //Show the x-axis

				chart.xAxis     //Chart x-axis settings
			         .axisLabel('date ($)')
			         .tickFormat((d) => d3.time.format('%x')(new Date(d)));

			     chart.yAxis     //Chart y-axis settings
			         .axisLabel('price')
			         .tickFormat(d3.format('.02f'));
				//
				// //Format x-axis labels with custom function.
				// chart.xAxis
				// 	.tickFormat((d) => d3.time.format('%x')(new Date(d)));
				//
				// chart.yAxis
				// 	.tickFormat(d3.format(',.2f'));

				d3.select(this.refs.chart)
					.datum(data.chartData)
					.call(chart);

				nv.utils.windowResize(chart.update);

				return chart;
			});
		});
	},

	render: function () {
		return (
			<svg ref="chart" width="1200" height="700"></svg>
		);
	}
});

export default PortfolioPerformanceChart;
