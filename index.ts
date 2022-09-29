// Import dependencies
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import * as path from 'path';
import searchPlants from "./helpers/searchPlants"

dotenv.config();

// Initialize app
const app: Express = express();
const port = process.env.PORT;

// Other constants
const regularPath: string = path.join(__dirname, './files', '2017.csv'); /* real data file */
const testPath: string = path.join(__dirname, './files', '20170101_test.csv'); /* test file */

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send("Index page")
})

app.get('/stations', (req: Request, res: Response) => {
  res.send("Stations page")
})

app.get('/stations/:id', async (req: Request, res: Response) => {
  let results = await searchPlants(regularPath, req.params.id)
  res.send(results)
})
app.get('/test/stations', (req: Request, res: Response) => {
  res.send("Test Stations page")
})

app.get('/test/stations/:id', async (req: Request, res: Response) => {
  let results = await searchPlants(testPath, req.params.id)
  res.send(results)
})




app.listen(port, () => console.log(`Now running on port ${port}.`))