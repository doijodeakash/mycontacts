const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const { connectDB } = require("./config/dbConnection");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

// connectDB();
app.use(express.json());
app.use(express.static("public"));
// app.use(express.static("public"));
app.use("/public/uploads", express.static("public/uploads"));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);
// console.log("connecton--->", process.env.CONNECTION_STRING);
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port || 5000, () => {
  console.log("server running on port %d", port);
});

/* MongoDB ConnectionString
 *   mongodb+srv://doijodeakash:Akash@#$1994@contactscluster.r8voemj.mongodb.net/
 *   mongodb+srv://doijodeakash:Akash@#$1994@contactscluster.r8voemj.mongodb.net/?retryWrites=true&w=majority
 */
