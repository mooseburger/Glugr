var React = require('react');

var componentsDir = '../../client/assets/js/components/';

var GlugrApp = React.createFactory(require(componentsDir + 'GlugrApp'));

module.exports = function (app) {

	app.get('/', function (req, res) {

		var mallPromise = app.models.Mall.promisoryFind({});

		var salePromise = app.models.Sale.promisoryFind({});

		Promise.all([mallPromise, salePromise]).then(function (data) {

			var glugrApp = React.renderToString(GlugrApp({ malls: data[0], sales: data[1] }));

			res.render('index.ejs', { glugrApp: glugrApp });
		}).catch(console.log.bind(console));
	});
};