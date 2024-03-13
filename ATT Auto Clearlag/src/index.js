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

    try {
        setInterval(() => {
           
            items.forEach(item => {
                connection.send(`wacky destroy-free ${item}`);
                console.log("[A TOWNSHIP TALE] auto clearlag has been completed");
            });
        }, 9000);
    } catch (error) {
        console.log(error);
    }

    
});
