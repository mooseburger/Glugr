module.exports = function(Sale) {

	Sale.promisoryFind = function (filter) {
		return new Promise(function (resolve, reject) {
			Sale.find(filter, function (error, sales) {
				if (error) {
					return reject(error);
				}

				resolve(sales);
			});
		});
	};
};
