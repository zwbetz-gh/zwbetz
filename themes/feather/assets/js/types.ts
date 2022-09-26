export interface Page {
  title: string;
  url: string;
}

interface Match {
  key: string;
  value: string;
  indices: number[][];
}

export interface Hit {
  item: Page;
  refIndex: number;
  matches: Match[];
}

/**
 * See https://fusejs.io/api/options.html
 */
export interface FuseOptions {
  isCaseSensitive?: boolean;
  includeScore?: boolean;
  includeMatches?: boolean;
  minMatchCharLength?: number;
  shouldSort?: boolean;
  findAllMatches?: boolean;
  keys?: string[];
  location?: number;
  threshold?: number;
  distance?: number;
  ignoreLocation?: boolean;
}
