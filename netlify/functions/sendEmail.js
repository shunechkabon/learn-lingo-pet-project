const dotenv = require("dotenv");
dotenv.config();
const axios = require("axios");

const BREVO_API_KEY = process.env.BREVO_API_KEY;
console.log("BREVO_API_KEY:", BREVO_API_KEY);


exports.handler = async function (event) {
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: "Method Not Allowed" }),
        };
    }

    try {
        const { name, email, phone, reason, teacher } = JSON.parse(event.body);

        if (!name || !email || !phone || !reason || !teacher) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "All fields are required" }),
            };
        }

        const response = await axios.post("https://api.brevo.com/v3/smtp/email", {
            sender: { name: "LearnLingo", email: "bondaruk.aleksandra92@gmail.com" },
            to: [{ email, name }],
            subject: "Your trial lesson booking",
            htmlContent: `
                <h2>Hello, ${name}!</h2>
                <p>Thank you for booking a trial lesson with ${teacher.name} ${teacher.surname}.</p>
                <p><strong>Reason:</strong> ${reason}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p>Our team will contact you soon!</p>
            `,
        }, {
            headers: { "api-key": BREVO_API_KEY, "Content-Type": "application/json" }
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Email sent successfully", response: response.data }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Error sending email", error: error.message }),
        };
    }
}
