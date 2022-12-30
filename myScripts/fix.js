const fs = require('fs');

let filename = '';
fs.readFile('./.env', 'utf8', (err, data) => {
  if (err) throw err;
  [, filename] = data.split('=');
  fs.readFile(`./dist/${filename}.built.css`, 'utf8', (errs, datas) => {
    if (errs) throw errs;
    const result = datas.replace(/https:\/\/www\.infinixmobility\.com/g, '');
    fs.writeFile(`./dist/${filename}.built.css`, result, (errss) => {
      if (errss) throw errss;
    });
  });
});
