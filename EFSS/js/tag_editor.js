
function tagEditor(e) {
  debugger
  document.body.insertAdjacentHTML("afterbegin", editorHTML)
  editor = document.getElementById('editor')
  editor.style.display = "block"
}
window.onclick = function(event) {
  editor = document.getElementById('editor')
  if (event.target == editor) {
    editor.style.display = "none";
  }
}
