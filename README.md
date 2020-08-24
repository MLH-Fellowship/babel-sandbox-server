# babel-sandbox-server

a [Sails v1](https://sailsjs.com) application


### Links

+ [Sails framework documentation](https://sailsjs.com/get-started)
+ [Version notes / upgrading](https://sailsjs.com/documentation/upgrading)
+ [Deployment tips](https://sailsjs.com/documentation/concepts/deployment)
+ [Community support options](https://sailsjs.com/support)
+ [Professional / enterprise options](https://sailsjs.com/enterprise)
+ [Postman Team](https://app.getpostman.com/join-team?invite_code=a7124ca1eb5a4a9e4c420be34ca7e1f7)

### Quick Start
+ Install [MongoDB](https://www.mongodb.com/try/download/community)
+ Install Sails.js: `npm install -g sails`
+ Install dependencies: `npm install`
+ Run: `sails lift` or `sails lift --port NUMBER` if you encounter `EADDRINUSE`
+ Run: `npm test` or `PORT=... npm test` to verify Mongo has been set up
+ Open [Postman](https://www.postman.com/downloads/)
+ Create a new GET request
+ Enter: `http://localhost:1337/api/v1/blobs/view` and click Send
+ Expected output: `status 200 ok`

### Contribution Guidelines
+ Add an appropriate API test for any server/logic related change
+ Run: `npm test` or `PORT=... npm test` and ensure all test cases pass before making a PR

### Version Info

This app was originally generated on Mon Jul 27 2020 13:07:39 GMT-0500 (Central Daylight Time) using Sails v1.2.4.

<!-- Internally, Sails used [`sails-generate@1.17.2`](https://github.com/balderdashy/sails-generate/tree/v1.17.2/lib/core-generators/new). -->



<!--
Note:  Generators are usually run using the globally-installed `sails` CLI (command-line interface).  This CLI version is _environment-specific_ rather than app-specific, thus over time, as a project's dependencies are upgraded or the project is worked on by different developers on different computers using different versions of Node.js, the Sails dependency in its package.json file may differ from the globally-installed Sails CLI release it was originally generated with.  (Be sure to always check out the relevant [upgrading guides](https://sailsjs.com/upgrading) before upgrading the version of Sails used by your app.  If you're stuck, [get help here](https://sailsjs.com/support).)
-->

