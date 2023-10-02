const moment = require("moment");
const bcrypt = require("bcrypt");
const ErrorLog = require("../models/errorLog");

const asyncJsonHandler = (handler) => (req, res, next) => {
  Promise.resolve(handler(req, res, next))
    .then((result) => res.json(result))
    .catch((err) => {
      console.log("ERROR", err);
      next(err);
    });
};

const makeResponse = async (status, message, data) => {
  if (status !== 200) {
    if (status === 500)
      await ErrorLog.create({ message, data, apiPath: apiPath });
    return { status, message };
  }

  return { status, message, result: data };
};

const checkPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

const genPasswordHash = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
const successResponse = (status, message, result, token) => {
  return { status, message, result, token };
};
const errorResponse = (sts = 501, msg = "SERVER ERROR") => {
  return { status: sts, message: msg };
};

module.exports = {
  asyncJsonHandler,
  makeResponse,
  checkPassword,
  genPasswordHash,
  successResponse,
  errorResponse
};
