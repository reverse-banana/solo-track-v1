import express, { Request, Response } from 'express'; // Import Request and Response types
import endpoints from './routes/endpoints.ts'; // Import wellness routes


const app = express();

app.use(express.json());
app.use(endpoints);


app.listen(8000);
