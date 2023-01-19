const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');
const { forwardAuthenticated } = require('../config/auth');

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => {
  res.cookie("authtoken", true);
  res.json({ 'message': 'success' })
});

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.json({ 'message': 'success' }));


// Register
router.post('/register', (req, res) => {

  console.log(req.body);

  const { name, email, password, password2 } = req.body;
  let errors = [];

  console.log(name, email, password, password2);

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.json({ 'message': 'success' })
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.json({ 'message': 'success' })
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            
            newUser
              .save()
              .then(user => {
                global.user_id=user.id;
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post('/login', (req, res, next) => {
  console.log(req.body)
  User.findOne({ name: req.body.user }).then(user => {
    if (user) {
      // errors.push({ msg: 'Email already exists' });
      // res.json({ 'message': 'success' })
      
      global.user_id=user.id;
      res.cookie('authtoken',true)
      res.redirect('/users/login')
    } else {
      req.flash(
        'success_msg',
        'User not found'
      );
      res.json({'message':"User not found"})
      // res.redirect('/users/login')
    }
  })
  // passport.authenticate('local', {
  //   successRedirect: '/users/login',
  //   failureRedirect: '/users/login',
  //   failureFlash: true
  // })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  res.cookie("authtoken", false);

  req.logout();
  // req.flash('success_msg', 'You are logged out');
  res.redirect('/');
});

module.exports = router;


// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const passport = require('passport');
// // Load User model
// const User = require('../models/User');
// const { forwardAuthenticated } = require('../config/auth');
// // global.user_id = require('user_id')
// // var user_id;
// // Login Page
// router.get('/login', forwardAuthenticated, (req, res) => {
//   res.cookie("authtoken", true)
//   res.json({ 'message': 'success' })
// });

// // Register Page
// router.get('/register', forwardAuthenticated, (req, res) => res.json({ 'message': 'success' }));


// // Register
// router.post('/register', (req, res) => {

//   console.log(req.body);

//   const { name, email, password, password2 } = req.body;
//   let errors = [];

//   console.log(name, email, password, password2);

//   if (!name || !email || !password || !password2) {
//     errors.push({ msg: 'Please enter all fields' });
//   }

//   if (password != password2) {
//     errors.push({ msg: 'Passwords do not match' });
//   }

//   if (password.length < 6) {
//     errors.push({ msg: 'Password must be at least 6 characters' });
//   }

//   if (errors.length > 0) {
//     res.json({ 'message': 'success' })
//   } else {
//     User.findOne({ email: email }).then(user => {
//       if (user) {
//         errors.push({ msg: 'Email already exists' });
//         res.json({ 'message': 'success' })
//       } else {
//         const newUser = new User({
//           name,
//           email,
//           password
//         });

//         bcrypt.genSalt(10, (err, salt) => {
//           bcrypt.hash(newUser.password, salt, (err, hash) => {
//             if (err) throw err;
//             newUser.password = hash;
//             newUser
//               .save()
//               .then(user => {
//                 global.user_id=user.id
//                 console.log("userid",user.id)
//                 req.flash(
//                   'success_msg',
//                   'You are now registered and can log in'
//                 );
//                 // res.cookie("authtoken", true);
//                 res.redirect('/users/login');
//               })
//               .catch(err => console.log(err));
//           });
//         });
//       }
//     });
//   }
// });

// // Login
// router.post('/login', (req, res, next) => {
  
//   // User.findOne({ name: req.body.name }).then(user => {
//   //   console.log(user)
//   //   if (user) {
//   //     global.user_id = user.id
//   //     console.log("userid",user.id)
//   //     console.log("globaluserid",global.user_id)
//       // bcrypt.compare(req.body.password, user.password, function(err, res) {
//       //   if (err){
//       //     // handle error
//       //     // res.json({ 'message': 'error', 'error' : err })
//       //   }
//       //   if (res){
//       //     // Send JWT
          
//       //     //  res.json({ 'message': res })
//       //   } else {
//       //     // response is OutgoingMessage object that server response http request
//       //     //  res.json({success: false, message: 'passwords do not match'});
//       //   }
//       // })
//     //   res.cookie("authtoken", true);
//     //   // res.redirect('/users/login');
//     // } 
//     // })
//     // res.redirect('/users/login');
//     passport.authenticate('local', {
//     successRedirect: '/users/login',
//     failureRedirect: '/users/login',
//     failureFlash: true
//   })(req, res, next);
// });

// // Logout
// router.get('/logout', (req, res) => {
//   res.cookie("authtoken", false);

//   req.logout();
//   // req.flash('success_msg', 'You are logged out');
//   res.redirect('/');
// });

// module.exports = router;
