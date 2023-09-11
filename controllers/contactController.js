const asyncHandler = require("express-async-handler");
const Contact = require("../models/contact");
//@des Get all contact
//@route GET /api/contacts
//@access public

const getAllContact = asyncHandler(async (req, res) => {
  const contact = await Contact.find();
  res.status(200).json(contact);
});

//@des Get a contact
//@route GET /api/contacts/:id
//@access public

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
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
  console.log(req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are requires");
  }
  const contact = await Contact.create({ name, email, phone });
  res
    .status(201)
    .json({ message: "Contact Created successfully", data: contact });
});

//@des Update a contact
//@route PUT /api/contacts/:id
//@access public

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
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
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  const deletedContact = await Contact.findOneAndRemove(req.params.id);
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
