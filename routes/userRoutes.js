const express = require("express");
const {
  currentInfo,
  lgoinUser,
  registerUser,
} = require("../controllers/userController");
const validateaToken = require("../middleware/vlidateTokenHandler");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", lgoinUser);
router.get("/current", validateaToken, currentInfo);

module.exports = router;
