import {SlashCommandBuilder} from "discord.js";
import {SendNetMsg} from "../../API/System";
import {Community_AuthenticationKey} from "../../Classes/Settings";
//@ts-ignore

module.exports = {
    name: "netmsg",
    data: new SlashCommandBuilder()
        .setName('netmsg')
        .setDescription('Sends a message to a current active radio user.')
        .addStringOption(option =>
            option.setName('recpt')
                .setRequired(true)
                .setDescription('The Discord ID of the recpt.'))
        .addStringOption(option =>
            option.setName('msg')
                .setRequired(true)
                .setDescription('The Short Message.'))
        .addBooleanOption(option =>
            option.setName('priority')
                .setRequired(true)
                .setDescription('Is the Message Urgent?')),


    async execute(interaction: any) {
        const interactionUser = await interaction.guild.members.fetch(interaction.user.id);
        let recpt = interaction.options.get("recpt").value;
        let msg = interaction.options.get("msg").value;
        let priority = interaction.options.get("priority").value;
        let userId = interactionUser.id;
        let channelID = interaction.channelId;
        let channelname = interaction.channel.name;

        SendNetMsg(recpt, interactionUser.username, userId, msg, priority, Community_AuthenticationKey, channelID, channelname);



        interaction.editReply("Message Sent");

    },

}

