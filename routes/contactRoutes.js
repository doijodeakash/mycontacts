const express = require("express");
const {
  getContact,
  createContact,
  deleteContact,
  getAllContact,
  updateContact,
} = require("../controllers/contactController");
const router = express.Router();

router.route("/").get(getAllContact).post(createContact);

router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;
