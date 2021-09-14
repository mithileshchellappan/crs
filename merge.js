var fs = require('fs'),
    audioChunks = fs.readdirSync(__dirname + '/recordings'),
    inputStream,
    currentfile,
    outputStream = fs.createWriteStream(__dirname + '/recordings/merge.pcm');

audioChunks.sort((a, b) => { return a - b; });

function appendChunks() {
    if (!audioChunks.length) {
        outputStream.end(() => console.log('Finished.'));
        return;
    }

    currentfile = `${__dirname}/recordings/` + audioChunks.shift();
    inputStream = fs.createReadStream(currentfile);

    inputStream.pipe(outputStream, { end: false });

    inputStream.on('end', function() {
        console.log(currentfile + ' appended');
        appendChunks();
    });
}

appendChunks();