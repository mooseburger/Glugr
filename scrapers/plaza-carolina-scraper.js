var fs = require('fs');

var $ = require('jquery')(require("jsdom").jsdom().parentWindow);

var malls = require('./mall-enum');
var utils = require('./utilities');

var domain = 'http://www.simon.com';
var saleListing = domain + '/mall/plaza-carolina/deals';

var timeBetweenRequests = 0;

var loadedPage = utils.PoliteRequest(saleListing, timeBetweenRequests);

loadedPage.then(function (body) {

	var saleRequests = [];

	$(body).find('#content-stream-container').children('.CSItem').children('a:nth-child(2)').each(function () {
		saleRequests.push(utils.PoliteRequest(domain + $(this).attr('href'), timeBetweenRequests += 500));
	});

	return Promise.all(saleRequests);
}).then(function (salePages) {
	if (salePages && salePages.length > 0) {
		salePages.forEach(function (saleBody) {
			ScrapeSale(saleBody);
		});
	}
}).catch(console.log.bind(console));

function ScrapeSale(body) {
	var saleSec = $(body).children('section.view-item-details > div.container');

	var sale = {};

	sale.mallId = malls['PlazaCarolina'];

	var storeName = saleSec.find('div.tenantDetails > .centered-content > .centered-details > h3.uppercase > a').text();

	sale.name = saleSec.find('ul.CDTList').children('li.CDTitle').children('h2').text() + ' AT ' + storeName;

	var validFrom = saleSec.find('p.bold.uppercase').text().split(':')[1].split('-');

	sale.effectiveDate = validFrom[0];
	sale.expirationDate = validFrom[1];

	console.log(JSON.stringify(sale));
}