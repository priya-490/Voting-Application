const express = require('express');
const router = express.Router();
const User = require('../models/user_info');

router.post('/check', async (req, res) => {
    const { name, aadhar } = req.body;

    try {
        const user = await User.findOne({ aadhar });
        if (user) {
            return res.json({ exists: true });
        }
        return res.json({ exists: false });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// post route to add a User

router.post('/', async(req,res) =>{
    try{
        const data = req.body;
        const newUser = new User(data);
        const response = await newUser.save();
        console.log('User data saved');
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
        const data = await User.find();
        console.log("data is fetched");
        res.status(200).json(data);

    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error '});
    }
})

module.exports = router;

