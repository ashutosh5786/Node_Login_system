const router = require('express').Router();
const User = require('../model/User')
const {registerValidatation} = require('../validation');


router.post('/register',async (req, res) => {

    // Lets Validete the data before we make the user available
 const {error} = registerValidatation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const user = new User ({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,

    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    }catch (err) {
        res.send('Error Is Coming');
        console.log(err);
    }
});

module.exports = router;