// https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png
const config = require('../config');

module.exports = {
    async sendEmail(message) {
        if(!message || !message.to) {
            return false;
        }
        const nodemailer = require("nodemailer");

        const emailConfig = config.email ?? null;
        const transporter = nodemailer.createTransport(emailConfig);

        try {
            await transporter.verify();
            const result = await transporter.sendMail(message);
            return {
                success: true,
                result,
            }
        } catch (error) {
            console.log('🔥✉️',error);
            return {
                success: false,
                error: error,
            }
        }
    },

}