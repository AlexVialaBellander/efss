// The different tag templates

var defaultTag =
  `
<div id="tagid" class="tag dep bla">
   <div class="leftCol b">
      <div onfocus="removeOnFocus(this)" onblur="placeholderOnBlur(this, 'cs')" class="callsign topCol b" contenteditable="true" onclick="tagEditor(this,'callsign')">CS</div>
      <div onfocus="removeOnFocus(this)" onblur="placeholderOnBlur(this, 'text')" class="sid topCol b"contenteditable="true" onclick="tagEditor(this,'text')">TEXT</div>
      <div onfocus="removeOnFocus(this)"onblur="placeholderOnBlur(this, 'atype')" class="type topCol b"contenteditable="true" onclick="tagEditor(this,'type')">TYPE</div>
      <div onfocus="removeOnFocus(this)" onblur="placeholderOnBlur(this, 'rule')" class="rule topCol b"contenteditable="true" onclick="tagEditor(this,'rule')">RULE</div>
   </div>
   <select onchange="update(value, this.previousElementSibling.value,  this.parentNode.parentNode, this.parentNode, 'rwyUpdate')" class="rwy rightCol1 b">
      <option value="rwy">RWY</option>
      %
   </select>
   <select onchange="update(value, this.previousElementSibling.value,  this.parentNode.parentNode, this.parentNode, 'stateUpdate')" class="ins dep rightCol2 b">
      <option value="stby">STBY</option>
      <option value="clrd">CLRD</option>
   </select>
</div>
`

var departureOptionsDefault =
  `   <option value="stby">STBY</option>
      <option value="clrd">CLRD</option>
      <option value="push" disabled selected style="display:none;">PUSH</option>
      <option value="taxi" disabled selected style="display:none;">TAXI</option>
      <option value="hold" disabled selected style="display:none;">HOLD</option>
      <option value="lu" disabled selected style="display:none;">L/U</option>
      <option value="to" disabled selected style="display:none;">T/O</option>
      <option value="enr" disabled selected style="display:none;">ENR</option>
`

var departureOptionsPush =
  `   <option value="stby" disabled selected style="display:none;">STBY</option>
      <option value="clrd">CLRD</option>
      <option value="push">PUSH</option>
      <option value="taxi">TAXI</option>
      <option value="hold" disabled selected style="display:none;">HOLD</option>
      <option value="lu" disabled selected style="display:none;">L/U</option>
      <option value="to" disabled selected style="display:none;">T/O</option>
      <option value="enr" disabled selected style="display:none;">ENR</option>
`

var departureOptionsTaxi =
  `   <option value="stby" disabled selected style="display:none;">STBY</option>
      <option value="clrd" disabled selected style="display:none;">CLRD</option>
      <option value="push" disabled selected style="display:none;">PUSH</option>
      <option value="taxi">TAXI</option>
      <option value="hold">HOLD</option>
      <option value="lu">L/U</option>
      <option value="to">T/O</option>
      <option value="enr" disabled selected style="display:none;">ENR</option>

`

var departureOptionsDep =
  `     <option value="stby" disabled selected style="display:none;">STBY</option>
      <option value="clrd" disabled selected style="display:none;">CLRD</option>
      <option value="push" disabled selected style="display:none;">PUSH</option>
      <option value="taxi" disabled selected style="display:none;">TAXI</option>
      <option value="hold">HOLD</option>
      <option value="lu">L/U</option>
      <option value="to">T/O</option>
      <option value="enr">ENR</option>

`

