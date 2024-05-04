const mongoose = require('mongoose');
const crypto = require('crypto'); 

const userSchema = new mongoose.Schema({
 username: {
 type: String,
 required: true,
 unique: true,
 },
 email: {
 type: String,
 required: true,
 unique: true,
 },
 password: {
 type: String,
 required: true,
 },
 createdAt: {
 type: Date,
 default: Date.now,
 },
 passwordResetToken: String,
 passwordResetExpires: Date

});

userSchema.methods.createResetPasswordToken =  function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken =  crypto.createHash('sha256').update(resetToken).digest('hex');
   this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000); 
  console.log(resetToken, this.passwordResetToken);
  return resetToken;
}

const User = mongoose.model('User', userSchema);
module.exports = User;