var mongoose = require("mongoose");
var schema = mongoose.Schema;

var basicSchema = new schema({
    img:
    {
        data: Buffer,
        contentType: String
    },
    p_id: {
        type: mongoose.Types.ObjectId,
        ref: "Patient"
    }
})
module.exports = mongoose.model('Basicinfo', basicSchema)