import * as fs from 'fs';
import * as path from 'path';
import csv from 'csv-parser';
import { resolve } from 'path';

// Data type
interface MeasurementData {
  element: string;
  data: number;
  mFlag: string;
  qFlag: string;
  sFlag: string;
  observedTime: string;
}

interface DayData {
  date: Date;
  measurements: MeasurementData[];
}

interface StationData {
  id: string;
  days: DayData[];
}

export default async function searchPlants(filePath: string, desiredId: string): Promise<StationData> {
  let stationData: StationData = {
    id: desiredId,
    days: [],
  };

  let currentDayData: DayData = {
    date: new Date('1970-01-01T00:00:00'),
    measurements: [],
  }

  const stream: fs.ReadStream = fs.createReadStream(filePath);

  await new Promise((fulfill) => stream
    .pipe(csv(['id', 'date', 'element', 'data', 'mFlag', 'qFlag', 'sFlag', 'observedTime']))
    .on('data', (parsedData) => {
      if(parsedData['id'] == desiredId) {
        // Get date of data
        let unformattedDate = parsedData['date'];
        let dataDate = new Date(`${unformattedDate.substring(0,4)}-${unformattedDate.substring(4,6)}-${unformattedDate.substring(6,8)}`);

        // Set the date of the current day of data if default
        if(currentDayData.date.getFullYear() === 1970) currentDayData.date = dataDate

        if(currentDayData.date.getDay() === dataDate.getDay()) {
          // Same day of data, format into MeasurementData then push into measurements[]
          let data = parseInt(parsedData['data']);
          const formattedValue: MeasurementData = { 
            data,
            element: parsedData["element"],
            mFlag: parsedData["mFlag"],
            qFlag: parsedData["qFlag"],
            sFlag: parsedData["sFlag"],
            observedTime: parsedData["observedTime"]
          }
          currentDayData.measurements.push(formattedValue)
        } else {
          // New day of data, push the current data into days[], then start new day of data
          stationData.days.push(currentDayData)

          currentDayData = {
            date: new Date('1970-01-01T00:00:00'),
            measurements: [],
          }
        }
      }
    })
    .on('end', () => {
      fulfill(stationData)
    }))
  return stationData
}
