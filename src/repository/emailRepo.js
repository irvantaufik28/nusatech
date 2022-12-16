const nodemailer_transport = require("../libs/nodemailer");

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
    let content = email_message.NOTIF_REGISTRATION;
    let text = content.text_value.replace("{pin}", data.pin);
    let html = content.html_value.replace("{pin}", data.pin);

    await this.sendEmail(email, text, html);
  }
 
}
module.exports = EmailRepository;