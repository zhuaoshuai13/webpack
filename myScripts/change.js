const fs = require('fs');

const filename = process.env.npm_config_filename;

const files = fs.readdirSync('./src');
if (!files.includes(filename)) {
  console.log(`Currently does not exist exists ${filename},
If you want to create a new product,
Please use npm run creat --filename=${filename},
Or confirm what you entered filename`);
  process.exit(1);
}

fs.readFile('./.env', 'utf8', (err, data) => {
  if (err) throw err;
  const arrOld = data.split('=');
  arrOld[1] = `${filename}`;
  const newStr = arrOld.join('=');
  fs.writeFile('./.env', newStr, (errs) => {
    if (errs) throw err;
  });
});
