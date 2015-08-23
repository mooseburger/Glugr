var fs = require('fs');
var request = require('request');
var $ = require('jquery')(require("jsdom").jsdom().parentWindow);

var url = 'http://www.plazalasamericas.com/promotions-listing/';

request(url, function (error, response, body) {
	if (!error && response.statusCode === 200) {
		$(body).find('#promotions-right').children('table').find('td:nth-child(3)').children('a').each(function () {
			ScrapeSale($(this).attr('href'));
		});
	}

	else {
		console.log(error);
	}
});

function ScrapeSale (url) {
	request(url, function (error, response, body) {
		if (!error && response.statusCode === 200) {

			var saleDiv = $(body).find('#generic-middle');

			var sale = {};

			sale.name = saleDiv.children('.promo-title').text();
			sale.description = saleDiv.children('p').text();

			var saleDates = saleDiv.children('.promo-title + h3').text().split(' - ');
			sale.effective_date = saleDates[0];
			sale.expiration_date = saleDates.length === 2 ? saleDates[1] : '';

			var imgUrl = saleDiv.children('img.attachment-full').attr('src');

			sale.image = GetImagePath(url, imgUrl);

			InsertSale(sale);

			DownloadImage(imgUrl, sale.image);
		}

		else {
			LogError(error, response, body);
		}
	});
}

function InsertSale(sale) {
	request.post(
		{
			url: 'http://localhost:3000/api/Sales',
			body: sale,
			json: true
		}, LogError);
}

function DownloadImage(imgUrl, imgPath) {
	if (imgPath) {
		request(imgUrl, LogError).pipe(fs.createWriteStream(imgPath));
	}
}

function GetImagePath(pageUrl, imgUrl) {
	if (imgUrl) {

		var splitUrl = pageUrl.split('/');
		var imgName = splitUrl[splitUrl.length - 2];

		var splitExt = imgUrl.split('.');
		var imgExtension = splitExt[splitExt.length - 1];

		return '../Pictures/' + imgName + '.' + imgExtension;
	}

	else {
		LogError(pageUrl, 'No image found');

		return '';
	}
}

function LogError (error, response, body) {
	if (error || response.statusCode !== 200) {

		error = error ? error : 'No error returned';

		var logFile = fs.createWriteStream('../debug.log', { flags : 'a' });
		logFile.write(error + ':\n' + JSON.stringify(response) + '\n\n');
	}
}