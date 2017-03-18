'use strict';

//App Variables
var Alexa = require('alexa-sdk');
var APP_ID = ""; //We'll come back to this later
var SKILL_NAME = 'Confidence Builder';

//List of compliments to be later given in a random order
var COMPLIMENT_LIST = [
    "Damn son, you're looking mighty fine today.",
    "Wow! You made an Alexa Skill. You're smarter than I thought!",
    "If you were a food, you'd be an endless supply of Cheesecake.",
    ];

//Setup
exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

//Intent handlers that can be triggered.
var handlers = {
    'LaunchRequest': function () {
        this.emit('GetCompliment');
    },
    /*
        When a user says a recognised phrase to Alexa the GetComplimentIntent is triggered
        This picks a random compliment from the array above and emits the :tellWithCard event.
        This event shows a card within the Amazon Echo app, and outputs the speech from speechOutput.
    */
    'GetComplimentIntent': function () {
        this.emit('GetCompliment');
    },
    'GetCompliment': function () {
        // Get a random compliment from the COMPLIMENTS_LIST array
        var complimentIndex = Math.floor(Math.random() * COMPLIMENT_LIST.length);
        var randomCompliment = COMPLIMENT_LIST[complimentIndex];

        // Output
        var speechOutput = "Your compliment: " +  randomCompliment;

        this.emit(':tellWithCard', speechOutput, SKILL_NAME, randomCompliment)
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = "You can say give me a compliment, or, you can say exit... What can I help you with?";
        var reprompt = "What can I help you with?";
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', 'Goodbye!');
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', 'Goodbye!');
    }
};
