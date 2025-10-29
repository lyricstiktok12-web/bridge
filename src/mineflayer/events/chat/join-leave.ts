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

        // Send Minecraft guild chat welcome
        if (status === 'joined') {
            bridge.bot.chat(`/gc Welcome ${playerName} to the guild! 🎉`);
        }
    },
} as BotEvent;
