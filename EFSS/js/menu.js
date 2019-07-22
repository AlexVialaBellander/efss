//Modal popup window from w3

class User {
  constructor(id, type) {
    this.id = id;
    this.type = type;
    this.lastAirport;
    this.automove = true;
    this.selectedRunways = [];
  }
}

// GLOBAL OBJECT
modal = document.getElementById('myModal')

//Loads the modal window
function loadModal() {
  modal.style.display = "block"
  user = new User(0, "all")
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

//GLOBAL VAR
optionsMenuOpened = false

function loadMenuItems() {
  selectedRunways = []
  optionsMenuOpened = true
  var idCount = 1;
  var runwayArray = getRunways()
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
    document.getElementById("cb" + idCount).checked = true;
    check(document.getElementById("cb" + idCount))
    idCount++
  }
}

//e = innerText of checkbox input label (rwy)
var selectedRunways = []

function check(e) {
  e = e.parentNode.childNodes[3].innerText
  if (selectedRunways.indexOf(e) == -1) {
    selectedRunways.push(e)
  } else {
    selectedRunways.splice(selectedRunways.indexOf(e), 1)
  }
}
