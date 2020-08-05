const COMMAND = require("../../Command");
const EMBED = require("../../../utils/Embed");

const PREFIX = "**<TAQUIN>** ";

const EMOJIS = ["1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣"];

const ARROWS = ["◀️", "🔼", "🔽", "▶️"];

class Taquin extends COMMAND {

    constructor(){
        super("taquin", "Jouer au taquin, un casse tête ou vous devez remettre les lettres dans le bonne ordre", "game");

        this.setUsage("<play ou règles>");
    }

    execute(args, message){
        
        switch(args[0]){
            case "play":
                let grid = this.createGrid();
                EMBED.send(PREFIX + "\n\n <@" + message.author + "> a commencé une partie de taquin.", message.channel);
                message.channel.send(this.grid2Text(grid)).then((msg) => {
                    for(let i of ARROWS) msg.react(i);
                    this.newRound(msg, message.author, grid);
                })
                break;
            case "règles":
                //TODO
                break;
            default:
                return false;
        }
    }

    newRound(message, player, grid){
        let collector = message.createReactionCollector((reac, user) => user.id == player.id & ARROWS.includes(reac.emoji.name),{time : 120000});
        collector.on("collect", (reaction, user) => {
            let blank = grid.indexOf("🔳");
            switch(reaction.emoji.name){
                case "🔼":
                    if(EMOJIS.includes(grid[blank + 3])){

                        grid[blank] = grid[blank + 3];
                        grid[blank + 3] = "🔳";
                    }
                    break;
                case "🔽":
                    if(EMOJIS.includes(grid[blank - 3])){
                        grid[blank] = grid[blank - 3];
                        grid[blank - 3] = "🔳";
                    } 
                    break;
                case "◀️":
                    if(EMOJIS.includes(grid[blank + 1])){
                        grid[blank] = grid[blank + 1];
                        grid[blank + 1] = "🔳";
                    }
                    break;
                case "▶️":
                    if(EMOJIS.includes(grid[blank - 1])){
                        grid[blank] = grid[blank - 1];
                        grid[blank - 1] = "🔳";
                    }
                    break;
            }
            collector.stop("stop");
            message.reactions.resolve(reaction.emoji.name).users.remove(user);
            message.edit(this.grid2Text(grid));

            if(!this.verifyGrid(grid)){
                this.newRound(message, player, grid);
            }
            else{
                grid[8] = "9️⃣";
                message.edit(this.grid2Text(grid));
            }
        })

        collector.on('end', (collected, reason) => {
            if(reason != "stop"){
                EMBED.edit(message, PREFIX + "\n```yaml\nPartie expirée.```");
            }
        });
    }

    grid2Text(grid){
        let text = "";
        for(let i = 0; i < 9; i++){
            text += grid[i]
            if((i + 1) % 3 == 0) text += "\n"
        }
        return text;
    }

    verifyGrid(grid){
        return JSON.stringify(grid) === JSON.stringify(["1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","🔳"])
    }

    createGrid(){
        let grid = EMOJIS.slice(0, EMOJIS.length - 1);
        grid.push("🔳");
        let movement;
        for(let i = 0; i < 100; i++){
            movement = Math.floor(Math.random() * 3);
            let blank = grid.indexOf("🔳");
            switch(movement){
                case 0:
                    if(EMOJIS.includes(grid[blank + 3])){
                        grid[blank] = grid[blank + 3];
                        grid[blank + 3] = "🔳";
                    }
                    break;
                case 1:
                    if(EMOJIS.includes(grid[blank - 3])){
                        grid[blank] = grid[blank - 3];
                        grid[blank - 3] = "🔳";
                    } 
                    break;
                case 2:
                    if(EMOJIS.includes(grid[blank + 1])){
                        grid[blank] = grid[blank + 1];
                        grid[blank + 1] = "🔳";
                    }
                    break;
                case 3:
                    if(EMOJIS.includes(grid[blank + 1])){
                        grid[blank] = grid[blank + 1];
                        grid[blank + 1] = "🔳";
                    }
                    break;
            }
        }
        return grid;
    }
}

module.exports = Taquin;