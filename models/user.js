const { pool } = require("../config/dbConnection");

// const mongoose = require("mongoose");

// const userSchema = mongoose.Schema(
//   {
//     username: {
//       type: String,
//       required: [true, "Name is required field"],
//     },
//     email: {
//       type: String,
//       required: [true, "Email is required field"],
//       unique: [true, "Email address already taken"],
//     },
//     password: {
//       type: String,
//       required: [true, "password is required field"],
//     },
//   },
//   { timestamps: true }
// );

const findOne = async (query, values) => {
  return await pool
    .query(query, [...values])
    .then((result) => (result.length > 0 ? result[0] : [{}]));
};

const create = async (query, values) => {
  return await pool
    .query(query, [...values])
    .then((result) => {
      return result[0].insertId;
    })
    .catch((err) => {
      console.log("errr", err);
    });
};

const findById = async (query, values) => {
  return await pool.query(query, [...values]).then((result) => result[0]);
};
module.exports = { findOne, findById, create };
