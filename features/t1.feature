
Feature: Manipulating URLs

Scenario: Removes all query string parameters from the URL
Given An URL is "http://example.com/?a&a=&b=&c=&d=&e=&f=&g=&h#foo"
And I delete the query parameters
Then the URL will be "http://example.com/#foo"


Scenario: Returns total count of the query string parameters
Given The URL is "http://example.com/?a"
And I count the string params
Then It should be 1
Given The URL is "http://example.com/?*342332"
And I count the string params
Then It should be 0
Given The URL is "http://example.com/?a232323Ab"
And I count the string params
Then It should be 3