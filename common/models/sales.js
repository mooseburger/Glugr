module.exports = function (Sales) {
	Sales.saleName = function (id, cb) {

		Sales.findById(id, function (err, instance) {
			cb(null, instance.name);
		});
	};

	Sales.remoteMethod(
		'saleName',
		{
			http: { path: '/saleName', verb: 'get'},
			accepts: { arg: 'id', type: 'number', http: { source: 'query'} },
			returns: { arg: 'name', type: 'string' }
		}
	);
};
