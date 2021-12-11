(function () {
  const LOG_ENABLED = false;

  const SEARCH_SELECTOR_STR = '#search';
  const COUNT_SELECTOR_STR = '#count-value';
  const POSTS_SELECTOR_STR = '#list p';

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
    return document.querySelector(SEARCH_SELECTOR_STR);
  };

  const getCountEl = () => {
    return document.querySelector(COUNT_SELECTOR_STR);
  };

  const getPostEls = () => {
    return document.querySelectorAll(POSTS_SELECTOR_STR);
  };

  const getQueryWordsArr = () => {
    return getSearchEl()
      .value
      .trim()
      .toUpperCase()
      .split(' ');
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
      const hit = isHit(queryWordsArr, titleStr);

      logObj('queryWordsArr', queryWordsArr);
      logObj('titleStr', titleStr);

      if (hit) {
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
