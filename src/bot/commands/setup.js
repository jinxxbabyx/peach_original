const { MessageButton, MessageActionRow } = require('discord-buttons');
const Discord = require('discord.js');

module.exports = {
    name: "setup",
    cooldown: 5,
    aliases: ["create"],

    run: async function(client, message, args) {
      if (!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send(
        "You should have admin perms to use this command!"
      );
    }
        try {
            var prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`);
            if (prefix == null) prefix = require('../../config/bot').prefix;
            var ticketChannel = message.mentions.channels.first() || client.channels.cache.get(args[0]) || message.guild.channels.cache.find(c => c.name == args[0]) || message.channel;
            var adminRole = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.id == args[1]) || message.guild.roles.cache.find(r => r.name == args[1]);
            var title = message.content.split(' ').slice(3).join(' ') || '**Multi-Ticket**\n\n__**Here You Can Open A Support, Other And Even A Claim Ticket!**__\n`Click The Button Category Below Based On Your Needs`';
            if (!adminRole) {
                message.channel.send({
                    embed: {
                        title: `❌ | Wrong use`,
                        description: `⚠ | correct use: ${prefix}setup <Ticket Channel> <Admins Role> <Ticket Message Desc>`,
                        color: 0xFF0000
                    }
                }).then(async function(msg) {
                    setTimeout(() => {
                        msg.delete().catch(err => { return })
                    }, 1000 * 7);
                })
                return
            }
            message.react('887650847327158343');
            message.channel.send(`Success!`);
            let btn = new MessageButton()
                .setStyle("red")
                .setLabel("create Ticket")
                .setEmoji('850829758912528435')
                .setID("createTicket")
            let row = new MessageActionRow()
                .addComponent(btn)
                

                
                const panel = new Discord.MessageEmbed()
                .setTitle(`Open a Ticket`)
                .setDescription(`${title}`)
                .setImage('https://media.discordapp.net/attachments/886502267262488586/893408033881849886/Venom.png')
                .setThumbnail(message.guild.iconURL({ dynamic: true }))
                .setColor(`#0xF8BBDF`)
            ticketChannel.send(panel, row)
            .then(async function() {
                require('quick.db').set(`TicketAdminRole_${message.guild.id}`, adminRole.id);
            })
        } catch (err) {
            return;
        }
    }
}
