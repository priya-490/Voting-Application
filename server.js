const express = require('express')
const app = express();

// app.use(express.json());
// const db = require('./db');
const db = require('./db');

const path = require('path');
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // will store in req.body

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', function (req, res) {
//     res.send('Hey, how can i help you')
// })

app.get('/landing-page',  (req, res)=> {
    res.json({message: "you just casted the vote"});
})

const candidateRoutes = require('./routes/candidateRoutes');
app.use('/candidates', candidateRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/userInfo', userRoutes);

app.listen(5000)


