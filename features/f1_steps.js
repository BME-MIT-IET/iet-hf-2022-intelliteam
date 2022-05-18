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


Given('The URL equals {string}', function (string){
    url = new Url(string)
});
Then('The query of alice is {int}', function (int)
{
    assert.equal(url.query.alice, int);
});
Then('The query of bob is {string}', function (string)
{
    assert.equal(url.query.bob, string);
});
Then('The Query of carol is null', function ()
{
    assert.equal(url.query.carol, null);
});
Then('The Query of peter is undefined', function ()
{
    assert.equal(url.query.peter, undefined);
});