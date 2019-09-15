const express = require('express');

const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');
const db = "mongodb+srv://bsaal2:20172018@cluster0-hgyeh.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(db, err => {
    if(err){
        console.log("Error :" + err);
    }
    else{
        console.log("Connected to mongodb");
    }
});

function verifyToken(req, res, next){
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized request');
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null') {
        return res.status(401).send('Unauthorized request')    
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload) {
        return res.status(401).send('Unauthorized request')    
    }
    console.log(payload);
    req.userId = payload.subject
    next()


}

router.get('/get', (req, res) => {
    res.send("Get request");
});

router.post('/register', (req, res) => {
    let userData = req.body;
    console.log(userData);
    let user = new User(userData);
    user.save((err, registeredUser) => {
        if(err){
            console.log("User registration failed" + err);
        }
        else{
            let payload = {subject : registeredUser._id};
            let token = jwt.sign(payload, 'secretkey');
            res.status(200).send({ token });
        }
    });
});

router.post('/login', (req, res) => {
    let userData = req.body;
    console.log(req.body);
    User.findOne({email : userData.email}, (err, user) => {
        if(err){
            console.log("err" + err);
        }
        else{
            console.log(user);
            if(!user){
                res.status(401).send("Invalid email");
            }
            else{
                if(user.password != userData.password){
                    res.status(401).send("Invalid password");
                }
                else{
                    let payload = {subject : user._id};
                    let token = jwt.sign(payload, 'secretkey');
                    res.status(200).send({ token });
                }
            }
        }
    });

});

router.get("/events", (req, res) => {
    let events = [
        {"_id" : 1, "name" : "Auto Expo", "description" : "lorem ipsum"},
        {"_id" : 2, "name" : "Auto Expo", "description" : "lorem ipsum"},
        {"_id" : 3, "name" : "Auto Expo", "description" : "lorem ipsum"},
        {"_id" : 4, "name" : "Auto Expo", "description" : "lorem ipsum"},
        {"_id" : 5, "name" : "Auto Expo", "description" : "lorem ipsum"},
    ];

    res.json(events);
});

router.get("/special", verifyToken, (req, res) => {
    let events = [
        {"_id" : 1, "name" : "Auto Expo", "description" : "lorem ipsum"},
        {"_id" : 2, "name" : "Auto Expo", "description" : "lorem ipsum"},
        {"_id" : 3, "name" : "Auto Expo", "description" : "lorem ipsum"},
        {"_id" : 4, "name" : "Auto Expo", "description" : "lorem ipsum"},
        {"_id" : 5, "name" : "Auto Expo", "description" : "lorem ipsum"},
    ];

    res.json(events);
});

module.exports = router;