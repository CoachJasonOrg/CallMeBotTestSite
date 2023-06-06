const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const callCareerCoach = require('./callCareerCoach');
const callAnnie = require('./callAnnie');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// '/message' endpoint
app.post('/message', async (req, res) => {
    res.send({ message: 'You are hitting message endpoint' })
});

app.post('/callCareerCoach', async (req, res) => {
    const messages = req.body.messages;

    try {
        const messageContent = await callCareerCoach(messages);
        const message = { message: messageContent };
        res.send(message);
    } catch (err) {
        res.send(err);
    }
});

app.post('/callWordMaster', async (req, res) => {
    const messages = req.body.messages;

    try {
        const messageContent = await callWordMaster(messages);
        const message = { message: messageContent };
        res.send(message);
    } catch (err) {
        res.send(err);
    }
});

app.post('/callCultureNavigator', async (req, res) => {
    const messages = req.body.messages;
    try {
        const messageContent = await callCultureNavigator(messages);
        const message = { message: messageContent };
        res.send(message);
    } catch (err) {
        res.send(err);
    }
});

app.post('/callAnnie', async (req, res) => {
    const messages = req.body.messages;
    console.log("messages", messages)
    try {
        const messageContent = await callAnnie(messages);
        const message = { message: messageContent };
        res.send(message);
    } catch (err) {
        res.send(err);
    }
});

app.listen(3000, () => console.log('Listening on port 3000'));
