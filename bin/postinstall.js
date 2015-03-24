var fs = require('fs');

fs.createReadStream(__dirname + '/../node_modules/jquery/dist/jquery.min.js')
	.pipe(fs.createWriteStream(__dirname + '/../src/main/webapp/lib/jquery.min.js'));