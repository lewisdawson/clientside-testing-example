var fs = require('fs'),
	libDirPath,
	jqueryFilePath,
	jqueryFileName;

libDirPath = __dirname + '/../src/main/webapp/lib';
jqueryFileName = 'jquery.min.js';
jqueryFilePath = libDirPath + '/' + jqueryFileName;

fs.exists(libDirPath, function(exists) {
  	if(!exists) {
  		console.log('Creating lib directory')
  		fs.mkdir(libDirPath, function(err) {
  			if(err) {
  				throw err;
  			}

  			addFiles();
  		});
  	} else {
  		addFiles();
  	}
});

function addFiles() {
	console.log('Trying to add files to lib directory!');
	fs.createReadStream(__dirname + '/../node_modules/jquery/dist/' + jqueryFileName)
		.pipe(fs.createWriteStream(jqueryFilePath));
	console.log('Added files to lib directory.');
}