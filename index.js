'use strict';

const fs = require('fs');
const path = require('path');
const readline = require('readline');

function replaceLine(line){
  let output = '';
  if(line){
    let uri = line;
    let match = line.match(/(http|https):\/\/([^\/?#]+)\/(.+)\/(.+).html$/i);

    if(match){
      let newUri = `${match[1]}://${match[2]}/${match[4]}/`;
      output = `${uri}, ${newUri}`;
    }
  }
  return output;
}


function updateCommentURLs(src, dest){
  let outputStream = fs.createWriteStream(src)
  let rl = readline.createInterface({
    input: fs.createReadStream(dest),
    output: process.stdout,
    terminal: false
  });

  rl.on('line', (line) =>{
    let _line = `${replaceLine(line)}\n`
    outputStream.write(_line);
  });
}

if ( process.argv.length < 4) {
  console.error('You need to specify disqus comments cvs file');
} else {
  let src = process.argv[2];
  let dest = process.argv[3];

  updateCommentURLs(src, dest);
}
