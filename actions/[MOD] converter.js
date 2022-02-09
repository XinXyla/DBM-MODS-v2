module.exports = {

name: "Converter",

section: "Other Stuff",

author: "XinXyla",

version: "2.0.0",

short_description: "Converte textos/números",

subtitle: function(data) {
	const info = ['Número inteiro (Arredondado)', 'Número inteiro (Para cima)', 'Número inteiro (Para baixo)', 'Texto', 'Texto maiúsculo', 'Texto minúsculo', 'Texto sem espaços', 'Texto (Sem espaços de ambos os lados)'];
	const prse = parseInt(data.into);
	return `Converter "${data.vAria}" em ${info[prse]}`;
},



variableStorage: function(data, varType) {
	const type = parseInt(data.storage);
	const prse2 = parseInt(data.into);
	const info2 = ['Number', 'Number', 'Number', 'String', 'String', 'String', 'String', 'String'];
	if(type !== varType) return;
	return ([data.varName2, info2[prse2]]);
},


fields: ["into", "vAria", "storage", "varName2"],

html: function(isEvent, data) {
	return `
<div style="width: 550px; height: 350px;">
	<div style="width: 60%;">
		<div style="width: 150%;">
		Informação:<br>
   			<textarea id="vAria" rows="3" style="width:100%;"></textarea>
           </div>
		<br>
		Converter em:<br>
        <select id="into" class="round">
				<option value="0" selected>Número inteiro (Arredondado)</option>
				<option value="1">Número inteiro (Para cima)</option>
				<option value="2">Número inteiro (Para baixo)</option>
				<option value="3">Texto</option>
				<option value="4">Texto maiúsculo</option>
				<option value="5">Texto minúsculo</option>
				<option value="6">Texto sem espaços</option>
				<option value="7">Texto (Sem espaços de ambos os lados)</option>
		</select>
	</div><br>
	<div>
		<div style="float: left; width: 35%;">
			Armazenar em:<br>
			<select id="storage" class="round">
				${data.variables[1]}
			</select>
		</div>
		<div id="varNameContainer2" style="float: right; width: 60%;">
			<div class="col-3 input-effect" style="width: 83%;">
        		<input id="varName2" class="efeitoala" type="text" style="width: 100%;">
            	<label>Nome da variavel:</label>
            	<span class="focus-border"></span>
        	</div><br>
		</div>
	</div>
</div>
<style>
	.codeblock {
		margin: 4px; background-color: rgba(0,0,0,0.20); border-radius: 3.5px; border: 1px solid rgba(255,255,255,0.15); padding: 4px; font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; transition: border 175ms ease;
	}
	.codeblock:hover{border:1px solid rgba(255,255,255,.45)}.text{color:#0ff}

	select.round{width:100%;border:0 solid #eee !important;border-radius:4px !important;box-sizing:border-box !important;display:block !important;height:28px !important;padding-left:8px !important;box-shadow:-2px 0 0 #fff;transition:box-shadow 150ms ease}
    select.round:focus{outline-width:0;box-shadow:0 1px 0 #0059ff;}

	.col-3 {border: 0px solid #eee;float: left; margin-top: 20px; margin-bottom: 6px; position: relative; background: rgba(0, 0, 0, 0.27); border-radius: 5px;}

	input[type="text"]{font: 15px/24px 'Muli', sans-serif; color: #eee; width: 100%; box-sizing: border-box; letter-spacing: 1px; padding: 0 0 0 3px;}
    input[type="text"]{font: 15px/24px "Lato", Arial, sans-serif; color: #eee; width: 100%; box-sizing: border-box; letter-spacing: 1px; padding: 0 0 0 3px;}
    
    .efeitoala{border: 0; padding: 4px; border-bottom: 1px solid #ccc; background-color: transparent;}
	.efeitoala ~ .focus-border{position: absolute; bottom: 0; left: 50%; width: 0; height: 2px; background-color: #4caf50; transition: 0.4s;}
    .efeitoala:focus ~ .focus-border,
    .has-content.efeitoala ~ .focus-border{width: 100%; transition: 0.4s; left: 0;}
    .efeitoala ~ label{position: absolute; left: 0%; width: 100%; top: -21px; color: #aaa; transition: 0.3s; z-index: -1; letter-spacing: 0.5px;}
	.efeitoala:focus ~ label, .has-content.efeitoala ~ label{font-size: 12px; color: #4caf50; transition: 0.3s;}
	

</style>`
},

init: function() {},

action: function(cache) {
	const data = cache.actions[cache.index],
		theVar = this.evalMessage(data.vAria, cache),
		INTO = parseInt(data.into);
	let result;

	switch (INTO) {
			case 0:
				result = Math.round(theVar);
				break;
			case 1:
				result = Math.ceil(theVar);
				break;
			case 2:
				result = parseInt(theVar);
				break;
			case 3:
				result = theVar.toString();
				break;
			case 4:
				result = theVar.toString().toUpperCase();
				break;
			case 5:
				result = theVar.toString().toLowerCase();
				break;
			case 6:
				result = theVar.toString().split(' ').join('');
				break;
			case 7:
				result = theVar.toString().trim();
				break;
	}
	if(result !== undefined) {
		const storage = parseInt(data.storage);
		const varName2 = this.evalMessage(data.varName2, cache);
		this.storeValue(result, storage, varName2, cache);
	}
	this.callNextAction(cache);
},

mod: function(DBM) {
}

};