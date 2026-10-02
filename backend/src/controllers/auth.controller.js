import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import generateToken from '../lib/utils.js'

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        console.log(req)
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" }); //An HTTP 400 Bad Request status code means that the server cannot or will not process the request because of something it perceives to be a client-side error
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be atleast 6 characters" });
        }
        //check if email is valid : regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.json(400).json({ message: "Invalid email format" });
        }
        //check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" })
        }
        //hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName, email, password: hashedPassword
        });
        if (newUser) {
            generateToken(newUser._id, res);
            await newUser.save();
            res.status(201).json({ _id: newUser._id, fullName: newUser.fullName, email: newUser.email, profilePic: newUser.profilePic }); //The HTTP 201 Created success status code means that your request was successful and a new resource has been created on the server

            //todo: send a welcome email to user
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        console.log("error in signup controller:", error);
        res.status(500).json({ message: "Internal server error" }); //An HTTP status code 500 stands for Internal Server Error. It is a generic, "catch-all" error response indicating that the website's server encountered an unexpected condition that prevented it from fulfilling the client's request.
    }
}