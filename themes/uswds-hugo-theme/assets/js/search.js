(function () {
  const SEARCH_ID = 'search';
  const ENABLE_SEARCH_DIV_ID = 'enable_search_div';
  const ENABLE_SEARCH_ID = 'enable_search';
  const REGEX_MODE_ID = 'regex_mode';
  const COUNT_ID = 'count';
  const LIST_ID = 'list';

  let list = null;
  let filteredList = null;

  const logPerformance = (work, startTime, endTime) => {
    const duration = (endTime - startTime).toFixed(2);
    console.log(`${work} took ${duration} ms`);
  };

  const getSearchEl = () => document.getElementById(SEARCH_ID);
  const getEnableSearchDivEl = () =>
    document.getElementById(ENABLE_SEARCH_DIV_ID);
  const getEnableSearchEl = () => document.getElementById(ENABLE_SEARCH_ID);
  const getRegexModeEl = () => document.getElementById(REGEX_MODE_ID);
  const getCountEl = () => document.getElementById(COUNT_ID);
  const getListEl = () => document.getElementById(LIST_ID);

  const disableSearchEl = placeholder => {
    getSearchEl().disabled = true;
    getSearchEl().placeholder = placeholder;
  };

  const enableSearchEl = () => {
    getSearchEl().disabled = false;
    getSearchEl().placeholder =
      'Case-insensitive search by title, content, or publish date';
  };

  const disableRegexModeEl = () => {
    getRegexModeEl().disabled = true;
  };

  const enableRegexModeEl = () => {
    getRegexModeEl().disabled = false;
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
    // 'approximately' is the keyword here ...
    console.log(`${description} is approximately ${kb} kB`);
  };

  const fetchJsonIndex = () => {
    const startTime = performance.now();
    disableSearchEl('Loading ...');
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

  const filterList = regexMode => {
    const regexQuery = new RegExp(getSearchEl().value, 'i');
    const query = getSearchEl().value.toUpperCase();
    filteredList = list.filter(item => {
      const title = item.Title.toUpperCase();
      const content = item.PlainContent.toUpperCase();
      const publishDate = item.PublishDateFormatted.toUpperCase();
      if (regexMode) {
        return (
          regexQuery.test(title) ||
          regexQuery.test(content) ||
          regexQuery.test(publishDate)
        );
      } else {
        return (
          title.includes(query) ||
          content.includes(query) ||
          publishDate.includes(query)
        );
      }
    });
  };

  const renderCount = () => {
    const count = `Count: ${filteredList.length}`;
    getCountEl().textContent = count;
  };

  const renderList = () => {
    const newList = document.createElement('ul');
    newList.id = LIST_ID;

    filteredList.forEach(item => {
      const li = document.createElement('li');

      const publishDate = document.createElement('span');
      publishDate.className = 'text-gray-50';
      publishDate.textContent = item.PublishDateFormatted;

      const titleLink = document.createElement('a');
      titleLink.href = item.RelPermalink;
      titleLink.textContent = item.Title;

      li.appendChild(publishDate);
      li.appendChild(document.createTextNode(' '));
      li.appendChild(titleLink);

      newList.appendChild(li);
    });

    const oldList = getListEl();
    oldList.replaceWith(newList);
  };

  const handleSearchEvent = () => {
    const startTime = performance.now();
    const regexMode = getRegexModeEl().checked;
    filterList(regexMode);
    renderCount();
    renderList();
    logPerformance('handleSearchEvent', startTime, performance.now());
  };

  const handleEnableSearchEvent = () => {
    if (getEnableSearchEl().checked) {
      fetchJsonIndex();
      enableRegexModeEl();
    } else {
      disableSearchEl('Disabled ...');
      disableRegexModeEl();
    }
  };

  const addEventListeners = () => {
    getEnableSearchEl().addEventListener('change', handleEnableSearchEvent);
    getSearchEl().addEventListener('keyup', handleSearchEvent);
    getRegexModeEl().addEventListener('change', handleSearchEvent);
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
      askPermission(false);
    }
  };

  main();
})();
