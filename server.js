require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");

// ✅ Added for email sending
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 3000;

// --------------------
// Middleware
// --------------------
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ✅ To support form submissions

// --------------------
// Serve static files
// --------------------
app.use(express.static(path.join(__dirname, "public")));

// --------------------
// Example API Route (Optional)
// --------------------
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

// --------------------
// ✅ Contact Form Email Route (Updated to include all fields)
// --------------------
app.post("/send", async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your Gmail address
        pass: process.env.EMAIL_PASS, // your Gmail App Password
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Contact Form Message from ${name}`,
      text: `
You have received a new message from your website contact form:

👤 Name: ${name}
📧 Email: ${email}
📱 Phone: ${phone}

💬 Message:
${message}
      `.trim(),
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Failed to send email." });
  }
});

// --------------------
// 404 Handler (Dead Link Handling)
// --------------------
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public/pages/error/404.html"));
});

// --------------------
// Start the Server
// --------------------
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
