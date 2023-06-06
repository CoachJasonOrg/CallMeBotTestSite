const axios = require('axios');
const API_URL = "https://api.openai.com/v1/chat/completions";
const API_KEY = "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";

const options = {
    model: 'gpt-3.5-turbo',
    temperature: 0.8, // [[ Consider modify temperature ]]
    max_tokens: 2048,
};

const openai = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
    },
});

const WORD_LIMITATION = 15;
const systemRolePrompt = `
You are an Oral English Coach and you should speak like you are talking to the user on a phone call.
Try to get the user to talk as much as possible. 
Keep your response concise and limit it to no more than ${WORD_LIMITATION} words.
`;


function generateUserInputPrompt(userInput) {
    const prompt = `
        What would you respond if you are my career coach? My input is:
        ${userInput}
    `;
    return prompt;
}

// [[ Modify the prompt generator ]]
/** Format must follow [
  { "role": "system", "content": "You are a career coach." },
  { "role": "user", "content": "I am looking for a UX internship this summer. But the market isn’t great. I have applied for many jobs but only heard back from a few of them." },
  { "role": "assistant", "content": "First of all, congratulations on submitting so many applications - That’s a great effort! Have you tried networking with your alumni or people in the industry? They may be able to provide you with referrals or insider information about the job. " },
  { "role": "user", "content": "I haven’t yet. How do I reach out to them?" }
]
*/
function promptGenerator(messages) {

    const userInput = messages.pop().content;

    if (messages.length === 0 || messages[0].role !== "system") {
        messages.unshift({
            role: "system",
            content: systemRolePrompt
        });
    }

    // Generate and push the new user message
    messages.push({
        role: "user",
        content: generateUserInputPrompt(userInput)
    });

    return messages;
}

const callCareerCoach = async (chatMessages) => {
    try {
        const messages = promptGenerator(chatMessages)
        console.log(messages)
        const response = await openai.post(API_URL, {
            model: options.model,
            messages,
            ...options,
        });
        return response.data.choices[0].message.content;
    } catch (error) {
        console.log(error.response.data);
    }
};

module.exports = callCareerCoach;
