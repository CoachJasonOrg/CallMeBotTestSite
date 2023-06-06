# ChatBot Test

Web app setup to test prompt based Chatbot

## Installation

Use the package manager [npm](https://nodejs.org/) to install the required packages.

```bash
cd api
npm i
```

```bash
cd app
npm i
```

## Setup
#### Start server:
```bash
cd api
node .
```
#### Start client:
Drag and drop the  `app/index.html` into browser.

## Test
1. Choose a bot you want to test with. 

Go to `app/main.js` and update CHAT_BOT end point
- Career Coach: 'http://localhost:3000/callCareerCoach'
- Word Master: 'http://localhost:3000/callWordMaster'
- Culture Navigator: : 'http://localhost:3000/callCultureNavigator'
- Annie (General bot): : 'http://localhost:3000/callAnnie'

2. Update the prompt

Go to `api` directory and the js file of the chosen bot API
- Update `userInputPromptGenerator` and `promptGenerator`.
- Once updated, run `node .` again to restart the server
- Refresh browser

3. Push the updated prompt
Push a commit with your changes