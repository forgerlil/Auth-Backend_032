require('dotenv').config();
const express = require('express');
const app = express();
const mongoConnection = require('./DB/mongoConnection');
mongoConnection();
const userRoute = require('./routes/userRoutes');
const duckRoute = require('./routes/duckRoutes');
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send('Hello World!'));
app.use('/user', userRoute);
app.use('/duck', duckRoute);

app.listen(3100, () => console.log('Listening on port 3100'));
