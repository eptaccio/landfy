'use strict';

var fs = require('fs');
var mkdirp = require('mkdirp');
var mime = require('mime');

var _require = require('path'),
    dirname = _require.dirname;

var getFiles = function getFiles(dir, files) {
  files = files || [];
  var fileNames = fs.readdirSync(dir);

  fileNames.forEach(function (fileName) {
    var name = dir + '/' + fileName;
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files);
    } else {
      files.push(name);
    }
  });
  return files;
};

var writeFileSync = function writeFileSync(path, contents) {
  mkdirp.sync(dirname(path));
  fs.writeFileSync(path, contents);
};

var isText = function isText(file) {
  return mime.lookup(file).indexOf('text') >= 0;
};

var isJs = function isJs(file) {
  return mime.lookup(file).indexOf('javascript') >= 0;
};

module.exports = {
  getFiles: getFiles,
  writeFileSync: writeFileSync,
  isText: isText,
  isJs: isJs
};