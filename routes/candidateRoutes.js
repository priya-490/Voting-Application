const express = require('express');
const router = express.Router();
const Candidate = require('../models/candidates');
// const candidate = require('../models/candidates');

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
router.post('/castVote', async(req,res)=>{
    const {candidateId} = req.body;
    try{
        const updatedCandidate = await Candidate.findOneAndUpdate(
            {candidateId : candidateId},
            {$inc: {voteCount :1}}, // increment vote count by 1
            {new: true}
        );
        if(!updatedCandidate){
            return res.status(404).json({message:'Candidate not found'});
        }
        res.status(200).json({message: 'Vote cast successfully',candidate : updatedCandidate});

    } catch(error){
        console.error(error);
        res.status(500).json({message: 'internal server error '});
    }
});

module.exports = router;

