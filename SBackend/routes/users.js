var express = require('express');
var router = express.Router();
var UserTemplate = require('../model/user-template');
var passport = require('passport');
var Report = require("../model/report")
var authenticate = require('../authenticate');
const nodemailer = require("nodemailer");
var Notifications = require('../model/notifications')
var multer = require('multer');
// const mongoose = require("mongoose")
// const passportlocalmangoose = require('passport-local-mongoose')
router.use(express.json());
// const GoogleStrategy = require('passport-google-oauth2').Strategy;
//const findOrCreate = require("mongoose-findorcreate")
// const userSchema = new mongoose.Schema({
//   email: String,
//   password: String,
//   googleId:String,
//   secret:String
// });
// userSchema.plugin(passportlocalmangoose);
// userSchema.plugin(findOrCreate);
// const User = new mongoose.model("User", userSchema);

// passport.use(User.createStrategy());

// const {OAuth2Client}=require("google-auth-library")
// const Client=new OAuth2Client("117443239646-ni8sjfvdadef3m2h6iju1hkgoeu3vqbs.apps.googleusercontent.com");

// router.post("/api/v1/auth/google",async (req,res)=>{
//   const {token}=req.body;
//   const ticket = await Client.verifyIdToken({
//     idToken:token,
//     audience: "117443239646-ni8sjfvdadef3m2h6iju1hkgoeu3vqbs.apps.googleusercontent.com"
//   })
//   const {name,email,picture}=ticket.getPayload();
//   const user=await db.user.upsert({
//     where:{email: email}
//   })
// })


// const userSchema = new mongoose.Schema({
//   email: String,
//   password: String,
//   googleId:String,
//   secret:String
// });
// userSchema.plugin(passportlocalmangoose);
// userSchema.plugin(findOrCreate);
// const User = new mongoose.model("User", userSchema);
// userSchema.plugin(findOrCreate)

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "aazfrb711@gmail.com",
    pass: "faheem1999"
  }
});

router.post('/forgotpassword', (req, res, next) => {
  const email = req.body.email;
  console.log(req.body.email)
  UserTemplate.findOne({ username: email }, (err, user) => {

    if (err) {
      console.log(err)
      res.json({
        err: err.name,
        success: false
      })
    } else if (user) {
      const newPass = parseInt(Math.random() * 100000000);
      console.log(String(newPass))
      user.setPassword(String(newPass), (err, user) => {
        if (err) {
          console.log(err)
          res.json({
            err: err.name,
            success: false
          })
        } else {
          console.log('test-err')
          user.save((err) => {
            if (err) {
              console.log(err)
              res.json({
                err: err.name,
                success: false
              })
            } else {
              console.log('test-after-local')
              var mailOptions = {
                from: "aazfrb711@gmail.com",
                to: email,
                subject: 'New Password Updated',
                text: 'Your new password is: ' + String(newPass)
              };
              transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                  console.log(err)
                  res.json({ err: err.name, success: false })
                } else {
                  res.json({ data: 'Email sent: ' + info.response, success: true });
                }
              });

            }
          })
        }
      })
    } else {
      res.json({
        err: 'No User Found',
        success: false,
      })
    }
  })
})

const storage_pp = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: (req, file, cb) => {
    cb(null, 'images/' + req.user._id + "." + file.mimetype.split('/')[1])
  }
})

const upload_pp = multer({ storage: storage_pp }).single('file')

router.post("/uploadprofilepicture", authenticate.verifyUser, (req, res) => {
  upload_pp(req, res, (err) => {
    if (err) {
      res.sendStatus(500);
    }
    console.log(req.file.path)
  
    UserTemplate.findOne({ _id: req.user._id }, (err, user) => {
      console.log("user id is", req.user._id)
      if (err)
        res.json({
          success: false,
          message: err
        })
      else if (user) {
        user.pathprofilepic = req.file.filename
        user.save((err) => {
          if (err) {
            res.json({
              success: false,
              message: err.name
            })
          }
          else {
            res.json({
              success: true,
              message: 'Added link'
            })
          }
        })
      } else {
        res.json({
          success: false,
          message: 'User not found'
        }); // Return error, user was not found in db
      }
    })
  });

})
// Delete picture user
router.post("/deleteprofilepicture", authenticate.verifyUser, (req, res) => {
  
  //file removed  
    UserTemplate.findOne({ _id: req.user._id }, (err, user) => {
      console.log("user id is", req.user._id)
      if (err)
        res.json({
          success: false,
          message: err
        })
      else if (user) {
        // user.pathprofilepic = req.file.filename
        const path = user.pathprofilepic
        user.pathprofilepic = null
        // fs.unlink(path, (err) => {
        //   if (err) {
        //     console.error(err)
        //     return
        //   }
        
        // })

        user.save((err) => {
          if (err) {
            res.json({
              success: false,
              message: err.name
            })
          }
          else {
            res.json({
              success: true,
              message: 'Added link'
            })
          }
        })
      } else {
        res.json({
          success: false,
          message: 'User not found'
        }); // Return error, user was not found in db
      }
    })
  });

