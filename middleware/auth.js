let MSG = require("../helper/constant");
const _ = require("lodash");
const User = require("../models/user");
const { successResponse } = require("../helper/general");
const API_KEY = "dpVY5TrOY234mErUvcN8Q7dmoDkS540g";
const jwt = require("jsonwebtoken");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const auth = async (req, res, next) => {
  try {
    // get token from header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.send(successResponse(StatusCodes.NOT_FOUND, MSG.TOKEN_EMPTY));
    }
    const token = authHeader.split(" ")[1];
    //verify token
    const verifyuser = jwt.verify(token, "hellojwt123");
    const user = await User.findOne({ _id: verifyuser._id });
    if (!user)
      return res.send(
        successResponse(StatusCodes.UNAUTHORIZED, MSG.TOKEN_INVALID)
      );

    req.token = token;
    req.user = user;

    next();
  } catch (err) {
    console.log(err);
    return res.send(
      successResponse(StatusCodes.UNAUTHORIZED, MSG.TOKEN_INVALID)
    );
  }
};

const authorizationCheck = (predicate) => (req, res, next) => {
  apiPath = req.method + req.url;

  let isValidKey = req.header("apikey") === API_KEY;

  if (!predicate(req) && !isValidKey) return res.sendStatus(403);
  next();
};

const isAdmin = (req) =>
  req.user && (req.user.role === "admin" || req.user.role === "root");
const allowAdmin = authorizationCheck(isAdmin);

const isRoot = (req) => req.user && req.user.role === "root";
const allowRoot = authorizationCheck(isRoot);

const isSelf = (req) =>
  req.params.id && req.params.id === req.user._id.toString();
const allowSelf = authorizationCheck(isSelf);

const allowAdminOrSelf = authorizationCheck(
  (req) => isAdmin(req) || isSelf(req)
);

module.exports = {
  allowAdmin,
  allowRoot,
  allowSelf,
  allowAdminOrSelf,
  auth,
};
