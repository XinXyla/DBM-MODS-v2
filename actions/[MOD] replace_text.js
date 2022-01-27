module.exports = {

	name: "Replace Text",
	
	section: "Other Stuff",
	
	subtitle: function(data) {
		const info = ['Substitua o primeiro resultado', 'Substitua todos os resultados']
		return `${info[data.info]} "${data.text2}" por "${data.text3}" em "${data.text}"`;
	},
		
	author: "XinXyla",
	
	version: "1.0",
	
	short_description: "Substitua o texto por outro texto",
	
	variableStorage: function (data, varType) {
		const type = parseInt(data.storage);
		if (type !== varType) return;
		let dataType = 'String';
		return ([data.varName, dataType]);
	},
	
	fields: ["text", "text2", "text3", "info", "storage", "varName"],
	
	html: function(isEvent, data) {
		return `
	<div style="padding-top: 3px;">
	Texto original:
		<textarea id="text" rows="5" placeholder="Insira o texto aqui..." style="width: 99%; font-family: monospace; white-space: nowrap;"></textarea>
	</div>
	<div>
		<div style="padding-top: 8px; width: 100%;">
		Substituir:<br>
			<textarea id="text2" rows="1" class="round" style="width:100%;"></textarea>
		</div><div style=" padding-top: 8px; width: 100%;">
			Para isso:<br>
			<textarea id="text3" rows="1" class="round" style="width:100%"></textarea>
		</div>
	</div>
	<div>	
	Modelo:<br>
	<select id="info" class="round">
		<option value="0" selected>Substitua o primeiro resultado</option>
		<option value="1">Substitua todos os resultados</option>
	</select>
	</div>
	<div style="padding-top: 8px;">
		<div style="float: left; width: 35%;">
		Armazenar em:<br>
			<select id="storage" class="round">
				${data.variables[1]}
			</select>
		</div>
		<div id="varNameContainer" style="float: right; width: 60%;">
			Nome da variável:<br>
			<input id="varName" class="round" type="text">
		</div>
	</div>
		`
	},
	
	init: function() {
		},
	
	action: function(cache) {
		const data = cache.actions[cache.index];
		const storage = parseInt(data.storage);
		const varName = this.evalMessage(data.varName, cache);
		const text = this.evalMessage(data.text, cache);
		const text2 = this.evalMessage(data.text2, cache);
		const text3 = this.evalMessage(data.text3, cache);
		const info = parseInt(data.info);
	
		let result;
		switch(info) {
			case 0:
				result = text.replace(text2, text3);
				break;
			case 1:
				const WrexMODS = this.getWrexMods();
				const replacestr = WrexMODS.require('replace-string');
				result = replacestr(text, text2, text3);
				break;
			default:
				break;
		}
		if (result !== undefined) {
			const storage = parseInt(data.storage);
			const varName = this.evalMessage(data.varName, cache);
			this.storeValue(result, storage, varName, cache);
		}
		this.callNextAction(cache);
	},
	
	mod: function(DBM) {
	}
	
	};