import jwt from 'jsonwebtoken';

const generateToken = (userId, res) => {
    const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, //7 days in Milliseconds
        httpOnly: true, //prevent XSS attacks: cross-sit scripting
        sameSite: "strict", // prevent CSRF attack
        secure: process.env.NODE_ENV === "development" ? false : true,
    })
}

export default generateToken