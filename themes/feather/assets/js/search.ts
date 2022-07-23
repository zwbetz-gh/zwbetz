const LOG_ENABLED = true;

const logPerformance = (funcName: string, func: () => void): void => {
  const startTime = performance.now();
  func();
  const endTime = performance.now();
  const duration = (endTime - startTime).toFixed(2);

  if (LOG_ENABLED) {
    console.log(`${funcName} took ${duration} ms`);
  }
};

const getSearchEl = (): HTMLInputElement => {
  return document.querySelector('#search') as HTMLInputElement;
};

const getCountEl = (): HTMLElement => {
  return document.querySelector('#count-value') as HTMLElement;
};

const getPostEls = (): NodeListOf<HTMLElement> => {
  return document.querySelectorAll('#list p');
};

const getQueryWords = (): string[] => {
  return getSearchEl().value.trim().toUpperCase().split(' ');
};

const getPostTitle = (postEl: HTMLElement): string => {
  const el = postEl.querySelector('span.post-title') as HTMLElement;
  const textContent = el.textContent as string;
  return textContent.trim().toUpperCase();
};

const isHit = (queryWords: string[], title: string): boolean => {
  return queryWords.every(queryWordStr => {
    return title.includes(queryWordStr);
  });
};

const showPost = (postEl: HTMLElement): void => {
  postEl.style.display = 'block';
};

const hidePost = (postEl: HTMLElement): void => {
  postEl.style.display = 'none';
};

const updateCountEl = (count: number): void => {
  getCountEl().textContent = String(count);
};

const filterPosts = (): void => {
  const queryWords = getQueryWords();
  const postEls = getPostEls();
  let count = postEls.length;

  postEls.forEach(postEl => {
    const title = getPostTitle(postEl);
    const hit = isHit(queryWords, title);

    if (hit) {
      showPost(postEl);
    } else {
      hidePost(postEl);
      count--;
    }
  });

  updateCountEl(count);
};

const handleKeyupEvent = (): void => {
  logPerformance('filterPosts', filterPosts);
};

const enableSearchEl = (): void => {
  getSearchEl().disabled = false;
  getSearchEl().placeholder = 'Search by title';
};

const main = (): void => {
  getSearchEl().addEventListener('keyup', handleKeyupEvent);
  enableSearchEl();
};

main();
