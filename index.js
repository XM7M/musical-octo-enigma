// ===== إعداد سيرفر 24 ساعة =====
const express = require("express");
const app = express();
const listener = app.listen(process.env.PORT || 2000, () => {
  console.log("✅ Web server running on port " + listener.address().port);
});
app.get("/", (req, res) => {
  res.send(`<center><h1>Bot 24H ON!</h1></center>`);
});

// ===== إعداد بوت Discord الرسمي =====
const { Client, GatewayIntentBits } = require("discord.js");
const { joinVoiceChannel, getVoiceConnection } = require("@discordjs/voice");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", async () => {
  console.log(`🤖 Logged in as ${client.user.tag}`);

  // ثبات البوت في الروم الصوتي
  const channelId = process.env.channel; // ضع ID الروم الصوتي في .env
  const guildId = process.env.guild; // ضع ID السيرفر في .env

  try {
    const channel = await client.channels.fetch(channelId);
    if (!channel || channel.type !== 2) {
      console.log("⚠️ القناة غير صالحة أو ليست قناة صوتية");
      return;
    }

    joinVoiceChannel({
      channelId: channel.id,
      guildId: guildId,
      adapterCreator: channel.guild.voiceAdapterCreator,
      selfMute: true,
      selfDeaf: true,
    });

    console.log(`🎧 Joined voice channel ${channel.name} and staying 24/7`);
  } catch (err) {
    console.error("❌ فشل في الانضمام إلى الروم الصوتي:", err);
  }
});

client.login(process.env.TOKEN);
