import * as fs from 'fs';
import Papa, { ParseStepResult } from 'papaparse';

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

/**
 * Pulls data from the .csv file located at the provided filePath and
 * returns an object containing station data. 
 * 
 * @param filePath - Path to .csv file
 * @returns An object containing stationData. 
 * @remarks Built with daily/by_year NOAA weather observations as the 
 * expected input.
 */

export default function getData(filePath: string): StationCollection {
  let stations: StationCollection = {};
  let uniqueStationIds: string[] = [];

  const stream: fs.ReadStream = fs.createReadStream(filePath);

  Papa.parse(stream, {
    step: (row: ParseStepResult<string []>) => {
      const observationData = row.data;

      const id = observationData[0];
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
          stations[id][date][element] = observation;

          // If there has not been an observation for the date, add the date
        } else {
          stations[id][date] = {
            [element]: observation
          };
        }
      } else {
        // If not, create the id
        stations[id] = {
          [date]: {
            [element]: observation
          }
        };
      }
    }
  })
  return stations
}
