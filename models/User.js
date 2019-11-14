const mongoose = require('mongoose');
const Schema = require('../schema');
const UserModelSchema = new Schema({
  ouathid: Number,
  provider: String,
  name: String,
  email: String,
  role: String,
});

UserModelSchema.statics.findOrCreate = function(condition, value, cb){
  const self = this;
  self.findOne(condition, (err, result)=>{
    return result ? cb(err, result) : self.create(value, (err, result) => cb(err, result))
  });
}
const UserModel = mongoose.model('Users', UserModelSchema );

module.exports = UserModel;