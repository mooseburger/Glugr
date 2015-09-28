/** @jsx React.DOM */

var React = require('react');

var MallFilterButton = React.createClass({
	render: function () {

		var selectedButton = this.props.mallId === 1 ? 'current' : '';

		return (
			<li className={selectedButton}><a href="#">{this.props.name}</a></li>
		);
	}
});

var MallFilter = React.createClass({
	render: function () {
		var filterButtons = this.props.malls.map(function (mall) {
			return (
				<MallFilterButton key={mall.id} mallId={mall.id} name={mall.name} />
			);
		});

		return (
			<nav className="nav">
				<ul>
					{filterButtons}
				</ul>
			</nav>
		);
	}
});

module.exports = MallFilter;