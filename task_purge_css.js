const fs = require('fs');
const {PurgeCSS} = require('purgecss');

(async () => {
  const originalCssFilePath = 'themes/uswds-hugo-theme/assets/css/uswds.css';

  const result = await new PurgeCSS().purge({
    content: ['./hugo_stats.json'],
    defaultExtractor: content => {
      let els = JSON.parse(content).htmlElements;
      return [...els.tags, ...els.classes, ...els.ids];
    },
    css: [originalCssFilePath],
    safelist: {
      greedy: [/:focus/]
    }
  });

  const purgedCssFilePath = 'uswds-purged.css';
  const purgedCssContent = result[0].css;

  fs.writeFileSync(purgedCssFilePath, purgedCssContent, {encoding: 'utf-8'});
})();