const dotenv = require('dotenv');
const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');

// Load environment variables
dotenv.config();

const router = express.Router();
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.AUTH_EMAIL, 
        pass: process.env.AUTH_PASS  
    }
});

// Define the route for sending emails
router.post('/send-email', (req, res) => {
    const { name, email, phone, trip } = req.body;

    // Logging for troubleshooting
    console.log("Request body:", req.body);
    console.log("Email to send:", email);
    console.log("Nodemailer transporter:", transporter);

    if (!email) {
        return res.status(400).json({ error: 'Recipient email is required' });
    }

    const formattedItinerary = trip.itinerary.map(day => {
        return `Day ${day.day}: ${day.activities.join(', ')}`;
    }).join('\n');

    const formattedExpenses = Object.entries(trip.expenses).map(([category, amount]) => {
        return `${category.charAt(0).toUpperCase() + category.slice(1)}: $${amount}`;
    }).join('\n');

    let mailOptions = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: `Trip Details: ${trip.title}`,
        text: `
Dear ${name},

Thank you for booking the trip to ${trip.title}. Here are the details of your trip:

Title: ${trip.title}
Date: ${trip.date}
Duration: ${trip.duration}
Description: ${trip.description}

Best Spots to Visit:
- ${trip.bestSpots.join('\n- ')}

Itinerary:
${formattedItinerary}

Approximate Expenses:
${formattedExpenses}

Additional Information:
- ${trip.additionalInfo.join('\n- ')}

Phone: ${phone}

We hope you have a wonderful trip!

Best regards,
Your Travel Team
        `,
        html: `
            <h1>Dear ${name},</h1>
            <p>Thank you for booking the trip to <strong>${trip.title}</strong>. Here are the details of your trip:</p>
            <h2>Trip Details</h2>
            <ul>
                <li><strong>Title:</strong> ${trip.title}</li>
                <li><strong>Date:</strong> ${trip.date}</li>
                <li><strong>Duration:</strong> ${trip.duration}</li>
                <li><strong>Description:</strong> ${trip.description}</li>
            </ul>
            <h3>Best Spots to Visit</h3>
            <ul>
                ${trip.bestSpots.map(spot => `<li>${spot}</li>`).join('')}
            </ul>
            <h3>Itinerary</h3>
            <ul>
                ${trip.itinerary.map(day => `<li>Day ${day.day}: ${day.activities.join(', ')}</li>`).join('')}
            </ul>
            <h3>Approximate Expenses</h3>
            <ul>
                ${Object.entries(trip.expenses).map(([category, amount]) => `<li>${category.charAt(0).toUpperCase() + category.slice(1)}: $${amount}</li>`).join('')}
            </ul>
            <h3>Additional Information</h3>
            <ul>
                ${trip.additionalInfo.map(info => `<li>${info}</li>`).join('')}
            </ul>
            <p><strong>Phone:</strong> ${phone}</p>
            <p>We hope you have a wonderful trip!</p>
            <p>Best regards,</p>
            <p>Your Travel Team</p>
        `,
        // attachments: [ ]
    };

    // Send email using the transporter
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ error: 'Failed to send email', details: error.message });
        }
        res.status(200).json({ message: 'Email sent successfully', info: info.response });
        console.log('Email sent response:', info.response);
    });
});

module.exports = router;
