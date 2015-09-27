/** @jsx React.DOM */

var React = require('react');

var Sale = React.createClass({
	render: function () {
		return (
			<div className="4u 12u(mobile)">
				<section className="box">
					<a href="#" className="image featured"><img src={'sales/' + this.props.image} alt="" /></a>
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
				<Sale key={sale.id} name={sale.name} image={sale.image}>
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

module.exports = SaleRow;