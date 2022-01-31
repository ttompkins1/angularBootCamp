import cors from 'cors';
import express from 'express';

import { db, initializeDatabase } from './initialize-db.js';

await initializeDatabase();

const port = 3000;
const app = express();
app.use(cors());

app.get('/', (_, res) => {
    return res.send('Welcome to the DMI Mock Weather API');
});

app.get('/summary', async (_, res) => {
    await db.read();

    if (db.data) {
        return res.json(db.data.weatherSummary);
    }

    return res.status(404).json({ statusCode: 404, message: 'Not Found' });
});

app.get('/forecast/:guid', async (req, res) => {
    await db.read();

    const cityData = db.data?.weatherDetails.find(({ guid }) => guid === req.params.guid);
    if (cityData) {
        return res.json(cityData);
    }

    return res.status(404).json({ statusCode: 404, message: 'Not Found' });
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
