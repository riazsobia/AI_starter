"use strict";

const { RTMClient } = require("@slack/rtm-api");
let rtm = null;
let nlp = null;
let registry = null;
let conversationId = "CHLQ1HU91";

function addAuthentication() {
  rtm.on("authenticated", event => {
    // The argument is the event as shown in the reference docs.
    // For example, https://api.slack.com/events/user_typing
    console.log(event);
    console.log(
      `Logged in as ${event.self.name} on team ${
        event.team.name
      }, but not yet connected to a channel`
    );
  });
}

function handleOnMessage(aiClient) {
  rtm.on("message", event => {
    if (event.text.toLowerCase().includes("ninja")) {
      //   console.log("iris:", event.text);

      aiClient.ask(event.text, (err, res) => {
        if (err) {
          console.log("Error:", err);
          return;
        }

        try {
          if (!res.intent || !res.intent[0] || !res.intent[0].value) {
            throw new Error("Could not extract intent.");
          }

          const intent = require("./intents/" + res.intent[0].value + 'Intent');

          intent.process(res, registry, function(error, response) {
            if (error) {
              console.log('try:',error.event);
              return;
            }

            return rtm.sendMessage(response, conversationId);
          });

        } catch (err) {
          console.log(err);
          console.log(res);
          rtm.sendMessage(
            "Sorry, I don't know what you are talking about!",
            conversationId);
        }

        // if (!res.intent) {
        //   return rtm.sendMessage("Sorry, I did not understand", conversationId);
        // } else if (res.intent[0].value == "time" && res.location) {
        //   return rtm.sendMessage(
        //     `I do not yet know the time in ${res.location[0].value}`,
        //     conversationId
        //   );
        // } else {
        //   console.log("else:", res);
        //   // The argument is the event as shown in the reference docs.
        //   // For example, https://api.slack.com/events/user_typing
        //   rtm.sendMessage("Sorry, I did not understand", conversationId);
        // }
      });
    }
  });
}

module.exports.init = function slackClient(token, logLevel, nlpClient, serviceRegistry) {
  // The client is initialized and then started to get an active connection to the platform
  rtm = new RTMClient(token, { logLevel: logLevel });
  nlp = nlpClient;
  registry = serviceRegistry;

  // // Calling `rtm.on(eventName, eventHandler)` allows you to handle events (see: https://api.slack.com/events)
  // When the connection is active, the 'ready' event will be triggered
  rtm.on("ready", async () => {
    // Sending a message requires a channel ID, a DM ID, an MPDM ID, or a group ID
    // The following value is used as an example

    // The RTM client can send simple string messages
    const res = await rtm.sendMessage("New message", conversationId);

    // `res` contains information about the sent message
    console.log("Message sent: ", res.ts);
  });

  // After the connection is open, your app will start receiving other events.
  rtm.on("user_typing", event => {
    // The argument is the event as shown in the reference docs.
    // For example, https://api.slack.com/events/user_typing
    console.log(event);
  });

  addAuthentication();
  handleOnMessage(nlp);
  return rtm;
};
