//Modal popup window from w3

class User {
  constructor(id, type) {
    this.id = id;
    this.type = type;
    this.lastAirport;
    this.automove = true;
    this.selectedRunways = [];
    this.selectedAirport;
  }
}

// GLOBAL OBJECT
modal = document.getElementById('myModal')
storedUser = JSON.parse(localStorage.getItem("user_data"))
user = JSON.parse(localStorage.getItem("user_data"))

//Loads the modal window
function loadModal() {
  modal.style.display = "block"
  if (storedUser != null) {
    document.getElementById("field").value = storedUser.selectedAirport
    displayFound()
  } else {
    user = new User(0, "all")
  }
}

//Listen for keypress "enter"
document.getElementById("field").addEventListener("keydown", function(e) {
  if (e.code == "Enter") {
    validation()
  }
})

//Extends the options menu and rotate arrow icon
optionsMenu = document.getElementById("optionsMenu")
arrowIcon = document.getElementById("arrowIcon")
document.getElementById("options").addEventListener("click", function() {
  airport = document.getElementById("field").value
  if (validInput()) {
    optionsMenu.classList.toggle("is-active")
    arrowIcon.classList.toggle("is-active")
    loadMenuItems()
  }
})

//user input feedback icon
function inputFeedback() {
  if (validInput()) {
    displayFound()
  } else {
    displayNotFound()
  }
  if (user.selectedAirport != storedUser.selectedAirport) {
    user.selectedRunways = []
  }
}
//Call field feedback
function displayFound(){
  document.getElementById("status").classList.add("found")
  document.getElementById("status").src = "images/indb.png"
}

function displayNotFound(){
  document.getElementById("status").classList.add("notfound")
  document.getElementById("status").src = "images/notindb.png"
}
//search db for input value, returns boolean
function validInput() {
  var airport = document.getElementById("field").value.toUpperCase()
  user.selectedAirport = airport
  var found = false
  for (i = 0; i < data.length && !found; i++) {
    if (airport == data[i][0]) {
      found = true
      return true
    }
  }
  if (!found) {
    optionsMenu.classList.remove("is-active")
    arrowIcon.classList.remove("is-active")
    return false
  }
}

function loadMenuItems() {
  if (user.selectedAirport != document.getElementById("field").value.toUpperCase()) {
    user.selectedAirport = ""
    user.selectedRunways = []
  }
  loadMenuRunways(user.selectedRunways)
}

function loadMenuRunways(selectedRunways){
  var idCount = 1;
  var runwayArray = getRunways()
  if (selectedRunways.length == 0) {
    user.selectedRunways = runwayArray
    selectedRunways = runwayArray
  }
  var x = document.getElementById("wrapperOption")
  var xF = document.getElementById("father")
  x.remove(x.selectedIndex)
  xF.insertAdjacentHTML("afterend", wrapperOptionHTML)
  for (let index of runwayArray) {
    var nUpdate1 = rwyContent.search("!")
    rwyContentTemp = spliceSlice(rwyContent, nUpdate1, 1, idCount)
    var nUpdate2 = rwyContentTemp.search("!")
    rwyContentTemp = spliceSlice(rwyContentTemp, nUpdate2, 1, idCount)
    var nUpdate3 = rwyContentTemp.search("XX")
    rwyContentTemp = spliceSlice(rwyContentTemp, nUpdate3, 2, runwayArray[
      idCount - 1])
    var d = document.getElementById("rwyConfig")
    d.insertAdjacentHTML("afterend", rwyContentTemp)
    if (selectedRunways.includes(index)){
      document.getElementById("cb" + idCount).checked = true;
    } else {
      document.getElementById("cb" + idCount).checked = false;
    }
    check(document.getElementById("cb" + idCount))
    idCount++
  }
}

function check(e) {
  debugger
  if (e.parentNode.childNodes[1].checked == true){
    if (!(user.selectedRunways.includes(e.parentNode.childNodes[3].innerHTML))){
      user.selectedRunways.push(e.parentNode.childNodes[3].innerHTML)
    }
  } else {
    if (user.selectedRunways.includes(e.parentNode.childNodes[3].innerHTML)){
      user.selectedRunways.splice((user.selectedRunways.indexOf(e.parentNode.childNodes[3].innerHTML)), 1)
    }
  }
}

