"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Create_DiscordChannel = exports.GenerateChannelID = exports.Send_Embeded = exports.Create_User = exports.SendNetMsg = void 0;
var index_1 = require("../index");
var Structures_1 = require("./Structures");
var sql_1 = require("../Classes/sql");
var Logger_1 = require("../Classes/Logger");
var embedcreator_1 = require("../Classes/embedcreator");
var logger = new Logger_1.default("System");
function SendNetMsg(recpt, sendername, senderID, msg, priority, communitiyID, channelID, channelname) {
    var v = [{
            ckey: communitiyID,
            type: "Direct_Message",
            recptID: recpt,
            senderID: sendername,
            msgtype: String(priority),
            msg: msg
        }];
    index_1.messaging_server.emit("Net_Update", v);
    var e = (0, embedcreator_1.Emb_Fivem_User_SEND_Message)(String(senderID), String(recpt), String(msg), String(priority), String(channelname));
    Send_Embeded(e, "1171865769961869322");
    Send_Embeded(e, channelID);
}
exports.SendNetMsg = SendNetMsg;
function Create_User(channelID, CommunityKey, DiscordID, DiscordName) {
    try {
        var d = [{
                fivemLicenseID: "null",
                discordID: String(DiscordID),
                discordName: String(DiscordName),
                currjob: "Unknown",
                currpostal: "0",
                currsocketID: "0",
                Ckey: String(CommunityKey),
                x: "null",
                y: "null",
                z: "null"
            }];
        var res = (0, Structures_1.Add_Users)(CommunityKey, d);
        if (res === false) {
            logger.info("User Alreaady Exists");
            var e = (0, embedcreator_1.Emb_Sync_User)(DiscordID, DiscordName, "User Already Synced");
            Send_Embeded(e, channelID);
        }
        if (res === true) {
            logger.success("Radio User created");
            (0, sql_1.Create_SyncedUser)(JSON.stringify(d));
            var e = (0, embedcreator_1.Emb_Sync_User)(DiscordID, DiscordName, "Success");
            Send_Embeded(e, channelID);
        }
        if (res === null) {
            logger.error("Error returned");
            var e = (0, embedcreator_1.Emb_Sync_User)(DiscordID, DiscordName, "Internal Error");
            Send_Embeded(e, channelID);
        }
        return res;
    }
    catch (e) {
        // @ts-ignore
        logger.error(String(e.message));
    }
}
exports.Create_User = Create_User;
function Send_Embeded(Object, channelID) {
    try {
        index_1.client.channels.cache.get(channelID).send({ embeds: [Object] });
        return;
    }
    catch (e) {
        // @ts-ignore
        logger.error("DISCORD SENDING ERROR: " + String(e.message));
    }
}
exports.Send_Embeded = Send_Embeded;
function GenerateChannelID() {
    try {
        var x = false;
        while (!x) {
            var d = Math.floor(Math.random() * 99999);
            if (Structures_1.Registered_RadioChannels.indexOf(d) <= -1 || Structures_1.Registered_RadioChannels.indexOf(String(d)) <= -1) {
                return d;
                break;
            }
        }
    }
    catch (e) {
    }
}
exports.GenerateChannelID = GenerateChannelID;
function Create_DiscordChannel(CommunityKEY, ChannelID, ChannelName, DiscordID, Jobname) {
    (0, sql_1.Create_Community_Channel)(CommunityKEY, ChannelID, ChannelName, DiscordID, Jobname);
}
exports.Create_DiscordChannel = Create_DiscordChannel;
