const User = require("../models/user"); //Database Model
let MSG = require("../helper/constant");
const { StatusCodes } = require("http-status-codes");

const {
  makeResponse,
  checkPassword,
  successResponse,
} = require("../helper/general");

class AuthService {
  constructor() {
    //Create  instance  of Data Access Layer using our desired  model
  }

  async login(body) {
    try {
      let { email, password } = body;

      // check email exist or not
      let userData = await User.findOne({ email });
      if (!userData)
        return successResponse(StatusCodes.UNAUTHORIZED, MSG.EMAIL_NOT_EXIST);

      // check password
      let isMatch = await checkPassword(password, userData.password);
      if (!isMatch)
        return successResponse(StatusCodes.UNAUTHORIZED, MSG.PASSWORD_INVALID);

      const token = await userData.generateAuthToken();
      userData.password = undefined;

      userData = JSON.parse(JSON.stringify(userData));
      userData.token = token;

      return successResponse(StatusCodes.OK, MSG.LOGIN_SUCCESS, userData);
    } catch (err) {
      console.log(err);
      return makeResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async loginUser(user) {
    try {
      let result = await User.findOne({ _id: user }).select("-password");

      return makeResponse(StatusCodes.OK, MSG.FOUND_SUCCESS, result);
    } catch (err) {
      console.log(err);
      return makeResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async register(body) {
    try {
      const { firstName, lastName,email, phone, password } = body;

      let user = await User.findOne({ email });

      if (user) {
        return makeResponse(StatusCodes.BAD_REQUEST, MSG.EMAIL_ALREADY);
      }
      let result = await User.create(body);
      result.password = undefined;
      let token = await result.generateAuthToken();
      result = JSON.parse(JSON.stringify(result));
      result.token = token;
      return makeResponse(StatusCodes.OK, MSG.SIGNUP_SUCCESS, result);
    } catch (err) {
      console.log("Error part:: ", err);
      return makeResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message, {
        body,
      });
    }
  }
}

module.exports = AuthService;
