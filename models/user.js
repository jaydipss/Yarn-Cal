const _ = require("lodash");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { model, plugin, Schema, startSession } = require("mongoose");

const { genPasswordHash, checkPassword } = require("../helper/general");
const { UserRole } = require("../helper/data");

const UserSchema = new Schema({
  role: {
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.USER,
    required: true,
  },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },

  phone: { type: String },
  password: { type: String },
  createdAt: { type: Date, default: Date.now(), required: true },
});

//Generate Token
UserSchema.methods.generateAuthToken = async function () {
  try {
    const token = await jwt.sign({ _id: this._id }, "hellojwt123");
    return token;
  } catch (err) {
    console.log(`the error part: ${err}`);
    res.send(`the error part: ${err}`);
  }
};

// bcrypt password
UserSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);

      console.log("Password encrypted successfully........");
    }
    next();
  } catch (e) {
    console.log(e);
  }
});

const User = model("User", UserSchema);

module.exports = User;
