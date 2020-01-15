editorTag = null

function tagEditor(targetElement, targetWindow) {
  debugger
  editorTag = tags[targetElement.parentNode.parentNode.id]
  document.body.insertAdjacentHTML("afterbegin", editorHTML)
  editor = document.getElementById('editor')
  editor.style.display = "block"
  document.getElementById('editor-content').insertAdjacentHTML("afterbegin",
    targetWindow)
  document.getElementById('eCallsign').value = editorTag.cs
    //   //Add eventlister for autocomplete
    // autocomplete(document.getElementById("eCallsign"), countries);

  switch (targetWindow) {
    case "callsign":
      document.getElementById('eCallsign').focus()
    case "text":
      // code block
      break;
  }
}
window.onclick = function(event) {
  editor = document.getElementById('editor')
  if (event.target == editor) {
    editor.style.display = "none";
  }
}

function eUpdate(e) {
  switch (e.id) {
    case "eCallsign":
      editorTag.cs = e.value
    case "y":
      // code block
      break;
  }
  editorTag.update()
}
