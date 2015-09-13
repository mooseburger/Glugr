var fs = require('fs');
var request = require('request');
var $ = require('jquery')(require("jsdom").jsdom().parentWindow);

var malls = require('./mall-enum');

var url = 'http://www.simon.com/mall/plaza-carolina/deals';

var timeBetweenRequests = 0;

var loadedPage = PoliteRequest(url, timeBetweenRequests);

loadedPage.then(function (body) {
	$(body).find('#content-stream-container').children('.CSItem').children('span:nth-child(1)').each(function () {
		console.log($(this).data('tenname'));
	});
});

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