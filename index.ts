// Import dependencies, enable .env (if used)
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import * as path from 'path';
import getData from "./helpers/getData"

dotenv.config();

// Initialize app
const app: Express = express();
const port = process.env.PORT;

// Other constants
const regularPath: string = path.join(__dirname, './files', '2017.csv');

// Load from .csv
const regularStations = getData(regularPath)


// Routes
app.get('/', (req: Request, res: Response) => {
  res.send("Routes are :\n/stations\n/stations/:id\n/stations/:id/:month\n")
})

app.get('/stations', (req: Request, res: Response) => {
  let results = [...new Set(Object.keys(regularStations))]
  res.send(results)
})

app.get('/stations/:id', (req: Request, res: Response) => {
  let results = regularStations[req.params.id]
  res.send(results)
})

app.get('/stations/region/:country', (req: Request, res: Response) => {
  let results 
})

app.listen(port, () => console.log(`Now running on port ${port}.`))