const { attConfig } = require('./my-configs');
const { Client: attClient } = require('att-client');

const attbot = new attClient(attConfig);
exports.attbot = attbot;

let serverId = "";

const items = ["Stone", "Flint", "Coal", "Woodcutwedge"];

(async () => {
    attbot.start();
})();

// Connects to the server
attbot.on('connect', async (connection) => {
    console.log(`[A TOWNSHIP TALE] bot has securely made a connection to ${connection.server.name}`);

    const quest = await attbot.api.getServerInfo(serverId);

    if (!quest.is_online) {
        console.log(`[A TOWNSHIP TALE] server is offline clearlag didnt go through`);
        return;
        
    } else {

    setInterval(() => {

        items.forEach(item => {
            connection.send(`wacky destoroy-free ${item}`);

        });
    }, 900000);
}
});
