const COMMAND = require("../../Command");
const EMBED = require("../../../utils/Embed");
const DISCORD = require("discord.js");

class Probabilities extends COMMAND {
    timer = []

    constructor(){
        super("probabilities", "Génère des nombres", "utils");
        this.setAliases(["probs"]);
        this.setUsage("<number of numbers (max 100)> <born1> <born2>\n(difference between borns <= 25) (3 seconds cooldown)");
    }

    /**
     * @param {string[]} args 
     * @param {DISCORD.Message} message 
     */
    async execute(args, message){

        // Check if command is in cooldown :
        if(this.timer.includes(message.guild.id)){
            EMBED.reply("Refroidissement de la commande...", message);
            return;
        };

        // Test if empty args :
        if(!args[1])return false;

        // Test if args are numbers :
        if(isNaN(args[0]) || isNaN(args[1]) || (args[2] && isNaN(args[2]))) return false;

        // Set command in cooldown :
        this.timer.push(message.guild.id);

        // Get number of time to repeat :
        let repeat = parseInt(args[0]) > 100 ? 100 : parseInt(args[0]);

        // Get borns of random :
        let born1 = args[2] ? parseInt(args[1]) : 1; 
        let born2 = args[2] ? parseInt(args[2]) : args[1];

        // Borns to max and min :
        let max = Math.max(born1, born2);
        let min = Math.min(born1, born2);

        max = max - min >= 25 ? min + 24 : max;

        // Randomize numbers :
        let numbers = {};
        for(let i = 0; i < repeat; i++){
            let num = Math.floor(Math.random() * (max - min + 1) + min);
            numbers[num] = numbers[num] ? numbers[num] + 1 : 1;
        }

        // Create result text :
        let text = "Probabilités pour " + repeat + " tirages entre " + min + " et " + max + ":\n";
        for(let key in numbers){
            text += "\n- " + key + ": " + numbers[key] + " fois (" + Number(100*numbers[key]/repeat).toFixed(2) + "%).";
        }

        let values = Object.values(numbers);
        let keys = Object.keys(numbers);

        max = Math.max(...values);
        min = Math.min(...values);

        text += "\n\nMax:    " + keys[values.indexOf(max)] + ": " + max + " fois (" + Number(100*max/repeat).toFixed(2) + "%)\n";
        text += "\nMin:    " + keys[values.indexOf(max)] + ": " + max + " fois (" + Number(100*max/repeat).toFixed(2) + "%)\n";
        text += "\nTotal: " + repeat;

        // Send result :
        EMBED.reply(text, message);

        // Beginning of the cooldown :
        setTimeout(()=>{
            this.timer.splice(this.timer.indexOf(message.guild.id), 1);
        }, 5000);
    }
}

module.exports = Probabilities;
