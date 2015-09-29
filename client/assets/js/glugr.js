/** @jsx React.DOM */

var React = require('react');

var GlugrApp = require('./components/GlugrApp');

var mountNode = document.getElementById('main-wrapper');

React.render(new GlugrApp({}), mountNode);