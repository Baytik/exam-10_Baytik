const express = require('express');
const cors = require('cors');
const news = require('./app/news');
const config = require('./config');
const fileDb = require('./fileDb');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/news', news);

const run = async () => {
    await fileDb.init();
    app.listen(config.port)
};

run().catch(e => {
    console.error(e)
});
