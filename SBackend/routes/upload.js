var express = require('express');
var multer = require('multer');
var router = express.Router();
router.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: (req, file, cb) => {
    cb(null, 'images/' + file.originalname)
  }
})

const upload = multer({ storage: storage }).single('file')

router.post('/uploadProfilePicture', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.sendStatus(500);
    }
    res.send(req.file);
  });
});
router.post("/deleteprofilepicture",  (req, res) => {
  
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
        user.pathprofilepic = ""
        fs.unlink(path, (err) => {
          if (err) {
            console.error(err)
            return
          }
        
        })

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


module.exports = router;
