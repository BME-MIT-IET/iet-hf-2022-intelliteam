Feature: clear query

Scenario: No query params left
Given An URL is "http://example.com/?a&a=&b=&c=&d=&e=&f=&g=&h#foo"
And I delete the query parameters
Then the URL will be "http://example.com/#foo"