const Discord = require('discord.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core');

const NEW_MEMBER_ROLE = 'New Member';
const MUSIC_COMMAND = '!play';
const LOG_CHANNEL_NAME = 'Foxbot_logs';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('guildMemberAdd', member => {
  console.log(`New member joined: ${member.user.username}`);
  const newMemberRole = member.guild.roles.cache.find(role => role.name === NEW_MEMBER_ROLE);
  if (newMemberRole) {
    member.roles.add(newMemberRole);
    console.log(`Assigned new member role to ${member.user.username}`);
  } else {
    console.error(`Could not find role: ${NEW_MEMBER_ROLE}`);
  }
});

client.on('message', async message => {
  if (message.author.bot || !message.content.startsWith(MUSIC_COMMAND)) {
    return;
  }
  const args = message.content.split(' ');
  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel) {
    message.reply(`You need to be in a voice channel to use this command!`);
    return;
  }
  const videoUrl = args[1];
  if (!videoUrl) {
    message.reply(`You need to provide a YouTube video URL to play music!`);
    return;
  }
  const connection = await voiceChannel.join();
  const stream = ytdl(videoUrl, { filter: 'audioonly' });
  const dispatcher = connection.play(stream);
  dispatcher.on('finish', () => {
    voiceChannel.leave();
  });
  message.reply(`Now playing: ${videoUrl}`);
});

client.login('YOUR_BOT_TOKEN');

// Log to a specific channel
client.on('debug', message => {
  const logChannel = client.channels.cache.find(channel => channel.name === LOG_CHANNEL_NAME && channel.type === 'text');
  if (logChannel) {
    logChannel.send(`[DEBUG] ${message}`);
  }
});

client.on('warn', message => {
  const logChannel = client.channels.cache.find(channel => channel.name === LOG_CHANNEL_NAME && channel.type === 'text');
  if (logChannel) {
    logChannel.send(`[WARN] ${message}`);
  }
});

client.on('error', error => {
  const logChannel = client.channels.cache.find(channel => channel.name === LOG_CHANNEL_NAME && channel.type === 'text');
  if (logChannel) {
    logChannel.send(`[ERROR] ${error}`);
  }
});

client.on('shardError', error => {
  const logChannel = client.channels.cache.find(channel => channel.name === LOG_CHANNEL_NAME && channel.type === 'text');
  if (logChannel) {
    logChannel.send(`[SHARD ERROR] ${error}`);
  }
});
