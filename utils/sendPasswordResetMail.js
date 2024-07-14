// Import the nodemailer module for sending emails
const nodemailer = require("nodemailer");

// Export the sendMail function
exports.sendPasswordResetMail = (req, res, user) => {

    const OTP = Math.floor(1000 + Math.random()*9000);
    // console.log("OTP: ", OTP);

    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com", // SMTP server host
        port: 465, // SMTP server port for secure connection
        secure: true, // Use SSL/TLS for the connection
        auth: {
            user: `${process.env.SENDER_EMAIL}`, // Email address from environment variables
            pass: `${process.env.APP_PASSWORD}`, // Email password from environment variables
        },
    });    

    // Define email options
    const mailOptions = {
        from: `"Ayush - Authentication 👻" <${process.env.SENDER_EMAIL}>`, // Sender address with a display name
        to: req.body.email, // Recipient email address from the request body
        subject: "RESET PASSWORD ✔", // Subject line of the email
        // text: "Hello world?", // Plain text body (commented out)
        html: `<h1>Password Reset OTP</h1>
        <h2>OTP : ${OTP} </h2>
        <a href="http://localhost:3000/verify-otp/${user._id}"
            style="display: inline-block; padding: 12px 30px; background-color: green; color: white; text-decoration: none; font-weight: 500; font-size: 14px; border-radius: 12px; text-align: center;">
            Password Reset Page 🔗
        </a>`, // HTML body of the email
    };    

    // Send the email using the transporter object
    transporter.sendMail(mailOptions, async (err, info) => {
        if (err) return res.send(err); // If an error occurs, send the error as a response
        console.log(info); // Log the email info for debugging
        
        user.otp = OTP;
        await user.save();

        console.log("Mail Sent & OTP Saved to DB")
        return res.redirect(`/verify-otp/${user._id}`);
      
    });
};
