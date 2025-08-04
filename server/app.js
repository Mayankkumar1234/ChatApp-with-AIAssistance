
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import "dotenv/config";

const app = express();



// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Sample route
app.get('/', (req, res) => {
    res.send('Hello World!');
});


export default app;
