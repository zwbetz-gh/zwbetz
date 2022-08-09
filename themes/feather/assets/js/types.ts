export interface Page {
  title: string;
  url: string;
}

export interface Hit {
  item: Page;
  refIndex: number;
}

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
