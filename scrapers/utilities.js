var fs = require('fs');
var request = require('request');

module.exports = {
	InsertSale: function (sale) {
		request.post(
			{
				url: 'http://localhost:3000/api/Sales',
				body: sale,
				json: true
			}, this.LogError);
	},
	DownloadImage: function (imgUrl, imgPath) {
		if (imgPath) {
			request({
				url: imgUrl,
				headers: {
					'User-Agent': 'Glugr Web Crawler'
				}
			}, this.LogError).pipe(fs.createWriteStream('./client/sales/' + imgPath));
		}
	},
	GetImagePath: function (pageUrl, imgUrl) {
		if (imgUrl) {

			var splitUrl = pageUrl.split('/');
			var imgName = splitUrl[splitUrl.length - 2];

			var splitExt = imgUrl.split('.');
			var imgExtension = splitExt[splitExt.length - 1];

			return imgName + '.' + imgExtension;
		}

		else {
			this.LogError(pageUrl, 'No image found');

			return '';
		}
	},
	LogError: function (error, response, body) {
		if (error || response.statusCode !== 200) {

			error = error ? error : 'No error returned';
			error = error + ':\n' + JSON.stringify(response) + '\n\n';

			console.error(error);

			var logFile = fs.createWriteStream('../debug.log', { flags : 'a' });
			logFile.write(error);
		}
	},
	PoliteRequest: function (url, delay) {
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
};