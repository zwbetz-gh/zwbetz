import stats from './stats';
import Fuse from './fuse';
import {FuseOptions, Hit, Page} from './types';

const JSON_INDEX_URL = `${window.location.origin}/blog/index.json`;
const QUERY_URL_PARAM = 'query';

const MAX_HITS_SHOWN = 10;

const MIN_MATCH_CHAR_LENGTH = 3;

const LEFT_SIDE_MATCH_HTML = '<span style="font-weight: bold;">';
const RIGHT_SIDE_MATCH_HTML = '</span>';

const FUSE_OPTIONS: FuseOptions = {
  keys: ['title'],
  ignoreLocation: true,
  includeMatches: true,
  minMatchCharLength: MIN_MATCH_CHAR_LENGTH
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
  getSearchInputEl().placeholder = `Search by title. Use ${MIN_MATCH_CHAR_LENGTH} or more characters`;
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

const highlightMatches = (hit: Hit, key: string) => {
  const text: string = hit.item[key];
  const match = hit.matches.find(match => match.key === key);

  if (!match) {
    return text;
  }

  const charIndexToReplacementText = new Map<number, string>();

  match.indices.forEach(indexPair => {
    const startIndex = indexPair[0];
    const endIndex = indexPair[1];

    const startCharText = `${LEFT_SIDE_MATCH_HTML}${text[startIndex]}`;
    const endCharText = `${text[endIndex]}${RIGHT_SIDE_MATCH_HTML}`;

    charIndexToReplacementText.set(startIndex, startCharText);
    charIndexToReplacementText.set(endIndex, endCharText);
  });

  return text
    .split('')
    .map((char, index) => charIndexToReplacementText.get(index) || char)
    .join('');
};

const createHitHtml = (hit: Hit): string => {
  const highlightedText = highlightMatches(hit, 'title');

  return `\
  <p>
    <a href="${hit.item.url}">${highlightedText}</a>
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
