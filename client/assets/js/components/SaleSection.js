/** @jsx React.DOM */

var React = require('react');

var SaleRow = require('./SaleRow');

var SaleSection = React.createClass({
	render: function () {
		var slicedSales = [];

		var selectedMall = this.props.mallId;

		var filteredSales = this.props.sales.filter(function (sale) {
			return sale.mallId === selectedMall;
		});

		RecursiveSlicer(filteredSales, slicedSales, 3);

		var saleRows = slicedSales.map(function (row) {
			return (
				<SaleRow key={row[0].id} sales={row} />
			);
		});

		return (
			<section>
				<header className="major">
					<h2>Latest Sales</h2>
				</header>
				{saleRows}
			</section>
		);
	}
});

module.exports = SaleSection;

function RecursiveSlicer(inArr, resArr, sliceSize) {
	if (inArr.length === 0)
		return;

	resArr.push(inArr.slice(0, sliceSize));
	RecursiveSlicer(inArr.slice(sliceSize), resArr, sliceSize);
}