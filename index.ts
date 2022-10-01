// Import dependencies
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import * as path from 'path';
import getData from "./helpers/getData"

dotenv.config();

// Initialize app
const app: Express = express();
const port = process.env.PORT;

// Other constants
const regularPath: string = path.join(__dirname, './files', '2017.csv'); /* real data file */
// const testPath: string = path.join(__dirname, './files', '20170101_test.csv'); /* test file */

// Load from .csv
const regularStations = getData(regularPath)
// const testStations = getData(testPath)

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send("Index page")
})

app.get('/stations', (req: Request, res: Response) => {
  res.send("Stations page")
})

app.get('/stations/:id', (req: Request, res: Response) => {
  let results = regularStations[req.params.id]
  res.send(results)
})

// app.get('/stations/:id/:month', async (req: Request, res: Response) => {

//   res.send(results)
// })

// app.get('/test/stations', (req: Request, res: Response) => {
//   res.send("Test Stations page")
// })

// app.get('/test/stations/:id', async (req: Request, res: Response) => {

//   res.send(results)
// })

// app.get('/test/stations/:id/:month', async (req: Request, res: Response) => {

//   res.send(results)
// })




app.listen(port, () => console.log(`Now running on port ${port}.`))