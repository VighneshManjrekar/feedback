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

  const html = `Respected Sir/Madam,
  <p>${response}</p>
  <p>Attaching my resume with the email. Looking forward to hear from ${job.company}. </p>
  <p>Thank you</p>
  
  <p>Best regards,</p>
  <p>${user.name}<br/>,
  ${user.email}<br/></p>
  <img src="${process.env.SERVER_URL}/api/v1/job/applications/${application._id}/seen?tracking=${encodedLink}" width="1" height"1" alt="my signature" style="display='none';"/>
  `;
  const subject = `Application for ${job.title} at ${job.company}.`;
  console.log(
    `${process.env.SERVER_URL}/api/v1/job/applications/${application._id}/seen?tracking=${encodedLink}`
  );
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
  const html = `Dear ${user.name},

    <p>We hope this message finds you well.</p>
    
    <p>We wanted to inform you that your job application for the <strong>${job.title}</strong> position at <strong>${job.company}</strong> has been viewed by the hiring team. This indicates their interest in your application and may lead to further communication regarding next steps.</p>
    
    <p>Thank you for your interest in joining our team. We appreciate your time and effort throughout this process.</p>
    
    <p>Should you have any questions or require further assistance, please don't hesitate to reach out.</p>
    
    Best regards,
    Team Feedback :)
    feedback@mail.com
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
