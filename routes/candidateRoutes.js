const express = require('express');
const router = express.Router();
const Candidate = require('../models/candidates');

// post route to add a candidate
router.post('/', async(req,res) =>{
    try{
        const data = req.body;
        const newCandidate = new Candidate(data);
        const response = await newCandidate.save();
        console.log('candidate data saved');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'internal server error'});
    }
})

// get method 
router.get('/', async(req,res)=>{
    try{
        const data = await Candidate.find();
        console.log("data is fetched");
        res.status(200).json(data);

    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error '});
    }
})

module.exports = router;

