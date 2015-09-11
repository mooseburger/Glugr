/** @jsx React.DOM */

var React = require('react');

var Sale = React.createClass({
	render: function () {
		return (
			<div className="4u 12u(mobile)">
				<section className="box">
					<a href="#" className="image featured"><img src="images/pic02.jpg" alt="" /></a>
					<header>
						<h3>{this.props.name}</h3>
					</header>
					<p>{this.props.children}</p>
					<footer>
						<a href="#" className="button alt">Find out more</a>
					</footer>
				</section>
			</div>
		);
	}
});

var SaleRow = React.createClass({
	render: function () {
		var sales = this.props.sales.map(function (sale) {
			return (
				<Sale key={sale.id} name={sale.name}>
					{sale.description}
				</Sale>
			);
		});

		return (
			<div className="row">
				{sales}
			</div>
		);
	}
});

var SaleSection = React.createClass({
	render: function () {
		var slicedSales = [];

		RecursiveSlicer(this.props.sales, slicedSales, 3);

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