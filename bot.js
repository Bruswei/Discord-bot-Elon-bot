require('dotenv').config()

const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require("node-fetch");
var guild;

const yahooStockPrice = require('yahoo-stock-prices')

var tsla = 0;
var btc = 0;
var doge = 0;

// Which price was updated last
// 1 - tesla, 2 - btc, 3 - doge
var lastPrice = 1;


client.on('ready', () => {
    guild = client.guilds.fetch("155409166859632640", false, false);
    gName = guild.then(guild => {
        console.log(`Bot is logged on ${guild.name} with id ${guild.id}`);
    });

    // function runs every 10 sec
    setInterval(() => {
        updatePrices();
        switch(lastPrice) {
            case 1:
                changeGuildName(`Dogefather club: TSLA - ${tsla}$`)
                lastPrice++;
                break;

            case 2: 
                changeGuildName(`Dogefather club: BTC - ${btc}$`)
                lastPrice++;
                break;

            case 3: 
                changeGuildName(`Dogefather club: DOGE - ${doge}$`)
                lastPrice = 1;
                break;
            default:
                lastPrice = 1;
        }
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

// Fetch prices and updates global variables
function updatePrices() {
    yahooStockPrice.getCurrentPrice('TSLA').then(price => {
        tsla = price;
    });

    fetch('https://blockchain.info/tobtc?currency=USD&value=500')
        .then(response => response.text())
        .then(price => {
            btc = (500/price).toFixed(2);
        });

    fetch('https://sochain.com//api/v2/get_price/DOGE/USD')
        .then(response => response.text())
        .then(res => JSON.parse(res))
        .then(res => {
            doge = parseFloat(res.data.prices[0].price).toFixed(2);
        });
}