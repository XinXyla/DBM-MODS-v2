/* eslint-disable no-unused-vars */
module.exports = {
  name: 'Call Command/Event',
  section: 'Other Stuff',
  meta: { version: "2.1.3", preciseCheck: true, author: 'XinXyla', authorUrl: null, downloadUrl: null },

  subtitle(data) {
    let source;
    if (parseInt(data.sourcetype, 10) === 1) {
      source = data.source2.toString();
    } else {
      source = data.source.toString();
    }
    return `ID: "${source}"`;
  },

  fields: ['sourcetype', 'source', 'source2', 'type'],

  html() {
    return `
<div style="float: left; width: 85%; padding-top: 20px;">
<span class="dbminputlabel">Tipo de fonte</span><br>
  <select id="sourcetype" class="round" onchange="glob.onChange1(this)">
    <option value="0" selected>Escolha da lista</option>
    <option value="1">Inserir ID do comando/evento</option>
  </select>
</div>
<div id="info1"; style="float: left; width: 85%; padding-top: 20px; display: none;">
<span class="dbminputlabel">Comando/Evento</span><br>
  <select id="source" class="round">
    <optgroup id="commands" label="Commands"></optgroup>
    <optgroup id="events" label="Events"></optgroup>
  </select>
</div>
<div id="info2" style="float: left; width: 85%; padding-top: 20px;">
<span class="dbminputlabel">ID do comando/evento</span><br>
  <input id="source2" class="round" type="text" placeholder="">
</div>
<div style="float: left; width: 85%; padding-top: 20px;">
<span class="dbminputlabel">Tipo de chamada</span><br>
  <select id="type" class="round">
  <option value="true" selected>Aguarde a conclusão</option>
  <option value="false">Executar simultaneamente</option>
  </select>
</div>`;
  },

  init() {
    const { glob, document } = this;

    const { $cmds } = glob;
    const coms = document.getElementById('commands');
    coms.innerHTML = '';
    for (let i = 0; i < $cmds.length; i++) {
      if ($cmds[i]) {
        coms.innerHTML += `<option value="${$cmds[i]._id}">${$cmds[i].name}</option>\n`;
      }
    }

    const { $evts } = glob;
    const evet = document.getElementById('events');
    evet.innerHTML = '';
    for (let i = 0; i < $evts.length; i++) {
      if ($evts[i]) {
        evet.innerHTML += `<option value="${$evts[i]._id}">${$evts[i].name}</option>\n`;
      }
    }

    glob.onChange1 = function onChange1(event) {
      const sourceType = parseInt(document.getElementById('sourcetype').value, 10);
      const info1 = document.getElementById('info1');
      const info2 = document.getElementById('info2');

      switch (sourceType) {
        case 0:
          info1.style.display = null;
          info2.style.display = 'none';
          break;
        case 1:
          info1.style.display = 'none';
          info2.style.display = null;
          break;
        default:
          break;
      }
    };

    glob.onChange1(document.getElementById('sourcetype'));
  },

  action(cache) {
    const data = cache.actions[cache.index];
    const { Files } = this.getDBM();

    let id;
    if (parseInt(data.sourcetype, 10) === 1) {
      id = this.evalMessage(data.source2, cache);
    } else {
      id = data.source;
    }
    if (!id) return console.log('Please insert a Command/Event ID!');

    let actions;
    const allData = Files.data.commands.concat(Files.data.events);
    for (let i = 0; i < allData.length; i++) {
      if (allData[i] && allData[i]._id === id) {
        actions = allData[i].actions;
        break;
      }
    }
    if (!actions) {
      this.callNextAction(cache);
      return;
    }

    const waitForCompletion = data.type === "true";
    let callback = null;
    if (waitForCompletion) {
      callback = () => this.callNextAction(cache);
    }
    this.executeSubActions(actions, cache, callback);
    if (!waitForCompletion) {
      this.callNextAction(cache);
    }
  },

  mod() {},
};
