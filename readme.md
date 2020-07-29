# Babel Codesandbox Server

a [Sails v1](https://sailsjs.com) application


### Links

+ [Sails framework documentation](https://sailsjs.com/get-started)
+ [Version notes / upgrading](https://sailsjs.com/documentation/upgrading)
+ [Deployment tips](https://sailsjs.com/documentation/concepts/deployment)
+ [Community support options](https://sailsjs.com/support)
+ [Professional / enterprise options](https://sailsjs.com/enterprise)

### Quick Start
+ Install [MongoDB](https://www.mongodb.com/try/download/community)
+ Install Sails.js: `npm install -g sails`
+ Install dependencies: `npm install`
+ Run: `sails lift` or `sails lift --port NUMBER` if you encounter `EADDRINUSE`
+ Open [Postman](https://www.postman.com/downloads/)
+ Create a new POST request
+ Enter: `http://localhost:1337/api/v1/config/update` and click Send
+ Expected output: `status 200 ok`

### Version info

This app was originally generated on Mon Jul 27 2020 13:07:39 GMT-0500 (Central Daylight Time) using Sails v1.2.4.

<!-- Internally, Sails used [`sails-generate@1.17.2`](https://github.com/balderdashy/sails-generate/tree/v1.17.2/lib/core-generators/new). -->



<!--
Note:  Generators are usually run using the globally-installed `sails` CLI (command-line interface).  This CLI version is _environment-specific_ rather than app-specific, thus over time, as a project's dependencies are upgraded or the project is worked on by different developers on different computers using different versions of Node.js, the Sails dependency in its package.json file may differ from the globally-installed Sails CLI release it was originally generated with.  (Be sure to always check out the relevant [upgrading guides](https://sailsjs.com/upgrading) before upgrading the version of Sails used by your app.  If you're stuck, [get help here](https://sailsjs.com/support).)
-->



A (wrong) test of the Snippet().ID() stuff

```js
let leftPadSource = `!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).leftPad=e()}}(function(){return function(){return function e(n,r,t){function f(i,u){if(!r[i]){if(!n[i]){var d="function"==typeof require&&require;if(!u&&d)return d(i,!0);if(o)return o(i,!0);var l=new Error("Cannot find module '"+i+"'");throw l.code="MODULE_NOT_FOUND",l}var c=r[i]={exports:{}};n[i][0].call(c.exports,function(e){return f(n[i][1][e]||e)},c,c.exports,e,n,r,t)}return r[i].exports}for(var o="function"==typeof require&&require,i=0;i<t.length;i++)f(t[i]);return f}}()({1:[function(e,n,r){"use strict";n.exports=function(e,n,r){if((n-=(e+="").length)<=0)return e;r||0===r||(r=" ");if(" "==(r+="")&&n<10)return t[n]+e;var f="";for(;1&n&&(f+=r),n>>=1;)r+=r;return f+e};var t=[""," ","  ","   ","    ","     ","      ","       ","        ","         "]},{}]},{},[1])(1)});`;
let exampleJsFile = `function msg(){ alert("Hello Javatpoint");}`;

console.log(new Snippet(exampleJsFile, leftPadSource, ['test1', 'test2']).ID());
```
