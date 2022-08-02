const getDurationFormattedAsMs = (
  startTime: number,
  endTime: number
): string => {
  const duration = (endTime - startTime).toFixed(1);
  return `${duration} ms`;
};

const setJsonIndexFetchTime = (startTime: number, endTime: number): void => {
  const el = document.querySelector(
    '#stats_json_index_fetch_time'
  ) as HTMLTableCellElement;
  el.textContent = getDurationFormattedAsMs(startTime, endTime);
};

const setSearchEventTime = (startTime: number, endTime: number): void => {
  const el = document.querySelector(
    '#stats_search_event_time'
  ) as HTMLTableCellElement;
  el.textContent = getDurationFormattedAsMs(startTime, endTime);
};

export default {
  setJsonIndexFetchTime,
  setSearchEventTime
};
