const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profpic: {
    type: String,
    required: true,
    default:
      "https://image.shutterstock.com/image-vector/man-icon-vector-260nw-1040084344.jpg"
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
}, {timestamps: true});

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;