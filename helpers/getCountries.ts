import * as fs from 'fs';
import Papa, { ParseStepResult } from 'papaparse';

/**
 * Pulls data from the .txt file located at the provided filePath and
 * returns an object containing station data. 
 * 
 * @param filePath - Path to ghcnd-countries.txt file
 * @returns An object containing stationData. 
 * @remarks Built with NOAA ghcnd-countries.txt as the 
 * expected input.
 */

type Countries = {
  [countryCode: string]: string;
}

export default function getCountries(filePath: string): Countries {
  let countries: Countries = {};

  const stream: fs.ReadStream = fs.createReadStream(filePath);

  Papa.parse(stream, {
    step: (row: ParseStepResult<string[]>) => {
      let line = row.data[0].trim().split(' ');
      const countryCode = line[0];
      const countryName = line.slice(1).join(' ');
      countries[countryCode] = countryName
    }
  })
  return countries
}
