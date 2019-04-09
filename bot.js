const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = "%";

client.on("message", async message => {
    var command = message.content.split(" ")[0];
    command = command.slice(prefix.length);
        if(!message.channel.guild) return;
            var args = message.content.split(" ").slice(1).join(" ");
            if(command == "bc") {
                if(!message.member.hasPermission("ADMINISTRATOR")) {
                    return message.channel.send("**للأسف لا تمتلك صلاحية `ADMINISTRATOR`**");
                }
                    if(!args) {
                        return message.reply("**يجب عليك كتابة كلمة او جملة لإرسال البرودكاست**");
                    }
                        message.channel.send(`**هل أنت متأكد من إرسالك البرودكاست؟\nمحتوى البرودكاست: \`${args}\`**`).then(m => {
                            m.react("✅")
                            .then(() => m.react("❌"));

                            let yesFilter = (reaction, user) => reaction.emoji.name == "✅" && user.id == message.author.id;
                            let noFiler = (reaction, user) => reaction.emoji.name == "❌" && user.id == message.author.id;

                            let yes = m.createReactionCollector(yesFilter);
                            let no = m.createReactionCollector(noFiler);

                            yes.on("collect", v => {
                                m.delete();
                                    message.channel.send(`:ballot_box_with_check: | Done ... The Broadcast Message Has Been Sent For ${message.guild.memberCount} Members`).then(msg => msg.delete(5000));
                                        message.guild.members.forEach(member => {
                                            let bc = new Discord.RichEmbed()
                                            .setColor("RANDOM")
                                            .setThumbnail(message.author.avatarURL)
                                            .setTitle("Broadcast")
                                            .addField("Server", message.guild.name)
                                            .addField("Sender", message.author.username)
                                            .addField("Message", args);

                                            member.sendEmbed(bc);
                                        });
                        });
                        no.on("collect", v => {
                            m.delete();
                            message.channel.send("**Broadcast Canceled.**").then(msg => msg.delete(3000));
                        });
                            
                        });
            }
            if(command == "bco") {
                if(!message.member.hasPermission("ADMINISTRATOR")) {
                    return message.channel.send("**للأسف لا تمتلك صلاحية `ADMINISTRATOR`**");
                }
                    if(!args) {
                        return message.reply("**يجب عليك كتابة كلمة او جملة لإرسال البرودكاست**");
                    }
                        message.channel.send(`**هل أنت متأكد من إرسالك البرودكاست؟\nمحتوى البرودكاست: \`${args}\`**`).then(m => {
                            m.react("✅")
                            .then(() => m.react("❌"));

                            let yesFilter = (reaction, user) => reaction.emoji.name == "✅" && user.id == message.author.id;
                            let noFiler = (reaction, user) => reaction.emoji.name == "❌" && user.id == message.author.id;

                            let yes = m.createReactionCollector(yesFilter);
                            let no = m.createReactionCollector(noFiler);

                            yes.on("collect", v => {
                                m.delete();
                                    message.channel.send(`:ballot_box_with_check: | Done ... The Broadcast Message Has Been Sent For ${message.guild.members.filter(r => r.presence.status !== "offline").size} Members`).then(msg => msg.delete(5000));
                                        message.guild.members.filter(r => r.presence.status !== "offline").forEach(member => {
                                            let bco = new Discord.RichEmbed()
                                            .setColor("RANDOM")
                                            .setThumbnail(message.author.avatarURL)
                                            .setTitle("Broadcast")
                                            .addField("Server", message.guild.name)
                                            .addField("Sender", message.author.username)
                                            .addField("Message", args);

                                            member.sendEmbed(bco);
                                        });
                        });
                        no.on("collect", v => {
                            m.delete();
                            message.channel.send("**Broadcast Canceled.**").then(msg => msg.delete(3000));
                        });
                            
                        });
            }
});

