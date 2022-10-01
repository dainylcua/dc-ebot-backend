// Import dependencies, enable .env (if used)
import express, { Express, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import * as path from 'path';
import getData from './helpers/getData'
import getCountries from './helpers/getCountries'

dotenv.config();

// Initialize app
const app: Express = express();
const port = process.env.PORT;

// Other constants
const stationPath: string = path.join(__dirname, './files', '2017.csv');
const countriesPath: string = path.join(__dirname, './files', 'ghcnd-countries.txt');

// Load data
const stations = getData(stationPath);
const countries = getCountries(countriesPath);

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send("Routes are:\n/stations\n/stations/:id\n/stations/:id/:month\n")
})

app.get('/stations', (req: Request, res: Response) => {
  const uniqueStationIds = [...new Set(Object.keys(stations))]
  res.send({
    stations: uniqueStationIds
  });
})

app.get('/stations/:id', (req: Request, res: Response) => {
  let yearStationData = stations[req.params.id];
  res.send({
    id: req.params.id,
    days: yearStationData
  });
})

app.get('/stations/region/:country', (req: Request, res: Response) => {
  const uniqueStationIds = [...new Set(Object.keys(stations))]
  let countryObject = countries;
  if(!countryObject[req.params.country]) {
    res.send(`Error: unexpected country code`)
  } else {
    let countryStations = uniqueStationIds.filter((stationId) => {
      if(stationId.slice(0,2) === req.params.country) return stationId
    }) 
    res.send({
      stations: countryStations
    });
  }
})

app.listen(port, () => console.log(`Now running on port ${port}.`))