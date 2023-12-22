const asyncHandler = require("express-async-handler");
const { create, findOne, findById } = require("../models/user");
const Bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const { pool } = require("../config/dbConnection");
//@des Register a user
//@route POST /api/users/register
//@access public

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are requires");
  }
  const [user] = await findOne("SELECT * FROM users WHERE email = ?", [email]);
  if (user) {
    res.status(400);
    throw new Error("User already registered!");
  }
  const hashedPassword = await Bcrypt.hash(password, 15);
  const id = await create(
    "INSERT INTO users (username,password,email) VALUES (?,?,?)",
    [username, hashedPassword, email]
  );
  const [newUser] = await findById("SELECT * FROM users WHERE id = ?", [id]);
  if (newUser) {
    res.status(201).json({ id: newUser.id, email: newUser.email });
  } else {
    res.json(400);
    throw new Error("User data not valid!");
  }
});

//@des Login user
//@route POST /api/users/login
//@access public

const lgoinUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All Fileds are required");
  }

  const [user] = await findOne("SELECT * FROM users WHERE email = ?", [email]);

  if (user && (await Bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({
      accessToken,
      data: {
        user: {
          email: user.email,
          username: user.username,
        },
      },
    });
    console.log("accesstoekn", accessToken, jwt.decode(accessToken));
    // throw new Error("User not found");
  } else {
    res.status(401);
    throw new Error("Email or Password is not valid");
  }

  //   const userAvailable = await res
  //     .status(200)
  //     .json({ message: `Get User for ${req.params.id}`, data: user });
});

//@des Current user info
//@route POST /api/users/current
//@access private

const currentInfo = asyncHandler(async (req, res) => {
  // console.log(req.body);
  // const { username, email, password } = req.body;
  // if (!username || !email || !password) {
  //   res.status(400);
  //   throw new Error("All fields are requires");
  // }
  //   const user = await User.create({ name, email, phone });
  //   res.status(200).json({ message: "User Created successfully", data: user });
  res.status(200).json({ data: req.user });
});

module.exports = {
  registerUser,
  lgoinUser,
  currentInfo,
};
