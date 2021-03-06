const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profimage: String
});

userSchema.virtual('photos', {
  ref: 'Photo',
  localField: '_id',
  foreignField: 'user'
});

//set up passwordConfirmation virtual, confirm password, don't save passwordConfirmation
userSchema.virtual('passwordConfirmation').set(function setPasswordConfirmation(passwordConfirmation){
  this._passwordConfirmation = passwordConfirmation;
});

userSchema.pre('validate', function checkPasswordsMatch(next){
  if(this.isModified('password') && this._passwordConfirmation !== this.password){
    this.invalidate('passwordConfirmation', 'Passwords do not match');
  }

  next();
});

userSchema.pre('save', function hashPassword(next){
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

// custom method to validate a password againt a user's hashed password
userSchema.methods.validatePassword = function validatePassord(password){
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
