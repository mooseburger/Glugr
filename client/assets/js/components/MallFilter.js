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
				<a data-id={this.props.mall.id}>
					{this.props.mall.name}
				</a>
			</li>
		);
	}
});

var MallFilter = React.createClass({
	handleFilter: function (e) {
		var clickedEl = e.target;

		if (clickedEl.tagName === 'A') {
			e.preventDefault();

			var mallId = parseInt(clickedEl.dataset.id);

			if (mallId !== this.props.mallId) {
				this.props.onTabChange(mallId);
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
				<ul onClickCapture={this.handleFilter}>
					{filterButtons}
				</ul>
			</nav>
		);
	}
});

module.exports = MallFilter;