const { promises: fs } = require('fs');
const fss = require('fs');

const path = require('path');

const filename = process.env.npm_config_filename;
// 获取当前文件夹下的所有文件名字

const files = fss.readdirSync('./src');
if (files.includes(filename)) {
  console.log(`Currently already exists ${filename},
If you want to modify the previous ${filename},
Please use npm run change --filename=${filename},
Or choose a new name`);
  process.exit(1);
}

async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });

  entries.forEach((entry) => {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFile(srcPath, destPath);
    }
  });
}
copyDir('./src/template', `./src/${filename}`);

fss.readFile('./.env', 'utf8', (err, data) => {
  if (err) throw err;
  const arrOld = data.split('=');
  arrOld[1] = `${filename}`;
  const newStr = arrOld.join('=');
  fs.writeFile('./.env', newStr, (errs) => {
    if (errs) throw err;
  });
});
