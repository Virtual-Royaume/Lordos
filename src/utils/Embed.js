const DISCORD = require("discord.js");

const COLOR_GREEN = "#20A765";

class Embed {

    /**
     * @param {String} message message to send
     * @param {Object} channel channel
     * @param {String} color embed color
     * @returns {void} void
     */

    static send(message, channel, options = {}){
        let embed = new DISCORD.MessageEmbed();

        embed.setDescription(message);
        
        embed.setColor(COLOR_GREEN);
        if(options["color"]) embed.setColor(options["color"]);
        

        if(options["image"]){
            embed.setImage(options["image"]);
        }
        return channel.send(embed);
    }
}

module.exports = Embed;

module.exports.COLOR_GREEN = COLOR_GREEN;