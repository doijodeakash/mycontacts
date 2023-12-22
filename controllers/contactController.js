const asyncHandler = require("express-async-handler");
const {
  findOne,
  findById,
  create,
  deleteById,
  updateById,
} = require("../models/contact");
//@des Get all contact
//@route GET /api/contacts
//@access private

const getAllContact = asyncHandler(async (req, res) => {
  console.log("req.user.id", req.user.id, req.query);
  // SELECT  * FROM people ORDER BY   first_name, id LIMIT   10 -- page_size OFFSET   10
  // SELECT * FROM mycontacts.contacts WHERE userId = 79 ORDER BY name, id LIMIT 10 OFFSET 10;
  let contact;
  let [count] = await findOne(
    "SELECT COUNT(*) AS totalRecords FROM contacts WHERE userId = ?",
    [req.user.id]
  );
  if (req.query._limit) {
    contact = await findOne(
      "SELECT * FROM contacts WHERE userId = ? ORDER BY ?, id ASC LIMIT ? OFFSET ?",
      [
        req.user.id,
        req.query._sort,
        parseInt(req.query._limit),
        (parseInt(req.query._page) - 1) * parseInt(req.query._limit),
      ]
    );
  } else {
    contact = await findOne("SELECT * FROM contacts WHERE userId = ?", [
      req.user.id,
    ]);
  }
  res.status(200).json({ data: contact, totalRecords: count.totalRecords });
});

//@des Get a contact
//@route GET /api/contacts/:id
//@access public

const getContact = asyncHandler(async (req, res) => {
  const contact = await findById(
    "SELECT * FROM contacts where userId = ? and id = ?",
    [req.user.id, req.params.id]
  );
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res
    .status(200)
    .json({ message: `Get contact for ${req.params.id}`, data: contact });
});

//@des Create contact
//@route POST /api/contacts
//@access public

const createContact = asyncHandler(async (req, res) => {
  // console.log(req.body);
  const { name, email, phone } = req.body;
  const { file } = req;
  if (!name || !email || !phone || !file) {
    res.status(400);
    throw new Error("All fields are requires");
  }
  let imgPath = (req.protocol + "://" + req.headers.host + "/" + file.path)
    .split("\\")
    .join("/");

  console.log("imgPath", imgPath);

  const contact = await findById("SELECT * FROM contacts WHERE id = ?", [
    await create(
      "INSERT INTO contacts  (userId,name,email,phone,imgPath)VALUES(?,?,?,?,?)",
      [req.user.id, name, email, phone, imgPath]
    ),
  ]);

  // const id = await create(
  //   "INSERT INTO contacts  (userId,name,email,phone)VALUES(?,?,?,?)",
  //   [req.user.id, name, email, phone]
  // );
  console.log(contact);
  res
    .status(201)
    .json({ message: "Contact Created successfully", data: contact });
});

//@des Update a contact
//@route PUT /api/contacts/:id
//@access public

const updateContact = asyncHandler(async (req, res) => {
  const { name, email, phone, id } = req.body;
  const { file } = req;

  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are requires");
  }

  const [contact] = await findById(
    "SELECT * FROM contacts WHERE userId = ? and id = ?",
    [req.user.id, id]
  );
  console.log("found contact", contact, req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if (contact.userId !== req.user.id) {
    res.status(403);
    throw new Error("User don't have the permission to update the contact");
  }

  let imgPath = (req.protocol + "://" + req.headers.host + "/" + file.path)
    .split("\\")
    .join("/");
  const updatedContact = await updateById(
    "UPDATE contacts SET name = ?, email = ?, phone = ?, imgPath = ? WHERE userId = ? and id = ? ",
    [name, email, phone, imgPath, req.user.id, id]
  );
  res.status(200).json({
    message: `Update Contact for ${req.params.id}`,
    body: updatedContact,
  });
});

//@des Delete a contact
//@route DELETE /api/contacts
//@access public

const deleteContact = asyncHandler(async (req, res) => {
  console.log("conctact to delete for", req.user.id, req.params.id);
  const [contact] = await findById(
    "SELECT * FROM contacts WHERE userId = ? and id = ?",
    [req.user.id, req.params.id]
  );
  console.log("conctact to delete for", contact);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if (contact.userId !== req.user.id) {
    res.status(403);
    throw new Error("User don't have the permission to update the contact");
  }

  const deletedContact = await deleteById(
    "DELETE FROM contacts WHERE userId = ? and id = ?",
    [req.user.id, req.params.id]
  );
  res.status(200).json({
    message: `Delete Contact for ${req.params.id}`,
    body: deletedContact,
  });
});

module.exports = {
  getContact,
  getAllContact,
  createContact,
  updateContact,
  deleteContact,
};
