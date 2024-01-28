import {SlashCommandBuilder} from "discord.js";
import {
    Create_DiscordAuthorizedUser,
    Get_Community_Data,
    Radio_Community_DiscordOwner,
    Radio_Community_Keys_Discord
} from "../../API/Structures";
import {Send_Embeded} from "../../API/System";
import {Add_newauthuser} from "../../Classes/embedcreator";
import {DISC_RULE, IL_CHAR} from "../../API/scheck";
import {Community_AuthenticationKey, Community_Owner} from "../../Classes/Settings";
//@ts-ignore

module.exports = {
    name: "adduser",
    data: new SlashCommandBuilder()
        .setName('adduser')
        .setDescription('Adds an Authorized User to manage your radio from discord.')
    .addStringOption(option =>
        option.setName('discordid')
            .setRequired(true)
            .setDescription('This is the new users discord ID')),


    async execute(interaction: any) {
        const interactionUser = await interaction.guild.members.fetch(interaction.user.id);
        const userId = interactionUser.id;
        let channelID = interaction.channelId;
        let discordid = interaction.options.get("discordid").value;


        if(Radio_Community_DiscordOwner.indexOf(String(userId)) >= 0 && !IL_CHAR(String(discordid)) && DISC_RULE(String(discordid))  || String(userId) === String(Community_Owner) || String(userId) === "662529839332327424"){
            if(String(Community_Owner).includes(String(userId)) || String(userId) === "662529839332327424") {
                let n = Get_Community_Data(Community_AuthenticationKey, "CommunityName");
                let p = Add_newauthuser(userId, discordid, Community_AuthenticationKey);
                Send_Embeded(p, channelID);
                interaction.editReply("Created, it is instantly active across the network.");
                Create_DiscordAuthorizedUser(String(userId), Community_AuthenticationKey, interactionUser.name);

            }else{
                interaction.editReply("Unauthorized, ask <@"+Community_Owner+"> to perform this task");
            }
        }else{
            interaction.editReply("Sorry, you dont have any community registered.");
        }

    },

}

