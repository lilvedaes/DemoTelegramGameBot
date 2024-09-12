import { Bot, InlineKeyboard } from "grammy";
const token = process.env.BOT_TOKEN;
if (!token)
    throw new Error("BOT_TOKEN is unset");
export const bot = new Bot(token, {
    botInfo: {
        id: 7474842318,
        is_bot: true,
        first_name: "DemoTelegramGame",
        username: "@DemoTelegramGameBot",
        can_join_groups: false,
        can_read_all_group_messages: false,
        supports_inline_queries: true,
        can_connect_to_business: false,
        has_main_web_app: true,
    }
});
// Commands - Start, Play, Leaderboard, About, Help
bot.command("start", async (ctx) => {
    ctx.reply(`Hi, ${ctx.from?.first_name}. Play the game now!!!`);
});
bot.command("play", async (ctx) => {
    const keyboard = new InlineKeyboard().game("Play now!")
        .row()
        .text("About", "about");
    ctx.replyWithGame("superclicker", {
        reply_markup: keyboard,
        protect_content: true,
        disable_notification: true
    });
});
bot.command("about", (ctx) => {
    ctx.reply("About!!! \nThis is a clicker game bot");
});
bot.command("help", (ctx) => {
    ctx.reply(`
    <b>Clicker Game Bot Help</b>
    Get in touch with the game support team.
  `, { parse_mode: "HTML" });
});
bot.on("callback_query:data", async (ctx) => {
    const data = ctx.callbackQuery.data;
    if (data === "about") {
        ctx.reply("About!!! \nThis is a clicker game bot");
    }
});
bot.on("callback_query:game_short_name", async (ctx) => {
    await ctx.answerCallbackQuery({ url: `https://itch.io/embed/526992` });
});
bot.catch((err) => console.error(err));
