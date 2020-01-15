# EFSS README 
This project is an Open Source project started by Alexander Viala Bellander and is under an MIT license found at the bottom of the page.

This is run as a sparetime project and is not highly prioritised.

To find the EFSS go to www.grubse.com/efss-app
For full changelog: www.grubse.com/efss

### How to use the software
You need to create your own strips, this is done by pressing either the Departures or Arrivals text. Fill the tags, update their states respectivly by changing their state and by moving them. Removing a tag is done by dropping the tag onto the taxi text.

### Disclaimer
I am a beginner to programming in general, thus the code is a great mess!
***

## TAG HANDLER ##

### Implementation
There are the tag objects and then the tags in the html code. These are different but carry the same properties.

### Data structure
All tags are stored in a regular js array: `tags`.

### The Tag Class
`tags` contains objects of type Tag with properties:
```
    this.id
    this.cs
    this.rwy 
    this.text
    this.rule
    this.type
    this.atype
    this.state
    this.html
```
tags also have functions such as `compile()` `update()` `get()`.

`compile()` (void) assigns html code to the Tag's html property. The assigned html code depends on the assigned Tag type which is either dep (departure) or arr (arrival). 

`update()` (void) updates the website html code, the html counterpart of the object. Example, user changes the tag callsign using `tags[4].cs = "SAS1560"` this it self will not update the tag html code until `tags[4].update()` is run.

`get()` (html element) returns the actual html object/element of the tag.

***

## USER PROFILE ##

### The User Class
User data is stored locally to save certain settings for returning users. At the moment `id` `type` is not in use. The data is stored in local storage.
```
    this.id = id;
    this.type = type;
    this.lastAirport;
    this.automove = true;
    this.selectedRunways = [];
    this.selectedAirport;
```
### User initialisation
If it is the first time a user visits the service; the function `loadModal()` will create a new user with `id = 0` and `type = "all"`.
`user = new User(0, "all")`

Upon selecting an airport the `validation()` function is run. This function adapts the UI for the selected airport and other features such as automove. 
`localStorage.setItem("user_data", JSON.stringify(user))`

***

## AIRPORT DATABASE 

### Implementation
The data for all airports (ICAO) and their runways is downloaded upon website visit. `js/airportdata.js`

### Data structure
The structure used for representing airports is a js array.

Representation: [[String,[String, String]],[String,[String, String]]] where [] represents an array.

All airports and their runways are stored in an array.
Calling the variable data will return the array with all airports and runways currently supported.

### The database
```
var data = []
```

### Example of entry
```
["EKCH", ["22R/04L", "22L/04R", "30/12"]]
```
### Example of database (2 entries)
```
[["EKCH", ["22R/04L", "22L/04R", "30/12"]],["EDDM",["26L/08R", "26R/08L"]]]
```

***

## FUNCTIONS 

## Getting runways
```
function getRunways()
```
**getRunways()** checks the input field and searches **data** for the airport or the **airport** variable if airport has been selected, if the input value or **airport** is an airport in **data**, **getRunways()** returns an array with the runways.

### Example
input field value = "EKCH" OR var airport = "EKCH"
```
getRunways()
returns ["22R/04L", "22L/04R", "30/12"]
```
### Example
with getRunways() as argument and EKCH as airport
```
getDirectionalRunways(array of runways)
returns ["04L", "04R", "12", "22L", "22R", "30"]
```


## INFO
For more information, visit www.grubse.com/efss

MIT License

Copyright (c) 2018 Alexander Viala Bellander (AlexVialaBellander)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## editors note
Knowing that I am a beginner and currently a student in Computer Science for another 4 years, I have come to learn one or two things on how to develope better software. If I were to re-do this today, I would probably do it in a more class-oriented way or better said; object oriented. If anyone has any feedback or would like to contribute, please do so. I love to learn and any feedback or declaring me dumb is something I welcome.

Made with Love <3
//Alex
