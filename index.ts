// Import dependencies
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

// Initialize app
const app: Express = express();
const port = process.env.PORT;

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send("Testing")
})

app.listen(port, () => console.log(`Now running on port ${port}.`))