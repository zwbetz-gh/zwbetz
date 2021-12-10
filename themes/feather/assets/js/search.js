(function () {
  const LOG_ENABLED = false;
  const SEARCH_ID = 'search';
  const COUNT_VALUE_ID = 'count-value';
  const LIST_ID = 'list';

  const logPerformance = (funcNameStr, func) => {
    const startTime = performance.now();
    func();
    const endTime = performance.now();
    const duration = (endTime - startTime).toFixed(2);

    if (LOG_ENABLED) {
      console.log(`${funcNameStr} took ${duration} ms`);
    }
  };

  const getSearchEl = () => document.getElementById(SEARCH_ID);

  const getCountValueEl = () => document.getElementById(COUNT_VALUE_ID);

  const getQueryWordsArr = () => {
    return getSearchEl()
      .value
      .trim()
      .toUpperCase()
      .split(' ');
  };

  const getPostEls = () => {
    return document.querySelectorAll(`#${LIST_ID} p`);
  };

  const getPostTitleStr = (postEl) => {
    return postEl
      .querySelector('span.post-title')
      .textContent
      .trim()
      .toUpperCase();
  };

  const isHit = (queryWordsArr, titleStr) => {
    return queryWordsArr.every(queryWordStr => {
      return titleStr.includes(queryWordStr);
    });
  };

  const showPost = (postEl) => {
    postEl.style.display = 'block';
  };

  const hidePost = (postEl) => {
    postEl.style.display = 'none';
  };

  const updateCount = (countNum) => {
    getCountValueEl().textContent = countNum;
  };

  const filterPosts = () => {
    let countNum = 0;
    const queryWordsArr = getQueryWordsArr();
    const postEls = getPostEls();

    postEls.forEach(postEl => {
      const titleStr = getPostTitleStr(postEl);

      if (isHit(queryWordsArr, titleStr)) {
        showPost(postEl);
        countNum++;
        updateCount(countNum);
      } else {
        hidePost(postEl);
      }
    });
  };

  const handleSearchEvent = () => {
    logPerformance('filterPosts', filterPosts);
  };

  const addEventListeners = () => {
    getSearchEl().addEventListener('keyup', handleSearchEvent);
  };

  const enableSearchEl = () => {
    getSearchEl().disabled = false;
    getSearchEl().placeholder = 'Search by title';
  };

  const main = () => {
    addEventListeners();
    enableSearchEl();
  };

  main();
})();
