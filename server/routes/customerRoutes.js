const express = require("express");
const router = express.Router();
const {
  getAllDetails,
  getDetailsById,
  createDetails,
  updateDetails,
  deleteDetails,
} = require("../controllers/crudControllers");
router.route("/all").get(getAllDetails);
router.route("/:id").get(getDetailsById);
router.route("/create").post(createDetails);
router.route("/update/:id").put(updateDetails);
router.route("/delete/:id").delete(deleteDetails);

module.exports = router;
