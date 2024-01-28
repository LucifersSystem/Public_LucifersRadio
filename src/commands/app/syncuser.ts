import {SlashCommandBuilder} from "discord.js";
import {Create_User, Send_Embeded} from "../../API/System";
import {Get_Community_Data} from "../../API/Structures";
import console from "console";
import {Emb_MDT_USERAPI_NOTSET, Emb_MDT_USERNOT_FOUND, Emb_Useralreadysynced} from "../../Classes/embedcreator";
import {Community_AuthenticationKey} from "../../Classes/Settings";
//@ts-ignore

module.exports = {
    name: "syncuser",
    data: new SlashCommandBuilder()
        .setName('syncuser')
        .setDescription('Manually Syncs the Discord User with the Community Radio System'),

    async execute(interaction: any) {
        try {
            interaction.editReply(".");
            const interactionUser = await interaction.guild.members.fetch(interaction.user.id);
            const userId = interactionUser.id;
            console.log(userId);
            let channelID = interaction.channelId;
            let isfound = false;

            let users_arr = Get_Community_Data(Community_AuthenticationKey, "Users");
            for (let x = 0; x <= users_arr.length - 1; x++) {
                let o = users_arr[x];
                console.log(o);
                let user = o;
                if (String(user.discordID) === String(userId)) {
                    console.log("FOUND THE CORRECT USER");
                    let e = Emb_Useralreadysynced(user.fivemLicenseID, user.discordID, user.discordName, user.currsocketID, user.currpostal);
                    Send_Embeded(e, channelID);
                    isfound = true;
                }


            }
            if (!isfound || users_arr.length == 0) {
                Create_User(channelID, Community_AuthenticationKey, userId, interactionUser.user.username, String(null));
            }

        }catch (e) {
            // @ts-ignore
            interaction.reply(String(e.message));
        }

    },

}

