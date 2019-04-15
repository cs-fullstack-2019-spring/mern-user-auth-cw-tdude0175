var express = require("express");
var router = express.Router();
var UserCollection = require("../models/UserSchema");
var bCrypt = require('bcrypt-nodejs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    userCollection.findById(id, function (err, user) {
        done(err, user);
    });
});

var isValidPassword = function (user, password) {
    return bCrypt.compareSync(password, user.passWord);
};

var createHash = function (password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

router.get('/', (req, res) => {
    console.log(req.session);
    console.log(req.session.userName);

    if (req.session.userName)
        res.send(req.session.userName);
    else
        res.send(null);
});

router.get('/logout',(req,res,next)=>
{
    console.log(req.session);

    if(req.session)
    {
        req.session=null;
        res.send("Logging Out");
    }
    else
        {
            res.send(" not logged in")
        }
});

passport.use(new LocalStrategy(
    function (username, password, done) {
        console.log("Inside Local Strategy");
        UserCollection.findOne({userName: username}, (err, user) => {
                if (err) {
                    console.log("Error Hit");
                    return done(err);
                }
                if (!user) {
                    console.log("Incorrect UserName");
                    return done(null, false, {message: "Incorrect Login Info"})
                }
                if (!isValidPassword(user, password)) {
                    console.log("Incorrect Password");
                    return done(null, false, {message: "Incorrect Login Info"})
                }
                console.log("passed");
                console.log(user);
                return done(null, user, {user: user.userName})
            }
        )
    }
));

router.post('/login',
    passport.authenticate("local",
        {failureRedirect: '/verify/failure'}),
    (req, res) => {
        req.session.userName = req.body.userName;
        res.send(req.body.userName)
    });

router.get("/failure", (req, res) => {
    console.log("failed");
    res.send(undefined);
});

passport.use("signup", new LocalStrategy(
    {passReqToCallBack: true},
    (req, username, password, done) => {
        console.log("Registering new User");
        findOrCreateUser = function () {
            UserCollection.findOne({'username': username}, (err, user) => {
                if (err) {
                    console.log("error in creating User");
                    return done(err);
                }
                if (user) {
                    console.log("User Already Exists");
                    return done(null, false, {message: "User Exists already"});
                } else {
                    console.log("Making New User");

                    var newUser = new UserCollection();

                    newUser.userName = username;
                    newUser.passWord = createHash(password);
                    newUser.email = req.body('email');

                    newUser.save((err) => {
                        if (err) {
                            console.log("Didn't Successfully make user:" + err);
                            throw err;
                        }
                        console.log("Welcome:" + username);
                        return done(null, newUser)
                    });


                }
            });
        };
        process.nextTick(findOrCreateUser);
    }));

router.post('/newuser',
    passport.authenticate('signup',
        {
            successRedirect: '/verify/success',
            failureRedirect: '/verify/failure'
        }
    ),
    function (req, res) {
        console.log("End of newuser route");
        res.send("Authenticated")
    });
router.get("/success",(req,res)=>
{
    console.log(req.body);
    res.send("successful")
});


module.exports = router;