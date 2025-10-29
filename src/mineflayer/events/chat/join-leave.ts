import emojis from '@util/emojis';
import { escapeMarkdown } from 'discord.js';

export default {
    name: 'chat:joinLeave',
    runOnce: false,
    run: async (bridge, playerName: string, status: 'joined' | 'left') => {
        const emoji = status === 'joined' ? emojis.join : emojis.leave;
        bridge.onlineCount = status === 'joined' ? bridge.onlineCount + 1 : bridge.onlineCount - 1;

        // Send Discord message
        await bridge.discord.send(
            'gc',
            `${emoji} **${escapeMarkdown(playerName)}** ${status}. \`(${bridge.onlineCount}/${bridge.totalCount})\``
        );

        // --- Send welcome message in Minecraft guild chat if joined ---
        if (status === 'joined') {
            // Replace this with your guild chat method
            // If using MiscGuild:
            if (bridge.bot && bridge.bot.guild && bridge.bot.guild.sendMessage) {
                bridge.bot.guild.sendMessage(`Welcome ${playerName} to the guild! 🎉`);
            } else {
                // Fallback using guild chat command
                bridge.bot.chat(`/guild Welcome ${playerName} to the guild! 🎉`);
            }
        }
    },
} as BotEvent;
