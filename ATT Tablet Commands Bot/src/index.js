const { attConfig } = require('./my-configs');
const { Client: attClient } = require('att-client');

const attbot = new attClient(attConfig);

exports.attbot = attbot;

(async () => {
	attbot.start();
})();


attbot.on('connect', async (connection) => {
    console.log(`[A TOWNSHIP TALE] bot has securely made a connection to ${connection.server.name}`);


    connection.subscribe(`SocialTabletPlayerReported`, async message => {
        const { ReportedBy, ReportedPlayer, Reason } = message.data;

        attbot.api.getGroupMember(connection.server.group.id, ReportedBy.id).then(async GroupMember => {
     
            if(Reason.includes('Harrassment') && (GroupMember.permissions.includes("Moderator") || GroupMember.permissions.includes("Admin") && ServerData.tabletCommands)) {
                connection.send(`player message ${ReportedBy.id} "Initializing teleportation." 2`)
                    
                setTimeout(function() {

                    connection.send(`player teleport ${ReportedBy.id} ${ReportedPlayer.id}`)
                    connection.send(`player message ${ReportedBy.id} "You have teleported to ${ReportedPlayer.username}." 2`)

                }, 3000);

            } else {  
                connection.send(`player message ${ReportedBy.id} "You have reported ${ReportedPlayer}" 2`);
            }
            
            if(Reason.includes('Griefing') && (GroupMember.permissions.includes("Moderator") || GroupMember.permissions.includes("Admin") && ServerData.tabletCommands)) {
                connection.send(`player message ${ReportedBy.id} "Initializing jail." 2`)
            
                setTimeout(function() {

                    connection.send(`player set-home ${ReportedPlayer.id} -904.249,162.464844,113.999`)
                    connection.send(`player teleport ${ReportedPlayer.id} home`)
                    connection.send(`player message ${ReportedPlayer.id} "You have been sent to jail untill futher notice." 4`)
                    connection.send(`player set-home ${ReportedPlayer.id} 0,0,0`)
                    connection.send(`player message ${ReportedBy.id} "You have sent ${ReportedPlayer.username} to jail." 2`)

                }, 3000);

            } else {
                connection.send(`player message ${ReportedBy.id} "You have reported ${ReportedPlayer}" 2`);
            }
            
            if(Reason.includes('CheatingExploits') && (GroupMember.permissions.includes("Moderator") || GroupMember.permissions.includes("Admin") && ServerData.tabletCommands)) {
                connection.send(`player message ${ReportedBy.id} "Initializing summoning." 2`)
            
                setTimeout(function() {

                    connection.send(`player teleport ${ReportedPlayer.id} ${ReportedBy.id}`)
                    connection.send(`player message ${ReportedBy.id} "You have summoned ${ReportedPlayer.username}." 3`)
                    connection.send(`player message ${ReportedPlayer.id} "You have been summoned by ${ReportedBy.username}." 2`)
                }, 3000);

            } else {
                connection.send(`player message ${ReportedBy.id} "You have reported ${ReportedPlayer}" 2`);
            }
        });
    });
});
