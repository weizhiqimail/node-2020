const fs = require('fs');
const path = require('path');

function removeFile(fromPath, toPath, extName) {
  let dirs = fs.readdirSync(fromPath);
  let absFilePaths = [];
  let toArr = toPath.split('\\');
  let toIndex = toArr[toArr.length - 1];
  let targetPath = path.resolve(toPath);
  let exit = fs.existsSync(targetPath);
  if (!exit) {
    fs.mkdirSync(toPath);
  }
  dirs.forEach(dir => {
    let dirPath = path.resolve(fromPath, dir);
    let stat = fs.statSync(dirPath);
    if (stat.isDirectory()) {
      let files = fs.readdirSync(dirPath);
      let extFiles = files.filter(file => path.extname(file) === extName);
      extFiles.forEach(extFile => {
        absFilePaths.push({
          fileName: extFile,
          absFilePath: path.resolve(dirPath, extFile)
        });
      });
    }
  });

  absFilePaths.forEach(file => {
    let readStream = fs.createReadStream(file.absFilePath);
    let writeStream = fs.createWriteStream(path.resolve(targetPath, `${toIndex}-${file.fileName}`));
    readStream.pipe(writeStream);
  });

}

let filePaths = [

];

filePaths.forEach(item => {
  removeFile(item.fromPath, item.toPath, '.mp3');
  removeFile(item.fromPath, item.toPath, '.pptx');
})

