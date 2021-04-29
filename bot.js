require('dotenv').config()

const Discord = require('discord.js')
const client = new Discord.Client()

client.on('ready', () => {
    console.log('Bot is ready to go')
});

client.login(process.env.BOT_TOKEN);
