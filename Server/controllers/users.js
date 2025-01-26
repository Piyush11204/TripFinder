const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");

// Handler to fetch all users
async function handleAllUsers(req, res) {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        console.error("Internal Server Error:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}
async function handleUpdateProfile(req, res) {
    try {
        
        const { error } = validate(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });

        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).send({ message: "User not found" });

        // Update the fields provided
        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;
        user.email = req.body.email || user.email;
        user.gender = req.body.gender || user.gender;
        

        // If password is provided, hash it and update
        if (req.body.password) {
            const salt = await bcrypt.genSalt(Number(process.env.SALT));
            user.password = await bcrypt.hash(req.body.password, salt);
        }

        await user.save();
        res.send({ message: "Profile updated successfully" });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}
// Handler to create a new user
async function handleCreatingUser(req, res) {
    try {
        // Validate request data
        const { error } = validate(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });

        // Check if email already exists
        const user = await User.findOne({ email: req.body.email });
        if (user) return res.status(409).send({ message: "Email already exists" });

        // Hash password
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Create and save new user
        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
            gender: req.body.gender, // Include gender
        });
        await newUser.save();

        // Generate auth token
        const token = newUser.generateAuthToken();

        // Send response
        res.status(201).send({ message: "User created successfully", token });
    } catch (error) {
        console.error("Internal Server Error:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
}

module.exports = {
    handleAllUsers,
    handleCreatingUser,
    handleUpdateProfile,
};
