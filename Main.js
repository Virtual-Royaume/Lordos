const DISCORD = require("discord.js");
global.CLIENT = new DISCORD.Client({disableMentions: "true"});

CLIENT.on("message", (message) => {
    if(message.content.includes("ping")){
        message.reply("tgm");
    }
});

CLIENT.login("NzMzODE5MzQ1OTA1NTE2NjU2.XxIsyg.Kr-Ab2hsYpfPmb_ubwunR9fDrs0");
