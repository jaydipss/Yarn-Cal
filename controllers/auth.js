const AuthService = require("../services/auth");
const service = new AuthService();
const { makeResponse,errorResponse } = require("../helper/general");
const { StatusCodes } = require("http-status-codes");
let MSG = require("../helper/constant");
const { celebrate, Joi } = require("celebrate");
const schemas = require("../helper/user_schema");

module.exports.login = {
  validator: celebrate({ body: schemas.login }),
  controller: async function login(req, res) {
    try {
      let result = await service.login(req.body);

      return res.send(result);
    } catch (err) {
      console.log(err);
      res.send(makeResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message));
    }
  },
};

module.exports.loginUser = {
  controller: async function loginUser(req, res) {
    try {
      let result = await service.loginUser(req.user);
      return res.send(result);
    } catch (err) {
      console.log(err);
      res.send(makeResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message));
    }
  },
};

module.exports.register = {
  validator: celebrate({ body: schemas.signup }),
  controller: async function register(req, res) {
    try {
      let result = await service.register(req.body);
      return res.send(result);
    } catch (err) {
      console.log(err);
      res.send(errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message));
    }
  },
};

module.exports.logout = {
  controller: async function logout(req, res, next) {
    try {
      req.logout(function (err) {
        if (err) {
          return next(err);
        }
        return res.json({});
      });
    } catch (err) {
      console.log(err);
      res.send(makeResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message));
    }
  },
};
