import stats from './stats';
import Fuse from './fuse';
import {Hit, Page} from './types';

const JSON_INDEX_URL = `${window.location.origin}/blog/index.json`;
const QUERY_URL_PARAM = 'query';

const MAX_HITS_SHOWN = 10;

const FUSE_OPTIONS = {
  keys: ['title']
};

let fuse: any;

const getSearchInputEl = (): HTMLInputElement => {
  return document.querySelector('#search_input') as HTMLInputElement;
};

const getSearchResultsContainerEl = (): HTMLDivElement => {
  return document.querySelector('#search_results_container') as HTMLDivElement;
};

const prepareSearchInputEl = (): void => {
  getSearchInputEl().disabled = false;
  getSearchInputEl().placeholder = 'Search by title';
  getSearchInputEl().focus();
};

const initFuse = (pages: Page[]): void => {
  fuse = new Fuse(pages, FUSE_OPTIONS);
};

const doSearchIfUrlParamExists = (): void => {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has(QUERY_URL_PARAM)) {
    const encodedQuery = urlParams.get(QUERY_URL_PARAM) as string;
    const query = decodeURIComponent(encodedQuery);
    getSearchInputEl().value = query;
    handleSearchEvent();
  }
};

const setUrlParam = (query: string): void => {
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set(QUERY_URL_PARAM, encodeURIComponent(query));
  window.history.replaceState({}, '', `${location.pathname}?${urlParams}`);
};

const fetchJsonIndex = (): void => {
  const startTime = performance.now();
  fetch(JSON_INDEX_URL)
    .then(response => {
      return response.json();
    })
    .then(data => {
      const pages: Page[] = data;
      initFuse(pages);
      prepareSearchInputEl();
      doSearchIfUrlParamExists();
      stats.setJsonIndexFetchTime(startTime, performance.now());
    })
    .catch(error => {
      console.error(`Failed to fetch JSON index: ${error.message}`);
    });
};

const createHitHtml = (hit: Hit): string => {
  return `\
  <p>
    <a href="${hit.item.url}">${hit.item.title}</a>
  </p>`;
};

const renderHits = (hits: Hit[]): void => {
  const limitedHits = hits.slice(0, MAX_HITS_SHOWN);
  const html = limitedHits.map(createHitHtml).join('\n');
  getSearchResultsContainerEl().innerHTML = html;
};

const getQuery = (): string => {
  return getSearchInputEl().value.trim();
};

const getHits = (query: string): Hit[] => {
  return fuse.search(query);
};

const handleSearchEvent = (): void => {
  const startTime = performance.now();
  const query = getQuery();
  const hits = getHits(query);
  setUrlParam(query);
  renderHits(hits);
  stats.setSearchEventTime(startTime, performance.now());
};

const main = (): void => {
  if (getSearchInputEl()) {
    fetchJsonIndex();
    getSearchInputEl().addEventListener('keyup', handleSearchEvent);
  }
};

main();
