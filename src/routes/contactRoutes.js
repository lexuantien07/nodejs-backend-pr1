const express = require('express');
const router = express.Router();
const controlContact = require("../controllers/contactController");
const validateToken = require('../middleware/validateTokenHandler');

//validation
router.use(validateToken);

// route /api/contacts
router.route("/").get(controlContact.getContacts).post(controlContact.createContact);

// route api/contact/:id
router.route("/:id").get(controlContact.getContact).put(controlContact.updateContact).delete(controlContact.deleteContact);

module.exports = router;