require('dotenv').config()

const Discord = require('discord.js');
const client = new Discord.Client();
var guild;


client.on('ready', () => {
    guild = client.guilds.cache;
    gName = guild.map(guild => {
        console.log(`Bot is logged on ${guild.name} with id ${guild.id}`);
    });

    client.guilds.fetch("155409166859632640", false, false)
    .then(guild => {
       return guild.setName("TSLA: 709.44, BTC: 57,454");
    })
    .then(console.log);
});

client.login(process.env.BOT_TOKEN);
