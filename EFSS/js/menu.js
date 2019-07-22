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

//Loads the modal window
function loadModal() {
  modal.style.display = "block"
  var user_data = localStorage.getItem("user_data")
  if (user_data != "") {
    user = JSON.parse(user_data)
    document.getElementById("field").value = user.selectedAirport
    inputFeedback()
  } else {
    user = new User(0, "all")
  }
}

//Extends the options menu and rotate arrow icon
optionsMenu = document.getElementById("optionsMenu")
arrowIcon = document.getElementById("arrowIcon")
document.getElementById("options").addEventListener("click", function() {
  airport = document.getElementById("field").value
  if (airport.length == 4 && searchInput()) {
    optionsMenu.classList.toggle("is-active")
    arrowIcon.classList.toggle("is-active")
    loadMenuItems()
  }
})

//user input feedback icon
function inputFeedback() {
  var status = document.getElementById("status")
  if (searchInput()) {
    status.classList.add("found")
    status.src = "images/indb.png"
  } else {
    status.classList.add("notfound")
    status.src = "images/notindb.png"
  }
}

//search db for input value, returns boolean
function searchInput() {
  var airport = document.getElementById("field").value.toUpperCase()
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

//Listen for keypress "enter"
document.getElementById("field").addEventListener("keydown", function(e) {
  if (e.keyCode === 13) {
    validate(e)
  }
})


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
function validate(e) {
  var airport = document.getElementById("field").value.toUpperCase()
  if (!optionsMenuOpened) {
    user.selectedRunways = getRunways()
  }
  if (searchInput(airport) && user.selectedRunways.length != 0) {
    var modal = document.getElementById("myModal")
    modal.classList.add("fade")
    setTimeout(function() {
      modal.style.display = "none";
    }, 300);
    loadRunways()
    spawnDropZone(airport)
    console.log("Loaded:".concat(airport))
    user.selectedAirport = airport
    console.log("Loaded:".concat(user.selectedRunways))
    localStorage.setItem("user_data", JSON.stringify(user))
    console.log("Stored:".concat(JSON.stringify(user)))

  }

}

//Global flag
//Get airport data & add runways
done = false

function loadRunways() {
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


//GLOBAL VAR
optionsMenuOpened = false

function loadMenuItems() {
  if (user.selectedAirport != document.getElementById("field").value.toUpperCase) {
    user.selectedAirport = ""
    user.selectedRunways = []
  }
  optionsMenuOpened = true
  var idCount = 1;
  var runwayArray = getRunways()
  var x = document.getElementById("wrapperOption")
  var xF = document.getElementById("father")
  x.remove(x.selectedIndex)
  xF.insertAdjacentHTML("afterend", wrapperOptionHTML)
  for (let index of runwayArray) {
    debugger
    var nUpdate1 = rwyContent.search("!")
    rwyContentTemp = spliceSlice(rwyContent, nUpdate1, 1, idCount)
    var nUpdate2 = rwyContentTemp.search("!")
    rwyContentTemp = spliceSlice(rwyContentTemp, nUpdate2, 1, idCount)
    var nUpdate3 = rwyContentTemp.search("XX")
    rwyContentTemp = spliceSlice(rwyContentTemp, nUpdate3, 2, runwayArray[
      idCount - 1])
    var d = document.getElementById("rwyConfig")
    d.insertAdjacentHTML("afterend", rwyContentTemp)
    document.getElementById("cb" + idCount).checked = false;
    check(document.getElementById("cb" + idCount))
    idCount++
  }
}

function selectedRunways() {
  for (i = 0; i < getRunways().length; i++) {
    check(document.getElementById("cb" + i))
  }
}

//e = innerText of checkbox input label (rwy)
function check(e) {
  e = e.parentNode.childNodes[3].innerText
  if (user.selectedRunways.indexOf(e) == -1) {
    user.selectedRunways.push(e)
  } else {
    user.selectedRunways.splice(user.selectedRunways.indexOf(e), 1)
  }
}
