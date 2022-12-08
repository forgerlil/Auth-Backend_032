require('dotenv').config();
const express = require('express');
const app = express();
const mongoConnection = require('./DB/mongoConnection');
mongoConnection();
const userRoute = require('./routes/userRoutes');

app.use(express.json());

app.get('/', (req, res) => res.send('Hello World!'));
app.use('/user', userRoute);

app.listen(3000, () => console.log('Listening on port 3000'));
