import dotenv from "dotenv";
import { GatewayIntentBits } from "discord.js";

import Bot from "../bot/index.js";
import Router from "../router/index.js";
import { colors } from "../utils/debug.js";

dotenv.config({
    path: ".env",
});

export default class Core {
    constructor() {
        this.modules = {
            bot: new Bot({
                intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
            }),
            router: new Router(this),
        };
    }

    init() {
        this.modules.bot.init();
        this.modules.router.init();
        console.log(`${colors.fg.green}[READY]${colors.reset} - Aplicação iniciada com sucesso!`);
    }
}
