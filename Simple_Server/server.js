// Improting Modules 
// const varName = require(modulename)
const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

const mimeTypes = {
	"html": "text/html",
	"jpeg": "image/jpeg",
	"jpg": "image/jpg",
	"png": "image/png",
	"js": "text/javascript",
	"css": "text/css"
};

http.createServer(function(req, res){
    //Getting the url path from server
	var uri = url.parse(req.url).pathname;
    //Get the location of the file 
	var fileName = path.join(process.cwd(), unescape(uri));
	console.log('Loading '+ uri);
    console.log('File Location:'+fileName);
	var stats;

	try{
        /*returns fs.stats object that has the following methods and the data
          data looks like following:
            stats.isFile()
            stats.isDirectory()
            stats.isBlockDevice()
            stats.isCharacterDevice()
            stats.isSymbolicLink() (only valid with fs.lstat())
            stats.isFIFO()
            stats.isSocket()
          Stats Data:
          Stats {
            dev: 2114,
            ino: 48064969,
            mode: 33188,
            nlink: 1,
            uid: 85,
            gid: 100,
            rdev: 0,
            size: 527,
            blksize: 4096,
            blocks: 8,
            atime: Mon, 10 Oct 2011 23:24:11 GMT,
            mtime: Mon, 10 Oct 2011 23:24:11 GMT,
            ctime: Mon, 10 Oct 2011 23:24:11 GMT,
            birthtime: Mon, 10 Oct 2011 23:24:11 GMT }
        */
		stats = fs.lstatSync(fileName);
	} catch(e){
		res.writeHead(404, {'Content-type': 'text/plain'});
		res.write('404 Not Found\n');
		res.end();
		return;
	}

	if(stats.isFile()){
		var mimeType = mimeTypes[path.extname(fileName).split(".").reverse()[0]];
		res.writeHead(200, {'Content-type': mimeType});

		var fileStream = fs.createReadStream(fileName);
		fileStream.pipe(res);
	} else if(stats.isDirectory()) {
		res.writeHead(302, {
			'Location': 'index.html'
		});
		res.end();
	} else {
		res.writeHead(500, {'Content-type':'text/plain'});
		res.write('500 Internal Error\n');
		res.end();
	}

}).listen(1337);