const EMBED = require("../utils/Embed");

CLIENT.on("message", async (message) => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") return;
    if(!message.content.startsWith(CLIENT.CONSTANTS.prefix)) return;

    let args = message.content.substring(1).split(" ");
    let commandName = args.shift().toLowerCase();
    let command = CLIENT.COMMANDMANAGER.get(commandName);
    let admins = await CLIENT.CONSTANTS.getAdmins();

    if(command){
        if(command.getPermissions().includes("BOT.ADMINISTRATOR")){
            if(!admins.includes(message.author.id)){
                return EMBED.send("Vous n'avez pas accès à cette commande !\nPermission(s) requise(s) : `" + command.getPermissions().join("`, `") + "`", message.channel, 'RED');
            }
        } else {
            if(!message.member.permissions.has(command.getPermissions())){
                return EMBED.send("Vous n'avez pas accès à cette commande !\nPermission(s) requise(s) : `" + command.getPermissions().join("`, `") + "`", message.channel, 'RED');
            }
        }

        let execute = await command.execute(args, message);
        if(execute == false) {
            EMBED.send(command.getUsage(), message.channel, 'RED');
        }

        CLIENT.LOGGER.info(`${message.author.tag} executed command: ${commandName.toLowerCase()}`);
    }
});