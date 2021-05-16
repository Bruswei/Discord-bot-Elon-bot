require('dotenv').config()

const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require("node-fetch");
var guild;

const yahooStockPrice = require('yahoo-stock-prices')

client.on('ready', () => {
    guild = client.guilds.fetch("155409166859632640", false, false);
    gName = guild.then(guild => {
        console.log(`Bot is logged on ${guild.name} with id ${guild.id}`);
    });

    // function runs every 10 sec
    setInterval(() => {
        getPromises().then(price => {
                var name = `TSLA: ${price[0]} BTC: ${price[1]} DOGE: ${price[2]}`;
                changeGuildName(name);
        });
    }, 5000);

});

client.login(process.env.BOT_TOKEN);

function changeGuildName(name) {
    client.guilds.fetch("155409166859632640", false, false)
    .then(guild => {
       return guild.setName(name);
    })
    .then(guild => {
        console.log(`Server name set to ${guild.name}`)
    });
}

// Function to fetch stock and crypto prices and calculate 
function getPromises() {
    const tsla = yahooStockPrice.getCurrentPrice('TSLA');
    const btc = fetch('https://blockchain.info/tobtc?currency=USD&value=500')
        .then(response => response.text())
        .then(price => (500/price).toFixed(2));
    const doge = fetch('https://sochain.com//api/v2/get_price/DOGE/USD')
        .then(response => response.text())
        .then(res => JSON.parse(res))
        .then(res =>  parseFloat(res.data.prices[0].price).toFixed(2));

    return Promise.all([tsla, btc, doge])
}