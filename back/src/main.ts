import express from "npm:express@latest";
import { Request, Response } from "npm:express@latest";

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(8000);
