const firebase = require("firebase/app");
const inquirer = require('inquirer');
require('dotenv').config();
require("firebase/auth");
require("firebase/firestore");

let firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
};

console.log(firebaseConfig);

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const questions = [
    {
        type: 'input',
        name: 'email',
        message: "What's your email?",
    }, {
        type: 'input',
        name: 'password',
        message: "What's your password?",
    }
];
  
inquirer.prompt(questions).then(answers => {
    firebase
    .auth()
    .signInWithEmailAndPassword(answers['email'], answers['password'])
    .then(async user => {
        jwt = await user.user.getIdToken(true);
        console.log(jwt);
    })
    .catch(error => console.log(error));
})
