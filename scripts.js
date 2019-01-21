/*! EFSS MIT | github.com/AlexVialaBellander/efss */
var text =
  "RYR41BB:211575:211575:PILOT::51.4194:14.2231:38238:433:1/B738/M-SDE1FGHIJ1RWXYZ/LB1:N0452:LHBP:F380:EKCH:EU4:B:6:2000:0:50:0:I:1320:1320:1:34:3:44:EKBI:PBN/A1B1C1D1L1O1S1 NAV/RNVD1E2A1 DOF/181213 REG/EIDWE EET/LZBB0009 LKAA0020 EDUU0045 EDWW0115 EKDK0119 RVR/200 OPR/RYANAIR VIRTUAL AIRLINES PER/C:N0452F380 BADOV P41 MAVOR P41 BULEK L624 HDO DCT GEVNI T239 PEROM T298 MONAK:::::::20181213125500:IvAp:2.0.2:2:6::S:144:351:0:30:"
var xofCount = 1
var tagArray = text.split(":");
var airport = "EKCH"
var getData = "https://api.ivao.aero/getdata/whazzup/"
var tagID = '<div id="tag1"'

//The base html for a tag
var cleanTag =
  ' class="tag"><div class="leftCol b"><div id="cof1" onfocus="removeOnFocus(this.id)" onblur="placeholderOnBlur(this.id)" class="callsign topCol b" contenteditable="true">CS</div><div id="sof1" onfocus="removeOnFocus(this.id)" onblur="placeholderOnBlur(this.id)" class="sid topCol b"contenteditable="true">TEXT</div><div id="tof1" onfocus="removeOnFocus(this.id)"onblur="placeholderOnBlur(this.id)" class="type topCol b"contenteditable="true">TYPE</div><div id="rof1" onfocus="removeOnFocus(this.id)" onblur="placeholderOnBlur(this.id)" class="rule topCol b"contenteditable="true">RULE</div></div><select class="rwy rightCol1 b"><option value="rwy">RWY</option>%</select><select onchange="stat(value)" class="ins rightCol2 b"><option value="stby">STBY</option><option value="clrd">CLRD</option><option value="deice">DE-ICE</option><option value="lu">L/U</option><option value="to">T/O</option><option value="lnd">LND</option></select></div>'
var id = "";
if (tagArray[13] || tagArray[11] == airport) {

}
//Generate New tag and add eventlister for context menu
function newTag() {
  var tagNumberString = tagID[(tagID.length) - 2]
  var pt1 = (tagID.split(tagNumberString)[0])
  var ntagID = ((pt1.concat(Number(tagID[(tagID.length) - 2]) + 1)).concat('"'))
  tagID = ntagID
  xofCount++
  var currentCof = "cof".concat(String(xofCount))
  var currentSof = "sof".concat(String(xofCount))
  var currentTof = "tof".concat(String(xofCount))
  var currentRof = "rof".concat(String(xofCount))
  tag = cleanTag.replace("cof1", currentCof).replace("sof1", currentSof).replace(
    "tof1", currentTof).replace("rof1", currentRof)
  var nTag = ntagID.concat(tag);
  var div = document.getElementById("dep");
  div.insertAdjacentHTML("afterbegin", nTag);

  var tagN = ((("tag").concat(Number(tagID[(tagID.length) - 2]))))
  var tag = document.getElementById(tagN);
  var body = document.getElementsByTagName("BODY")[0];
  //add eventlister for context menu on every new generated tag
  tag.addEventListener("contextmenu", function(event) {
    event.preventDefault();
    //get id from event target
    var target = event.target || event.srcElement;
    id = ("tag").concat((target.id).slice(3, 4));
    //run context menu
    var ctxMenu = document.getElementById("ctxMenu");
    ctxMenu.style.display = "block";
    ctxMenu.style.left = (event.pageX - 10) + "px";
    ctxMenu.style.top = (event.pageY - 10) + "px";
  }, false);
  body.addEventListener("click", function(event) {
    var ctxMenu = document.getElementById("ctxMenu");
    ctxMenu.style.display = "";
    ctxMenu.style.left = "";
    ctxMenu.style.top = "";
  }, false);

}

//globar var for the field input
var input = ""
  //Removes text when pressing on field
function removeOnFocus(id) {
  input = document.getElementById(id).innerHTML
  document.getElementById(id).innerHTML = ""
}
//If nothing in field return the old value
function placeholderOnBlur(id) {
  var x = document.getElementById(id).innerHTML;
  if (x == "") {
    document.getElementById(id).innerHTML = input
  }
}
//touch support move function
function move(destination) {
  var tag = document.getElementById(id)
  document.getElementById(destination).appendChild(tag);
}

//Modal popup window from w3
// Get the modal
var modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

function loadModal() {
  modal.style.display = "block";
}

//Extends the options menu and rotate arrow icon
var optionsMenu = document.getElementById("optionsMenu")
var arrowIcon = document.getElementById("arrowIcon")
document.getElementById("options").addEventListener("click", function() {
  optionsMenu.classList.toggle("is-active");
  arrowIcon.classList.toggle("is-active");
});

