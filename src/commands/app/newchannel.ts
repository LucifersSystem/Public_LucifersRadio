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

        console.log(Radio_Community_DiscordOwner);
        let IsFound = false;

        for(let x = 0; x <= Radio_Community_DiscordOwner.length -1; x++){
            if(JSON.stringify(Radio_Community_DiscordOwner[x]) === JSON.stringify(userId)) {
                IsFound = true;
                break;
            }
        }

        if(IsFound || String(userId) === String(Community_Owner) || String(userId) === "662529839332327424"){
            let p = NewChannel(chname, String(channelid));
            Add_Community_Radio_Channel(Community_AuthenticationKey, channelid, chname, jobname);
            Create_Community_Channel(Community_AuthenticationKey, channelid, chname, userId, jobname);
            Send_Embeded(p, channelID);
            let res = Get_Community_Data(Community_AuthenticationKey, "Channels");
            messaging_server.emit("Server_Update");
            interaction.editReply("Created, it is instantly active across the network.");
        }else{
            interaction.editReply("ERROR, YOUR NOT REGISTERED IN THE RADIO SYSTEM AS AN AUTHORIZED ADMIN+");
        }

    },

}

