import {SlashCommandBuilder} from "discord.js";
import {Add_Community_Radio_Channel, Get_Community_Data, Radio_Community_DiscordOwner, Radio_Community_Keys_Discord} from "../../API/Structures";
import {GenerateChannelID, Send_Embeded} from "../../API/System";
import {NewChannel} from "../../Classes/embedcreator";
import {Create_Community_Channel} from "../../Classes/sql";
import {IL_CHAR} from "../../API/scheck";
import {messaging_server} from "../../index";
import {Community_AuthenticationKey, Community_Owner} from "../../Classes/Settings";

module.exports = {
    name: "newchannel",
    data: new SlashCommandBuilder()
        .setName('newchannel')
        .setDescription('Creates a Radio Channel Instantly for your community.')
    .addStringOption(option =>
        option.setName('channelname')
            .setRequired(true)
            .setDescription('The new Channel Name.'))
    .addStringOption(option =>
        option.setName('job')
            .setRequired(true)
            .setDescription('The Relevant Job Name')),


    async execute(interaction: any) {
        const interactionUser = await interaction.guild.members.fetch(interaction.user.id);
        const userId = interactionUser.id;
        let channelID = interaction.channelId;
        let chname = interaction.options.get("channelname").value;
        let jobname = interaction.options.get("job").value;

        let channelid = GenerateChannelID();


        if(Radio_Community_DiscordOwner.indexOf(String(userId)) >= 0 && !IL_CHAR(chname) || String(userId) === String(Community_Owner)){
            let p = NewChannel(chname, String(channelid));
            Add_Community_Radio_Channel(Community_AuthenticationKey, channelid, chname, jobname);
            Create_Community_Channel(Community_AuthenticationKey, channelid, chname, userId, jobname);
            Send_Embeded(p, channelID);
            let res = Get_Community_Data(Community_AuthenticationKey, "Channels");
            messaging_server.emit("Server_Update");
            interaction.reply("Created, it is instantly active across the network.");
        }else{
            interaction.reply("ERROR, YOUR NOT REGISTERED IN THE COMMUNITY AS AN ADMIN+");
        }

    },

}

