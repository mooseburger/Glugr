var React = require('react');

var MallFilter = React.createFactory(require('../../components/MallFilter'));
var SaleSection = React.createFactory(require('../../components/SaleSection'));

module.exports = function (app) {

	app.get('/', function (req, res) {

		var mallPromise = app.models.Mall.promisoryFind({});

		var salePromise = app.models.Sale.promisoryFind({ where: { mallId: 1}});

		Promise.all([mallPromise, salePromise]).then(function (data) {
			var mallFilter = React.renderToString(MallFilter({ malls: data[0] }));
			var saleListing = React.renderToString(SaleSection({ sales: data[1] }));

			res.render('index.ejs', { mallFilter: mallFilter, saleListing: saleListing });
		}).catch(console.log.bind(console));
	});
};