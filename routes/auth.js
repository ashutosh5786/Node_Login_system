const router = require('express').Router();
const User = require('../model/User')
const {registerValidatation, loginValidatation} = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register',async (req, res) => {

    // Lets Validete the data before we make the user available
 const {error} = registerValidatation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    // Checking if the user is already registered
    const emailExists = await User.findOne({email: req.body.email});
    if(emailExists) return res.status(400).send("Email Already Exists");

    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);


    // Created A New User
    const user = new User ({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,

    });
    try {
        const savedUser = await user.save();
        res.send({user: user._id});
    }catch (err) {
        res.send('Error Is Coming');
        console.log(err);
    }
});

//Login
router.post('/login', async (req, res) => {

    // Lets Validete the data before we make the user available
    const {error} = loginValidatation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
      // Checking if the email exists
      const user = await User.findOne({email: req.body.email});
      if(!user) return res.status(400).send("You Don't Have the Account With Us");
    //Password is Correct 
     const validPass = await bcrypt.compare(req.body.password,user.password);
     if(!validPass) return res.status(400).send("Invalid Password");


    //Creating and assiging the token
    const token = jwt.sign({_id:user._id}, process.env.TOKEN);
    res.header('auth-token', token).send(token);


     // Logging the user
     //res.send("Logged In");
});



module.exports = router;