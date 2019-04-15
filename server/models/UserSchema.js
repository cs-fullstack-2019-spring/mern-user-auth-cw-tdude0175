var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema
(
    {
        userName: {type:String, required:true, max: 100},
        passWord: {type:String, required:true, max:100},
        Email:{type:String}
    }
);


module.exports = mongoose.model("user2",UserSchema);