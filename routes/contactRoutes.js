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

router.use(validateaToken);
router.route("/").get(getAllContact).post(createContact);

router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;
