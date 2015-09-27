module.exports = function(Mall) {
	Mall.promisoryFind = function (filter) {

		return new Promise(function (resolve, reject) {

			Mall.find(filter, function (error, malls) {
				if (error) {
					return reject(error);
				}

				resolve(malls);
			});
		});
	}
};
