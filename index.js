const Discord = require('discord.js');
const fs = require('fs');
const config = require('./config.json');

const client = new Discord.Client({
    intents: [
        'GUILDS', 
        'GUILD_MESSAGES', 
        'DIRECT_MESSAGES', 
        'DIRECT_MESSAGE_REACTIONS',
        'DIRECT_MESSAGE_TYPING'
    ],
    partials: [
        'CHANNEL'
    ]
});


client.on('ready', () => {
    console.log('Client logged in as ' + client.user.tag);
    console.log();
});

client.on('messageCreate', message => {
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if (command === 'cosmetics' || command === 'emotes' || command === 'help' || command === 'cape' || command === 'sticker' || command === 'invite' || command === 'vote' || command === 'bandana') {
        
        let data = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
        if (!data.savedusers.includes(message.author.id)) {
            const embedDE = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Willkommen! 👋 :flag_de:')
                .setDescription('**Schön, dass du LabyCheck verwendest!**\nSchaue auch gerne mal auf https://labycheck.de vorbei, dort findest du eine ausführliche __Dokumentation__ über den Bot 🤑\n\n**Wir würden uns außerdem sehr darüber freuen, wenn du uns ein kleines __Feedback__ über den Bot hinterlassen könntest https://surveys.knocklive.de/ ❤\n\nWir wünschen dir noch viel Spaß mit LabyCheck! :D\n\n~ Dein LabyCheck Team**')
                //.setThumbnail('https://images-ext-2.discordapp.net/external/WupxCSsrcYug9BgMKRFWMS05fY-jdtW24vuFELDzAY8/https/cdn.discordapp.com/avatars/847972974786248704/55da85df68ae5f84a3b62c6a0d59c66a.webp')

            const embedEN = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Welcome! 👋 :flag_gb:')
                .setDescription('**Glad you are using LabyCheck!**\nJust have a look at https://labycheck.de, there you can find a detailed __Documentation__ about the bot 🤑\n\n**We would also be very happy if you could leave us a little __Feedback__ about the bot https://surveys.knocklive.de/ ❤\n\nWe wish you a lot of fun with LabyCheck! :D\n\n~ Your LabyCheck Team**')
                //.setThumbnail('https://images-ext-2.discordapp.net/external/WupxCSsrcYug9BgMKRFWMS05fY-jdtW24vuFELDzAY8/https/cdn.discordapp.com/avatars/847972974786248704/55da85df68ae5f84a3b62c6a0d59c66a.webp')
                .setTimestamp()

            const newData = {
                "savedusers": data.savedusers + message.author.id + ' '
            }

            fs.writeFile('./data.json', JSON.stringify(newData, null, 2), (err) => {
                if (err) throw err;
            });

            message.author.send({embeds: [embedEN, embedDE]});
            message.author.send({content: 'https://discord.com/invite/HvRGKz5ztg'});
            console.log(message.author.id + ' (' + message.author.tag + ') hat sich erfolgreich registriert.');
        }
    }
});


client.login(config.token);