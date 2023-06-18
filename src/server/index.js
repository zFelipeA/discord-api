import express from "express";
import { colors } from "../utils/debug.js";

export default class Server {
    constructor(core) {
        this.core = core;
        this.app = express();
        this.port = process.env.SERVER_PORT;
    }

    async post(req, res) {
        const body = req.body;
        if (!body) {
            return res.send("Informe um conteudo válido").status(400);
        }

        const data = body[0].data;
        if (!data) {
            return res.send("Informe um titulo válido").status(400);
        }

        const image = body[0].image;
        if (!image) {
            return res.send("Informe uma imagem válida").status(400);
        }

        const channel = this.core.modules.bot.channels.cache.get("1120089724422463608");
        const embed = new this.core.modules.bot.embed()
            .setTitle("DETECTED CHEAT/EXPLOIT")
            .setDescription("We have just identified a Player using a hack on the server and a record has been applied to him.")
            .addFields(
                {
                    name: "ﾠ",
                    value: "ﾠ",
                },
                {
                    name: "🏷 ・ Name",
                    value: `> ${data.name}`,
                    inline: true,
                },
                {
                    name: "📍 ・ ID",
                    value: `> ${data.id}`,
                    inline: true,
                },
                {
                    name: "ﾠ",
                    value: "ﾠ",
                },
                {
                    name: "🔑 ・ Serial",
                    value: `> ||${data.serial}||`,
                    inline: true,
                },
                {
                    name: "🔌 ・ IP",
                    value: `> ||${data.ip}||`,
                    inline: true,
                },
                {
                    name: "ﾠ",
                    value: "ﾠ",
                },
                {
                    name: "🏴‍☠️ ・ Reason",
                    value: `> ${data.type}`,
                    inline: false,
                },
                {
                    name: "ﾠ",
                    value: "ﾠ",
                },
                {
                    name: "⌚ ・ Time",
                    value: `> ${data.time}`,
                    inline: true,
                },
                {
                    name: "ﾠ",
                    value: "ﾠ",
                }
            )
            .setImage(`attachment://imagem.jpg`);

        await channel.send({
            embeds: [embed],
            files: [
                {
                    attachment: Buffer.from(image, "base64"),
                    name: "imagem.jpg",
                },
            ],
        });

        return res.send("Mensagem enviada com sucesso!").status(200);
    }

    init() {
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.app.post("/photo", (req, res) => this.post(req, res));
        this.app.listen(this.port, () => {
            console.log(`${colors.fg.cyan}[INFO]${colors.reset} - Servidor online na porta 0.0.0.0:${this.port}!`);
        });
    }
}
