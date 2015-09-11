var React = require('react');

var SaleSection = React.createFactory(require('../../components/SaleSection.js'));

module.exports = function (app) {

	app.get('/', function (req, res) {

		app.models.Sale.find({}, function (error, sales) {
			var reactHtml = React.renderToString(SaleSection({ sales: sales }));

			res.render('index.ejs', {reactOutput: reactHtml});
		});
	});
};