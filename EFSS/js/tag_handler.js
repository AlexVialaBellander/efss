//This js file contains relevant methods that are used when handling tags
//common notation, p = parent, t = this, v = value

//GLOBAL VAR
rightClickObjectId = ""
tags = [];

class Tag {
  constructor(id, type) {
    this.id = id;
    this.cs = "CS";
    this.rwy = "rwy";
    this.text = "TEXT";
    this.rule = "RULE";
    this.type = type;
    this.atype = "TYPE";
    this.state;
    this.html;
    this.compile()
  }
  compile() {
    switch (this.type) {
      case "dep":
        this.html = defaultTag
        this.state = "stby"
        break
      case "arr":
        this.html = arrTag
        this.state = "enr"
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
  get() {
    return document.getElementById(this.id)
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
    debugger
    checkWarning(tagsVs, cat)
    switch (trigger) {
      case "moveUpdate":
        updateMenu(t, cat)
        break
      case "stateUpdate":
        tags[t.id].state = vS
        if (user.automove) {
          autoMove(vS, vR, t)
        }
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
  if (p.id[0] != "r") {
    p.children[0].classList.remove("warning", "semiConcerned")
    p.children[0].children[2].classList.remove("warning", "semiConcerned")
  }
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
  debugger
  if (vS == "lu" || vS == "to" || vS == "to" || vS == "f") {
    for (i = 0; i < user.selectedRunways.length && !found; i++) {
      if (user.selectedRunways[i].indexOf(rwy) != -1) {
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
  tags[t.id].update()
}

//Creates Drag and Drop zones using the Sortable library
function spawnDropZone() {
  Sortable.create(trash, {
    group: 'tag',
    onAdd: function(evt) {
      this.el.removeChild(evt.item)
    }
  })
  Sortable.create(dep, {
    group: 'tag',
    animation: 200,
    onAdd: function(evt) {
      update(evt.item.children[2].value, evt.item.children[1].value, evt.item
        .parentNode, evt.item, "moveUpdate")
    }
  })
  Sortable.create(arr, {
    group: 'tag',
    animation: 200,
    onAdd: function(evt) {
      update(evt.item.children[2].value, evt.item.children[1].value, evt.item
        .parentNode, evt.item, "moveUpdate")
    }
  })
  Sortable.create(push, {
    group: 'tag',
    animation: 200,
    onAdd: function(evt) {
      update(evt.item.children[2].value, evt.item.children[1].value, evt.item
        .parentNode, evt.item, "moveUpdate")
    }
  })
  Sortable.create(taxi, {
    group: 'tag',
    animation: 200,
    onAdd: function(evt) {
      debugger
      update(evt.item.children[2].value, evt.item.children[1].value, evt.item
        .parentNode, evt.item, "moveUpdate")
    }
  })
  Sortable.create(rwy, {
    group: 'tag',
    animation: 200,
    onAdd: function(evt) {
      update(evt.item.children[2].value, evt.item.children[1].value, evt.item
        .parentNode, evt.item, "moveUpdate")
    },
    onRemove: function(evt) {
      update(evt.item.children[2].value, evt.item.children[1].value, evt.from,
        evt.item, "moveUpdate")
    },
  })
  if (user.selectedRunways.length < 2) return
  Sortable.create(rwy1, {
    group: 'tag',
    animation: 200,
    onAdd: function(evt) {
      update(evt.item.children[2].value, evt.item.children[1].value, evt.item
        .parentNode, evt.item, "moveUpdate")
    },
    onRemove: function(evt) {
      update(evt.item.children[2].value, evt.item.children[1].value, evt.from,
        evt.item, "moveUpdate")
    },
  })
  if (user.selectedRunways.length < 3) return
  Sortable.create(rwy2, {
    group: 'tag',
    animation: 200,
    onAdd: function(evt) {
      update(evt.item.children[2].value, evt.item.children[1].value, evt.item
        .parentNode, evt.item, "moveUpdate")
    },
    onRemove: function(evt) {
      update(evt.item.children[2].value, evt.item.children[1].value, evt.from,
        evt.item, "moveUpdate")
    },
  })
  if (user.selectedRunways.length < 4) return
  Sortable.create(rwy3, {
    group: 'tag',
    animation: 200,
    onAdd: function(evt) {
      update(evt.item.children[2].value, evt.item.children[1].value, evt.item
        .parentNode, evt.item, "moveUpdate")
    },
    onRemove: function(evt) {
      update(evt.item.children[2].value, evt.item.children[1].value, evt.from,
        evt.item, "moveUpdate")
    },
  })
  if (user.selectedRunways.length < 5) return
  Sortable.create(rwy4, {
    group: 'tag',
    animation: 200,
    onAdd: function(evt) {
      update(evt.item.children[2].value, evt.item.children[1].value, evt.item
        .parentNode, evt.item, "moveUpdate")
    },
    onRemove: function(evt) {
      update(evt.item.children[2].value, evt.item.children[1].value, evt.from,
        evt.item, "moveUpdate")
    },
  })
  if (user.selectedRunways.length < 6) return
  Sortable.create(rwy5, {
    group: 'tag',
    animation: 200,
    onAdd: function(evt) {
      update(evt.item.children[2].value, evt.item.children[1].value, evt.item
        .parentNode, evt.item, "moveUpdate")
    },
    onRemove: function(evt) {
      update(evt.item.children[2].value, evt.item.children[1].value, evt.from,
        evt.item, "moveUpdate")
    },
  })
  if (user.selectedRunways.length < 7) return
  Sortable.create(rwy6, {
    group: 'tag',
    animation: 200,
    onAdd: function(evt) {
      update(evt.item.children[2].value, evt.item.children[1].value, evt.item
        .parentNode, evt.item, "moveUpdate")
    },
    onRemove: function(evt) {
      update(evt.item.children[2].value, evt.item.children[1].value, evt.from,
        evt.item, "moveUpdate")
    },
  })
  if (user.selectedRunways.length < 8) return
  Sortable.create(rwy7, {
    group: 'tag',
    animation: 200,
    onAdd: function(evt) {
      update(evt.item.children[2].value, evt.item.children[1].value, evt.item
        .parentNode, evt.item, "moveUpdate")
    },
    onRemove: function(evt) {
      update(evt.item.children[2].value, evt.item.children[1].value, evt.from,
        evt.item, "moveUpdate")
    },
  })
  if (user.selectedRunways.length < 9) return
  Sortable.create(rwy8, {
    group: 'tag',
    animation: 200,
    onAdd: function(evt) {
      update(evt.item.children[2].value, evt.item.children[1].value, evt.item
        .parentNode, evt.item, "moveUpdate")
    },
    onRemove: function(evt) {
      update(evt.item.children[2].value, evt.item.children[1].value, evt.from,
        evt.item, "moveUpdate")
    },
  })
  if (user.selectedRunways.length < 10) return
  Sortable.create(rwy9, {
    group: 'tag',
    animation: 200,
    onAdd: function(evt) {
      update(evt.item.children[2].value, evt.item.children[1].value, evt.item
        .parentNode, evt.item, "moveUpdate")
    },
    onRemove: function(evt) {
      update(evt.item.children[2].value, evt.item.children[1].value, evt.from,
        evt.item, "moveUpdate")
    },
  })
  if (user.selectedRunways.length < 11) return
  Sortable.create(rwy10, {
    group: 'tag',
    animation: 200,
    onAdd: function(evt) {
      update(evt.item.children[2].value, evt.item.children[1].value, evt.item
        .parentNode, evt.item, "moveUpdate")
    },
    onRemove: function(evt) {
      update(evt.item.children[2].value, evt.item.children[1].value, evt.from,
        evt.item, "moveUpdate")
    },
  })

}
