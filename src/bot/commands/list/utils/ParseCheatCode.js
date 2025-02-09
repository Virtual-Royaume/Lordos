const COMMAND = require("../../Command");
const PARSER = require("../../../utils/CheatCodeParser");
const EMBED = require("../../../utils/Embed");
const DISCORD = require("discord.js");

class ParseCheatCode extends COMMAND {

    constructor(){
        super("parsecheatcode", "Permet d'avoir plus d'informations à propos d'un cheat code", "utils");

        this.setUsage("<console> <code>");
        this.setAliases(['pcc']);
    }

    /**
     * @param {string[]} args 
     * @param {DISCORD.Message} message 
     */
    async execute(args, msg){
        let cons = args.shift() || undefined;
        let code = args.join(" ");
        
        // Aucun sens mais ok
        if(cons) {
            cons = cons.toLowerCase();
        } else if(!cons) {
            return false;
        }
        
        switch(cons) {
            case "gb":
            case "gbc":
                let parsed = PARSER.parseGBC(code);
                let desc = "";
                
                parsed.forEach((i) => {
                    desc += `\n\n**${i.value}${i.addr}**\n**${i.value}** (${parseInt(i.value)}) est écrit à l'adresse **0x${i.addr}**`;
                });
                
                EMBED.send(desc, msg.channel);
                
                return true;
            break;
            
            default:
                msg.channel.send(":x: | Cette console n'est pas supportée!");
            break;
        }
    }
}

module.exports = ParseCheatCode;