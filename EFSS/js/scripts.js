/*! EFSS MIT | github.com/AlexVialaBellander/efss */
//Modal popup window from w3
// Get the modal
modal = document.getElementById('myModal')

// Get the <span> element that closes the modal
span = document.getElementsByClassName("close")[0]

//Loads the modal window
function loadModal() {
  modal.style.display = "block"
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

//Change airport, listen on enter key press down event
directionalRWYS = []
runways = []
submit = document.getElementById("field")
  //Listen on enter press runvalidate
submit.addEventListener("keydown", function(e) {
  if (e.keyCode === 13) {
    validate(e)
  }
})

tagidCount = 0


//globar var for the field input on tag
input = ""
  //Removes text when pressing on field
function removeOnFocus(id) {
  input = document.getElementById(id).innerHTML
  document.getElementById(id).innerHTML = ""
}
//If nothing in field return the old value
function placeholderOnBlur(id) {
  var x = document.getElementById(id).innerHTML
  if (x == "") {
    document.getElementById(id).innerHTML = input
  }
}

ele = document.getElementById("here")
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
    var ele = document.getElementById("here")
    ele.insertAdjacentHTML("afterend", rwyContentTemp)
    document.getElementById("cb" + idCount).checked = true;
    check(document.getElementById("cb" + idCount))
    idCount++
  }
}

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

/* When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none"
    }
  }
  */

