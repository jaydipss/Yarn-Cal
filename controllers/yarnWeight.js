const YarnWeightService = require("../services/yarnWeight");
const service = new YarnWeightService();

const { celebrate, Joi } = require("celebrate");
const schemas = require("../helper/user_schema");

let MSG = require("../helper/constant");
let {
  successResponse,
  errorResponse,
  checkPassword,
  genPasswordHash,
} = require("../helper/general");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");

module.exports.cteateYarnWeight = {
  validator: celebrate({ body: schemas.yarnWeight }),
  controller: async function cteateYarnWeight(req, res) {
    try {
      let result = await service.cteateYarnWeight(req.body);
      return res.send(result);
    } catch (err) {
      console.log(err);
      res.send(errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message));
    }
  },
};
module.exports.updateYarnWeight = {
  controller: async function updateYarnWeight(req, res) {
    try {
      const updatedData = req.body;
      const id = req.params.id;
      let result = await service.updateYarnWeight(req.body,id);
      return res.send(result);
    } catch (err) {
      console.log(err);
      res.send(errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message));
    }
  },
};
module.exports.updateYarnWeft = {
  controller: async function updateYarnWeft(req, res) {
    try {
      const id = req.params.id;
      let result = await service.updateYarnWeft(req.body,id);
      return res.send(result);
    } catch (err) {
      console.log(err);
      res.send(errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message));
    }
  },
};
module.exports.updateYarnWarp = {
  controller: async function updateYarnWarp(req, res) {
    try {
      const id = req.params.id;
      let result = await service.updateYarnWarp(req.body,id);
      return res.send(result);
    } catch (err) {
      console.log(err);
      res.send(errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message));
    }
  },
};

module.exports.getYarnWeight = {
  controller: async function getYarnWeight(req, res) {
    try {
      let result = await service.getYarnWeight();
      return res.send(result);
    } catch (err) {
      console.log(err);
      res.send(errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message));
    }
  },
};


// cal yw
module.exports.calYW = {
  controller: async function calYW(req, res) {
    try {
      const id = req.params.id;
      let result = await service.calYW(id);
      return res.send(result);
    } catch (err) {
      console.log(err);
      res.send(errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message));
    }
  },
};
module.exports.deleteYC = {
  controller: async function deleteYC(req, res) {
    try {
      const id = req.params.id;
      let result = await service.deleteYC(id);
      return res.send(result);
    } catch (err) {
      console.log(err);
      res.send(errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message));
    }
  },
};