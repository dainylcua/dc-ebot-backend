export type Properties = {
  data: number;
  mFlag: string;
  qFlag: string;
  sFlag: string;
  observedTime: string;
}

export type Observation = {
  [element: string]: Properties
}

export type DayData = {
  [date: string]: Observation;
}

export type StationCollection = {
  [id: string]: DayData
}
