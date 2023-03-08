var mongoose = require('mongoose');
var { userSchema } = require('../Schema/user.schema');
userSchema.statics = {
    create: function (data, cb) {
        console.log(data)
        var user = new this(data);
        user.save(cb);
    },

    get: function (query, cb) {
        this.find(query, cb)
    },

    getByName: function (query, cb) {
        this.find(query, cb);
    },

    update: function (query, updateData, cb) {
        this.findOneAndUpdate(query, { $set: updateData }, { new: true }, cb);
    },

    delete: function (query, cb) {
        this.findOneAndDelete(query, cb);
    }
}
var collectionName = 'user'
module.exports = mongoose.model("User", userSchema, collectionName)