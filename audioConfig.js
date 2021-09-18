var fs = require("fs"),
  inputStream,
  currentfile;
var wavConverter = require("wav-converter");
var path = require("path");
const {filestackAPI} = require('./config.json')
const client = require('filestack-js').init(filestackAPI)

module.exports.merge = (guildId) => {
  var audioChunks = fs.readdirSync(__dirname + `/recordings/${guildId}/`);
  var outputStream = fs.createWriteStream(
    __dirname + `/recordings/${guildId}/merge.pcm`
  );
  console.log("in export");
  audioChunks.sort((a, b) => {
    return a - b;
  });

  function appendChunks() {
    if (!audioChunks.length) {
      convert(guildId);
      outputStream.end(() => console.log("Finished."));
      return;
    }

    currentfile = `${__dirname}/recordings/${guildId}/` + audioChunks.shift();
    inputStream = fs.createReadStream(currentfile);

    inputStream.pipe(outputStream, { end: false });

    inputStream.on("end", function () {
      console.log(currentfile + " appended");
      appendChunks();
    });
  }

  appendChunks();
};

const convert = (guildId) => {
  var pcmData = fs.readFileSync(
    path.resolve(__dirname + `/recordings/${guildId}/merge.pcm`)
  );
  var wavData = wavConverter.encodeWav(pcmData, {
    numChannels: 2,
    sampleRate: 48000,
    byteRate: 16
  });
  fs.writeFileSync(
    path.resolve(__dirname + `/recordings/${guildId}/mergemp3.wav`),
    wavData
  );

  client.upload(__dirname + `/recordings/${guildId}/mergemp3.wav`).then(res=>{
    return res.url
  })


};
