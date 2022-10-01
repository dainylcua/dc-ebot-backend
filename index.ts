// Import dependencies, enable .env (if used)
import express, { Express, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import * as path from 'path';
import getData from './helpers/getData'
import getCountries from './helpers/getCountries'

dotenv.config();

// Initialize app
const app: Express = express();
const port = process.env.PORT || 3001;

// Other constants
const stationPath: string = path.join(__dirname, './files', '2017.csv');
const countriesPath: string = path.join(__dirname, './files', 'ghcnd-countries.txt');

// Load data
const stations = getData(stationPath);
const countries = getCountries(countriesPath);

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Routes are:\n/stations\n/stations/:id\n/stations/country/:country\n/stations/:id/:month\n')
})

app.get('/stations', (req: Request, res: Response) => {
  const uniqueStationIds = [...new Set(Object.keys(stations))];
  res.send({
    stations: uniqueStationIds
  });
})

app.get('/stations/:id', (req: Request, res: Response) => {
  const yearStationData = stations[req.params.id];
  res.send({
    id: req.params.id,
    days: yearStationData
  });
})

app.get('/stations/country/:country', (req: Request, res: Response) => {
  const uniqueStationIds = [...new Set(Object.keys(stations))];
  let countryObject = countries;

  if(countryObject[req.params.country]) {
    let countryStations = uniqueStationIds.filter((stationId) => stationId.slice(0,2) === req.params.country)
    
    res.send({
      stations: countryStations
    })
  } else {
    res.send(`Error: unexpected country code`)
  }
})

app.get('/stations/:id/:month', (req: Request, res: Response) => {
  const yearStationData = stations[req.params.id];
  let month: string = req.params.month;
  if(month.length === 1) month = '0' + month; 

  const daysInMonths =  {
    '01': 31,
    '02': 28, /* not a leap year */
    '03': 31,
    '04': 30,
    '05': 31,
    '06': 30,
    '07': 31,
    '08': 31,
    '09': 30,
    '10': 31,
    '11': 30,
    '12': 31
  };
  
  let monthStationData: DayData = {};

  if(daysInMonths.hasOwnProperty(month)) {
    const days = daysInMonths[month as keyof typeof daysInMonths]
    for(let i=0; i<=days; i++) {
      let day = i.toString().length === 1 ? '0' + i.toString() : i.toString();
      let date = `2017${month}${day}`;
      monthStationData[date] = yearStationData[date]
    }
    res.send({
      id: req.params.id,
      days: monthStationData
    });
  } else {
    res.send(`Error: Invalid month code`)
  }
})


app.listen(port, () => console.log(`Now running on port ${port}.`))