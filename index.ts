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
const countriesPath: string = path.join(__dirname, './files', 'ghcnd-countries.txt')

// Load data
const regularStations = getData(stationPath)
const countries = getCountries(countriesPath)

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send("Routes are :\n/stations\n/stations/:id\n/stations/:id/:month\n")
})

app.get('/stations', (req: Request, res: Response) => {
  let results = [...new Set(Object.keys(regularStations))];
  res.send(results);
})

app.get('/stations/:id', (req: Request, res: Response) => {
  let results = regularStations[req.params.id];
  res.send(results);
})

app.get('/stations/region/:country', (req: Request, res: Response) => {
  let results = countries;
  res.send(results);
})

app.listen(port, () => console.log(`Now running on port ${port}.`))