//This js file contains relevant methods that are used when handling tags
//common notation, p = parent, t = this, v = value

//Generate New tag and add eventlister for context menu
var tagidCount = 0
function newTag(divId) {
  var newTag
  var divToInject = document.getElementById(divId)
  divId == "dep" ? newTag = defaultTag : newTag = arrTag
  var idToChange = ["tagid", "callsignid", "textid", "typeid", "ruleid"]
  for (let id of idToChange){
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