//Change airport, listen on enter key press down event
directionalRWYS = []
runways = []

//Returns array of runways
function getRunways() {
  var airport = document.getElementById("field").value.toUpperCase()
  var done = false
  for (i = 0; i < data.length && !done; i++) {
    if (airport == data[i][0]) {
      done = true
      return (data[i][1])
    }
  }
}

//run validation, if input is valid: spawn dropzones and load runways
function validation() {
  var airport = document.getElementById("field").value.toUpperCase()
  debugger
  if (validInput(airport) && ((user.selectedRunways.length != 0))) {
    user.selectedAirport = airport
    localStorage.setItem("user_data", JSON.stringify(user))
    var modal = document.getElementById("myModal")
    modal.classList.add("fade")
    setTimeout(function() {
      modal.style.display = "none";
    }, 300);
    loadGUIRunways()
    spawnDropZone(airport)
  } else {
    alert("WIP no forward wrong input")
  }
}

//Global flag
//Get airport data & add runways
done = false

function loadGUIRunways() {
  var targetDiv2 = document.getElementById("ctxMenu")
  var targetDiv = document.getElementById("runway")
  targetDiv.innerHTML = ""
  var runwayCount = 0
  for (z = 0; z < user.selectedRunways.length; z++) {
    //Add runways under runway section
    var n = runwayHTML.search("rwy")
    var withID = spliceSlice(runwayHTML, (n + 3), 0, runwayCount)
    var nn = withID.search("LOADING")
    var rwyHTML = spliceSlice(withID, nn, 7, "RUNWAY " + user.selectedRunways[z])
    targetDiv.insertAdjacentHTML("afterbegin", rwyHTML)
    //Add runways in contextmenu
    var nnn = menuItem.search("rwy")
    var withID2 = spliceSlice(menuItem, (nnn + 3), 0, runwayCount)
    var nnnn = withID2.search("RUNWAY")
    var menuItemHTML = spliceSlice(withID2, nnnn, 6, user.selectedRunways[z])
    targetDiv2.insertAdjacentHTML("beforeend", menuItemHTML)
    runwayCount++
  }
  //Split each runway. ex 12/30 --> 12, 30
  for (y = 0; y < user.selectedRunways.length; y++) {
    directionalRWYS = directionalRWYS.concat(user.selectedRunways[y].split("/")).sort()
  }
  var htmlTags = [defaultTag, arrTag]
  for (z = 0; z < 2; z++) {
    var tempTagRWYSel = tagRWYSel
    var nTag = htmlTags[z].search("%")
    var nVal = tempTagRWYSel.search("%")
    var nDis = tempTagRWYSel.search("5")
    var removeVal = 1
    var removeDis = 1
    var y = 2
    for (i = 0; i < directionalRWYS.length; i++) {
      if (y > 0) {
        tempTagRWYSel = spliceSlice(tempTagRWYSel, nVal, removeVal,
          directionalRWYS[i])
        nDis = tempTagRWYSel.search("5")
        tempTagRWYSel = spliceSlice(tempTagRWYSel, nDis, removeDis,
          directionalRWYS[i])
        removeDis = directionalRWYS[i].length
        removeVal = directionalRWYS[i].length
        htmlTags[z] = spliceSlice(htmlTags[z], nTag, 1, tempTagRWYSel)
        y--
      }
      y--
      if (y < 0) {
        nTag = nTag + tempTagRWYSel.length
        nVal = tempTagRWYSel.search(directionalRWYS[i - 1])
        tempTagRWYSel = spliceSlice(tempTagRWYSel, nVal, removeVal,
          directionalRWYS[i])
        nDis = tempTagRWYSel.search(directionalRWYS[i - 1])
        tempTagRWYSel = spliceSlice(tempTagRWYSel, nDis, removeDis,
          directionalRWYS[i])
        removeDis = directionalRWYS[i].length
        removeVal = directionalRWYS[i].length
        htmlTags[z] = spliceSlice(htmlTags[z], nTag, 0, tempTagRWYSel)
      }
    }
  }
  defaultTag = htmlTags[0]
  arrTag = htmlTags[1]
}
