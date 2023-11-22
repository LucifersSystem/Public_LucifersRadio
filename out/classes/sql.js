"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Create_SyncedUser = exports.Create_AuthorizedUser = exports.Create_Community_Channel = exports.Delete_Channel = exports.Load_SyncUsers = exports.Load_AuthorizedUsers = exports.Load_Channels = void 0;
var Logger_1 = __importDefault(require("./Logger"));
var Structures_1 = require("../API/Structures");
var Settings_1 = require("./Settings");
var mysql = require('mysql');
var logger = new Logger_1.default("[SQL] [Lucifer Systems]");
var con = mysql.createConnection({
    host: Settings_1.Community_SQL_CONN_HOST,
    user: Settings_1.Community_SQL_CONN_USERNAME,
    password: Settings_1.Community_SQL_CONN_PASS,
    database: Settings_1.Community_SQL_DBNAME,
    charset: 'utf8'
});
// @ts-ignore
con.connect(function (err) {
    if (err) {
        logger.error("DB ERROR: " + err.message);
    }
    logger.success("Connected to DB!");
});
function Load_Channels() {
    try {
        // @ts-ignore
        con.query("SELECT * FROM `radio_registeredchannels`", function (err, result) {
            if (err)
                return null;
            for (var i = 0; i < result.length; i++) {
                try {
                    logger.info("[DB] Adding Radio Channel: " + result[i].channelID);
                    var CommunityKey = result[i].communitykey;
                    var ChannelID = result[i].channelID;
                    var ChannelName = result[i].channelName;
                    var Jobname = result[i].job;
                    var CreatorDiscord = result[i].creatordiscordID;
                    (0, Structures_1.Add_Community_Radio_Channel)(CommunityKey, ChannelID, ChannelName, Jobname);
                }
                catch (e) {
                    // @ts-ignore
                    logger.error("ERROR IN ADDING CHANNELS (DB): " + e.message);
                }
            }
        });
    }
    catch (e) {
        // @ts-ignore
        logger.error("ERROR IN ADDING CHANNELS (DB): " + e.message);
    }
}
exports.Load_Channels = Load_Channels;
function Load_AuthorizedUsers() {
    try {
        // @ts-ignore
        con.query("SELECT * FROM `radio_authorizedadmins`", function (err, result) {
            if (err)
                return null;
            for (var i = 0; i < result.length; i++) {
                if (Structures_1.Radio_Community_DiscordOwner.indexOf(String(result[i].DiscordID)) <= -1) {
                    try {
                        logger.info("[DB] Adding Authorized User: " + result[i].DiscordID);
                        var CommunityKey = result[i].CommunityKey;
                        var DiscordID = result[i].DiscordID;
                        Structures_1.Radio_Community_Keys_Discord.push(CommunityKey);
                        Structures_1.Radio_Community_DiscordOwner.push(DiscordID);
                    }
                    catch (e) {
                        // @ts-ignore
                        logger.error("ERROR IN ADDING AU (DB): " + e.message);
                    }
                }
                else {
                    logger.warn("User Already is Authorized: " + result[i].DiscordID);
                }
            }
        });
    }
    catch (e) {
        // @ts-ignore
        logger.error("ERROR IN ADDING AU (DB): " + e.message);
    }
}
exports.Load_AuthorizedUsers = Load_AuthorizedUsers;
function Load_SyncUsers() {
    try {
        // @ts-ignore
        con.query("SELECT * FROM `radio_syncedusers`", function (err, result) {
            if (err)
                return null;
            for (var i = 0; i <= result.length - 1; i++) {
                var d = JSON.parse(result[i].data)[0];
                var userObj = [{
                        fivemLicenseID: d.fivemLicenseID,
                        discordID: d.discordID,
                        discordName: d.discordName,
                        currjob: d.currjob,
                        currpostal: d.currpostal,
                        currsocketID: d.currsocketID,
                        Ckey: d.Ckey
                    }];
                console.log(userObj);
                var res = (0, Structures_1.Add_Users)(d.Ckey, userObj);
            }
        });
    }
    catch (e) {
        // @ts-ignore
        logger.error("ERROR IN ADDING SYNC USERS  (DB): " + e.message);
    }
}
exports.Load_SyncUsers = Load_SyncUsers;
function Delete_Channel(discordid, channelname) {
    try {
        // @ts-ignore
        con.query("DELETE FROM `radio_registeredchannels` WHERE `channelName` = \"" + channelname + "\"", function (err, result) {
            if (err)
                return logger.error(err);
            return;
        });
    }
    catch (e) {
        // @ts-ignore
        logger.error("ERROR IN DELETING RADIO CHANNEL (DB): " + e.message);
    }
}
exports.Delete_Channel = Delete_Channel;
function Create_Community_Channel(communitykey, channelID, channelName, creatordiscordID, Jobname) {
    try {
        var sql = "INSERT INTO `radio_registeredchannels`(`communitykey`, `channelID`, `channelName`,`job`, `creatordiscordID`) VALUES (?,?,?,?,?)";
        var Obj = new Array();
        var data = [communitykey, channelID, channelName, Jobname, creatordiscordID];
        // @ts-ignore
        con.query(sql, data, function (err, result) {
            if (err)
                console.log(err);
            return true;
        });
    }
    catch (e) {
        // @ts-ignore
        logger.error("ERROR STORING NEW CHANNEL: " + e.message);
        return false;
    }
}
exports.Create_Community_Channel = Create_Community_Channel;
function Create_AuthorizedUser(DiscordID, CommunityKey) {
    try {
        var sql = "INSERT INTO `radio_authorizedadmins`(`CommunityKey`, `DiscordID`) VALUES (?,?)";
        var Obj = new Array();
        var data = [CommunityKey, DiscordID];
        // @ts-ignore
        con.query(sql, data, function (err, result) {
            if (err)
                console.log(err);
            return true;
        });
    }
    catch (e) {
        // @ts-ignore
        logger.error("ERROR STORING AU: " + e.message);
        return false;
    }
}
exports.Create_AuthorizedUser = Create_AuthorizedUser;
function Create_SyncedUser(user) {
    try {
        var sql = "INSERT INTO `radio_syncedusers`(`ID`, `data`) VALUES (?,?)";
        var data = [null, user];
        // @ts-ignore
        con.query(sql, data, function (err, result) {
            if (err)
                console.log(err);
            return true;
        });
    }
    catch (e) {
        // @ts-ignore
        logger.error("ERROR STORING SUS: " + e.message);
        return false;
    }
}
exports.Create_SyncedUser = Create_SyncedUser;
