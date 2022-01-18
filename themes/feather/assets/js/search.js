(function () {
  const LOG_ENABLED = false;

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
    return document.querySelector('#search');
  };

  const getCountEl = () => {
    return document.querySelector('#count-value');
  };

  const getPostEls = () => {
    return document.querySelectorAll('#list p');
  };

  const getQueryWordsArr = () => {
    return getSearchEl().value.trim().toUpperCase().split(' ');
  };

  const getPostTitleStr = postEl => {
    return postEl
      .querySelector('span.post-title')
      .textContent.trim()
      .toUpperCase();
  };

  const isHit = (queryWordsArr, titleStr) => {
    return queryWordsArr.every(queryWordStr => {
      return titleStr.includes(queryWordStr);
    });
  };

  const showPost = postEl => {
    postEl.style.display = 'block';
  };

  const hidePost = postEl => {
    postEl.style.display = 'none';
  };

  const updateCountEl = countNum => {
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

  const handleKeyupEvent = () => {
    logPerformance('filterPosts', filterPosts);
  };

  const enableSearchEl = () => {
    getSearchEl().disabled = false;
    getSearchEl().placeholder = 'Search by title';
  };

  const main = () => {
    getSearchEl().addEventListener('keyup', handleKeyupEvent);
    enableSearchEl();
  };

  main();
})();
