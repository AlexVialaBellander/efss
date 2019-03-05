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

//Generate New tag and add eventlister for context menu
function newTag() {
  var newTag = defaultTag
  var idToChange = ["tagid", "callsignid", "textid", "typeid", "ruleid"]
  for (i = 0; i < idToChange.length; i++) {
    newTag = newTag.replace(idToChange[i], idToChange[i].concat(tagidCount))
  }
  var divToInject = document.getElementById("dep")
  divToInject.insertAdjacentHTML("afterbegin", newTag)
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
//touch support move function
function move(destination) {
  var tag = document.getElementById(id)
  document.getElementById(destination).appendChild(tag)
}


ele = document.getElementById("here")

function loadMenuItems() {
  var idCount = 0;
  var runwayArray = getRunways()
  var x = document.getElementById("wrapperOption")
  var xF = document.getElementById("father")
  x.remove(x.selectedIndex)
  xF.insertAdjacentHTML("afterend", wrapperOptionHTML)
  for (let index of runwayArray) {
    idCount++
    var nUpdate1 = rwyContent.search("!")
    rwyContentTemp = spliceSlice(rwyContent, nUpdate1, 1, idCount)
    var nUpdate2 = rwyContentTemp.search("!")
    rwyContentTemp = spliceSlice(rwyContentTemp, nUpdate2, 1, idCount)
    var nUpdate3 = rwyContentTemp.search("XX")
    rwyContentTemp = spliceSlice(rwyContentTemp, nUpdate3, 2, runwayArray[i])
    var ele = document.getElementById("here")
    ele.insertAdjacentHTML("afterend", rwyContentTemp)
  }
}

//Returns array of runways
function getRunways() {
  var airport = document.getElementById("field").value
  airport = airport.toUpperCase()
  var done = false
  for (i = 0; i < data.length && !done; i++) {
    if (airport == data[i][0]) {
      done = true
      return (data[i][1])
    }
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
    return false
  }
}

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
/* When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none"
    }
  }
  */

//Close Modal and run validation, spawn dropzones and load runways
function validate(e) {
  var airport = document.getElementById("field").value
  var modal = document.getElementById("myModal")
  modal.style.display = "none"
  console.log("Loaded:".concat(airport))
  loadRunways(airport)
  spawnDropZone(airport)
}

//Global flag
//Get airport data & add runways
done = false


//OLD
function loadRunways(inputAirport) {
  var found, done = false
  var airport = inputAirport.toUpperCase()
  for (i = 0; i < data.length && !done; i++) {
    if (airport == data[i][0]) {
      var found = true
      done = true
      var targetDiv = document.getElementById("runway")
      var targetDiv2 = document.getElementById("ctxMenu")
      runways = data[i][1]
      var runwayCount = 1
      targetDiv.innerHTML = ""
      for (z = 0; z < runways.length; z++) {
        //Add runways under runway section
        var n = runwayHTML.search("rwy")
        var withID = spliceSlice(runwayHTML, (n + 3), 0, runwayCount)
        var nn = withID.search("LOADING")
        var rwyHTML = spliceSlice(withID, nn, 7, "RUNWAY " + runways[z])
        targetDiv.insertAdjacentHTML("afterbegin", rwyHTML)
          //Add runways in contextmenu
        var nnn = menuItem.search("rwy")
        var withID2 = spliceSlice(menuItem, (nnn + 3), 0, runwayCount)
        var nnnn = withID2.search("RUNWAY")
        var menuItemHTML = spliceSlice(withID2, nnnn, 6, runways[z])
        targetDiv2.insertAdjacentHTML("beforeend", menuItemHTML)
        runwayCount++
      }
      //Split each runway. ex 12/30 --> 12, 30
      for (y = 0; y < runways.length; y++) {
        directionalRWYS = directionalRWYS.concat(runways[y].split("/"))
      }
      directionalRWYS = directionalRWYS.sort()
      var nTag = defaultTag.search("%")
      var nVal = tagRWYSel.search("%")
      var nDis = tagRWYSel.search("5")
      var removeVal = 1
      var removeDis = 1
      var y = 2
      for (i = 0; i < directionalRWYS.length; i++) {
        if (y > 0) {
          tagRWYSel = spliceSlice(tagRWYSel, nVal, removeVal,
            directionalRWYS[i])
          nDis = tagRWYSel.search("5")
          tagRWYSel = spliceSlice(tagRWYSel, nDis, removeDis,
            directionalRWYS[i])
          removeDis = directionalRWYS[i].length
          removeVal = directionalRWYS[i].length
          defaultTag = spliceSlice(defaultTag, nTag, 1, tagRWYSel)
          y--
        }
        y--
        if (y < 0) {
          nTag = nTag + tagRWYSel.length
          nVal = tagRWYSel.search(directionalRWYS[i - 1])
          tagRWYSel = spliceSlice(tagRWYSel, nVal, removeVal,
            directionalRWYS[i])
          nDis = tagRWYSel.search(directionalRWYS[i - 1])
          tagRWYSel = spliceSlice(tagRWYSel, nDis, removeDis,
            directionalRWYS[i])
          removeDis = directionalRWYS[i].length
          removeVal = directionalRWYS[i].length
          defaultTag = spliceSlice(defaultTag, nTag, 0, tagRWYSel)
        }
      }
    }
  }
  //Reload page if the airport is not in database
  if (found == false) {
    location.reload()
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
    animation: 100
  })
  Sortable.create(arr, {
    group: 'tag',
    animation: 100
  })
  Sortable.create(push, {
    group: 'tag',
    animation: 100
  })
  Sortable.create(taxi, {
    group: 'tag',
    animation: 100
  })
  Sortable.create(rwy1, {
    group: 'tag',
    animation: 100
  })
  Sortable.create(rwy2, {
    group: 'tag',
    animation: 100
  })
  Sortable.create(rwy3, {
    group: 'tag',
    animation: 100
  })
  Sortable.create(rwy4, {
    group: 'tag',
    animation: 100
  })
  Sortable.create(rwy5, {
    group: 'tag',
    animation: 100
  })
  Sortable.create(rwy6, {
    group: 'tag',
    animation: 100
  })
  Sortable.create(rwy7, {
    group: 'tag',
    animation: 100
  })
  Sortable.create(rwy8, {
    group: 'tag',
    animation: 100
  })
  Sortable.create(rwy9, {
    group: 'tag',
    animation: 100
  })
  Sortable.create(rwy10, {
    group: 'tag',
    animation: 100
  })

}
