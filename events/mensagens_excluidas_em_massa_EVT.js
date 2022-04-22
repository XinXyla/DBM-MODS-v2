module.exports = {

name: "Mensagens excluidas em massa",

isEvent: true,

fields: ["Nome da Variável Temporaria (armazena a lista de mensagens):", "Nome da Variável Temporaria (armazena a quantidade de mensagens):"],

mod: function(DBM) {

	
	DBM.XinXyla = DBM.XinXyla || {};

	
	DBM.XinXyla.messageDeleteBulk = function(messagesList) {
		
		const { Bot, Actions } = DBM;

				const events = Bot.$evts["Mensagens excluidas em massa"];

	
		if(!events) return;

		// Call each one.
		const temp = {}
		const server = [...messagesList.values()].guild;
		for(let i = 0; i < events.length; i++) {
			const event = events[i];
			if(event.temp) temp[event.temp] = [...messagesList.values()];
			if(event.temp2) temp[event.temp2] = messagesList.size;
			Actions.invokeEvent(event, server, temp);
		}
	};


	
	const onReady = DBM.Bot.onReady;
	DBM.Bot.onReady = function(...params) {
		DBM.Bot.bot.on("Mensagens excluidas em massa", DBM.XinXyla.messageDeleteBulk);
		onReady.apply(this, ...params);
	}
	
}

};
