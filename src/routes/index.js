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

const redirectURL = 'http://localhost:3000/handleauth';
router.get('/auth/instagram',(req,res) => {
  res.redirect(
    instagram.getAuthorizationUrl(redirectURL, {
      scope: ['basic', 'likes'],
      state: 'your state'
    })
  );
});

router.get('/handleauth', async (req,res) => {
  try {
    const code = req.query.code;
    const data = await instagram.authorizeUser(code, redirectURL);
    //console.log(data);
    req.session.access_token = data.access_token;
    req.session.user_id = data.user.id;

    instagram.config.accessToken = req.session.access_token;
   res.redirect('/profile');
    //console.log(instagram);
  } catch (error) {
    console.log(error);
  }
  
})
router.get('/login',(req,res) => {
  res.redirect('/auth/instagram');
});

router.get('/logout',(req,res) => {
  delete req.session.access_token;
  delete req.session.user_id;
  res.redirect('/');
});

router.get('/profile', async (req,res) => {
  try {
    const profileData = await instagram.get('users/self');
    const media = await instagram.get('users/self/media/recent');
    console.log(profileData);
    res.render('profile', {user: profileData.data, posts: media.data});
  } catch (error) {
    
  }
});

module.exports = router;