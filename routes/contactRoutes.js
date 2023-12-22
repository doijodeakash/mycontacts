const express = require("express");
const {
  getContact,
  createContact,
  deleteContact,
  getAllContact,
  updateContact,
} = require("../controllers/contactController");
const validateaToken = require("../middleware/vlidateTokenHandler");
const router = express.Router();
const fileUpload = require("../middleware/fileUpload");

router.use(validateaToken);
// router.use(fileUpload);
router.route("/").get(getAllContact).post(fileUpload, createContact);

router
  .route("/:id")
  .get(getContact)
  .put(fileUpload, updateContact)
  .delete(deleteContact);

module.exports = router;
