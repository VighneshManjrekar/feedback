const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI,
});

const generateText = async (job) => {
  const content = `Generate brief 200 tokens email message to express interest for ${job.title} position at ${job.company}. Response should be  in the following JSON format: 
  {
    "mail": {
      "subject": "subject for the mail",
      "content": "email content without senders name",
    }
  }`;
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content,
      },
    ],
    model: "gpt-3.5-turbo",
    max_tokens: 200,
  });
  // console.log(completion.choices[0].message.content)
  return completion.choices[0].message.content;
  // return {
  //   mail: {
  //     subject: "Interest in Software Developer Position",
  //     content:
  //       "I am writing to express my interest in the Software Developer position at Tech Solutions Inc. I believe my skills and experience make me a strong candidate for this role. I look forward to the opportunity to discuss how my background aligns with the needs of your team. Thank you for considering my application.",
  //   },
  // };
};

module.exports = generateText;
