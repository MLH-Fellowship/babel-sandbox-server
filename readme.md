# babel-sandbox-server

a [Sails v1](https://sailsjs.com) application


```js
let leftPadSource = `!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).leftPad=e()}}(function(){return function(){return function e(n,r,t){function f(i,u){if(!r[i]){if(!n[i]){var d="function"==typeof require&&require;if(!u&&d)return d(i,!0);if(o)return o(i,!0);var l=new Error("Cannot find module '"+i+"'");throw l.code="MODULE_NOT_FOUND",l}var c=r[i]={exports:{}};n[i][0].call(c.exports,function(e){return f(n[i][1][e]||e)},c,c.exports,e,n,r,t)}return r[i].exports}for(var o="function"==typeof require&&require,i=0;i<t.length;i++)f(t[i]);return f}}()({1:[function(e,n,r){"use strict";n.exports=function(e,n,r){if((n-=(e+="").length)<=0)return e;r||0===r||(r=" ");if(" "==(r+="")&&n<10)return t[n]+e;var f="";for(;1&n&&(f+=r),n>>=1;)r+=r;return f+e};var t=[""," ","  ","   ","    ","     ","      ","       ","        ","         "]},{}]},{},[1])(1)});`;
let exampleJsFile = `function msg(){ alert("Hello Javatpoint");}`;

console.log(
  new Snippet(exampleJsFile, leftPadSource, ["test1", "test2"]).Link(),
  Snippet.ID(exampleJsFile)
);
```