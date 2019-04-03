//This js file contains relevant methods that are used when handling tags
//common notation, p = parent, t = this, v = value

//GLOBAL VAR
rightClickObjectId = ""

//Generate New tag and add eventlister for context menu
var tagidCount = 0

function newTag(divId) {
  var newTag
  var divToInject = document.getElementById(divId)
  divId == "dep" ? newTag = defaultTag : newTag = arrTag
  var idToChange = ["tagid", "callsignid", "textid", "typeid", "ruleid"]
  for (let id of idToChange) {
    newTag = newTag.replace(id, id.concat(tagidCount))
  }
  divToInject.insertAdjacentHTML("afterbegin", newTag)
    //Create eventlister for contextmenu
  var newTagDiv = document.getElementById("tagid".concat(tagidCount))
  var body = document.getElementsByTagName("body")[0]
    //add eventlister for context menu on every new generated tag
  newTagDiv.addEventListener("contextmenu", function(event) {
    event.preventDefault()
      //get id from event target
    var target = event.target || event.srcElement
    rightClickObjectId = ("tagid").concat((target.id).substr(target.id.length -
        1))
      //run context menu
    var ctxMenu = document.getElementById("ctxMenu")
    ctxMenu.style.display = "block"
    ctxMenu.style.left = (event.pageX - 10) + "px"
    ctxMenu.style.top = (event.pageY - 10) + "px"
  }, false)
  body.addEventListener("click", function(event) {
    var ctxMenu = document.getElementById("ctxMenu")
    ctxMenu.style.display = ""
    ctxMenu.style.left = ""
    ctxMenu.style.top = ""
  }, false)
  tagidCount++
}

function checkWarning(tags, p) {
  var semiConcernedValues = ["lu"]
  var concernedValues = ["to", "lnd", "tgo", "lpass"]
  var concernedIndexes = []
  var semiConcernedIndexes = []
  var unconcernedIndexes = []
  var concerned = 0
  for (i = 0; i < tags.length; i++) {
    if (concernedValues.indexOf(tags[i]) != -1) {
      concerned++
      concernedIndexes.push(i)
    } else if (semiConcernedValues.indexOf(tags[i]) != -1) {
      semiConcernedIndexes.push(i)
    } else {
      unconcernedIndexes.push(i)
    }
  }
  for (let i of unconcernedIndexes) {
    p.children[i].classList.remove("warning", "semiConcerned")
    p.children[i].children[2].classList.remove("warning", "semiConcerned")
  }
  if (p.id[0] == "r") {
    for (let i of semiConcernedIndexes) {
      p.children[i].classList.add("semiConcerned")
      p.children[i].children[2].classList.add("semiConcerned")
    }
  }

  if (concerned == 1) {
    p.children[concernedIndexes[0]].classList.remove("warning", "semiConcerned")
    p.children[concernedIndexes[0]].children[2].classList.remove("warning",
      "semiConcerned")
    if (p.id[0] == "r") {
      p.children[concernedIndexes[0]].classList.add("semiConcerned")
      p.children[concernedIndexes[0]].children[2].classList.add("semiConcerned")
    }
  }
  if (p.id[0] == "r" && (concerned > 1)) {
    warning(concernedIndexes, p)
  }
}

function warning(indexes, p) {
  for (let i of indexes) {
    p.children[i].classList.remove("semiConcerned")
    p.children[i].children[2].classList.remove("semiConcerned")
    p.children[i].classList.add("warning")
    p.children[i].children[2].classList.add("warning")
  }
}

function autoMove(vS, vR, t) {
  var rwy = vR
  var found = false
  var destination = ""
  rightClickObjectId = t.id
  if (vS == "lu" || vS == "to" || vS == "to" || vS == "f") {
    for (i = 0; i < selectedRunways.length && !found; i++) {
      if (selectedRunways[i].indexOf(rwy) != -1) {
        if (i == 0) {
          found = true
          destination = "rwy"
        } else {
          found = true
          destination = ("rwy").concat(i)
        }
      }
    }
    move(destination)
  }
  if (vS == "clrd") {
    move("push")
  }
  if (vS == "taxi") {
    move("taxi")
  }
}

function updateMenu(t, cat) {
  if (cat.id[0] == "r" && t.classList.contains("arr")) {
    t.children[2].innerHTML = ""
    t.children[2].insertAdjacentHTML("beforeend", arrivalOptionsFinal)
  }
  if (cat.id[0] == "t" && t.classList.contains("arr")) {
    t.children[2].innerHTML = ""
    t.children[2].insertAdjacentHTML("beforeend", arrivalOptionsTaxi)
  }
  if (cat.id[0] == "p" && t.classList.contains("arr")) {
    t.children[2].innerHTML = ""
    t.children[2].insertAdjacentHTML("beforeend", arrivalOptionsPush)
  }
  if (cat.id[0] == "d" && t.classList.contains("dep")) {
    t.children[2].innerHTML = ""
    t.children[2].insertAdjacentHTML("beforeend", departureOptionsDefault)
  }
  if (cat.id[0] == "p" && t.classList.contains("dep")) {
    t.children[2].innerHTML = ""
    t.children[2].insertAdjacentHTML("beforeend", departureOptionsPush)
  }
  if (cat.id[0] == "t" && t.classList.contains("dep")) {
    t.children[2].innerHTML = ""
    t.children[2].insertAdjacentHTML("beforeend", departureOptionsTaxi)
  }
  if (cat.id[0] == "r" && t.classList.contains("dep")) {
    t.children[2].innerHTML = ""
    t.children[2].insertAdjacentHTML("beforeend", departureOptionsDep)
  }
}
