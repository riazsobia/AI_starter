$ npm init
$ npm install --save express // create variables to require express on service.js
$ node bin/run.js 

https://github.com/slackapi/node-slack-sdkx 
https://slack.dev/node-slack-sdk/getting-started
https://api.slack.com/rtm

<!-- $ npm install @slack/web-api @slack/events-api -->
$ npm install @slack/rtm-api

$ node bin/run.js


Slack:
Administration > Workspace Setting > Build Bot > Create Slack App > Click Bot User > Add Bot User
Basic Information > install App to workspace > You should now see Iris in workspace
OAuth & Permissions > Bot Token > 


Wit.ai
$ npm install --save superagent  // to connect to wit client

To make microservice resilent, we make a service registry.

Error: below is resolved by reinstalling slack app and generating new bot token.

IRIS is listning on 3000 in development.mode
(node:20037) UnhandledPromiseRejectionWarning: Error: An API error occurred: invalid_auth
    at Object.platformErrorFromResult (/Users/cereal/Desktop/iris/node_modules/@slack/web-api/dist/errors.js:50:33)
    at WebClient.apiCall (/Users/cereal/Desktop/iris/node_modules/@slack/web-api/dist/WebClient.js:374:28)
    at processTicksAndRejections (internal/process/next_tick.js:81:5)