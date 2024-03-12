const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_ID,
    pass: process.env.GMAIL_PASS,
  },
});

// const sendMail = async (
//   from_name,
//   from_mail,
//   to,
//   subject,
//   html,
//   attachments
// ) => {
//   const message = {
//     from: `${process.env.SMTP_FROM_NAME} <${process.env.GMAIL_ID}>`,
//     to,
//     subject,
//     html,
//     attachments,
//   };
//   try {
//     await transporter.sendMail(message);
//   } catch (err) {
//     console.log(err);
//   }
// };

exports.sendApplication = async (response, job, user, application) => {
  const encodedLink = Buffer.from(
    `${process.env.SERVER_URL}/api/v1/job/applications/${application._id}`
  ).toString("base64");

  const html = `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Job Application</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .signature {
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <p>Respected Sir/Madam,</p>
    <p>${response}</p>
    <p>Attaching my resume with this email. I am eagerly anticipating hearing back from ${job.company}.</p>
    <p>Thank you.</p>
    <div class="signature">
      <p>Best regards,</p>
      <p>${user.name},</p>
      <p>${user.email}</p>
    </div>
    <img src="${process.env.SERVER_URL}/api/v1/job/applications/${application._id}/seen?tracking=${encodedLink}" width="1" height="1" alt="tracking pixel" style="display: none;">
  </div>
</body>
</html>`;
  const subject = `Application for ${job.title} at ${job.company}.`;
  const message = {
    from: `${user.name} <${user.email}>`,
    to: job.postedBy.email,
    subject,
    html,
    attachments: [
      {
        filename: `${user.name}'s-Resume.pdf`,
        path: `http://localhost:7000/${user.resume}`,
      },
    ],
  };
  try {
    await transporter.sendMail(message);
  } catch (err) {
    console.log(err);
  }
};

exports.updateStatus = async (user, job) => {
  const subject = `Someone viewed your application`;
  const html = `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Job Application Viewed Notification</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .highlight {
      font-weight: bold;
    }
    .signature {
      margin-top: 20px;
      font-style: italic;
    }
  </style>
</head>
<body>
  <div class="container">
    <p>Dear <span class="highlight">${user.name}</span>,</p>
    <p>We hope this message finds you well.</p>
    <p>We wanted to inform you that your job application for the <span class="highlight">${job.title}</span> position at <span class="highlight">${job.company}</span> has been viewed by the hiring team. This indicates their interest in your application and may lead to further communication regarding next steps.</p>
    <p>We appreciate your time and effort throughout this process.</p>
    <p>Should you have any questions or require further assistance, please don't hesitate to reach out.</p>
    <div class="signature">
      <p>Best regards,</p>
      <p>Team Feedback :)</p>
      <p><a href="mailto:feedback@mail.com">feedback@mail.com</a></p>
    </div>
  </div>
</body>
</html>`;

  const message = {
    from: `Feedback <feedback@mail.com>`,
    to: user.email,
    subject,
    html,
  };
  try {
    await transporter.sendMail(message);
  } catch (err) {
    console.log(err);
  }
};

exports.sendForgotPassword = async (user, resetUrl) => {
  const subject = "Reset Password Link";
  const html = `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset</title>
  <style>
    /* Style your email here */
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #007bff;
      color: #fff;
      text-decoration: none;
      border-radius: 4px;
    }
    .button:hover {
      background-color: #0056b3;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Password Reset</h1>
    <p>Hi <strong>${user.name}</strong>,</p>
    <p>You recently requested to reset the password for your FeedBack account. Please follow the link below to proceed:</p>
    <p><a class="button" href="${resetUrl}" target="_blank">Reset Password</a></p>
    <p>If you did not request this password reset, you can safely ignore this email.</p>
    <p>Thanks,<br>Feedback Team</p>
  </div>
</body>
</html>
  `;
  const message = {
    from: `Feedback <feedback@mail.com>`,
    to: user.email,
    subject,
    html,
  };
  try {
    await transporter.sendMail(message);
  } catch (err) {
    console.log(err);
  }
};
