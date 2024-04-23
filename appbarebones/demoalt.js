var http = require('http');
var url = require('url');
var adr = 'http://localhost:8080/default.htm?year=2017&month=february';
var q = url.parse(adr, true);

http.createServer(function (req, res) {
	res.write('This is an alternative way that doesnt spit out a html file')
	res.end();
}).listen(8080);