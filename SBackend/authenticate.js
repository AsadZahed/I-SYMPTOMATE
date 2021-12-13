var passport = require('passport');
var ALocalStrategy = require('passport-local').Strategy;
var User = require('./model/user-template');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var GoogleStrategy = require('passport-google-oauth').OAuthStrategy;


var config = {
    secretKey: 'i-symptomate'
};

passport.use(new ALocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
exports.getToken = function (user) {
    return jwt.sign(user, config.secretKey, { expiresIn: 72000 });
};


var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;
passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({ _id: jwt_payload._id }, function (err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

passport.use(new GoogleStrategy({
    consumerKey: "117443239646-ni8sjfvdadef3m2h6iju1hkgoeu3vqbs.apps.googleusercontent.com",
    consumerSecret: "AQUFqdMR_1mZp2DICu2b2uOe",
  },
  function(token, tokenSecret, profile, done) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(err, user);
      });
  }
));
exports.verifyUser = passport.authenticate('jwt', { session: false });
