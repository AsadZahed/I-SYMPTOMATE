var mongoose = require('mongoose')
var schema = mongoose.Schema

var notSchema = new schema({
  name: {
    type: String
  },
  patient_id: {
    type: String
  }
})
module.exports = mongoose.model('Notifications', notSchema)
