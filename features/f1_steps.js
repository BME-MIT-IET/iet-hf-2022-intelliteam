const { Before, Given, When, Then } = require('@cucumber/cucumber')
const Url = require('../url.js');
const assert = require('assert');
const { Stream } = require('stream');
const { count } = require('console');
const { utils } = require('mocha');

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



Given('The URL is set {string}', function (string){
    url = new Url(string)
});
Then('There is param', function ()
{
    assert.equal(url.isEmptyQuery(),false)
});
Then('There is no param', function ()
{
    assert.equal(url.isEmptyQuery(),true)
});



Given('The URL is now {string}', function (string){
    url = new Url(string)
});
Then('The the {int}. char is {string}', function (int,string)
{
    assert.equal(url.path[int],string)
});



Given('The URL is again {string}', function (string){
    url = new Url(string)
});
Then('The the {int}. element is {string}', function (int,string)
{
    assert.equal(url.paths()[int],string)
});



Given('The URL is once again {string}', function (string){
    url = new Url(string)
});
Then('The protocol is {string}', function (string)
{
    assert.equal(url.protocol,string)
});



Given('The {string} URL', function (string){
    url = new Url(string)
});
Then('The host is {string}', function (string)
{
    assert.equal(url.host,string)
});



Given('The {string} as URL', function (string){
    url = new Url(string)
});
Then('The hash value is {string}', function (string)
{
    assert.equal(url.hash,string)
});