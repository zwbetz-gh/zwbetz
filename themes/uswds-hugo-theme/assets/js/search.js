(function () {
  const LOG_ENABLED = false;
  const ASK_PERMISSION = false;

  const SEARCH_ID = 'search';
  const ENABLE_SEARCH_DIV_ID = 'enable_search_div';
  const ENABLE_SEARCH_ID = 'enable_search';
  const COUNT_ID = 'count';
  const LIST_ID = 'list';

  let list = [];
  let filteredList = [];

  const logPerformance = (work, startTime, endTime) => {
    const duration = (endTime - startTime).toFixed(2);
    LOG_ENABLED && console.log(`${work} took ${duration} ms`);
  };

  const getSearchEl = () => document.getElementById(SEARCH_ID);
  const getEnableSearchDivEl = () =>
    document.getElementById(ENABLE_SEARCH_DIV_ID);
  const getEnableSearchEl = () => document.getElementById(ENABLE_SEARCH_ID);
  const getCountEl = () => document.getElementById(COUNT_ID);
  const getListEl = () => document.getElementById(LIST_ID);

  const disableSearchEl = placeholder => {
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
      // If obj is a string, then use it
      str = obj;
    } else {
      // Else, make obj into a string
      str = JSON.stringify(obj);
    }
    // Get the length of the Uint8Array
    const bytes = new TextEncoder().encode(str).length;
    return bytes;
  };

  const logSizeInKilobytes = (description, obj) => {
    const bytes = getSizeInBytes(obj);
    const kb = (bytes / 1000).toFixed(2);
    // 'approximately' is the keyword here...
    LOG_ENABLED && console.log(`${description} is approximately ${kb} kB`);
  };

  const fetchJsonIndex = () => {
    const startTime = performance.now();
    disableSearchEl('Loading...');
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
    const count = `<strong>Count: </strong>${filteredList.length}`;
    getCountEl().innerHTML = count;
  };

  const buildListItem = (item) => {
    const html = `\
    <h3>
      <a href="${item.RelPermalink}">${item.Title}</a>
    </h3>
    <p>
      <span class="">
        <strong>Published: </strong>${item.PublishDateFormatted}
      </span>
      <br>
      ${item.Summary}
    </p>`
    return html;
  }

  const buildDiv = () => {
    const newDiv = document.createElement('div');
    newDiv.id = LIST_ID;
    newDiv.className = 'usa-prose';
    return newDiv;
  }

  const renderList = () => {
    const htmlArr = [];

    filteredList.forEach(item => {
      htmlArr.push(buildListItem(item))
    });

    const newDiv = buildDiv()
    newDiv.innerHTML = htmlArr.join('\n');

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

  const handleEnableSearchEvent = () => {
    if (getEnableSearchEl().checked) {
      fetchJsonIndex();
    } else {
      disableSearchEl('Disabled...');
    }
  };

  const addEventListeners = () => {
    getEnableSearchEl().addEventListener('change', handleEnableSearchEvent);
    getSearchEl().addEventListener('keyup', handleSearchEvent);
  };

  const askPermission = flag => {
    if (!flag) {
      getEnableSearchDivEl().style.display = 'none';
      getEnableSearchEl().checked = true;
      handleEnableSearchEvent();
    }
  };

  const main = () => {
    if (getSearchEl()) {
      addEventListeners();
      askPermission(ASK_PERMISSION);
    }
  };

  main();
})();
