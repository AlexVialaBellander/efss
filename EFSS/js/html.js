// The different tag templates

var defaultTag =
  `
<div id="tagid" class="tag dep">
   <div class="leftCol b">
      <div id="callsignid" onfocus="removeOnFocus(this.id)" onblur="placeholderOnBlur(this.id)" class="callsign topCol b" contenteditable="true">CS</div>
      <div id="textid" onfocus="removeOnFocus(this.id)" onblur="placeholderOnBlur(this.id)" class="sid topCol b"contenteditable="true">TEXT</div>
      <div id="typeid" onfocus="removeOnFocus(this.id)"onblur="placeholderOnBlur(this.id)" class="type topCol b"contenteditable="true">TYPE</div>
      <div id="ruleid" onfocus="removeOnFocus(this.id)" onblur="placeholderOnBlur(this.id)" class="rule topCol b"contenteditable="true">RULE</div>
   </div>
   <select class="rwy rightCol1 b">
      <option value="rwy">RWY</option>
      %
   </select>
   <select onchange="update(value, this.previousElementSibling.value,  this.parentNode.parentNode, this.parentNode, 'menuUpdate')" class="ins dep rightCol2 b">
      <option value="stby">STBY</option>
      <option value="clrd">CLRD</option>
   </select>
</div>
`

var departureOptionsDefault =
  `   <option value="stby">STBY</option>
      <option value="clrd">CLRD</option>
`

var departureOptionsPush =
  `   <option value="clrd">CLRD</option>
      <option value="push">PUSH</option>
      <option value="taxi">TAXI</option>
`

var departureOptionsTaxi =
  `   <option value="taxi">TAXI</option>
      <option value="hold">HOLD</option>
      <option value="lu">L/U</option>
      <option value="to">T/O</option>
`

var departureOptionsDep =
  `   <option value="hold">HOLD</option>
      <option value="lu">L/U</option>
      <option value="to">T/O</option>
      <option value="enr">ENR</option>
`

var arrTag =
  `
<div id="tagid" class="tag arr">
   <div class="leftCol b">
      <div id="callsignid" onfocus="removeOnFocus(this.id)" onblur="placeholderOnBlur(this.id)" class="callsign topCol b" contenteditable="true">CS</div>
      <div id="textid" onfocus="removeOnFocus(this.id)" onblur="placeholderOnBlur(this.id)" class="sid topCol b"contenteditable="true">TEXT</div>
      <div id="typeid" onfocus="removeOnFocus(this.id)"onblur="placeholderOnBlur(this.id)" class="type topCol b"contenteditable="true">TYPE</div>
      <div id="ruleid" onfocus="removeOnFocus(this.id)" onblur="placeholderOnBlur(this.id)" class="rule topCol b"contenteditable="true">RULE</div>
   </div>
   <select class="rwy rightCol1 b">
      <option value="rwy">RWY</option>
      %
   </select>
   <select onchange="update(value, this.previousElementSibling.value,  this.parentNode.parentNode, this.parentNode, 'menuUpdate')" class="ins arr rightCol2 b">
      <option value="enr">ENR</option>
      <option value="f">FINAL</option>

   </select>
</div>
`
var arrivalOptionsFinal =
  `
  <option value="f">FINAL</option>
  <option value="lnd">LND</option>
  <option value="tgo">TGO</option>
  <option value="lpass">LPASS</option>
  <option value="ga">GA</option>
  `
var arrivalOptionsTaxi =
  `
  <option value="taxi">TAXI</option>
  <option value="hold">HOLD</option>
  `

var arrivalOptionsPush =
  `
  <option value="ob">OB</option>
  `


var rwyContent =
  `
<th width="12%" class="selector">
   <div class="switch_box box_1">
      <input onclick="check(this)" id="cb!" type="checkbox" class="switch_1">
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
