(function () {
  const LOG_ENABLED = true;

  const SEARCH_ID_STR = 'search';
  const COUNT_ID_STR = 'count-value';
  const LIST_ID_STR = 'list';

  const DISPLAY_BLOCK_STR = 'block';
  const DISPLAY_NONE_STR = 'none';

  const logObj = (objNameStr, obj) => {
    if (LOG_ENABLED) {
      console.log(objNameStr, JSON.stringify(obj));
    }
  };

  const logPerformance = (funcNameStr, func) => {
    const startTimeNum = performance.now();
    func();
    const endTimeNum = performance.now();
    const durationStr = (endTimeNum - startTimeNum).toFixed(2);

    if (LOG_ENABLED) {
      console.log(`${funcNameStr} took ${durationStr} ms`);
    }
  };

  const getSearchEl = () => {
    return document.getElementById(SEARCH_ID_STR);
  };

  const getCountEl = () => {
    return document.getElementById(COUNT_ID_STR);
  };

  const getQueryWordsArr = () => {
    return getSearchEl()
      .value
      .trim()
      .toUpperCase()
      .split(' ');
  };

  const getPostEls = () => {
    return document.querySelectorAll(`#${LIST_ID_STR} p`);
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
    postEl.style.display = DISPLAY_BLOCK_STR;
  };

  const hidePost = (postEl) => {
    postEl.style.display = DISPLAY_NONE_STR;
  };

  const updateCountEl = (countNum) => {
    getCountEl().textContent = countNum;
  };

  const filterPosts = () => {
    const queryWordsArr = getQueryWordsArr();
    const postEls = getPostEls();
    let countNum = postEls.length;

    postEls.forEach(postEl => {
      const titleStr = getPostTitleStr(postEl);

      logObj('queryWordsArr', queryWordsArr);
      logObj('titleStr', titleStr);

      if (isHit(queryWordsArr, titleStr)) {
        showPost(postEl);
      } else {
        hidePost(postEl);
        countNum--;
      }
    });

    updateCountEl(countNum);
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
