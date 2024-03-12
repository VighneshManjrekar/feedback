const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI,
});

const generateText = async (job) => {
  const content = `Generate brief 200 tokens email message to express interest for ${job.title} position at ${job.company} without subject and regards`;
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
  return completion.choices[0].message.content;
  // return "I am writing to express my interest in the Software Engineer position at ABC Technologies. I believe my skills and experience make me a strong candidate for the role. Looking forward to the opportunity to discuss further.";
};

module.exports = generateText;
