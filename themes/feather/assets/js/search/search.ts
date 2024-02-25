import Fuse from './fuse';
import {FuseOptions, Hit, Page} from './types';

const QUERY_URL_PARAM = 'query';

const MAX_HITS_SHOWN = 20;

const MIN_MATCH_CHAR_LENGTH = 2;

const LEFT_SIDE_MATCH_HTML = `<span style="">`;
const RIGHT_SIDE_MATCH_HTML = '</span>';

const FUSE_OPTIONS: FuseOptions = {
  keys: ['title'],
  ignoreLocation: true,
  includeMatches: false,
  minMatchCharLength: MIN_MATCH_CHAR_LENGTH
};

let fuse: any;

const getSearchInputEl = (): HTMLInputElement => {
  return document.querySelector('#search_input') as HTMLInputElement;
};

const getSearchResultsContainerEl = (): HTMLDivElement => {
  return document.querySelector('#search_results_container') as HTMLDivElement;
};

const getJsonForSearchEl = (): HTMLScriptElement => {
  return document.querySelector('#json_for_search') as HTMLScriptElement;
};

const prepareSearchInputEl = (): void => {
  getSearchInputEl().disabled = false;
  getSearchInputEl().placeholder = `Search by title. Use ${MIN_MATCH_CHAR_LENGTH} or more characters`;
  getSearchInputEl().focus();
};

const initFuse = (): void => {
  console.time('parse json index');
  const pages: Page[] = JSON.parse(getJsonForSearchEl().text);
  console.timeEnd('parse json index');

  console.time('init fuse');
  fuse = new Fuse(pages, FUSE_OPTIONS);
  console.timeEnd('init fuse');
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

const createHitsHtml = (hits: Hit[]): string => {
  return `\
    ${hits
      .map(hit => {
        const title = FUSE_OPTIONS.includeMatches ? highlightMatches(hit, 'title') : hit.item.title;

        return `\
      <p>
        <a href="${hit.item.url}">${title}</a>
      </p>`;
      })
      .join('\n')}`;
};

const renderHits = (hits: Hit[]): void => {
  const limitedHits = hits.slice(0, MAX_HITS_SHOWN);
  const html = createHitsHtml(limitedHits);
  getSearchResultsContainerEl().innerHTML = html;
};

const getQuery = (): string => {
  return getSearchInputEl().value.trim();
};

const getHits = (query: string): Hit[] => {
  return fuse.search(query);
};

const handleSearchEvent = (): void => {
  console.time('search event');
  const query = getQuery();
  const hits = getHits(query);
  setUrlParam(query);
  renderHits(hits);
  console.timeEnd('search event');
};

const main = (): void => {
  if (getSearchInputEl()) {
    initFuse();
    prepareSearchInputEl();
    doSearchIfUrlParamExists();
    getSearchInputEl().addEventListener('keyup', handleSearchEvent);
  }
};

main();
