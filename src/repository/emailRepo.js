const nodemailer_transport = require("../libs/nodemailer");
const emailMessage = require('../internal/constant/emailMessage')

class EmailRepository {
  constructor() {}
  async sendEmail(subject, recipient, text, html) {
    await nodemailer_transport.sendMail({
      from: `"${process.env.MAILER_SENDER_NAME}" <${process.env.MAILER_SENDER_EMAIL}>`,
      to: recipient,
      subject: subject,
      text: text,
      html: html,
    });
  }

  async sendVerification(email, data) {
    console.log(data)
    console.log(data)
    console.log(data)
    console.log(data.pin)
    let content = emailMessage.PIN
    let text = content.text_value.replace("{pin}", data);
    let html = content.html_value.replace("{pin}", data);

    await this.sendEmail('Verification', email, text, html);
  }
 
}
module.exports = EmailRepository;