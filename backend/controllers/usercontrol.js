const User = require('../models/usermodel');
const bcrypt = require('bcryptjs'); // Make sure bcrypt is required if not already
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")


const SECRET_kEY = process.env.SECRET_KEY

const RegisterUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = {
            name: name,
            email: email,
            password: hashPassword,
            role: role || 'student',
        };

        await User.create(newUser);
        const user = {
            name,
            email,
            role
        }

        res.status(200).json({ message: "Registration successful", user });

    } catch (error) {
        console.error("Error during registration:", error);  // Log error
        res.status(500).json({ message: "Server error" });
    }
};

const userProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "user not found" })
        }
        res.json({ success: true, user })
    } catch (error) {
        res.status(500).json({ message: "Server error" });
        console.error(error);

    }
}

const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "user not found" })
        }
        // Update fields only if the new value is provided in the request body
        if (req.body.name) user.name = req.body.name;
        if (req.body.email) {
            // You can add email validation here if needed
            user.email = req.body.email;
        }
        if (req.file && req.file.path) {
            // If a file is uploaded, update the profile picture
            user.profile = req.file.path;
        }

        const updatedUser = await user.save()
        res.json({ success: true, user })
    } catch (error) {
        res.status(500).json({ message: "Server error" });
        console.error(error);

    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password)

        // Check if the user already exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        console.log(user)

        // Hash the password and check for match
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(404).json({ message: "Invalid password" });
        }

        // Sign the JWT token with the user ID as the payload
        const token = jwt.sign({ userId: user._id }, SECRET_kEY, { expiresIn: "1h" }); // Add a secret and expiration time

        // Respond with user data and token
        res.status(200).json({
            message: "Login success", user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            token: token
        });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
        console.error(error);
    }
};

const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.send(404).json({ message: "User not found" })
        }
        const reseteCode = Math.floor(10000 + Math.random() * 90000).toString()
        user.resetPasswordCode = reseteCode;
        user.resetPasswordCode = Date.now + 10 * 60 * 1000;
        await user.save();

        const transpoter = nodemailer.createTransport({
            service: "Email",
            auth: {
                user: process.env.USER_EMAIL,
                password: process.env.USER_PASSWORD
            }
        })

        await transpoter.sendMail({
            from: "",
            to: "",
            subject: "",
            html: `<P>your reser code is ${reseteCode}</P>`

        })

        res.status(200).json({ message: "resete code send successfully" })

    } catch (error) {
        console.error("server error", error);
        res.status(500).json({ message: "server error" })

    }
}

const verifyCode = async (req, res) => {
    try {
        const { code, email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "user not found"
            })
        }

        if (!user.resetPasswordCode == code || user.resetCodeExpires < Date.now()) {
            return res.status(400).json({ message: "code not match or expired" })
        }

        res.status(200).json({ message: "code verify successfully" })
    } catch (error) {
        console.error("server error", error);
        res.status(500).json({ message: "server error" })

    }
}

const resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "user not found" })
        }

        const hashPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashPassword;
        user.resetPasswordCode = null;
        user.resetCodeExpires = null;

        await user.save();

        res.status(200).json({ message: "password reset successfully" })

    } catch (error) {
        console.error("server error", error);
        res.status(500).json({ message: "server error" })

    }
}

const userContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail", // "Email" নয়, এখানে Gmail, Outlook ইত্যাদি দিতে হয়
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD, // এখানে "pass", "password" নয়
      },
    });

    await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: process.env.USER_EMAIL, // চাইলে নিজের বা অন্য admin-এর ইমেল এখানে দাও
      subject: `New Contact Message from ${name}`,
      html: `
        <h3>Contact Details</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    });

    res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};


module.exports = { RegisterUser, loginUser, userProfile, updateUserProfile, resetPassword, forgetPassword, verifyCode, userContact }