const mongoose = require('mongoose');

const mongoURL = 'mongodb://localhost:27017/voting_schema';

mongoose.connect(mongoURL)

const db = mongoose.connection;

db.on('connected', ()=>{
    console.log('connected to mongDB server');
});
db.on('error', (err)=>{
    console.log('mongoDB connection error: ',err);
});
db.on('disconnected', ()=>{
    console.log('mongDB disconnected');
});

module.exports = db;

