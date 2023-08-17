//import module
const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
//require('dotenv').config();
const pg = require("pg");
const bodyParser = require("body-parser");
const cors = require("cors");
//new login
const passportLocal = require("passport-local");
const passportJwt = require("passport-jwt");
const passport = require("passport");
const jwt = require('jsonwebtoken');


router.use(bodyParser.json());

//jwt
passport.use(
  "jwt",
  new passportJwt.Strategy(
    {
      jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "secret",
    },
    (jwt_payload, done) => {
      done(null, {
        id: jwt_payload.id,
      });
    }
  )
);

// login for the firt time
passport.use(
  "local",
  new passportLocal.Strategy(
      { usernameField: "email", passwordField: "password" }, //아이디와 비번 받고 체크해줘야 함.(일치하는게 있는지?)
      async (email, password, done) => {
      const client = await pool.connect();
      const check  = await client.query("select * from dingdong_test.users where email = $1 and password = $2", [email, password]);
      
      if (check.rows.length > 0) {
          return done(null, user); //done이 실행되면
      }
      return done(null, false, { reason: "Invalid email or password" }); //로그인 실패시 메세지
      }
  )
  );


//
router.use(passport.initialize());

//mypage
router.get('/mypage', passport.authenticate("jwt", { session: false }), async(req, res) => {
  const client = await pool.connect();
  const result = await client.query(
      //"select user_name, name from public.user where user_name = $1", [req.user.id]);
      "select  email, username, bookmarkedQuestions from dingdong_test.users where  email = $1, username = $2, bookmarkedQuestions = $3", [req.user.username, req.user.email, req.user.bookmarkedQuestions]);
  res.json(result.rows);
  client.release();
})


// SIGNUP
router.post('/signup', async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      email: req.body.email,
      password: hashedPassword,
      username: req.body.username,
      phoneNumber: req.body.phoneNumber,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// SIGNIN //Modify
router.post('/signin', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(400).json('Wrong credentials!e');

    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(400).json('Wrong credentials!p');

    const token = jwt.sign({userId: user.email },'secret');
    console.log(token);

    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    // res.status(500).json(err);
  }
});

// const verifyToken = (req,res,next) => {
//   const token = req.header('auth-token');
//   if(!token) {
//     return res.status(401).json('Access Denied');
//     }

//     try {
//       const verified = jwt.verify(token, 'secretkey');
//       req.user = verified;
//       next();
//     } catch (err) {
//       res.status(400).json('Invalid Token');
//     }
// };

// router.get('/protected', verifyToken, (req, res) => {
//   res.send('You have access to this protected route');
// });



module.exports = router;
