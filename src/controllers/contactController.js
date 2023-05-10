const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');

// get all contacts
// GET /api/contacts
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
});

// create a new contact
// POST /api/contacts
const createContact = asyncHandler(async (req, res) => {
    console.log('The body request is: ', req.body);
    const {name, email, phone} = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error ("All fields are mandatory");
    }
    const contact = await Contact.create({
        name, email, phone
    });
    res.status(201).json(contact);
});

// get a contact
// GET /api/contact/:id
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

// update a contact
// PUT /api/contact/:id
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    const updateContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.status(200).json(updateContact);
});

// delete a contact
// DELETE /api/contact/:id
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    await Contact.deleteOne({_id: req.params.id});
    res.status(200).json(contact);
});

module.exports = {  getContacts,
                    createContact,
                    getContact,
                    updateContact,
                    deleteContact };