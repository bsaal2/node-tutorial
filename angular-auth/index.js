const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const port  = 3000;

let app = express();
app.use(cors());

const api = require('./routes/api');

app.use(bodyParser.json());


app.use('/api', api);

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.listen(port, ()=> {
    console.log("Server running in port :" + port);
});