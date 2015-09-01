var React = require('react');

var SaleSection = React.createFactory(require('../../components/SaleSection.js'));

module.exports = function (app) {

	app.get('/', function (req, res) {
		var reactHtml = React.renderToString(SaleSection({}));

		res.render('index.ejs', {reactOutput: reactHtml});
	});
};