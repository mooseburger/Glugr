var request = require('request');
var $ = require('jquery')(require("jsdom").jsdom().parentWindow);

var malls = require('./mall-enum');
var utils = require('./utilities');

var url = 'http://www.plazalasamericas.com/promotions-listing';

var timeBetweenRequests = 0;

request(url, function (error, response, body) {
	if (!error && response.statusCode === 200) {
		$(body).find('#promotions-right').children('table').find('td:nth-child(3)').children('a').each(function () {
			(function (url, time) {
				setTimeout(function () {
					ScrapeSale(url);
				}, time);
			})($(this).attr('href'), timeBetweenRequests += 5000);
		});
	}

	else {
		utils.LogError(error, response, body);
	}
});

function ScrapeSale (url) {
	request({
		url: url,
		headers: {
			'User-Agent': 'Glugr Web Crawler'
		}
	}, function (error, response, body) {
		if (!error && response.statusCode === 200) {

			var saleDiv = $(body).find('#generic-middle');

			var sale = {};

			sale.mallId = malls['PlazaLasAmericas'];

			sale.name = saleDiv.children('.promo-title').text();
			sale.description = saleDiv.children('p').text();

			var saleDates = saleDiv.children('.promo-title + h3').text().split(' - ');
			sale.effectiveDate = saleDates[0];
			sale.expirationDate = saleDates.length === 2 ? saleDates[1] : '';

			var imgUrl = saleDiv.children('img.attachment-full').attr('src');

			sale.image = utils.GetImagePath(url, imgUrl);

			utils.InsertSale(sale);

			utils.DownloadImage(imgUrl, sale.image);

			console.log('Scraped ' + url);
		}

		else {
			utils.LogError(error, response, body);
		}
	});
}