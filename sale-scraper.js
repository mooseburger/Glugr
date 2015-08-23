var fs = require('fs');
var request = require('request');
var $ = require('jquery')(require("jsdom").jsdom().parentWindow);

var url = 'http://plazalasamericas.s3.amazonaws.com/wp-content/uploads/2015/07/BrooksBro-Summer.jpg';
var path = '../Pictures/demo.jpg';

request(url).pipe(fs.createWriteStream(path)).on('close', function () {

});