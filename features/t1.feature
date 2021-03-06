
Feature: Manipulating URLs

Scenario: Removes all query string parameters from the URL
Given An URL is "http://example.com/?a&a=&b=&c=&d=&e=&f=&g=&h#foo"
And I delete the query parameters
Then the URL will be "http://example.com/#foo"


Scenario: Returns total count of the query string parameters
Given The URL is "http://example.com/?a"
And I count the string params
Then It should be 1


Scenario: Handling different query values
Given The URL equals "http://localhost/path?alice=123&bob=&carol"
Then The query of alice is 123
Then The query of bob is ""
Then The Query of carol is null
Then The Query of peter is undefined


Scenario: Checks if there is a query parm
Given The URL is set "http://localhost/path?benzin=draga"
Then There is param
Given The URL is set "http://localhost/path#szilya"
Then There is no param


Scenario: Gives back the char array representation of the url path
Given The URL is now "http://localhost.com/80/benzin=draga"
Then The the 0. char is "/"
Then The the 1. char is "8"
Then The the 2. char is "0"
Then The the 3. char is "/"


Scenario: Gives back the array representation of the url path
Given The URL is again "http://localhost.com/80/benzin=draga"
Then The the 0. element is "80"
Then The the 1. element is "benzin=draga"


Scenario: Returns the protocol
Given The URL is once again "http://localhost.com/80/benzin=draga"
Then The protocol is "http"
 

Scenario: Returns the host
Given The "http://localhost.com/80/benzin=draga" URL
Then The host is "localhost.com"


Scenario: Returns the hash values
Given The "http://localhost.com/80/benzin=draga#alma" as URL
Then The hash value is "alma"


Scenario: Returns the port number
Given The "http://localhost.com:60/80/benzin=draga#alma" is the URL
Then The port number is "60"
