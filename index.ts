// Import dependencies
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

// Initialize app
const app: Express = express();
const port = process.env.PORT;

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send("Index page")
})

app.get('/stations', (req: Request, res: Response) => {
  res.send("Stations page")
})

app.get('/stations/:id', (req: Request, res: Response) => {
  res.send("Index page")
})




app.listen(port, () => console.log(`Now running on port ${port}.`))