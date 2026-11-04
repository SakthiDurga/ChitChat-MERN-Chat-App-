import nodemailer from "nodemailer";

const user = process.env.EMAIL_USER?.trim();
const pass = process.env.EMAIL_PASS?.replace(/\s/g, "");

console.log("SMTP USER EXISTS:", !!user);
console.log("SMTP PASSWORD LENGTH:", pass?.length);

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: user,
        pass: pass
    }
});

const sendWelcomeEmail = async (email, name) => {
    await transporter.verify();

    await transporter.sendMail({
        from: `"ChitChat" <${user}>`,
        to: email,
        subject: "Welcome to ChitChat!",
        html: `
            <h2>Welcome ${name}!</h2>
            <p>Your account has been set up successfully.</p>
            <p>Have a great time with ChitChat!</p>
        `
    });

    console.log("Welcome email sent!");
};

export default sendWelcomeEmail;