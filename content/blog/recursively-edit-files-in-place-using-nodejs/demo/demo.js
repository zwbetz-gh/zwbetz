const fs = require('fs');
const path = require('path');

const walk = (dir) => {
  try {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
      file = path.join(dir, file);
      const stat = fs.statSync(file);
      if (stat && stat.isDirectory()) {
        // Recurse into subdir
        results = [...results, ...walk(file)];
      } else {
        // Is a file
        results.push(file);
      }
    });
    return results;
  } catch (error) {
    console.error(`Error when walking dir ${dir}`, error);
  }
};

const main = () => {
  const dir = 'dir-1';
  const filePaths = walk(dir);
  filePaths.forEach((filePath) => {
    const oldContent = fs.readFileSync(filePath, {encoding: 'utf8'});
    const regex = /BEFORE/;
    const replaceVal = 'AFTER';
    const newContent = oldContent.replace(regex, replaceVal);
    fs.writeFileSync(filePath, newContent, {encoding: 'utf-8'});
    console.log(`Edited file: ${filePath}`);
  });
};

main();
