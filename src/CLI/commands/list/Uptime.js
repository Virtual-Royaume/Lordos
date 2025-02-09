const CLICOMMAND = require("../CliCommand");

class Uptime extends CLICOMMAND {

    constructor(){
        super("uptime", "Show the bot uptime");
    }

    /**
     * @param {string[]} args 
     */
    execute(args){
        BOT.LOGGER.cli(this.getUptime());
    }

    getUptime(){
        let time = process.uptime();

        let min = Math.floor(time / 60);
        let sc = Math.floor(time % 60);

        sc = sc < 9 ? "0" + sc : sc;
        min = min < 9 ? "0" + min : min;

        return min + ":" + sc;
    }
}

module.exports = Uptime;