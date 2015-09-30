/** @jsx React.DOM */

var React = require('react');

var GlugrApp = React.createFactory(require('./components/GlugrApp'));

var mountNode = document.getElementById('main-wrapper');

React.render(GlugrApp({ malls: [], sales: [] }), mountNode);