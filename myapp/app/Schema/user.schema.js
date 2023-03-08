var mongoose = require('mongoose');
var Schema = mongoose.Schema;

exports.userSchema = new Schema({
    name :{
        type: String,
        unique : false,
        required : true
    },
    password :{
        type: String,
        unique : false,
        required : true
    },
    createdBy : {
        type: String,
        unique : false,
        required : false
    },
    updatedBy : {
        type: String,
        unique : false,
        required : false
    },
}, {
    timestamps: true
});

