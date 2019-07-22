//This js file contains relevant methods that are used when handling tags
//common notation, p = parent, t = this, v = value

//GLOBAL VAR
rightClickObjectId = ""
tags = [];

class Tag {
  constructor(id, type) {
    this.id = id;
    this.cs;
    this.rwy;
    this.text;
    this.rule;
    this.type = type;
    this.atype;
    this.state;
    this.html;
    this.compile()
  }
  compile() {
    switch (this.type) {
      case "dep":
        this.html = defaultTag
        break
      case "arr":
        this.html = arrTag
        break
    }
  }
  update() {
    var textFields = document.getElementById(this.id).childNodes[1].childNodes
    textFields[1].innerHTML = this.cs
    textFields[3].innerHTML = this.text
    textFields[5].innerHTML = this.atype
    textFields[7].innerHTML = this.rule
    document.getElementById(this.id).childNodes[3].value = this.rwy
    document.getElementById(this.id).childNodes[5].value = this.state
  }
}

function newTag(divID, type) {
  var divToInject = document.getElementById(divID)
  var newTag = new Tag(tagidCount, type)
  tags.push(newTag)
  newTag.html = newTag.html.replace("tagid", tagidCount)
  divToInject.insertAdjacentHTML("afterbegin", newTag.html)
  tagidCount++
}

//Generate New tag and add eventlister for context menu
var tagidCount = 0

//globar var for the field input on tag
input = ""

//Removes text when pressing on field
function removeOnFocus(obj) {
  input = obj.innerHTML
  obj.innerHTML = ""
}

//If nothing in field return the old value
function placeholderOnBlur(obj, v) {
  if (obj.innerHTML == "") {
    obj.innerHTML = input
  }
  switch (v) {
    case "cs":
      tags[obj.parentNode.parentNode.id].cs = obj.innerHTML
      break;
    case "rwy":
      tags[obj.parentNode.parentNode.id].rwy = obj.innerHTML
      break;
    case "atype":
      tags[obj.parentNode.parentNode.id].atype = obj.innerHTML
      break;
    case "rule":
      tags[obj.parentNode.parentNode.id].rule = obj.innerHTML
      break;
    case "text":
      tags[obj.parentNode.parentNode.id].text = obj.innerHTML
      break;
    case "state":
      tags[obj.parentNode.parentNode.id].state = obj.innerHTML
      break;
  }
}


//touch support move function
function move(destination) {
  var tag = document.getElementById(rightClickObjectId)
  document.getElementById(destination).appendChild(tag)
  update(tag.children[2].value, tag.children[1].value, tag.parentNode, tag,
    "moveUpdate")
}

function update(vS, vR, cat, t, trigger) {
  if (t.parentNode.id == cat.id) {
    var tagsHTML = cat.children
    var tagsVs = []
    for (i = 0; i < cat.children.length; i++) {
      tagsVs.push(tagsHTML[i].children[2].value)
    }
    checkWarning(tagsVs, cat)
    switch (trigger) {
      case "moveUpdate":
        updateMenu(t, cat)
        break
      case "stateUpdate":
        tags[t.id].state = vS
        autoMove(vS, vR, t)
        debugger
        releaseStatus(cat, vS, t)
        break
      case "rwyUpdate":
        tags[t.id].rwy = vS
        break
    }
  }
}

function releaseStatus(cat, vS, t) {
  switch (cat.id) {
    case "arr":
      if (vS == "f") {
        t.classList.add("releaseRWY");
      }
      break;
  }
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
  debugger
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
  tags[t.id].update()
}
