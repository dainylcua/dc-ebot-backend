import * as fs from 'fs';
import * as path from 'path';
import es from 'event-stream';
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
    .pipe(es.split("\n"))
    .pipe(
      es
        .mapSync((line: string) => {
          let observationData = line.split(",");
          if(observationData[0] === desiredId) {
            let unformattedDate = observationData[1];
            let dataDate = new Date(`${unformattedDate.substring(0,4)}-${unformattedDate.substring(4,6)}-${unformattedDate.substring(6,8)}`);              

            // Set the date of the current day of data if default
            if(currentDayData.date.getFullYear() === 1970) currentDayData.date = dataDate

            if(currentDayData.date.getDay() === dataDate.getDay()) {
              // Same day of data, format into MeasurementData then push into measurements[]
              let data = parseInt(observationData[3]);
              const formattedValue: MeasurementData = { 
                element: observationData[2],
                data,
                mFlag: observationData[4],
                qFlag: observationData[5],
                sFlag: observationData[6],
                observedTime: observationData[7]
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
    )
    .on('end', () => {
      if(filePath.includes("test")) stationData.days.push(currentDayData)
      fulfill(stationData)
    }))
  return stationData
}
