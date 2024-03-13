const { attConfig } = require('./my-configs');
const { Client: attClient } = require('att-client');

const attbot = new attClient(attConfig);

exports.attbot = attbot;

(async () => {
	attbot.start();
})();


//Connects to the server
attbot.on('connect', async (connection) => {
    console.log(`[A TOWNSHIP TALE] bot has securely made a connection to ${connection.server.name}`);

    try {
    
//Logs if a player joins the server
    connection.subscribe(`PlayerJoined`, async message => {
        const { user, position } = message.data;

        console.log(`[A TOWNSHIP TALE] ${user.name}/${user.id} has joined the server!`);
        console.log(`[A TOWNSHIP TALE] ${user.name}/${user.id} joining position: ${position}`);

        connection.send(`player message * "${user.name}/${user.id} has joined the server!" 2`);

    });

    //Logs if a player has left the server
    connection.subscribe(`PlayerLeft`, async message => {
        const { user, position } = message.data;

        console.log(`[A TOWNSHIP TALE] ${user.name}/${user.id} has left the server!`);
        console.log(`[A TOWNSHIP TALE] ${user.name}/${user.id} leaving position: ${position}`);

        connection.send(`player message * "${user.name}/${user.id} has left the server!" 2`);

    });

    //Logs if someone has been killed
    connection.subscribe(`PlayerKilled`, async message => {
        const { killedPlayer, source } = message.data;

        console.log(`[A TOWNSHIP TALE] ${killedPlayer.name}/${killedPlayer.id} has died!`);
        console.log(`[A TOWNSHIP TALE] Death Reason: ${source}...`);

        connection.send(`player message ${killedPlayer.id} "Next time dont die bozo" 2`);

    });

    //Logs if someone moves a chunk
    connection.subscribe(`PlayerMovedChunk`, async message => {
        const { player, oldChunk, newChunk } = message.data;

        console.log(`[A TOWNSHIP TALE] ${player.name}/${player.id} has moved to chunk: ${newChunk}!`);
        console.log(`[A TOWNSHIP TALE] ${player.name}/${player.id} has left chunk: ${oldChunk}!`);

        connection.send(`player message ${player.id} "You just walked a whole chunk" 2`);

    });

    //Logs if a ojest has been killed
    connection.subscribe(`ObjectKilled`, async message => {
        const { name, killerPlayer } = message.data;

        console.log(`[A TOWNSHIP TALE] ${killerPlayer.name}/${killerPlayer.id} has killed ${name}!`);
        connection.send(`player message ${killerPlayer.id} "How dare you, i had a life!" 2`);

    });

    //Report tablet logging code
    connection.subscribe(`SocialTabletPlayerReported`, async message => {
        const { ReportedBy, ReportedPlayer, Reason } = message.data;

        console.log(`[A TOWNSHIP TALE] ${ReportedPlayer.name} has been reported by ${ReportedBy.name}`);
        console.log(`[A TOWNSHIP TALE] reason for report: ${Reason}...`);

        connection.send(`player message ${ReportedBy.id} "You have sent a report" 2`);

    });
} catch (error) {
    console.error("An error occurred:", error);
  }
});