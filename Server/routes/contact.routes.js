const router = require("express").Router();
const { handleContactSubmission, handleAllContact } = require("../controllers/contact.controller");

// POST endpoint for submitting contact form
router.post("/contact", handleContactSubmission);

// GET endpoint for retrieving all contacts (optional)
router.get("/allcontact", handleAllContact);

module.exports = router;
