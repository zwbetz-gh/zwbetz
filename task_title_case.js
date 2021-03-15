const fs = require('fs');
const path = require('path');
require('@gouch/to-title-case');

const SPECIAL_WORDS = [
  {old: 'Pg_dump', new: 'pg_dump'},
  {old: 'E2e', new: 'e2e'},
  {old: 'Localhost', new: 'localhost'},
  {old: 'Psql', new: 'psql'},
  {old: 'Tmux', new: 'tmux'},
  {old: '.Env', new: '.env'},
  {old: 'Stdin', new: 'stdin'},
  {old: 'vm', new: 'VM'}
];

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

const convertBlogPostTitleToTitleCase = (blogPostPath) => {
  const oldContent = fs.readFileSync(blogPostPath, {encoding: 'utf8'});
  const regex = /---\ntitle: ".*"/;
  const results = regex.exec(oldContent);

  if (!results || !results[0]) {
    return;
  }

  const splitVal = '---\ntitle: ';
  const beginQuote = /^"/;
  const endQuote = /"$/;
  const oldTitle = results[0]
    .split(splitVal)[1]
    .replace(beginQuote, '')
    .replace(endQuote, '');

  let newTitle = oldTitle.toTitleCase();
  SPECIAL_WORDS.forEach((word) => {
    newTitle = newTitle.replace(word.old, word.new);
  });

  const replaceVal = `---\ntitle: "${newTitle}"`;
  const newContent = oldContent.replace(regex, replaceVal);
  fs.writeFileSync(blogPostPath, newContent, {encoding: 'utf-8'});
};

const main = () => {
  const blogDir = 'content/blog';
  const filePaths = walk(blogDir);
  const blogPostPaths = filePaths.filter((filePath) => {
    return filePath.endsWith('.md');
  });
  blogPostPaths.forEach((blogPostPath) => {
    convertBlogPostTitleToTitleCase(blogPostPath);
  });
};

main();
