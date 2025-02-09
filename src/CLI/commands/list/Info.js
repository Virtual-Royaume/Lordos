const CLICOMMAND = require("../CliCommand");
const STYLE = require("../../utils/Style");

class Info extends CLICOMMAND {

    constructor(){
        super("info", "Get informations about the process/bot");
    }

    /**
     * @param {string[]} args 
     */
    execute(args){
        BOT.LOGGER.cli(
            STYLE.createTitle("INFORMATION") + "\n[CPU USAGE]: " +
            process.cpuUsage().system + " X??\n[MEMORY USAGE]: " + 
            (process.memoryUsage().heapUsed/8) + " bytes\n[GUILD SIZE]: " + 
            BOT.CLIENT.guilds.cache.size
        );
    }
}

module.exports = Info;