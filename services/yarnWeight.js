const yarnWeightCollection = require("../models/yarnWeight"); //Database Model
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
let MSG = require("../helper/constant");
let mongoose = require("mongoose");
let { successResponse, errorResponse } = require("../helper/general");
const { query } = require("express");
const PDFDocument = require('pdfkit');
const fs = require('fs');
const multer = require('multer');
// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });


class serviceService {
  async cteateYarnWeight(body, userId) {
    try {
      let yarnWeights = await yarnWeightCollection.create(body);
      return successResponse(StatusCodes.OK, MSG.CREATE_SUCCESS, yarnWeights);
    } catch (err) {
      console.log(err);
      return errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message);
    }
  }
  // get all yarn
  async getYarnWeight() {
    try {
      let yarnWeights = await yarnWeightCollection.find().sort({createdAt: -1});
      return successResponse(StatusCodes.OK, MSG.FOUND_SUCCESS, yarnWeights);
    } catch (err) {
      console.log(err);
      return errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  // update
  async updateYarnWeight(body, id) {
    try {
      const result = await yarnWeightCollection.findByIdAndUpdate(id, body, {
        new: true,
        undefined: true,
      });

      if (!result) {
        return res.status(404).json({ message: "Document not found" });
      }
      return successResponse(StatusCodes.OK, MSG.CREATE_SUCCESS, result);
    } catch (err) {
      console.log(err);
      return errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  //update weft
  async updateYarnWeft(body, id) {
    try {
      // Find the document by its ID
      const result1 = await yarnWeightCollection.findById(id);
      // console.log(document);
      if (!result1) {
        return errorResponse(StatusCodes.NOT_FOUND, err.message);
      }
      console.log(result1);
      for (let i = 0; i < body.weft.length; i++) {
        const element = body.weft[i];
        if (!element._id) result1.weft.unshift(element);

        for (let j = 0; j < result1.weft.length; j++) {
          const element1 = result1.weft[j];
          if (element._id === String(element1._id)) {
            if (element.panNo) result1.weft[j].panNo = element.panNo;
            if (element.denier) result1.weft[j].denier = element.denier;
            if (element.pik) result1.weft[j].pik = element.pik;
            if (element.weste) result1.weft[j].weste = element.weste;
          }
        }
      }
      await result1.save();

      return successResponse(StatusCodes.OK, MSG.UPDATE_SUCCESS, result1);
    } catch (err) {
      console.log(err);
      return errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  //update warp
  async updateYarnWarp(body, id) {
    try {
      // Find the document by its ID
      const result1 = await yarnWeightCollection.findById(id);
      // console.log(document);
      if (!result1) {
        return errorResponse(StatusCodes.NOT_FOUND, err.message);
      }
      for (let i = 0; i < body.warp.length; i++) {
        const element = body.warp[i];
        if (!element._id) result1.warp.unshift(element);

        for (let j = 0; j < result1.warp.length; j++) {
          const element1 = result1.warp[j];
          if (element._id === String(element1._id)) {
            if (element.thread) result1.warp[j].thread = element.thread;
            if (element.denier) result1.warp[j].denier = element.denier;
            if (element.weste) result1.warp[j].weste = element.weste;
          }
        }
      }
      await result1.save();

      return successResponse(StatusCodes.OK, MSG.UPDATE_SUCCESS, result1);
    } catch (err) {
      console.log(err);
      return errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message);
    }
  }

  // cal final  all
  async calYW(id) {
    try {
      let yarnWeightsCal = await yarnWeightCollection.findOne({ _id: id });
      // weft
      let weft = yarnWeightsCal.weft;
      for (let i = 0; i < weft.length; i++) {
        const weftObj = weft[i];
        let waste = weftObj.weste + 100;
        let WeftCal =
          (weftObj.panNo * weftObj.denier * weftObj.pik * waste) / 900000000;
        weftObj.totalWeft = WeftCal;
      }
      await yarnWeightsCal.save();

      //warp
      let warp = yarnWeightsCal.warp;
      for (let i = 0; i < warp.length; i++) {
        const warpObj = warp[i];
        let waste = warpObj.weste + 100;
        let WarpCal = (warpObj.thread * warpObj.denier * waste) / 900000000;
        warpObj.totalWarp = WarpCal;
      }

      // Calculate the sum of totalWeft values
      const totalWeftSum = weft.reduce((acc, weft) => acc + weft.totalWeft, 0);
      yarnWeightsCal.totalWeftSum = totalWeftSum
      // Calculate the sum of totalWarp values
      const totalWarpSum = warp.reduce((acc, warp) => acc + warp.totalWarp, 0);
      yarnWeightsCal.totalWarpSum = totalWarpSum

      // Calculate the sum of other numeric fields
      const otherSum =
        yarnWeightsCal.buttaCutting +
        yarnWeightsCal.mill +
        yarnWeightsCal.transport +
        yarnWeightsCal.brokrage;

      // Calculate the total sum
      const totalSum = totalWeftSum + totalWarpSum + otherSum;
      yarnWeightsCal.totalYarnWait = totalSum 
      await yarnWeightsCal.save();

      return successResponse(StatusCodes.OK, MSG.FOUND_SUCCESS, yarnWeightsCal);
    } catch (err) {
      console.log(err);
      return errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message);
    }
  }
  async deleteYC(id) {
    try {
      let result = await yarnWeightCollection.findOneAndRemove({ _id: id });
      console.log(result);
      if(!result){
        return errorResponse(StatusCodes.INTERNAL_SERVER_ERROR,"This record dosen`t exists");
      }

      return successResponse(StatusCodes.OK, MSG.DELETE_SUCCESS);
    } catch (err) {
      console.log(err);
      return errorResponse(StatusCodes.INTERNAL_SERVER_ERROR, err.message);
    }
  }
   // export calcution pdf
   
  
}

module.exports = serviceService;
