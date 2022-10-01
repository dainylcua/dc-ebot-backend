import * as fs from 'fs';
import * as path from 'path';
import { resolve } from 'path';
import Papa, { ParseResult, ParseStepResult } from 'papaparse';

// Data types
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

export default function getData(filePath: string): StationCollection {
  let stations: StationCollection = {};

  const stream: fs.ReadStream = fs.createReadStream(filePath);

  Papa.parse(stream, {
    step: (row: ParseStepResult<string []>) => {
      const observationData = row.data;

      const id = observationData[0]
      const date = observationData[1];
      const element = observationData[2];
      
      const observation: Properties = {
        data: parseInt(observationData[3]),
        mFlag: observationData[4],
        qFlag: observationData[5],
        sFlag: observationData[6],
        observedTime: observationData[7],
      }

      // If the station ID is already in the object
      if(stations[id]) {
        // If there has already been an observation for the date
        if(stations[id][date]) {
          // Add the element to the date object
          stations[id][date][element] = observation

          // If there has not been an observation for the date, add the date
        } else {
          stations[id][date] = {
            element: observation
          }
        }
      } else {
        // If not, create the id
        stations[id] = {
          date: {
            element: observation
          }
        }
      }
    },
    complete: () => console.log(stations)
  })
  return stations
}
