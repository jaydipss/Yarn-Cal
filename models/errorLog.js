const { model, Schema } = require("mongoose");

const ErrorLogSchema = new Schema({
  apiPath: { type: String },
  message: { type: String },
  data: { type: Object },
  createdAt: { type: Date, default: Date.now() },
});

const ErrorLog = model("ErrorLog", ErrorLogSchema);
module.exports = ErrorLog;
