const express = require("express");
const router = express.Router();

const {
  allowAdmin,
  allowRoot,
  allowSelf,
  allowAdminOrSelf,
  auth,
} = require("../middleware/auth");

const {
  cteateYarnWeight,
  getYarnWeight,
  updateYarnWeight,
  updateYarnWeft,
  updateYarnWarp,
  calYW,
  deleteYC,
  genCalPdf
} = require("../controllers/yarnWeight");

//add yarn
router.post(
  "/add-yarn-weigth",
  auth,
  cteateYarnWeight.validator,
  cteateYarnWeight.controller
);
router.patch(
  "/update-yarn-weigth/:id",
  auth,
  // updateYarnWeight.validator,
  updateYarnWeight.controller
);

//update weft
router.patch("/update-yarn-weft/:id", auth, updateYarnWeft.controller);
//update warp
router.patch("/update-yarn-warp/:id", auth, updateYarnWarp.controller);

//get all yarn
router.get("/get-yarn-weigth", auth, getYarnWeight.controller);


// final calculation
router.get("/cal-YW/:id", auth, calYW.controller);
//delete YC
router.delete("/deleteYC/:id", auth, deleteYC.controller);

module.exports = router;
