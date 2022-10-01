type Properties = {
  data: number;
  mFlag: string;
  qFlag: string;
  sFlag: string;
  observedTime: string;
}

type Observation = {
  [element: string]: Properties
}

type DayData = {
  [date: string]: Observation;
}

type StationCollection = {
  [id: string]: DayData
}
