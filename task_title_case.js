const fs = require('fs');
const path = require('path');
require('@gouch/to-title-case');

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
  const blogDir = 'content/blog';
  const filePaths = walk(blogDir);
  const blogPostPaths = filePaths.filter((filePath) => {
    return filePath.endsWith('.md');
  });

  blogPostPaths.forEach((blogPostPath) => {
    const oldContent = fs.readFileSync(blogPostPath, {encoding: 'utf8'});
    const regex = /---\ntitle: ".*"/;
    const results = regex.exec(oldContent);

    if (!results || !results[0]) {
      return;
    }

    const splitVal = '---\ntitle: ';
    const oldTitleWithQuotes = results[0].split(splitVal)[1];
    const beginQuote = /^"/;
    const endQuote = /"$/;
    const oldTitle = oldTitleWithQuotes
      .replace(beginQuote, '')
      .replace(endQuote, '');

    const newTitleRaw = oldTitle.toTitleCase();
    const newTitle = newTitleRaw
      .replace('Pg_dump', 'pg_dump')
      .replace('E2e', 'e2e')
      .replace('Localhost', 'localhost')
      .replace('Psql', 'psql')
      .replace('Tmux', 'tmux')
      .replace('.Env', '.env');
    console.log(oldTitle);
    console.log(newTitle);

    const replaceVal = `---\ntitle: "${newTitle}"`;
    const newContent = oldContent.replace(regex, replaceVal);
    fs.writeFileSync(blogPostPath, newContent, {encoding: 'utf-8'});
  });
};

main();
