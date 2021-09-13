//download 2 youtube videos using ytdl and ffmpeg and add the second one audio to the first one video



var ytdl = require('ytdl-core');
var ffmpeg = require('fluent-ffmpeg');

ytdl.getInfo('https://www.youtube.com/watch?v=-0uw-tnkzSE', function(err, info) {
    if (err) throw err;

    console.log('Title:', info.title);
    console.log('Video ID:', info.video_id);
    console.log('Author:', info.author);
    console.log('View count:', info.view_count);
    console.log('URL:', info.url);
    console.log('Description:', info.description);
    console.log('Thumbnail:', info.thumbnail_url);
    console.log('Length:', info.length_seconds);
    console.log('Upload date:', info.upload_date);
    console.log('Formats:', info.formats);

    var video = ytdl('https://www.youtube.com/watch?v=I2CGXOvMFb4', {
        filter: 'audioandvideo',
        format: 'mp4',
        quality: 'highestaudio',
        highWaterMark: 1 << 25
    });

    var audio = ytdl('https://www.youtube.com/watch?v=ZxZ-ZhZ6ZkE', {
        filter: 'audioonly',
        format: 'mp4',
        quality: 'highestaudio',
        highWaterMark: 1 << 25
    });

    var proc = new ffmpeg('wow.mp4',{
        source: audio
    });

    proc.pipe(video, {
        end: true
    });})