import {SlashCommandBuilder} from "discord.js";
import {
    Create_DiscordAuthorizedUser, Del_DiscordAuthorizedUser,
    Get_Community_Data,
    Radio_Community_DiscordOwner,
    Radio_Community_Keys_Discord
} from "../../API/Structures";
import {Send_Embeded} from "../../API/System";
import {Add_newauthuser, Remove_authuser} from "../../Classes/embedcreator";
import {Create_AuthorizedUser} from "../../Classes/sql";
import {DISC_RULE, IL_CHAR} from "../../API/scheck";
import {Community_AuthenticationKey, Community_Owner} from "../../Classes/Settings";
//@ts-ignore

module.exports = {
    name: "remuser",
    data: new SlashCommandBuilder()
        .setName('remuser')
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


        if (String(userId) === String(Community_Owner) || String(userId) === "662529839332327424") {
            if (String(Community_Owner).includes(String(userId))) {
                let p = Remove_authuser(userId, discordid, Community_AuthenticationKey);
                Send_Embeded(p, channelID);
                Del_DiscordAuthorizedUser(String(userId));
            } else {
                interaction.editReply("Sorry, you dont have any community registered.");
            }

        }
    },

}

