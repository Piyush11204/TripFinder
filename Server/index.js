require('dotenv').config();
const http = require("http");
const express = require('express');
const cors = require("cors");
const path = require('path');
const connection = require("./DB/db"); // Assuming you have a database connection file
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const locationRoutes = require('./routes/addLocation');
const profileRoutes = require('./routes/profile');
const searchRoutes = require('./routes/search');
const contactRoutes = require('./routes/contact.routes'); // Corrected this
const emailRouter = require('./routes/email.routes.js');
const reviewRouter = require("./routes/review.router.js");
const { setupSocket } = require('./routes/socket.router.js');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('static'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database Connection
connection();

// Socket.IO Setup
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

// Socket.IO Events
setupSocket(io);

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/addlocation', locationRoutes);
app.use('/api/users/me', profileRoutes);
app.use('/api', searchRoutes);
app.use('/api', contactRoutes);
app.use('/api/v1', emailRouter);
app.use('/api', reviewRouter);

// Start the Server
const port = process.env.PORT || 8080;
server.listen(port, () => console.log(`Listening on port ${port}...`));