client.on("message", message => {
    var prefix = "%";
        if (message.author.id === client.user.id) return;
        if (message.guild) {
       let embed = new Discord.RichEmbed()
        let args = message.content.split(' ').slice(1).join(' ');
    if(message.content.split(' ')[0] == prefix + 'bcs') {
        if (!args[1]) {
    message.channel.send("**bcs <message> **");
    return;
    }
            message.guild.members.forEach(m => {
       if(!message.member.hasPermission('ADMINISTRATOR')) return;
                m.send(args);
            });
            const AziRo = new Discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)   
            .setTitle('✅| جاري ارسال رسالتك ') 
            .addBlankField(true)
            .addField('♨| عدد الاعضاء المرسل لهم ', message.guild.memberCount , true)        
            .addField('📝| الرسالة ', args)
            .setColor('RANDOM')  
            message.channel.sendEmbed(AziRo);          
        }
        } else {
            return;
        }
    });

client.on("message", async message => {
    if(message.content.startsWith(prefix + "help")) {
        let help = new Discord.RichEmbed()
            .setColor("RANDOM")
            .setThumbnail(message.author.avatarURL)
            .setDescription(`╔════════════════════════════════════╗
			║             :radio: :microphone2: ***__بـــوت اعــلانــات بــاريـــس__***:radio: :microphone2: 
			║
			║▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
			║                                   :shield: **__اوامـــــــر بــــوت__**:shield: 
			║▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
			║ 
			║**
			║1-${prefix}bc ⟹ برودكاست كــل باســمــك +صــورتك
			║
			║2-${prefix}bco ⟹ برودكاست وان الايـــن فــقــط
			║
			║3-${prefix}bcs ⟹ برودكاست بــدون اســمــك ولا صــور 
			║**
			╚════════════════════════════════════╝`);
            message.channel.sendEmbed(help); 
    }
});

client.on('message', message => {
  if (!message.content.startsWith(prefix)) return;
  var args = message.content.split(' ').slice(1);
  var argresult = args.join(' ');
  if (message.author.id == 410835593451405312) return;


if (message.content.startsWith(prefix + 'playing')) {
if (message.author.id !== '564414567946387487') return message.reply('***هــذا الامـــر الــى صـــاحـــب بــوت فــقــط***:x:')
client.user.setGame(argresult);
    message.channel.sendMessage(`**__${argresult}__تــم تـغـيــر حـالـه الـى:white_circle:**`)
} else

if (message.content.startsWith(prefix + 'streem')) {
if (message.author.id !== '564414567946387487') return message.reply('***هــذا الامـــر الــى صـــاحـــب بــوت فــقــط***:x:')
client.user.setGame(argresult, "http://twitch.tv/y04zgamer");
    message.channel.sendMessage(`**__${argresult}__ تـم تـغـيـر حـالـه ألـى**:large_blue_circle:`)
} else

if (message.content.startsWith(prefix + 'setname')) {
if (message.author.id !== '564414567946387487') return message.reply('***هــذا الامـــر الــى صـــاحـــب بــوت فــقــط***:x:')
  client.user.setUsername(argresult).then
      message.channel.sendMessage(`**__${argresult}__تــم تـغـيـر اسـم الـى :pencil:**`)
  return message.reply("** لا يــمــكــن تـغــيــر اســم الان نــتـظـار بـعـد سـاعـتـان **:x:");
} else

if (message.content.startsWith(prefix + 'setavatar')) {
if (message.author.id !== '564414567946387487') return message.reply('***هــذا الامـــر الــى صـــاحـــب بــوت فــقــط***:x:')
client.user.setAvatar(argresult);
    message.channel.sendMessage(`**__${argresult}__** تــم تــغــيــر صـــور الـى :camera_with_flash:**`);
} else


if (message.content.startsWith(prefix + 'watching')) {
if (message.author.id !== '564414567946387487') return message.reply('***هــذا الامـــر الــى صـــاحـــب بــوت فــقــط***:x:')
    client.user.setActivity(argresult, {type : 'watching'});
 message.channel.sendMessage(`**__${argresult}__تــم تــغــيــر حــالــه الــى :red_circle:**`)${argresult}
}
});

client.login(process.env.BOT_TOKEN);
