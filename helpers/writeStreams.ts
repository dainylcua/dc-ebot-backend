import * as fs from 'fs';
import * as path from 'path';

// const pathName: string = path.join(__dirname, '../files', '2017.csv'); /* real data file */
const pathName: string = path.join(__dirname, '../files', '20170101_test.csv'); /* test file */
const stream: fs.ReadStream = fs.createReadStream(pathName);

let sum = 0;
let unprocessed = '';

interface RowData {
  id: string;
  date: Date;
  element: string;
  data: number;
  mFlag: string;
  qFlag: string;
  sFlag: string;
  obs: number;
}

stream
  .on('data', (chunk) => {
    let rows = chunk.toString().split("\n");
    for(let row of rows) {
      let rowValues = row.split(",");
      let id = rowValues[0];
      let unformattedDate = rowValues[1];
      let date = new Date(`${unformattedDate.substring(0,4)}-${unformattedDate.substring(4,6)}-${unformattedDate.substring(6,8)}`);
      let element = rowValues[2];
      let data = parseInt(rowValues[3]);
      let mFlag = rowValues[4];
      let qFlag = rowValues[5];
      let sFlag = rowValues[6];
      let obs = parseInt(rowValues[7]);
      const formattedRow: RowData = { id, date, element, data, mFlag, qFlag, sFlag, obs }
    }
  })
  .on('end', () => console.log('read complete'))