//run validation, if input is valid: spawn dropzones and load runways
function validate(e) {
  var airport = document.getElementById("field").value.toUpperCase()
  if (!optionsMenuOpened) {
    selectedRunways = getRunways()
  }
  if (searchInput(airport) && selectedRunways.length != 0) {
    var modal = document.getElementById("myModal")
    modal.classList.add("fade")
    setTimeout(function() {
      modal.style.display = "none";
    }, 300);
    console.log("Loaded:".concat(airport))
    loadRunways(airport)
    spawnDropZone(airport)
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
  for (z = 0; z < selectedRunways.length; z++) {
    //Add runways under runway section
    var n = runwayHTML.search("rwy")
    var withID = spliceSlice(runwayHTML, (n + 3), 0, runwayCount)
    var nn = withID.search("LOADING")
    var rwyHTML = spliceSlice(withID, nn, 7, "RUNWAY " + selectedRunways[z])
    targetDiv.insertAdjacentHTML("afterbegin", rwyHTML)
      //Add runways in contextmenu
    var nnn = menuItem.search("rwy")
    var withID2 = spliceSlice(menuItem, (nnn + 3), 0, runwayCount)
    var nnnn = withID2.search("RUNWAY")
    var menuItemHTML = spliceSlice(withID2, nnnn, 6, selectedRunways[z])
    targetDiv2.insertAdjacentHTML("beforeend", menuItemHTML)
    runwayCount++
  }
  //Split each runway. ex 12/30 --> 12, 30
  for (y = 0; y < selectedRunways.length; y++) {
    directionalRWYS = directionalRWYS.concat(selectedRunways[y].split("/")).sort()
  }
  var htmlTags = [defaultTag, arrTag]
  for (z = 0; z < 2; z++) {
    debugger
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


id = ""
  //Generate New tag and add eventlister for context menu
function newTag(divId) {
  var newTag = defaultTag
  if (divId == "arr") {
    newTag = arrTag
    newTag = spliceSlice(newTag, newTag.search("ins"), 0,
      "arr ")
  }
  if (divId == "dep") {
    newTag = spliceSlice(newTag, newTag.search("ins"), 0,
      "dep ")
  }
  var idToChange = ["tagid", "callsignid", "textid", "typeid", "ruleid"]
  for (i = 0; i < idToChange.length; i++) {
    newTag = newTag.replace(idToChange[i], idToChange[i].concat(tagidCount))
  }
  var divToInject = document.getElementById(divId)

  divToInject.insertAdjacentHTML("afterbegin", newTag)
  if (divId == "arr") {
    document.getElementById("tagid".concat(tagidCount)).classList.add("arr")
  }
  if (divId == "dep") {
    document.getElementById("tagid".concat(tagidCount)).classList.add("dep")
  }
  //Create eventlister for contextmenu
  var newTagDiv = document.getElementById("tagid".concat(tagidCount))
  var body = document.getElementsByTagName("body")[0]
    //add eventlister for context menu on every new generated tag
  newTagDiv.addEventListener("contextmenu", function(event) {
    event.preventDefault()
      //get id from event target
    var target = event.target || event.srcElement
    id = ("tagid").concat((target.id).substr(target.id.length - 1))
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

//touch support move function
function move(destination) {
  debugger
  var tag = document.getElementById(id)
  document.getElementById(destination).appendChild(tag)
  state(tag.children[2].value, tag.parentNode)
}

function state(v, p) {
  debugger
  var childHTML = p.children
  var tags = []
  for (i = 0; i < p.children.length; i++) {
    tags.push(childHTML[i].children[2].value)
  }
  checkWarning(tags, p)
}

concernedValues = ["to", "lnd", "tgo", "lpass"]
semiConcernedValues = ["lu"]

function checkWarning(tags, p) {

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

//Splice string function
function spliceSlice(str, index, count, add) {
  // We cannot pass negative indexes directly to the 2nd slicing operation.
  if (index < 0) {
    index = str.length + index
    if (index < 0) {
      index = 0
    }
  }
  return str.slice(0, index) + (add || "") + str.slice(index + count)
}


//Creates Drag and Drop zones using the Sortable library
function spawnDropZone() {
  Sortable.create(trash, {
    group: "tag",
    onAdd: function(evt) {
      this.el.removeChild(evt.item)
    }
  })
  Sortable.create(dep, {
    group: 'tag',
    animation: 100,
    onAdd: function(evt) {
      state(evt.item.children[2].value, evt.item.parentNode)
    }
  })
  Sortable.create(arr, {
    group: 'tag',
    animation: 100,
    onAdd: function(evt) {
      state(evt.item.children[2].value, evt.item.parentNode)
    }
  })
  Sortable.create(push, {
    group: 'tag',
    animation: 100,
    onAdd: function(evt) {
      state(evt.item.children[2].value, evt.item.parentNode)
    }
  })
  Sortable.create(taxi, {
    group: 'tag',
    animation: 100,
    onAdd: function(evt) {
      state(evt.item.children[2].value, evt.item.parentNode)
    }
  })
  Sortable.create(rwy, {
    group: 'tag',
    animation: 100,
    onAdd: function(evt) {
      state(evt.item.children[2].value, evt.item.parentNode)
    },
    onRemove: function(evt) {
      state(evt.item.children[2].value, evt.from)
    },
  })
  Sortable.create(rwy1, {
    group: 'tag',
    animation: 100,
    onAdd: function(evt) {
      state(evt.item.children[2].value, evt.item.parentNode)
    },
    onRemove: function(evt) {
      state(evt.item.children[2].value, evt.from)
    },
  })
  Sortable.create(rwy2, {
    group: 'tag',
    animation: 100,
    onAdd: function(evt) {
      state(evt.item.children[2].value, evt.item.parentNode)
    },
    onRemove: function(evt) {
      state(evt.item.children[2].value, evt.from)
    },
  })
  Sortable.create(rwy3, {
    group: 'tag',
    animation: 100,
    onAdd: function(evt) {
      state(evt.item.children[2].value, evt.item.parentNode)
    },
    onRemove: function(evt) {
      state(evt.item.children[2].value, evt.from)
    },
  })
  Sortable.create(rwy4, {
    group: 'tag',
    animation: 100,
    onAdd: function(evt) {
      state(evt.item.children[2].value, evt.item.parentNode)
    },
    onRemove: function(evt) {
      state(evt.item.children[2].value, evt.from)
    },
  })
  Sortable.create(rwy5, {
    group: 'tag',
    animation: 100,
    onAdd: function(evt) {
      state(evt.item.children[2].value, evt.item.parentNode)
    },
    onRemove: function(evt) {
      state(evt.item.children[2].value, evt.from)
    },
  })
  Sortable.create(rwy6, {
    group: 'tag',
    animation: 100,
    onAdd: function(evt) {
      state(evt.item.children[2].value, evt.item.parentNode)
    },
    onRemove: function(evt) {
      state(evt.item.children[2].value, evt.from)
    },
  })
  Sortable.create(rwy7, {
    group: 'tag',
    animation: 100,
    onAdd: function(evt) {
      state(evt.item.children[2].value, evt.item.parentNode)
    },
    onRemove: function(evt) {
      state(evt.item.children[2].value, evt.from)
    },
  })
  Sortable.create(rwy8, {
    group: 'tag',
    animation: 100,
    onAdd: function(evt) {
      state(evt.item.children[2].value, evt.item.parentNode)
    },
    onRemove: function(evt) {
      state(evt.item.children[2].value, evt.from)
    },
  })
  Sortable.create(rwy9, {
    group: 'tag',
    animation: 100,
    onAdd: function(evt) {
      state(evt.item.children[2].value, evt.item.parentNode)
    },
    onRemove: function(evt) {
      state(evt.item.children[2].value, evt.from)
    },
  })
  Sortable.create(rwy10, {
    group: 'tag',
    animation: 100,
    onAdd: function(evt) {
      state(evt.item.children[2].value, evt.item.parentNode)
    },
    onRemove: function(evt) {
      state(evt.item.children[2].value, evt.from)
    },
  })

}
