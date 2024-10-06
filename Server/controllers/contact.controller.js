const Contact = require("../models/contact.model");

// Handle contact form submission
async function handleContactSubmission(req, res) {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const newContact = new Contact({ name, email, subject, message });
        await newContact.save();
        res.status(201).json({ message: "Contact form submitted successfully" });
    } catch (error) {
        console.error("Error saving contact:", error);
        res.status(500).json({ error: "Failed to submit contact form" });
    }
}

// Retrieve all contacts (optional)
async function handleAllContact(req, res) {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (error) {
        console.error("Error retrieving contacts:", error);
        res.status(500).json({ error: "Failed to retrieve contacts" });
    }
}

module.exports = {
    handleContactSubmission,
    handleAllContact,
};
