const multer = require("multer");

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./public/data/uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-mycontacts-${file.originalname}`);
//   },
// });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    return cb(
      null,
      "ID_" +
        req.user.id +
        "_" +
        Date.now() +
        file.fieldname +
        "-" +
        file.originalname.slice(0, 5)
    );
  },
});

const upload = multer({
  dest: "./public/uploads/",
  fileFilter: imageFilter,
  //         (req, file, cb) => {
  //     if (file.mimetype.startsWith("image")) {
  //       return cb(null, true);
  //     } else {
  //       return cb("Please upload only images.", false);
  //     }
  //   },
  storage: storage,
});

const fileUpload = upload.single("file");

module.exports = fileUpload;
