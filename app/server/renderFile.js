var fs = require('fs')

const renderFile = (src) => {
  console.log(src)
  return new Promise(function (resolve, reject) {
    fs.readFile(src, { 'encoding': 'utf8' }, function (err, data) {
      if (err) return reject(err);
      resolve(data);
    });
  });
}
module.exports = renderFile;
