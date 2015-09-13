var fs = require('fs');
var request = require('request');
var $ = require('jquery')(require("jsdom").jsdom().parentWindow);

var malls = require('./mall-enum');

var domain = 'http://www.simon.com';
var saleListing = domain + '/mall/plaza-carolina/deals';

var timeBetweenRequests = 0;

var loadedPage = PoliteRequest(saleListing, timeBetweenRequests);

loadedPage.then(function (body) {

	var saleRequests = [];

	$(body).find('#content-stream-container').children('.CSItem').children('a:nth-child(2)').each(function () {
		saleRequests.push(PoliteRequest(domain + $(this).attr('href'), timeBetweenRequests += 2000));
	});

	return Promise.all(saleRequests);
}).catch(console.log.bind(console));

function PoliteRequest(url, delay) {
	return new Promise(function (resolve, reject) {
		setTimeout(function () {
			request({
				url: url,
				headers: {
					'User-Agent': 'Glugr Web Crawler'
				}
			}, function (error, response, body) {

				if (error) {
					return reject(error);
				}

				else if (response.statusCode !== 200) {
					error = new Error('Unexpected status code: ' + response.statusCode);
					error.response = response;
					return reject(error);
				}

				resolve(body);
			});
		}, delay);
	});
}