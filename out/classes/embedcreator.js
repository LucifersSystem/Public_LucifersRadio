"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Remove_Channels = exports.Print_Channels = exports.Add_newauthuser = exports.System_Status = exports.Emb_API_Req = exports.Emb_NO_CHANNELS = exports.Emb_Fivem_User_DENIED_CONNECTION = exports.Emb_Useralreadysynced = exports.Emb_Radio_User_STOP_Priority = exports.Emb_Radio_User_Start_Priority = exports.Emb_Radio_User_Job_Update = exports.Emb_Radio_User_BUG_CLIENT = exports.Emb_Radio_User_ERROR_CLIENT = exports.Emb_Fivem_User_SEND_Message = exports.Emb_Fivem_User_Connected = exports.Emb_Sync_User = exports.Api_Error = exports.NewChannel = void 0;
var Settings_1 = require("./Settings");
var EmbedBuilder = require('discord.js').EmbedBuilder;
//THIS CLASS CONTAINS ALL THE DISCORD EMBEDS
function NewChannel(channelName, ChanneID) {
    var Embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(Settings_1.Community_Name + " Radio System")
        .setURL('https://lucifersapi.live')
        .setAuthor({ name: "Lucifer Systems", iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields({ name: 'Channel Name: ', value: channelName, inline: true }, { name: 'Channel ID: ', value: ChanneID, inline: true }, { name: 'Status: ', value: "CREATED", inline: true })
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved' });
    return Embed;
}
exports.NewChannel = NewChannel;
function Api_Error(Error, Where) {
    var Embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(Settings_1.Community_Name + " Radio System")
        .setURL('https://lucifersapi.live')
        .setAuthor({ name: "Lucifer Systems", iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields({ name: 'ERROR: ', value: Error, inline: true }, { name: 'TRACEBACK: ', value: Where, inline: true })
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved' });
    return Embed;
}
exports.Api_Error = Api_Error;
function Emb_Sync_User(userID, Username, status) {
    var Embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(Settings_1.Community_Name + " Radio System")
        .setURL('https://lucifersapi.live')
        .setAuthor({ name: "Lucifer Systems", iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields({ name: 'Discord User: ', value: String(Username + " " + "<@" + userID + ">"), inline: true }, { name: 'Status: ', value: status, inline: true })
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved' });
    return Embed;
}
exports.Emb_Sync_User = Emb_Sync_User;
function Emb_Fivem_User_Connected(FivemLicense, DiscordUserID) {
    var Embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(Settings_1.Community_Name + " Radio System Fivem Notifications")
        .setURL('https://lucifersapi.live')
        .setAuthor({ name: "Lucifer Systems", iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields({ name: 'Status: ', value: "Radio User Connected", inline: true }, { name: 'Discord: ', value: "<@" + DiscordUserID + ">", inline: true }, { name: 'Fivem: ', value: FivemLicense, inline: true })
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved' });
    return Embed;
}
exports.Emb_Fivem_User_Connected = Emb_Fivem_User_Connected;
function Emb_Fivem_User_SEND_Message(DiscordUserID, recpt, message, priority, fromchannel) {
    var Embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(Settings_1.Community_Name + " Radio System Fivem Notifications")
        .setURL('https://lucifersapi.live')
        .setAuthor({ name: "Lucifer Systems", iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields({ name: 'Status: ', value: "MESSAGE SENT", inline: false }, { name: 'Sender Discord: ', value: "<@" + DiscordUserID + ">", inline: false }, { name: 'Recpt Discord: ', value: "<@" + recpt + ">", inline: false }, { name: 'Message: ', value: message, inline: false }, { name: 'URGENT: ', value: priority, inline: false }, { name: 'SENT FROM: ', value: fromchannel, inline: false })
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved' });
    return Embed;
}
exports.Emb_Fivem_User_SEND_Message = Emb_Fivem_User_SEND_Message;
function Emb_Radio_User_ERROR_CLIENT(DiscordUserID, FivemID, Hash, Error) {
    var Embed = new EmbedBuilder()
        .setColor("#880808")
        .setTitle(Settings_1.Community_Name + " Radio System Client Error Reporting")
        .setURL('https://lucifersapi.live')
        .setAuthor({ name: "Lucifer Systems", iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields({ name: 'Client Discord: ', value: "<@" + DiscordUserID + ">", inline: false }, { name: 'Client Fivem:', value: FivemID, inline: false }, { name: 'Error Hash: ', value: Hash, inline: false }, { name: '-------', value: "\n\n", inline: false }, { name: "\n", value: Error, inline: false })
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved' });
    return Embed;
}
exports.Emb_Radio_User_ERROR_CLIENT = Emb_Radio_User_ERROR_CLIENT;
function Emb_Radio_User_BUG_CLIENT(DiscordUserID, FivemID, Hash, Error) {
    var Embed = new EmbedBuilder()
        .setColor("#ff4300")
        .setTitle(Settings_1.Community_Name + " Radio System Bug Reporting")
        .setURL('https://lucifersapi.live')
        .setAuthor({ name: "Lucifer Systems", iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields({ name: 'Client Discord: ', value: "<@" + DiscordUserID + ">", inline: false }, { name: 'Client Fivem:', value: FivemID, inline: false }, { name: 'Hash: ', value: Hash, inline: false }, { name: '-------', value: "\n\n", inline: false }, { name: "\n", value: Error, inline: false })
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved' });
    return Embed;
}
exports.Emb_Radio_User_BUG_CLIENT = Emb_Radio_User_BUG_CLIENT;
function Emb_Radio_User_Job_Update(DiscordUserID, FivemID, OldJob, Job) {
    var Embed = new EmbedBuilder()
        .setColor("#0dd73c")
        .setTitle(Settings_1.Community_Name + " Radio System Client Job Update")
        .setURL('https://lucifersapi.live')
        .setAuthor({ name: "Lucifer Systems", iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields({ name: 'Client Discord: ', value: "<@" + DiscordUserID + ">", inline: false }, { name: 'Client Fivem:', value: FivemID, inline: false }, { name: "Old Job: ", value: OldJob, inline: false }, { name: "New Job: ", value: Job, inline: false })
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved' });
    return Embed;
}
exports.Emb_Radio_User_Job_Update = Emb_Radio_User_Job_Update;
function Emb_Radio_User_Start_Priority(DiscordUserID, FivemID, x, y, z) {
    var Embed = new EmbedBuilder()
        .setColor("#880808")
        .setTitle(Settings_1.Community_Name + " Radio System Panic Reporting")
        .setURL('https://lucifersapi.live')
        .setAuthor({ name: "Lucifer Systems", iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields({ name: 'Trigger Client Discord: ', value: "<@" + DiscordUserID + ">", inline: false }, { name: 'Trigger Client Fivem:', value: FivemID, inline: false }, { name: '---CORDS----', value: "\n\n", inline: false }, { name: "X", value: x, inline: false }, { name: "Y", value: y, inline: false }, { name: "Z", value: z, inline: false })
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved' });
    return Embed;
}
exports.Emb_Radio_User_Start_Priority = Emb_Radio_User_Start_Priority;
function Emb_Radio_User_STOP_Priority(DiscordUserID, FivemID) {
    var Embed = new EmbedBuilder()
        .setColor("#0df606")
        .setTitle(Settings_1.Community_Name + " Radio System Panic Reporting")
        .setURL('https://lucifersapi.live')
        .setAuthor({ name: "Lucifer Systems", iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields({ name: 'Panic Disabled by ', value: "<@" + DiscordUserID + ">", inline: false }, { name: ' Panic Disabled by Fivem client:', value: FivemID, inline: false })
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved' });
    return Embed;
}
exports.Emb_Radio_User_STOP_Priority = Emb_Radio_User_STOP_Priority;
function Emb_Useralreadysynced(FivemLicense, DiscordUserID, NetworkUsername, NetworkID, Lastpostal) {
    var Embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(Settings_1.Community_Name + " Radio System Profile System")
        .setURL('https://lucifersapi.live')
        .setAuthor({ name: "Lucifer Systems", iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields({ name: 'Network Username: ', value: NetworkUsername, inline: false }, { name: 'Discord: ', value: "<@" + DiscordUserID + ">", inline: false }, { name: 'Fivem: ', value: FivemLicense, inline: false }, { name: "Network ID", value: NetworkID, inline: false }, { name: "Last Known Postal", value: Lastpostal, inline: false })
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved' });
    return Embed;
}
exports.Emb_Useralreadysynced = Emb_Useralreadysynced;
function Emb_Fivem_User_DENIED_CONNECTION(FivemLicense, DiscordUserID, reason) {
    var Embed = new EmbedBuilder()
        .setColor("FF001A")
        .setTitle(Settings_1.Community_Name + " Radio System Fivem Notification")
        .setURL('https://lucifersapi.live')
        .setAuthor({ name: "Lucifer Systems", iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields({ name: 'Status: ', value: "Radio User DENIED", inline: true }, { name: 'Reason: ', value: reason, inline: true }, { name: 'Discord: ', value: "<@" + DiscordUserID + ">", inline: true }, { name: 'Fivem: ', value: FivemLicense, inline: true })
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved' });
    return Embed;
}
exports.Emb_Fivem_User_DENIED_CONNECTION = Emb_Fivem_User_DENIED_CONNECTION;
function Emb_NO_CHANNELS() {
    var Embed = new EmbedBuilder()
        .setColor("FF001A")
        .setTitle(Settings_1.Community_Name + " Radio System Notification")
        .setURL('https://lucifersapi.live')
        .setAuthor({ name: "Lucifer Systems", iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields({ name: 'Error: ', value: "No registered channels", inline: true })
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved' });
    return Embed;
}
exports.Emb_NO_CHANNELS = Emb_NO_CHANNELS;
function Emb_API_Req(APIRequest) {
    var Embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(Settings_1.Community_Name + " Radio System Web API Request")
        .setURL('https://lucifersapi.live')
        .setAuthor({ name: "Lucifer Systems", iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields({ name: 'Type: ', value: APIRequest, inline: true })
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved' });
    return Embed;
}
exports.Emb_API_Req = Emb_API_Req;
function System_Status(status) {
    var Embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(Settings_1.Community_Name + " Radio System Status Reporting")
        .setURL('https://lucifersapi.live')
        .setAuthor({ name: "Lucifer Systems", iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields({ name: 'System Status: ', value: status, inline: true })
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved' });
    return Embed;
}
exports.System_Status = System_Status;
function Add_newauthuser(Creator, newuser, Ckey) {
    var Embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(Settings_1.Community_Name + " Radio System Admin Profile Creation")
        .setURL('https://lucifersapi.live')
        .setAuthor({ name: "Lucifer Systems", iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields({ name: 'Manager: ', value: "<@" + Creator + ">", inline: true }, { name: 'Sub User: ', value: "<@" + newuser + ">", inline: true }, { name: 'AUTH KEY: ', value: String(Ckey), inline: true }, { name: 'Status: ', value: "Added", inline: true })
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved' });
    return Embed;
}
exports.Add_newauthuser = Add_newauthuser;
function Print_Channels(ChannelName, ChannelID, Job) {
    var Embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(Settings_1.Community_Name + " Radio System")
        .setURL('https://lucifersapi.live')
        .setAuthor({ name: "Lucifer Systems", iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields({ name: 'Channel Name: ', value: ChannelName, inline: true }, { name: 'Channel ID: ', value: ChannelID, inline: true }, { name: 'Allowed Job: ', value: Job, inline: true })
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved' });
    return Embed;
}
exports.Print_Channels = Print_Channels;
function Remove_Channels(ChannelName, ChannelID) {
    var Embed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle(Settings_1.Community_Name + " Radio System")
        .setURL('https://lucifersapi.live')
        .setAuthor({ name: "Lucifer Systems", iconURL: 'https://media2.giphy.com/media/S60CrN9iMxFlyp7uM8/giphy.gif', url: 'https://discord.js.org' })
        .setThumbnail('https://gcdnb.pbrd.co/images/3R6E0bk0JzxA.png?o=1')
        .addFields({ name: 'Channel Name: ', value: ChannelName, inline: true }, { name: 'Channel ID: ', value: ChannelID, inline: true }, { name: 'Status: ', value: "DELETED", inline: true })
        .setTimestamp()
        .setFooter({ text: 'Creator Discord: lucifer666#1771 -- All Rights Reserved' });
    return Embed;
}
exports.Remove_Channels = Remove_Channels;
