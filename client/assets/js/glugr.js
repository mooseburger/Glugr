/** @jsx React.DOM */

var React = require('react');
var GlugrApp = React.createFactory(require('./components/GlugrApp'));

if (typeof window !== 'undefined') {

	window.onload = function () {
		var mountNode = document.getElementById('main-wrapper');

		var malls = [];
		var sales = [];

		$.get(
			'http://localhost:3000/api/Malls',
			function (data) {
				malls = data;

				if (malls.length > 0 && sales.length > 0) {
					InitApp(malls, sales);
				}
			}
		);

		$.get(
			'http://localhost:3000/api/Sales',
			function (data) {
				sales = data;

				if (malls.length > 0 && sales.length > 0) {
					InitApp(malls, sales);
				}
			}
		);

		function InitApp(malls, sales) {
			React.render(GlugrApp({ malls: malls, sales: sales }), mountNode);
		}
	}
}