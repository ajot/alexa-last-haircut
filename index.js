'use strict';
var Alexa = require("alexa-sdk");

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.dynamoDBTableName = 'myButler';
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetHaircutIntent');
    },
    'GetHaircutIntent': function () {
      var lastHaircut =  this.attributes['last-haircut'];
      var outputSpeech = "Your last haircut was on " + formatDate(lastHaircut) + ". You should get the next haircut around " + formatDate(calculateNextDate(lastHaircut));
      var cardContent = generateCard(lastHaircut);

      this.emit(':tellWithCard', outputSpeech,cardContent.title, cardContent.body, cardContent.image);
    },
    'SetHaircutIntent': function () {
      var haircutDate = this.event.request.intent.slots.date.value;
      this.attributes['last-haircut'] = haircutDate;
      var outputSpeech = "I now know that you got your last haircut on " + haircutDate
      this.emit(':tellWithCard', outputSpeech,"Last Haircut",outputSpeech);
      this.emit(':saveState', true);
    }
};

function formatDate(rawDate){
    return new Date(rawDate).toDateString();
}

function calculateNextDate(mydate){
  var previousDate = new Date(mydate);
  var nextDate = new Date();
  return nextDate.setDate(previousDate.getDate() + 21);
}

function generateCard(lastDate) {
    var cardTitle = "Last Haircut";
    var cardBody = "Your last haircut was on " + formatDate(lastDate) + ". You should get the next haircut around " + formatDate(calculateNextDate(lastDate));
    var imageObj = {
        smallImageUrl: "http://ajotwani.s3.amazonaws.com/images/harrys-corner-shop.jpg",
        largeImageUrl: "http://ajotwani.s3.amazonaws.com/images/harrys-corner-shop.jpg",
    };
    return {
        "title": cardTitle,
        "body": cardBody,
        "image": imageObj
    };
}
