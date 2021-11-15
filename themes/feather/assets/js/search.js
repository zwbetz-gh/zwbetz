(function () {
  const LOG_ENABLED = false;

  const SEARCH_ID = 'search';
  const COUNT_ID = 'count';
  const LIST_ID = 'list';

  let list = [];
  let filteredList = [];

  const logPerformance = (work, startTime, endTime) => {
    const duration = (endTime - startTime).toFixed(2);
    LOG_ENABLED && console.log(`${work} took ${duration} ms`);
  };

  const getSearchEl = () => document.getElementById(SEARCH_ID);
  const getCountEl = () => document.getElementById(COUNT_ID);
  const getListEl = () => document.getElementById(LIST_ID);

  const disableSearchEl = (placeholder = 'Loading...') => {
    getSearchEl().disabled = true;
    getSearchEl().placeholder = placeholder;
  };

  const enableSearchEl = () => {
    getSearchEl().disabled = false;
    getSearchEl().placeholder = 'Search by title';
  };

  const getSizeInBytes = obj => {
    let str = null;
    if (typeof obj === 'string') {
      str = obj;
    } else {
      str = JSON.stringify(obj);
    }
    const bytes = new TextEncoder().encode(str).length;
    return bytes;
  };

  const logSizeInKilobytes = (description, obj) => {
    const bytes = getSizeInBytes(obj);
    const kb = (bytes / 1000).toFixed(2);
    LOG_ENABLED && console.log(`${description} is approximately ${kb} kB`);
  };

  const fetchJsonIndex = () => {
    const startTime = performance.now();
    disableSearchEl();
    const path = '/blog/index.json';
    const url = `${window.location.origin}${path}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        list = data.blog;
        filteredList = data.blog;
        enableSearchEl();
        logSizeInKilobytes(path, data.blog);
        logPerformance('fetchJsonIndex', startTime, performance.now());
      })
      .catch(error =>
        console.error(`Failed to fetch JSON index: ${error.message}`)
      );
  };

  const filterList = () => {
    let iterations = 0;
    const query = getSearchEl().value.toUpperCase();
    const queryWords = query.split(' ');
    filteredList = list.filter(item => {
      const title = item.Title.toUpperCase();
      return queryWords.every(queryWord => {
        iterations++;
        return title.includes(queryWord);
      })
    });
    LOG_ENABLED && console.log(`filterList iterations: ${iterations}`);
  };

  const renderCount = () => {
    const count = `<strong>Count:</strong> ${filteredList.length}`;
    getCountEl().innerHTML = count;
  };

  const createDiv = () => {
    const newDiv = document.createElement('div');
    newDiv.id = LIST_ID;
    return newDiv;
  }

  const createHtml = () => {
    const listItems = filteredList.map(item => {
      return `\
      <li>
        <a href="${item.RelPermalink}">${item.Title}</a>
      </li>
      `;
    }).join('\n');

    return `\
    <ul>
      ${listItems}
    </ul>
    `;
  }

  const renderList = () => {
    const newDiv = createDiv()
    newDiv.innerHTML = createHtml();

    const oldDiv = getListEl();
    oldDiv.replaceWith(newDiv);
  };

  const handleSearchEvent = () => {
    const startTime = performance.now();
    filterList();
    renderCount();
    renderList();
    logPerformance('handleSearchEvent', startTime, performance.now());
  };

  const addEventListeners = () => {
    getSearchEl().addEventListener('keyup', handleSearchEvent);
  };

  const main = () => {
    if (getSearchEl()) {
      addEventListeners();
      fetchJsonIndex();
    }
  };

  main();
})();
