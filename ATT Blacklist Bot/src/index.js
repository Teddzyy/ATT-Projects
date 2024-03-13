const { attConfig } = require('./my-configs');
const { Client: attClient } = require('att-client');

const blackListedIds = require('./blacklistedConfig');
const attbot = new attClient(attConfig);

exports.attbot = attbot;

(async () => {
	attbot.start();
})();


attbot.on('connect', async (connection) => {
    console.log(`[A TOWNSHIP TALE] bot has securely made a connection to ${connection.server.name}`);


    connection.subscribe(`PlayerJoined`, async message => {
        const { user, position } = message.data;

        if(blackListedIds.includes(user.id.toString())) {

            setTimeout(function() {

                connection.send(`player modifystat ${user.id} speed -10000 99999 true`);
                connection.send(`player set-home ${user.id} 376.22,129.433,-320.399`);
                connection.send(`player teleport ${user.id} home`);
                connection.send(`player message ${user.id} "Hi there ${user.username},\n\nyou have been blacklisted from this server due to bad activity/behaviour.\n\nif you wish to be unblacklisted please contact the server owner or moderators." 15`); 
            
            }, 10000);
            
            setTimeout(function() {
                
                connection.send(`player kick ${user.id}`);
                console.log(`[TOWNSHIP TALE] player has${user.id}/${user.username} have been kicked from ${connection.server.name} due to bad activity/behaviour`);
            
            }, 22000);
        }
    });
});