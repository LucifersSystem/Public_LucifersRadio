import {Community_Name} from "./Settings";
import {access} from "fs";

const { EmbedBuilder } = require('discord.js');

//THIS CLASS CONTAINS ALL THE DISCORD EMBEDS

export function NewChannel(channelName:string, ChanneID:string){
    const Embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(Community_Name+" Radio System")
        .setURL('https://lucifersapi.live')
        .setAuthor({ name: "Lucifer Systems", iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields(
            { name: 'Channel Name: ', value: channelName, inline: true },
            { name: 'Channel ID: ', value: ChanneID, inline: true },
            { name: 'Status: ', value: "CREATED", inline: true }
        )
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved'});
    return Embed;
}
export function Api_Error(Error:string, Where:string){
    const Embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(Community_Name+" Radio System")
        .setURL('https://lucifersapi.live')
        .setAuthor({ name: "Lucifer Systems", iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields(
            { name: 'ERROR: ', value: Error, inline: true },
            { name: 'TRACEBACK: ', value: Where, inline: true }
        )
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved'});
    return Embed;

}
export function Emb_Sync_User(userID:string, Username:string, status:string){
    const Embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(Community_Name+" Radio System")
        .setURL('https://lucifersapi.live')
        .setAuthor({ name: "Lucifer Systems", iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields(
            { name: 'Discord User: ', value: String(Username+" "+"<@"+userID+">"), inline: true },
            { name: 'Status: ', value: status, inline: true }
        )
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved'});
    return Embed;

}
export function Emb_Fivem_User_Connected(FivemLicense:string, DiscordUserID:string){
    const Embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(Community_Name+" Radio System Fivem Notifications")
        .setURL('https://lucifersapi.live')
        .setAuthor({ name: "Lucifer Systems", iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields(
            { name: 'Status: ', value: "Radio User Connected", inline: true },
            { name: 'Discord: ', value: "<@"+DiscordUserID+">", inline: true },
            { name: 'Fivem: ', value: FivemLicense, inline: true }
        )
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved'});
    return Embed;

}
export function Emb_Fivem_User_SEND_Message(DiscordUserID:string, recpt:string, message:string, priority:string, fromchannel:string){
    const Embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(Community_Name+" Radio System Fivem Notifications")
        .setURL('https://lucifersapi.live')
        .setAuthor({ name: "Lucifer Systems", iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields(
            { name: 'Status: ', value: "MESSAGE SENT", inline: false },
            { name: 'Sender Discord: ', value: "<@"+DiscordUserID+">", inline: false },
            { name: 'Recpt Discord: ', value: "<@"+recpt+">", inline: false },
            { name: 'Message: ', value: message, inline: false },
            { name: 'URGENT: ', value: priority, inline: false },
            { name: 'SENT FROM: ', value: fromchannel, inline: false },

        )
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved'});
    return Embed;

}
export function Emb_Radio_User_ERROR_CLIENT(DiscordUserID:string, FivemID:string, Hash:string, Error:string){
    const Embed = new EmbedBuilder()
        .setColor("#880808")
        .setTitle(Community_Name+" Radio System Client Error Reporting")
        .setURL('https://lucifersapi.live')
        .setAuthor({ name: "Lucifer Systems", iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields(
            { name: 'Client Discord: ', value: "<@"+DiscordUserID+">", inline: false },
            { name: 'Client Fivem:', value: FivemID, inline: false },
            { name: 'Error Hash: ', value: Hash, inline: false },
            { name: '-------', value: "\n\n", inline: false },
            { name: "\n", value: Error, inline: false },

        )
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved'});
    return Embed;

}
export function Emb_Radio_User_BUG_CLIENT(DiscordUserID:string, FivemID:string, Hash:string, Error:string){
    const Embed = new EmbedBuilder()
        .setColor("#ff4300")
        .setTitle(Community_Name+" Radio System Bug Reporting")
        .setURL('https://lucifersapi.live')
        .setAuthor({ name: "Lucifer Systems", iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields(
            { name: 'Client Discord: ', value: "<@"+DiscordUserID+">", inline: false },
            { name: 'Client Fivem:', value: FivemID, inline: false },
            { name: 'Hash: ', value: Hash, inline: false },
            { name: '-------', value: "\n\n", inline: false },
            { name: "\n", value: Error, inline: false },

        )
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved'});
    return Embed;

}
export function Emb_Radio_User_Job_Update(DiscordUserID:string, FivemID:string, OldJob:string,Job:string){
    const Embed = new EmbedBuilder()
        .setColor("#0dd73c")
        .setTitle(Community_Name+" Radio System Client Job Update")
        .setURL('https://lucifersapi.live')
        .setAuthor({ name: "Lucifer Systems", iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields(
            { name: 'Client Discord: ', value: "<@"+DiscordUserID+">", inline: false },
            { name: 'Client Fivem:', value: FivemID, inline: false },
            { name: "Old Job: ", value: OldJob, inline: false },
            { name: "New Job: ", value: Job, inline: false },

        )
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved'});
    return Embed;

}
export function Emb_Radio_User_Start_Priority(DiscordUserID:string, FivemID:string, x:string, y:string, z:string){
    const Embed = new EmbedBuilder()
        .setColor("#880808")
        .setTitle(Community_Name+" Radio System Panic Reporting")
        .setURL('https://lucifersapi.live')
        .setAuthor({ name: "Lucifer Systems", iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields(
            { name: 'Trigger Client Discord: ', value: "<@"+DiscordUserID+">", inline: false },
            { name: 'Trigger Client Fivem:', value: FivemID, inline: false },
            { name: '---CORDS----', value: "\n\n", inline: false },
            { name: "X", value: x, inline: false },
            { name: "Y", value: y, inline: false },
            { name: "Z", value: z, inline: false },


        )
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved'});
    return Embed;

}
export function Emb_Radio_User_STOP_Priority(DiscordUserID:string, FivemID:string){
    const Embed = new EmbedBuilder()
        .setColor("#0df606")
        .setTitle(Community_Name+" Radio System Panic Reporting")
        .setURL('https://lucifersapi.live')
        .setAuthor({ name: "Lucifer Systems", iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields(
            { name: 'Panic Disabled by ', value: "<@"+DiscordUserID+">", inline: false },
            { name: ' Panic Disabled by Fivem client:', value: FivemID, inline: false },


        )
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved'});
    return Embed;

}
export function Emb_Useralreadysynced(FivemLicense:string, DiscordUserID:string, NetworkUsername: string, NetworkID:string, Lastpostal:string){
    const Embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(Community_Name+" Radio System Profile System")
        .setURL('https://lucifersapi.live')
        .setAuthor({ name: "Lucifer Systems", iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields(
            { name: 'Network Username: ', value: NetworkUsername, inline: false },
            { name: 'Discord: ', value: "<@"+DiscordUserID+">", inline: false },
            { name: 'Fivem: ', value: FivemLicense, inline: false },
            { name: "Network ID" , value: NetworkID, inline: false },
            { name: "Last Known Postal" , value: Lastpostal, inline: false }
        )
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved'});
    return Embed;

}
export function Emb_Fivem_User_DENIED_CONNECTION(FivemLicense:string, DiscordUserID:string, reason:string){
    const Embed = new EmbedBuilder()
        .setColor("FF001A")
        .setTitle(Community_Name+" Radio System Fivem Notification")
        .setURL('https://lucifersapi.live')
        .setAuthor({ name: "Lucifer Systems", iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields(
            { name: 'Status: ', value: "Radio User DENIED", inline: true },
            { name: 'Reason: ', value: reason, inline: true },
            { name: 'Discord: ', value: "<@"+DiscordUserID+">", inline: true },
            { name: 'Fivem: ', value: FivemLicense, inline: true }
        )
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved'});
    return Embed;

}
export function Emb_NO_CHANNELS(){
    const Embed = new EmbedBuilder()
        .setColor("FF001A")
        .setTitle(Community_Name+" Radio System Notification")
        .setURL('https://lucifersapi.live')
        .setAuthor({ name: "Lucifer Systems", iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields(
            { name: 'Error: ', value: "No registered channels", inline: true },
        )
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved'});
    return Embed;

}
export function Emb_API_Req(APIRequest: string){
    const Embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(Community_Name+" Radio System Web API Request")
        .setURL('https://lucifersapi.live')
        .setAuthor({ name: "Lucifer Systems", iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields(
            { name: 'Type: ', value: APIRequest, inline: true }
        )
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved'});
    return Embed;

}
export function System_Status(status:string){
    const Embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(Community_Name+" Radio System Status Reporting")
        .setURL('https://lucifersapi.live')
        .setAuthor({ name: "Lucifer Systems", iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields(
            { name: 'System Status: ', value: status, inline: true }
        )
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved'});
    return Embed;

}
export function Add_newauthuser(Creator:string, newuser:string, Ckey: string){
    const Embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(Community_Name+" Radio System Admin Profile Creation")
        .setURL('https://lucifersapi.live')
        .setAuthor({ name: "Lucifer Systems", iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields(
            { name: 'Manager: ', value: "<@"+Creator+">", inline: true },
            { name: 'Sub User: ', value: "<@"+newuser+">", inline: true },
            { name: 'AUTH KEY: ', value: String(Ckey), inline: true },
            { name: 'Status: ', value: "Added", inline: true }
        )
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved'});
    return Embed;
}
export function Print_Channels(ChannelName: string, ChannelID:string, Job:string){
    const Embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(Community_Name+" Radio System")
        .setURL('https://lucifersapi.live')
        .setAuthor({ name: "Lucifer Systems", iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields(
            { name: 'Channel Name: ', value: ChannelName, inline: true },
            { name: 'Channel ID: ', value: ChannelID, inline: true },
            { name: 'Allowed Job: ', value: Job, inline: true }
        )
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved'});
    return Embed;
}

export function Remove_Channels(ChannelName: string, ChannelID:string){
    const Embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(Community_Name+" Radio System")
        .setURL('https://lucifersapi.live')
        .setAuthor({ name: "Lucifer Systems", iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields(
            { name: 'Channel Name: ', value: ChannelName, inline: true },
            { name: 'Channel ID: ', value: ChannelID, inline: true },
            { name: 'Status: ', value: "DELETED", inline: true }

        )
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved'});
    return Embed;
}
