const handlebars = require('handlebars')
const transporter = require('../config/emailConfig')

const sendEmail = async (file, properties, { storeName, email }) => {
  const compiler = handlebars.compile(file)
  const emailString = compiler(properties)
  transporter.sendMail({
    from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}>`,
    to: `${storeName} <${email}>`,
    subject: 'Boas-vindas',
    html: emailString
  })
}

module.exports = sendEmail
