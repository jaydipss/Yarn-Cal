
const mongoose = require("mongoose");

const YarnWeightSchema = new mongoose.Schema({
 weft:[{
    panNo:{type: Number,required: true},
    denier:{type: Number,required: true},
    pik:{type: Number,required: true},
    weste:{type: Number,required: true},
    totalWeft:{type: Number}

 }],
 warp:[{
    thread:{type: Number,required: true},
    denier:{type: Number,required: true},
    weste:{type: Number,required: true},
    totalWarp:{type: Number}

 }],
  buttaCutting: { type: Number },
  mill: { type: Number },
  transport: { type: Number },
  brokrage: { type: Number },
  totalYarnWait:{type: Number},
  totalWarpSum:{type: Number},
  totalWeftSum:{type: Number},

  createdAt: { type: Date, default: Date.now(), required: true },
});

const YarnWeight = new mongoose.model("YarnWeight", YarnWeightSchema);

module.exports = YarnWeight;