//PATIENT SIGNUP
router.get('/', authenticate.verifyUser, function (req, res, next) {
  UserTemplate.find({})
    .then((user) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(user);
    }, (err) => next(err))
    .catch((err) => next(err));
});
router.post('/signup', (req, res, next) => {
  UserTemplate.register(new UserTemplate({ username: req.body.username }),
    req.body.password, (err, user) => {
      if (err) {
        console.log('First: ' + err.name)
        res.json({ err: err });
      } else {
        if (req.body.name)
          user.name = req.body.name;
        user.isAdmin = req.body.isAdmin
        user.save((err) => {
          if (err) {
            console.log('Second: ' + err.name)
            res.json({ err: err });
          }
          else
            passport.authenticate('local')(req, res, () => {
              res.json({ success: true, status: 'Registration Successful!', user: user });
            });
        });
      }
    })
});
//ADMIN SIGNUP
router.post('/admin/signup', (req, res, next) => {
  UserTemplate.findOrCreate(new User({ username: req.body.username }),
    req.body.password, (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({ err: err });
      } else {
        if (req.body.name)
          user.name = req.body.name;
        user.isAdmin = req.body.isAdmin
        console.log(user.name)
        console.log(user.isAdmin)
        user.save((err) => {
          if (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({ err: err });
            return;
          }
          passport.authenticate('local')(req, res, () => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: true, status: 'Registration Successful!' });
          });
        });
      }
    });
});


//PATIENT LOGIN
router.post('/login', passport.authenticate('local'), (req, res, err) => {
  console.log("Login")
  var token = authenticate.getToken({ _id: req.user._id });
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({ success: true, token: token, message: 'You are successfully logged in!', status: 'You are successfully logged in!', user: req.user });

});


router.post('/google/login', passport.authenticate('google'), (req, res, err) => {
  console.log("Login")
  var token = authenticate.getToken({ _id: req.user._id });
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({ success: true, token: token, message: 'You are successfully logged in!', status: 'You are successfully logged in!', user: req.user });

});

//VIEW USERS BY ADMIN
router.get('/admin/viewusers', function (req, res, next) {
  UserTemplate.find({}).exec(function (error, results) {
    if (error) {
      return next(error);
    }
    // Respond with valid data
    var notAdmin=[];
    for(var i=0;i<results.length;i++){
      if(!results[i].isAdmin){
       notAdmin.push(results[i]);
      }
    }
    res.json(notAdmin)
    
  });
});

//get notifications

router.get('/notifications', authenticate.verifyUser, (req, res, next) => {
  Notifications.Report.find({ patient_id: req.user._id }, (err, reps) => {
    if (err) res.json({ success: false, message: err.name })
    else if (reps.length > 0) res.json({ success: true, reports: reps })
    else res.json({ success: false, message: 'No nitifications' })
  })
});

//VIEW ALL REPORTS
router.get('/admin/viewallreports', function (req, res, next) {
  Report.find({}).exec(function (error, results) {
    if (error) {
      return next(error);
    }
    // Respond with valid data
    res.json(results);
  });
});

//VIEW SPECIFIC REPORTS
router.get('/reports/view', authenticate.verifyUser, (req, res) => {
  Report.find({ p_id: req.user._id }, (err, reps) => {
    if (err) res.json({ success: false, message: err.name })
    else if (reps.length > 0) res.json({ success: true, reports: reps })
    else res.json({ success: false, message: 'No Reports' })
  })
})
//VIEW PROFILE
router.get('/profile/viewprofile', function (req, res, next) {
  UserTemplate.find({}).exec(function (error, results) {
    if (error) {
      return next(error);
    }
    // Respond with valid data
    res.json(results);
  });
});


//EDIT AGE
router.post('/editprofile/changeDOB', authenticate.verifyUser, (req, res) => {
  console.log(req.user._id)
  console.log(req.body)
  UserTemplate.findOne({ p_id: req.user._id }, (err, user) => {
    console.log("user id is", req.user._id)
    if (err)
      res.json({
        success: false,
        message: err
      })
    else if (user) {
      user.age = req.body.dob
      user.save((err) => {
        if (err) {
          res.json({
            success: false,
            message: err.name
          })
        }
        else {
          res.json({
            success: true,
            message: 'Age Updated Successffully'
          })
        }
      })
    } else {
      res.json({
        success: false,
        message: 'User not found'
      }); // Return error, user was not found in db
    }
  })
})

