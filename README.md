# efss readme 
This project is an Open Source project started by Alexander Viala Bellander and is under an MIT license found at the bottom of the page.

This is run as a sparetime project and is not highly prioritised.

To find the EFSS go to www.grubse.com/efss-app
For full changelog: www.grubse.com/efss

## disclaimer
I am a beginner to programming in general, thus the code is a great mess!

## airport data-base structure
The structure used for representing airports are [[String,[String, String]],[String,[String, String]]] where [] represents an array.

All airports and their runways are stored in an array.
Calling the variable data will return the array with all airports and runways currently supported

### the database
```
var data = []
```

### example of entry
```
["EKCH", ["22R/04L", "22L/04R", "30/12"]]
```
### example of database (2 entries)
```
[["EKCH", ["22R/04L", "22L/04R", "30/12"]],["EDDM",["26L/08R", "26R/08L"]]]
```

## getting runways
```
function getRunways()
```
**getRunways()** checks the input field and searches **data** for the airport or the **airport** variable if airport has been selected, if the input value or **airport** is an airport in **data**, **getRunways()** returns an array with the runways.

### example
input field value = "EKCH" OR var airport = "EKCH"
```
getRunways()
returns ["22R/04L", "22L/04R", "30/12"]
```
### getting directional runways [VERSION 0.5]
If you want to get the directional runways. ex. RWY 12 and RWY30 and NOT 12/30 as one runway. The **getDirectionalRunways** will do this for you. The **getDirectionalRunways** function expects an array with runways in format ("12/30") as an argument.

### example
with getRunways() as argument and EKCH as airport
```
getDirectionalRunways(array of runways)
returns ["04L", "04R", "12", "22L", "22R", "30"]
```

## info
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
