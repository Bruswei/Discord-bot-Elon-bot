require('dotenv').config()

const Discord = require('discord.js');
const client = new Discord.Client();
var guild;


client.on('ready', () => {
    guild = client.guilds.cache;
    gName = guild.map(guild => {
        console.log(`Bot is logged on ${guild.name} with id ${guild.id}`);
    });

    const name = "TSLA: 710,00 & BTC: 57454";
    changeGuildName(name);

});

client.login(process.env.BOT_TOKEN);

function changeGuildName(name) {
    client.guilds.fetch("155409166859632640", false, false)
    .then(guild => {
       return guild.setName(name);
    })
    .then(guild => {
        console.log(`Server name set to ${guild.name}`)
    })
}