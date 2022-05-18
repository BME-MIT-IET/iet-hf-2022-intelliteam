const { Before, Given, When, Then } = require('@cucumber/cucumber')
const Url = require('../url.js');
const assert = require('assert');
const { Stream } = require('stream');
const { count } = require('console');

var url = new Url();
var url_check = new Url();

Given('An URL is {string}', function (string){
    url = new Url(string)
});
Given('I delete the query parameters', async function() {
     await url.clearQuery()
});
Then('the URL will be {string}', function (string)
{
    url_check = new Url(string)
    assert.equal(url_check.toString(), url.toString());
});


Given('The URL is {string}', function (string){
    url = new Url(string)
});
Given('I count the string params', function() {
     var count = url.queryLength()
});
Then('It should be {int}', function (int)
{
    count === int
});

