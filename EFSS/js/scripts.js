/*! EFSS MIT | github.com/AlexVialaBellander/efss */

//Change airport, listen on enter key press down event
directionalRWYS = []
runways = []
selectedRunways = []

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

    if (trigger == "moveUpdate") {
      updateMenu(t, cat)
    }
    if (trigger == "menuUpdate") {
      autoMove(vS, vR, t)
    }
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
      update(evt.item.children[2].value, evt.item.children[1].value, evt.item
        .parentNode, evt.item, "moveUpdate")
    }
  })
  Sortable.create(arr, {
    group: 'tag',
    animation: 100,
    onAdd: function(evt) {
      update(evt.item.children[2].value, evt.item.children[1].value, evt.item
        .parentNode, evt.item, "moveUpdate")
    }
  })
  Sortable.create(push, {
    group: 'tag',
    animation: 100,
    onAdd: function(evt) {
      update(evt.item.children[2].value, evt.item.children[1].value, evt.item
        .parentNode, evt.item, "moveUpdate")
    }
  })
  Sortable.create(taxi, {
    group: 'tag',
    animation: 100,
    onAdd: function(evt) {
      debugger
      update(evt.item.children[2].value, evt.item.children[1].value, evt.item
        .parentNode, evt.item, "moveUpdate")
    }
  })
  Sortable.create(rwy, {
    group: 'tag',
    animation: 100,
    onAdd: function(evt) {
      update(evt.item.children[2].value, evt.item.children[1].value, evt.item
        .parentNode, evt.item, "moveUpdate")
    },
    onRemove: function(evt) {
      update(evt.item.children[2].value, evt.item.children[1].value, evt.from,
        evt.item, "moveUpdate")
    },
  })
  Sortable.create(rwy1, {
    group: 'tag',
    animation: 100,
    onAdd: function(evt) {
      update(evt.item.children[2].value, evt.item.children[1].value, evt.item
        .parentNode, evt.item, "moveUpdate")
    },
    onRemove: function(evt) {
      update(evt.item.children[2].value, evt.item.children[1].value, evt.from,
        evt.item, "moveUpdate")
    },
  })
  Sortable.create(rwy2, {
    group: 'tag',
    animation: 100,
    onAdd: function(evt) {
      update(evt.item.children[2].value, evt.item.children[1].value, evt.item
        .parentNode, evt.item, "moveUpdate")
    },
    onRemove: function(evt) {
      update(evt.item.children[2].value, evt.item.children[1].value, evt.from,
        evt.item, "moveUpdate")
    },
  })
  Sortable.create(rwy3, {
    group: 'tag',
    animation: 100,
    onAdd: function(evt) {
      update(evt.item.children[2].value, evt.item.children[1].value, evt.item
        .parentNode, evt.item, "moveUpdate")
    },
    onRemove: function(evt) {
      update(evt.item.children[2].value, evt.item.children[1].value, evt.from,
        evt.item, "moveUpdate")
    },
  })
  Sortable.create(rwy4, {
    group: 'tag',
    animation: 100,
    onAdd: function(evt) {
      update(evt.item.children[2].value, evt.item.children[1].value, evt.item
        .parentNode, evt.item, "moveUpdate")
    },
    onRemove: function(evt) {
      update(evt.item.children[2].value, evt.item.children[1].value, evt.from,
        evt.item, "moveUpdate")
    },
  })
  Sortable.create(rwy5, {
    group: 'tag',
    animation: 100,
    onAdd: function(evt) {
      update(evt.item.children[2].value, evt.item.children[1].value, evt.item
        .parentNode, evt.item, "moveUpdate")
    },
    onRemove: function(evt) {
      update(evt.item.children[2].value, evt.item.children[1].value, evt.from,
        evt.item, "moveUpdate")
    },
  })
  Sortable.create(rwy6, {
    group: 'tag',
    animation: 100,
    onAdd: function(evt) {
      update(evt.item.children[2].value, evt.item.children[1].value, evt.item
        .parentNode, evt.item, "moveUpdate")
    },
    onRemove: function(evt) {
      update(evt.item.children[2].value, evt.item.children[1].value, evt.from,
        evt.item, "moveUpdate")
    },
  })
  Sortable.create(rwy7, {
    group: 'tag',
    animation: 100,
    onAdd: function(evt) {
      update(evt.item.children[2].value, evt.item.children[1].value, evt.item
        .parentNode, evt.item, "moveUpdate")
    },
    onRemove: function(evt) {
      update(evt.item.children[2].value, evt.item.children[1].value, evt.from,
        evt.item, "moveUpdate")
    },
  })
  Sortable.create(rwy8, {
    group: 'tag',
    animation: 100,
    onAdd: function(evt) {
      update(evt.item.children[2].value, evt.item.children[1].value, evt.item
        .parentNode, evt.item, "moveUpdate")
    },
    onRemove: function(evt) {
      update(evt.item.children[2].value, evt.item.children[1].value, evt.from,
        evt.item, "moveUpdate")
    },
  })
  Sortable.create(rwy9, {
    group: 'tag',
    animation: 100,
    onAdd: function(evt) {
      update(evt.item.children[2].value, evt.item.children[1].value, evt.item
        .parentNode, evt.item, "moveUpdate")
    },
    onRemove: function(evt) {
      update(evt.item.children[2].value, evt.item.children[1].value, evt.from,
        evt.item, "moveUpdate")
    },
  })
  Sortable.create(rwy10, {
    group: 'tag',
    animation: 100,
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
