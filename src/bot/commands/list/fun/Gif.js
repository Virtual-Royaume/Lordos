const COMMAND = require("../../Command");
const EMBED = require("../../../utils/Embed");
const GIPHY = require("giphy-api")();
const DISCORD = require("discord.js");

class Gif extends COMMAND {

    constructor(){
        super("gif", "Affiche un gif aléatoire selon votre recherche", "fun");

        this.setUsage("<recherche>");
    }

    /**
     * @param {string[]} args 
     * @param {DISCORD.Message} message 
     */
    async execute(args, message){
        if(!args[0]) return false;

        GIPHY.random(args.join(" ")).then(response => {
            if(response.data && response.data.url){
                message.channel.send(response.data.url);
            } else {
                EMBED.reply("Aucun gif n'existe pour votre recherche.", message);
            }
        });
    }
}

module.exports = Gif;