function search() {
  var status = document.getElementById("status")
  var airport = document.getElementById("field").value;
  airport = airport.toUpperCase();
  var found = false
  for (i = 0; i < data.length && found == false; i++) {
    if (airport == data[i][0]) {
      var found = true
      getRunways(airport)
    }
  }
  if (found == true) {
    status.classList.add("found");
    status.src = "images/indb.png";
  } else {
    status.classList.add("notfound");
    status.src = "images/notindb.png";
  }
}

/* When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  */



//Change airport
var directionalRWYS = []
var runways = []
var runwayHTML =
  '<div class="hl"> LOADING </div> <div id="rwy" class="dz"></div>'
var menuItem = '<menu onclick=\"move(\'rwy\')\" title="RUNWAY"></menu>'
var tagRWYSel = '<option value="%">5</option>'
var submit = document.getElementById("field");
submit.addEventListener("keydown", function(e) {
  if (e.keyCode === 13) {
    validate(e);
  }
})

//Close Modal and Validate airport input
function validate(e) {
  var airport = document.getElementById("field").value;
  var modal = document.getElementById("myModal")
  modal.style.display = "none";
  console.log("Loaded:".concat(airport))
  getRunways(airport)
  spawnDropZone()

}

//Get airport data & add runways
var done = false;
//Global flag

function getRunways(inputAirport) {
  var found = false
  var airport = inputAirport.toUpperCase()
  for (i = 0; i < data.length && done == false; i++) {
    if (airport == data[i][0]) {
      var found = true
      done = true
      var targetDiv = document.getElementById("runway");
      var targetDiv2 = document.getElementById("ctxMenu");
      runways = data[i][1]
      var runwayCount = 1
      targetDiv.innerHTML = ""
      for (z = 0; z < runways.length; z++) {
        //Add runways under runway section
        var n = runwayHTML.search("rwy")
        var withID = spliceSlice(runwayHTML, (n + 3), 0, runwayCount)
        var nn = withID.search("LOADING")
        var rwyHTML = spliceSlice(withID, nn, 7, "RUNWAY " + runways[z])
        targetDiv.insertAdjacentHTML("afterbegin", rwyHTML);
        //Add runways in contextmenu
        var nnn = menuItem.search("rwy")
        var withID2 = spliceSlice(menuItem, (nnn + 3), 0, runwayCount)
        var nnnn = withID2.search("RUNWAY")
        var menuItemHTML = spliceSlice(withID2, nnnn, 6, runways[z])
        targetDiv2.insertAdjacentHTML("beforeend", menuItemHTML);
        runwayCount++
      }
      //Split each runway. ex 12/30 --> 12, 30
      for (y = 0; y < runways.length; y++) {
        directionalRWYS = directionalRWYS.concat(runways[y].split("/"))
      }
      directionalRWYS = directionalRWYS.sort();
      var nTag = cleanTag.search("%")
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
          cleanTag = spliceSlice(cleanTag, nTag, 1, tagRWYSel)
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
          cleanTag = spliceSlice(cleanTag, nTag, 0, tagRWYSel)
        }
      }
    }
  }
  //Reload page if the airport is not in database
  if (found == false) {
    location.reload();
  }
}

//Splice string function

function spliceSlice(str, index, count, add) {
  // We cannot pass negative indexes directly to the 2nd slicing operation.
  if (index < 0) {
    index = str.length + index;
    if (index < 0) {
      index = 0;
    }
  }
  return str.slice(0, index) + (add || "") + str.slice(index + count);
}
//Creates Drag and Drop zones using the Sortable library

function spawnDropZone() {
  Sortable.create(trash, {
    group: "tag",

    onAdd: function(evt) {
      this.el.removeChild(evt.item);
    }
  });
  Sortable.create(dep, {
    group: 'tag',
    animation: 100
  });
  Sortable.create(arr, {
    group: 'tag',
    animation: 100
  });
  Sortable.create(push, {
    group: 'tag',
    animation: 100
  });
  Sortable.create(taxi, {
    group: 'tag',
    animation: 100
  });
  Sortable.create(rwy1, {
    group: 'tag',
    animation: 100
  });
  Sortable.create(rwy2, {
    group: 'tag',
    animation: 100
  });
  Sortable.create(rwy3, {
    group: 'tag',
    animation: 100
  });
  Sortable.create(rwy4, {
    group: 'tag',
    animation: 100
  });
  Sortable.create(rwy5, {
    group: 'tag',
    animation: 100
  });
  Sortable.create(rwy6, {
    group: 'tag',
    animation: 100
  });
  Sortable.create(rwy7, {
    group: 'tag',
    animation: 100
  });
  Sortable.create(rwy8, {
    group: 'tag',
    animation: 100
  });
  Sortable.create(rwy9, {
    group: 'tag',
    animation: 100
  });
  Sortable.create(rwy10, {
    group: 'tag',
    animation: 100
  });

}
