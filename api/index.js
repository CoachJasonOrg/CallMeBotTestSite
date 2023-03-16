const { Configuration, OpenAIApi } = require('openai');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios');

const data = {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: 'Hello!' }],
    max_tokens: 1024,
    n: 1,
    stop: '\n',
    temperature: 1.0,
};

const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer zzz',
};

const app = express();
app.use(bodyParser.json());
app.use(cors());

const config = new Configuration({
    apiKey: process.env.API_TOKEN
});

const openai = new OpenAIApi(config);

const messages = [{ "role": "system", "content": "You will act as a tutor and conduct a speaking exercise with a user. You will ask about what topic you will be discussing and what role the user wants you to play. Ask Shall We Start? before start the excersize" }]

app.get('/', (req, res) => {
    res.send('Hello there!')
})

app.post('/message', (req, res) => {
    let m = req.body.message
    messages.push({ "role": "user", "content": m });
    const response = openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: messages,
        temperature: 0,
        max_tokens: 256
    });

    response.then((data) => {
        const content = data.data.choices[0].message.content
        const message = { message: content };
        messages.push({ "role": "assistant", "content": content })
        res.send(message);
    }).catch((err) => {
        res.send(err);
    });
});

app.listen(3000, () => console.log('Listening on port 3000'));