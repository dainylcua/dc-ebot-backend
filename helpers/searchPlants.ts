import * as fs from 'fs';
import * as path from 'path';
import csv from 'csv-parser';
import { resolve } from 'path';

// const pathName: string = path.join(__dirname, '../files', '2017.csv'); /* real data file */
// const pathName: string = path.join(__dirname, '../files', '20170101_test.csv'); /* test file */


// Data type
interface RowData {
  id: string;
  date: Date;
  element: string;
  data: number;
  mFlag: string;
  qFlag: string;
  sFlag: string;
  observedTime: string;
}


export default async function searchPlants(filePath: string, desiredId: string): Promise<RowData[]> {
  let observations: RowData[] = [];
  const stream: fs.ReadStream = fs.createReadStream(filePath);
  await new Promise((fulfill) => stream
    .pipe(csv(["id", "date", "element", "data", "mFlag", "qFlag", "sFlag", "observedTime"]))
    .on('data', (parsedData) => {
      if(parsedData["id"] == desiredId) {
        let unformattedDate = parsedData["date"];
        let date = new Date(`${unformattedDate.substring(0,4)}-${unformattedDate.substring(4,6)}-${unformattedDate.substring(6,8)}`);
        let data = parseInt(parsedData["data"]);
        const formattedValue: RowData = { 
          ...parsedData, 
          date,
          data,
        }
        observations.push(formattedValue)
      }
    })
    .on('end', () => {
      fulfill(observations)
    }))
  return observations
}
