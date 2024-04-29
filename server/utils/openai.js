const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI,
});

exports.generateText = async (job) => {
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

exports.generateRoadmap = async (title) => {
  const query = `
  First find for is ${title} is a real job title if it is a real job,
  prepare 7 stage roadmap for fresher starting a career as ${title}
  Response should be  in the following JSON format:
  {
    "stages":{
      "title" : "some fancy title",
      "totalTime":"time required to complete the roadmap",
      "steps":[{step: "Step details", time: "time to dedicate for the current stage"}]
    }
  }
  if it isn't a real job or there isn't any roadmap you can find return {"stages":null} with no extra characters`;
  try {
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "you are a career guide",
        },
        { role: "user", content: query },
      ],
      model: "gpt-3.5-turbo",
      temperature: 0,
    });
    const roadmap = JSON.parse(response.choices[0].message.content);
    if (!roadmap.stages) {
      return null;
    }
    return { roadmap };
  } catch (error) {
    console.log(error);
    return null;
  }
};
