const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI,
});

const generateText = async (job) => {
  const content = `Generate brief 100 tokens email message to express interest for ${job.title} position at ${job.company} without subject and regards`;
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content,
      },
    ],
    model: "gpt-3.5-turbo",
    max_tokens: 100,
  });
  return completion.choices[0].message.content;
  // return "I am writing to express my strong interest in the Software Engineer position at ABC Technologies. I have a strong background in software development and am excited about the opportunity to contribute to your team. Looking forward to discussing my qualifications further."
  
};

module.exports = generateText;
