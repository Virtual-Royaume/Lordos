const COMMAND = require("../../Command");
const AXIOS = require("axios");
const EMBED = require("../../../utils/Embed");
const DISCORD = require("discord.js");

class McSkin extends COMMAND {

    constructor(){
        super("mcskin", "Vous donne le skin d'un joueur Minecraft version Java", "information");

        this.setUsage("<pseudo du joueur>");
    }

    /**
     * @param {string[]} args 
     * @param {DISCORD.Message} message 
     */
    async execute(args, message){
        if(!args[0]) return false;

        AXIOS.get("https://api.mojang.com/users/profiles/minecraft/" + args[0]).then(response => {
            AXIOS.get("https://sessionserver.mojang.com/session/minecraft/profile/" + response.data.id).then(response => {
                message.channel.send(JSON.parse(Buffer.from(response.data.properties[0].value, "base64").toString()).textures.SKIN.url);
                message.channel.send("Ca arrive !");
            });
        }).catch(error => {
            EMBED.reply("Ce pseudo n'existe pas !", message);
        });
    }
}

module.exports = McSkin;