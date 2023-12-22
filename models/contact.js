const { pool } = require("../config/dbConnection");

// const contactSchema = mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       ref: "User",
//     },
//     name: {
//       type: String,
//       requireed: [true, "Name is required field"],
//     },
//     email: { type: String, requireed: [true, "Email is required field"] },
//     phone: { type: String, requireed: [true, "phone is required field"] },
//   },
//   { timestamps: true }
// );
const findOne = async (query, values) => {
  return await pool
    .query(query, [...values])
    .then((result) => (result.length > 0 ? result[0] : [{}]));
};

const create = async (query, values) => {
  console.log("values", [...values]);
  return await pool
    .query(query, [...values])
    .then((result) => {
      console.log("result[0].insertId", result[0].insertId);

      return result[0].insertId;
    })
    .catch((err) => {
      console.log("errr", err);
    });
};

const findById = async (query, values) => {
  return await pool.query(query, [...values]).then((result) => result[0]);
};

const deleteById = async (query, values) => {
  console.log("query values", query, values);
  return await pool.query(query, [...values]).then((result) => result[0]);
};

const updateById = async (query, values) => {
  console.log("query values", query, values);
  return await pool.query(query, [...values]).then((result) => result[0]);
};

module.exports = { findOne, findById, create, deleteById, updateById };