var arrTag =
  `
<div id="tagid" class="tag arr">
   <div class="leftCol b">
      <div onfocus="removeOnFocus(this)" onblur="placeholderOnBlur(this, 'cs')" class="callsign topCol b" contenteditable="true">CS</div>
      <div onfocus="removeOnFocus(this)" onblur="placeholderOnBlur(this, 'text')" class="sid topCol b"contenteditable="true">TEXT</div>
      <div onfocus="removeOnFocus(this)"onblur="placeholderOnBlur(this, 'atype')" class="type topCol b"contenteditable="true">TYPE</div>
      <div onfocus="removeOnFocus(this)" onblur="placeholderOnBlur(this, 'rule')" class="rule topCol b"contenteditable="true">RULE</div>
   </div>
   <select onchange="update(value, this.previousElementSibling.value,  this.parentNode.parentNode, this.parentNode, 'rwyUpdate')" class="rwy rightCol1 b">
      <option value="rwy">RWY</option>
      %
   </select>
   <select onchange="update(value, this.previousElementSibling.value,  this.parentNode.parentNode, this.parentNode, 'stateUpdate')" class="ins arr rightCol2 b">
      <option value="enr">ENR</option>
      <option value="f">FINAL</option>

   </select>
</div>
`
var arrivalOptionsFinal =
  `
  <option value="enr">ENR</option>
  <option value="f">FINAL</option>
  <option value="lnd">LND</option>
  <option value="tgo">TGO</option>
  <option value="lpass">LPASS</option>
  <option value="ga">GA</option>
  <option value="taxi" disabled selected style="display:none;">TAXI</option>
  <option value="hold" disabled selected style="display:none;">HOLD</option>


  `
var arrivalOptionsTaxi =
  `
  <option value="f" disabled selected style="display:none;">LND</option>
  <option value="lnd" disabled selected style="display:none;">LND</option>
  <option value="tgo" disabled selected style="display:none;">TGO</option>
  <option value="lpass" disabled selected style="display:none;">LPASS</option>
  <option value="ga" disabled selected style="display:none;">GA</option>
  <option value="taxi">TAXI</option>
  <option value="hold">HOLD</option>
  <option value="ob" disabled selected style="display:none;">OB</option>

  `

var arrivalOptionsPush =
  `
  <option value="f" disabled selected style="display:none;">LND</option>
  <option value="lnd" disabled selected style="display:none;">LND</option>
  <option value="tgo" disabled selected style="display:none;">TGO</option>
  <option value="lpass" disabled selected style="display:none;">LPASS</option>
  <option value="ga" disabled selected style="display:none;">GA</option>
  <option value="taxi" disabled selected style="display:none;">TAXI</option>
  <option value="hold" disabled selected style="display:none;">HOLD</option>
  <option value="ob">OB</option>
  `


var rwyContent =
  `
<th width="12%" class="selector">
   <div class="switch_box box_1">
      <input onclick="check(this)" id="rwy_cb!" type="checkbox" class="switch_1">
      <label class="label" for="cb!">XX</label>
   </div>
</th>
`
var wrapperOptionHTML =
  `
<table>
   <tr id="wrapperOption">
      <th id="rwyConfig" width="12.5%" class="subtitle">Runway Configuration</th>
      <th width="40%" class=""></th>
   </tr>
   <tr>
      <th id="userConfig" width="12.5%" class="subtitle">User Configuration</th>
      <th width="12%" class="selector">
         <div class="switch_box box_1">
            <input onclick="check(this)" id="user_automove" type="checkbox" class="switch_1" checked="true">
            <label class="label" for="cb!">Automove</label>
         </div>
      </th>
   </tr>
</table>
`
var runwayHTML =
  `
<div class="hl"> LOADING </div> <div id="rwy" class="dz"></div>
`
var menuItem =
  `
<menu onclick=\"move(\'rwy\')\" title="RUNWAY"></menu>
`
var tagRWYSel =
  `
<option value="%">5</option>
`

var editorHTML =
  `
<div id="editor" class="editor">
  <div id="editor-content" class="editor-content fade">
    <input onchange="eUpdate(this)" id="eCallsign" class="show eCallsign">
    <input onchange="eUpdate(this)" id="eCallsign" class="show eCallsign">
  </div>
</div>
`
