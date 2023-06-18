import dotenv from "dotenv";
import { GatewayIntentBits } from "discord.js";

import Bot from "../bot/index.js";
import Server from "../server/index.js";
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
            server: new Server(this),
        };
    }

    init() {
        this.modules.bot.init();
        this.modules.server.init();
        console.log(`${colors.fg.green}[READY]${colors.reset} - Aplicação iniciada com sucesso!`);
    }
}
