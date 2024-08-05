const nodemailer = require('nodemailer');

async function sendEmail(email, subject, text) {
  let transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: 'vijaydemo122412@gmail.com', 
      pass: 'vqgh zxyj vaem snyq', 
    },
  });

  let mailOptions = {
    from: 'vijaydemo122412@gmail.com', 
    to: email, 
    subject, 
    text, 
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return reject(error); 
      }
      resolve(info); 
    });
  });
}

module.exports = sendEmail;
