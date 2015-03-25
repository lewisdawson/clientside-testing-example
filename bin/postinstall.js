var fs = require('fs'),
	path = require('path'),
	libDirPath,
	jqueryFilePath,
	jqueryFileName;

libDirPath = path.join(__dirname, '../src/main/webapp/lib');
jqueryFileName = 'jquery.min.js';
jqueryFilePath = path.join(libDirPath, jqueryFileName);

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
	fs.createReadStream(path.join(__dirname, '../node_modules/jquery/dist', jqueryFileName))
		.pipe(fs.createWriteStream(jqueryFilePath));
	console.log('Added files to lib directory.');
}