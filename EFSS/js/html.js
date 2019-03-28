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
   <select onchange="update(value, this.parentNode.parentNode, this)" class="ins dep rightCol2 b">
      <option value="stby">STBY</option>
      <option value="clrd">CLRD</option>
      <option value="deice">DE-ICE</option>
      <option value="lu">L/U</option>
      <option value="to">T/O</option>
      <option value="enr">ENR</option>
   </select>
</div>
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
   <select onchange="update(value, this.parentNode.parentNode, this)" class="ins arr rightCol2 b">
      <option value="enr">ENR</option>
      <option value="f">FINAL</option>
      <option value="lnd">LND</option>
      <option value="tgo">TGO</option>
      <option value="lpass">LPASS</option>
      <option value="ga">GA</option>
      <option value="hold">HOLD</option>
   </select>
</div>
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
      <th id="here" width="12.5%" class="subtitle">Runway Configuration</th>
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
