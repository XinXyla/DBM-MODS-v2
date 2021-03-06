module.exports = {
  //---------------------------------------------------------------------
  // Action Name
  //
  // This is the name of the action displayed in the editor.
  //---------------------------------------------------------------------

  name: "Control Variable",

  //---------------------------------------------------------------------
  // Action Section
  //
  // This is the section the action will fall into.
  //---------------------------------------------------------------------

  section: "Other Stuff",

  //---------------------------------------------------------------------
  // Action Subtitle
  //
  // This function generates the subtitle displayed next to the name.
  //---------------------------------------------------------------------

  subtitle(data, presets) {
    const storage = presets.variables;
    return `${storage[parseInt(data.storage, 10)]} (${data.varName}) ${data.changeType === "1" ? "+=" : "="} ${
      data.value
    }`;
  },


  variableStorage(data, varType) {
    const type = parseInt(data.storage, 10);
    if (type !== varType) return;
    return [data.varName, "Unknown Type"];
  },


  meta: { version: "2.1.3", preciseCheck: true, author: "XinXyla", authorUrl: null, downloadUrl: null },


  fields: ["storage", "varName", "changeType", "value"],


  html(isEvent, data) {
    return `
<store-in-variable dropdownLabel="Armazenado em" selectId="storage" variableContainerId="varNameContainer" variableInputId="varName"></store-in-variable>

<br><br><br>

<div style="padding-top: 8px;">
	<div style="float: left; width: 35%;">
		<span class="dbminputlabel">Tipo de controle</span><br>
		<select id="changeType" class="round">
			<option value="0" selected>Alterar valor</option>
			<option value="1">Adicionar valor</option>
		</select>
	</div></div>

  <br><br><br>

	<div style="float: left; width: 100%;">
		<span class="dbminputlabel">Valor</span><br>
    <textarea id="value" rows="6" class="round" name="is-eval" style="width:100%"></textarea><br>
	</div>
`;
  },



  init() {},


  action(cache) {
    const data = cache.actions[cache.index];
    const type = parseInt(data.storage, 10);
    const varName = this.evalMessage(data.varName, cache);
    const storage = this.getVariable(type, varName, cache);
    const isAdd = data.changeType === "1";
    let val = this.evalMessage(data.value, cache);
    try {
      val = this.eval(val, cache);
    } catch (e) {
      this.displayError(data, cache, e);
    }
    if (val !== undefined) {
      if (isAdd) {
        let result;
        if (storage === undefined) {
          result = val;
        } else {
          result = storage + val;
        }
        this.storeValue(result, type, varName, cache);
      } else {
        this.storeValue(val, type, varName, cache);
      }
    }
    this.callNextAction(cache);
  },


  mod() {},
};
