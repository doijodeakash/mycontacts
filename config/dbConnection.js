const mongoose = require("mongoose");
const mysql = require("mysql2");
require("dotenv").config();
const connectDB = async () => {
  try {
    console.log("connecton--->", process.env.CONNECTION_STRING);

    const connect = await mongoose.connect(
      "mongodb+srv://doijodeakash:Akash1234@contactscluster.r8voemj.mongodb.net/contactdb?retryWrites=true&w=majority"
      //   {
      //     serverApi: {
      //       version: "1",
      //       strict: true,
      //       deprecationErrors: true,
      //     },
      //   }
    );
    console.log(
      "Database connected :",
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

const pool = mysql
  .createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    port: process.env.MYSQL_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
  })
  .promise();

module.exports = { connectDB, pool };
