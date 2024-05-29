var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function (req, res) {
	
	fs.readFile('web.html', function(err,data) {
		//adds to the end of existing file
		fs.appendFile('nameofmyfile.txt', 'Hey there!', function(err) {
			if (err) throw err;
			console.log('Successfully saved!');
		});
		fs.open('nameofmyfile.txt', 'w', function (err, file) {
			if (err) throw err;
			console.log('saved');
		});
		//overwrites
		fs.writeFile('nameofmyfile2.txt', 'ah!', function (err) {
			if (err) throw err;
			console.log('saved!');
		});
		res.writeHead(200, {'Content-Type': 'text/html'}) // 200 means okay code for server
		res.write(data);
		return res.end();
	});
}).listen(8080);