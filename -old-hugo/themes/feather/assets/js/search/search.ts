import RawFuse from './fuse.mjs';
import {Fuse, FuseResult, IFuseOptions} from './fuse.d';

const QUERY_URL_PARAM = 'query';

const MAX_HITS_SHOWN = 20;
const MIN_MATCH_CHAR_LENGTH = 2;

const LEFT_SIDE_MATCH_HTML = `<span style="">`;
const RIGHT_SIDE_MATCH_HTML = '</span>';

interface Page {
  title: string;
  url: string;
}

const FUSE_OPTIONS: IFuseOptions<Page> = {
  keys: ['title'],
  ignoreLocation: true,
  includeMatches: false,
  minMatchCharLength: MIN_MATCH_CHAR_LENGTH
};

let fuse: Fuse<Page>;

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
  fuse = new RawFuse(pages, FUSE_OPTIONS) as Fuse<Page>;
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

/**
 * Copied from {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent#encoding_for_rfc3986}
 */
const encodeRFC3986URIComponent = (str: string): string => {
  return encodeURIComponent(str).replace(/[!'()*]/g, c => `%${c.charCodeAt(0).toString(16).toUpperCase()}`);
};

const setUrlParam = (query: string): void => {
  const url = new URL(location.origin + location.pathname);
  url.search = `${QUERY_URL_PARAM}=${encodeRFC3986URIComponent(query)}`;
  window.history.replaceState({}, '', url);
};

const highlightMatches = (hit: FuseResult<Page>, key: string) => {
  const text: string = hit.item[key];
  const match = hit.matches && hit.matches.find(match => match.key === key);

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

const createHitsHtml = (hits: FuseResult<Page>[]): string => {
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

const renderHits = (hits: FuseResult<Page>[]): void => {
  const limitedHits = hits.slice(0, MAX_HITS_SHOWN);
  const html = createHitsHtml(limitedHits);
  getSearchResultsContainerEl().innerHTML = html;
};

const getQuery = (): string => {
  return getSearchInputEl().value.trim();
};

const getHits = (query: string): FuseResult<Page>[] => {
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