//EDIT USERNAME
router.post('/editprofile/changeusername', authenticate.verifyUser, (req, res) => {
  console.log(req.user._id)
  console.log(req.body)
  UserTemplate.findById(req.user._id, (err, user) => {
    console.log(req.user._id)
    if (err)
      res.json({
        success: false,
        message: err
      })
    else if (user) {
      user.name = req.body.name;
      user.save((err) => {
        if (err) {
          res.json({
            success: false,
            message: err.name
          })
        }
        else {
          res.json({
            success: true,
            message: 'Name Updated Successffully'
          })
        }
      })
    } else {
      res.json({
        success: false,
        message: 'User not found'
      }); // Return error, user was not found in db
    }
  })
})



// CHANGE PASSWORD
router.post('/editprofile/changepassword', authenticate.verifyUser, (req, res) => {
  console.log(req.user)
  console.log(req.body)
  UserTemplate.findById(req.user._id, (err, user) => {
    if (err)
      res.json({
        success: false,
        message: err
      })
    else if (user) {
      user.changePassword(req.body.oldpassword, req.body.newpassword, (err) => {
        if (err) {
          if (err.name === 'IncorrectPasswordError') {
            res.json({
              success: false,
              message: 'Incorrect password'
            }); // Return error
          } else {
            res.json({
              success: false,
              message: 'Something went wrong!! Please try again after sometimes.'
            });
          }
        } else {
          res.json({
            success: true,
            message: 'Your password has been changed successfully'
          });
        }

      })
    } else {
      res.json({
        success: false,
        message: 'User not found'
      }); // Return error, user was not found in db
    }
  })
})

//DELETE USER
router.delete('/editprofile/deleteusers', authenticate.verifyUser, (req, res) => {
  console.log(req.user._id)
  console.log(req.body)
  UserTemplate.findOne({ _id: req.user._id }, (err, user) => {
    console.log(req.user._id)
    if (err)
      res.json({
        success: false,
        message: err
      })
    else if (user) {
      user.deleteOne((err) => {
        if (err) {
          res.json({
            success: false,
            message: err.name
          })
        }
        else {
          res.json({
            success: true,
            message: 'Deleted Successffully'
          })
        }
      })
    } else {
      res.json({
        success: false,
        message: 'User not found'
      }); // Return error, user was not found in db
    }
  })
})

//DELETE REPORTS
router.delete('/reports/view/delete', authenticate.verifyUser, (req, res) => {
  console.log("user is ", req.user._id)
  console.log("pid is ", req.body.p_id)

  console.log("req.body", req.body)
  Report.findOne({ p_id: req.user._id }, (err, user) => {
    console.log(req.user.p_id)
    if (err)
      res.json({
        success: false,
        message: err
      })
    else if (user) {
      user.deleteOne((err) => {
        if (err) {
          res.json({
            success: false,
            message: err.name
          })
        }
        else {
          res.json({
            success: true,
            message: 'Deleted Successffully'
          })
        }
      })
    } else {
      res.json({
        success: false,
        message: 'User not found'
      }); // Return error, user was not found in db
    }
  })
})

//ED

// router.delete('/admin/deleteusers/:pid', function(req, res, next) {
//   Patient.deleteOne({ _id: req.params.id }, function(error, results) {
//       if (error) {
//           return next(error);
//       }
//       // Respond with valid data
//       res.json(results);
//   });
// });




// C-D 117443239646-ni8sjfvdadef3m2h6iju1hkgoeu3vqbs.apps.googleusercontent.com
//CSID AQUFqdMR_1mZp2DICu2b2uOe
// passport.use(new GoogleStrategy({
//   clientID: "117443239646-ni8sjfvdadef3m2h6iju1hkgoeu3vqbs.apps.googleusercontent.com",
//   clientSecret: "AQUFqdMR_1mZp2DICu2b2uOe",
//   callbackURL: "http://localhost:3000/auth/google/",
//   userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
// },
// function(accessToken, refreshToken, profile, cb) {
//     console.log(profile);
//   User.findOrCreate({ googleId: profile.id }, function (err, user) {
//     return cb(err, user);
//   });
// }
// ));

// router.get('/auth/google',
//   passport.authenticate('google', { scope: ["profile"] }));

// router.get("/auth/google/", 
// passport.authenticate("google", { failureRedirect: "/login" }),
// function(req, res) {
//   // Successful authentication, redirect home.
//   res.redirect('/');
// });

router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/login');
  } else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});
module.exports = router;
