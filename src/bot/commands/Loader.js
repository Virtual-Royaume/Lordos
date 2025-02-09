const FS = require("fs");
const COMMAND = require("./Command");
const CLICOMMAND = require('../../CLI/commands/CliCommand');

class Loader {
    loadCommands(cli = false, path = null, pathTwo = null){
        if(path == null) path = cli == false ? __dirname + "/../commands/list/" : __dirname + "/../../CLI/commands/list/";
        if(pathTwo == null) pathTwo = cli == false ? __dirname + "/list/" : __dirname + "/../../CLI/commands/list/";
        let classType = cli == false ? COMMAND : CLICOMMAND;
        let count = 0;

        FS.readdirSync(path).forEach((moduleName) => {
            if(moduleName.split(".").pop() == "js"){ //READ JS FILES
                let commandClass = require(pathTwo + moduleName);
                let type = cli == false ? "bot" : "CLI";
                
                if(typeof commandClass == "function"){ //prevents 'not a constructor' error
                    commandClass = new commandClass();
                    if(commandClass instanceof classType){ //only register commands
                        BOT.LOGGER.notice("Loaded " + type + " command: " + moduleName);
                        BOT.COMMAND_MANAGER.add(commandClass, cli);
                        count++;
                    } else {
                        BOT.LOGGER.warn("Cannot load " + type + " command: " + moduleName + " (not a command instance)");
                    }
                } else {
                    BOT.LOGGER.warn("Cannot load " + type + " command: " + moduleName + " (missing exports?)");
                }
            } else { //READ DIRECTORIES
                if(!cli){
                    if(FS.lstatSync(path + "/" + moduleName).isDirectory()) count += this.loadCommands(false, path + "/" + moduleName + "/", pathTwo + "/" + moduleName + "/");
                }
            }
        });

        return count;
    }

    loadEvents(){
        let path = __dirname + "/../events/";
        let count = 0;

        FS.readdirSync(path).forEach(eventName => {
            if(eventName.split(".").pop() == "js"){
                require("../events/" + eventName);

                BOT.LOGGER.notice("Loaded event: " + eventName);
                count++;
            }
        });

        return count;
    }

    /**
     * @param {String} path path for FileSystem
     * @param {String} pathTwo path for require()
     * @returns {Number} count of cleared modules
     */
    clear(path, pathTwo){
        let count = 0;
        FS.readdirSync(path).forEach(moduleName => {
            if(moduleName.split(".").pop() == "js"){
                delete require.cache[require.resolve(pathTwo+moduleName)];
                BOT.LOGGER.notice("Cleared module: " + moduleName);
                count++;
            } else {
                if(FS.lstatSync(path + moduleName + "/").isDirectory()) count += this.clear(path + moduleName + "/", pathTwo + moduleName + "/");
            }
        });

        return count;
    }
}

module.exports = Loader;