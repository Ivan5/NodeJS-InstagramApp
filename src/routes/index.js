const express = require('express');
const router = express.Router();
const Instagram = require('node-instagram').default;
const {clientId, clientSecret} = require('../keys').instagram;
const instagram = new Instagram({
  clientId: clientId,
  clientSecret: clientSecret
});

router.get('/',(req,res)=>{
  res.render('index');
});

router.get('/auth/instagram',(req,res) => {

});


router.get('/login',(req,res) => {

});

router.get('/logout',(req,res) => {

});

router.get('profile', (req,res) => {

});

module.exports = router;