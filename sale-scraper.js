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
			var imgUrl = $(body).find('#generic-middle').children('img.attachment-full').attr('src');

			var splitUrl = url.split('/');

			DownloadImage(splitUrl[splitUrl.length - 2] ,imgUrl);
		}

		else {
			console.log(error);
		}
	});
}

function DownloadImage(imgName, imgUrl) {
	if (imgUrl) {

		var splitExt = imgUrl.split('.');
		var imgExtension = splitExt[splitExt.length - 1];

		request(imgUrl).pipe(fs.createWriteStream('../Pictures/' + imgName + '.' + imgExtension));
	}
}