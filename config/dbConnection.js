const mongoose = require("mongoose");

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

module.exports = connectDB;
