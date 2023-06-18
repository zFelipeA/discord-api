import { Client, EmbedBuilder } from "discord.js";

export default class Bot extends Client {
    constructor(client_options = {}) {
        super(client_options);
        this.embed = EmbedBuilder;
    }

    init() {
        this.login(process.env.TOKEN).catch(err => {
            console.log("[DISCORD-API] Não foi possivel conectar ao discord BOT");
        });
    }
}
