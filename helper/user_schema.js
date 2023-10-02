const Joi = require("joi");
const weftSchema = Joi.object({
  panNo: Joi.number().required(),
  denier: Joi.number().required(),
  pik: Joi.number().required(),
  weste: Joi.number().required(),
});
const warpSchema = Joi.object({
  thread: Joi.number().required(),
  denier: Joi.number().required(),
  weste: Joi.number().required(),
});
const schemas = {
//yarn weight schema
 yarnWeight: Joi.object({
  weft: Joi.array().items(weftSchema).required(),
  warp: Joi.array().items(warpSchema).required(),
  buttaCutting: Joi.number(),
  mill: Joi.number(),
  transport: Joi.number(),
  brokrage: Joi.number(),
}),


  //login
  login: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),

  //signup
  signup: Joi.object().keys({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string().required(),

    phone: Joi.string()
      .regex(/^[0-9]{10}$/)
      .messages({ "string.pattern.base": "Invalid mobile no.. !!" })
      .required(),
    password: Joi.string().min(8).required(),
  }),
};

module.exports = schemas;
