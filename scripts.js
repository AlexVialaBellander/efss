var text = "RYR41BB:211575:211575:PILOT::51.4194:14.2231:38238:433:1/B738/M-SDE1FGHIJ1RWXYZ/LB1:N0452:LHBP:F380:EKCH:EU4:B:6:2000:0:50:0:I:1320:1320:1:34:3:44:EKBI:PBN/A1B1C1D1L1O1S1 NAV/RNVD1E2A1 DOF/181213 REG/EIDWE EET/LZBB0009 LKAA0020 EDUU0045 EDWW0115 EKDK0119 RVR/200 OPR/RYANAIR VIRTUAL AIRLINES PER/C:N0452F380 BADOV P41 MAVOR P41 BULEK L624 HDO DCT GEVNI T239 PEROM T298 MONAK:::::::20181213125500:IvAp:2.0.2:2:6::S:144:351:0:30:"
var defaultLabel = ""
var xofCount = 1
var tagArray = text.split(":");
var airport = "EKCH"
var getData = "https://api.ivao.aero/getdata/whazzup/"
var tagID = '<div id="tag1"'
var cleanTag = ' class="tag" draggable="true" ondragstart="drag(event)"><div class="leftCol b"><div id="cof1" onfocus="removeOnFocus(this.id)" onblur="placeholderOnBlur(this.id)" class="callsign topCol b" contenteditable="true">CS</div><div id="sof1" onfocus="removeOnFocus(this.id)" onblur="placeholderOnBlur(this.id)" class="sid topCol b"contenteditable="true">SID</div><div id="tof1" onfocus="removeOnFocus(this.id)"onblur="placeholderOnBlur(this.id)" class="type topCol b"contenteditable="true">TYPE</div><div id="rof1" onfocus="removeOnFocus(this.id)" onblur="placeholderOnBlur(this.id)" class="rule topCol b"contenteditable="true">RULE</div></div><select onchange="rwy()" class="rwy rightCol b"><option value="rwy">RWY</option><option value="04r">04R</option><option value="04l">04L</option><option value="22r">22R</option><option value="22l">22L</option><option value="12">12</option><option value="30">30</option></select><select onchange="stat(value)" class="ins rightCol b"><option value="stby">STBY</option><option value="clrd">CLRD</option><option value="deice">DE-ICE</option><option value="lu">L/U</option><option value="to">T/O</option><option value="lnd">LND</option></select></div>'

if (tagArray[13] || tagArray[11] == airport) {

}

function newTag() {
  debugger
  var tagNumberString = tagID[(tagID.length) - 2]
  var pt1 = (tagID.split(tagNumberString)[0])
  var ntagID = ((pt1.concat(Number(tagID[(tagID.length) - 2]) + 1)).concat('"'))
  tagID = ntagID
  xofCount++
  var currentCof = "cof".concat(String(xofCount))
  var currentSof = "sof".concat(String(xofCount))
  var currentTof = "tof".concat(String(xofCount))
  var currentRof = "rof".concat(String(xofCount))
  tag = cleanTag.replace("cof1", currentCof).replace("sof1", currentSof).replace("tof1", currentTof).replace("rof1", currentRof)
  var nTag = ntagID.concat(tag);
  var div = document.getElementById("clearance");
  div.insertAdjacentHTML("afterbegin", nTag);

  var tagN = ((("tag").concat(Number(tagID[(tagID.length) - 2]))))
  var tag = document.getElementById(tagN);
  var body = document.getElementsByTagName("BODY")[0];
  tag.addEventListener("contextmenu", function(event) {
    event.preventDefault();
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

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}

// change 1 :: added el
function drop(ev, el) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  // change 2 :: append to el
  el.appendChild(document.getElementById(data));
}

function dropped(ev, id) {
  var id = ev.dataTransfer.getData("text");
  var elem = document.getElementById(id);
  elem.parentElement.removeChild(elem);
}

function removeOnFocus(id) {
  document.getElementById(id).innerHTML = ""
}

function placeholderOnBlur(id) {
  var x = document.getElementById(id).innerHTML;
  if (id[0] == "c") {
    defaultLabel = "CS"
  }
  if (id[0] == "s") {
    defaultLabel = "SID"
  }
  if (id[0] == "t") {
    defaultLabel = "TYPE"
  }
  if (id[0] == "r") {
    defaultLabel = "RULE"
  }
  if (x == "") {
    document.getElementById(id).innerHTML = defaultLabel
  }
}
