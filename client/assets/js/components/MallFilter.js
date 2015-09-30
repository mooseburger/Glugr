/** @jsx React.DOM */

var React = require('react');

var MallFilterButton = React.createClass({
	isSelectedMall: function () {
		return this.props.mall.id === this.props.selectedMall;
	},
	render: function () {

		var selectedButton = this.isSelectedMall() ? 'current' : '';

		return (
			<li className={selectedButton}>
				<a href="#" data-id={this.props.mall.id}>
					{this.props.mall.name}
				</a>
			</li>
		);
	}
});

var MallFilter = React.createClass({
	handleFilter: function (e) {
		var clickedEl = e.target;
		console.log('event fired!');
		if (clickedEl.tagName === 'a') {
			console.log(clickedEl.dataset.id);
			e.preventDefault();

			var mallId = parseInt(clickedEl.dataset.id);

			if (mallId !== this.props.mallId) {
				this.props.filterSales(mallId);
			}
		}
	},
	render: function () {

		var selectedMall = this.props.mallId;

		var filterButtons = this.props.malls.map(function (mall) {
			return (
				<MallFilterButton
					key={mall.id}
					mall={mall}
					selectedMall={selectedMall}
				/>
			);
		});

		return (
			<nav className="nav">
				<ul onClick={this.handleFilter}>
					{filterButtons}
				</ul>
			</nav>
		);
	}
});

module.exports = MallFilter;