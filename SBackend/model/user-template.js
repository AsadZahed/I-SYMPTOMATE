var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var UserTemplate = new Schema({
    googleID:{
        type: String,
    },
    name: {
        type: String,
        default: 'true'
    },
    height: {
        type:Number,
        default:0
    },
    weight: {
        type:Number,
        default:0
    },
    age: {
        type: Number,
        default:0
    },
    gender: {
        type: String,
        default:""
    },
    isAdmin:{
        type:Boolean
    },
    pathprofilepic:{
        type:String
    },
});

UserTemplate.plugin(passportLocalMongoose);
module.exports = mongoose.model('UserTemplate', UserTemplate);