"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Del_DiscordAuthorizedUser = exports.Create_DiscordAuthorizedUser = exports.Get_Community_Data = exports.Add_Community = exports.Add_Users = exports.Add_Community_Radio_Channel = exports.Registered_STATE_RadioChannels = exports.Registered_RadioChannels = exports.Registered_Community_Keys = exports.Radio_Community_DiscordOwner = exports.Radio_Community_Keys_Discord = void 0;
// @ts-ignore
var Logger_1 = require("../classes/Logger");
var sql_1 = require("../Classes/sql");
var Settings_1 = require("../Classes/Settings");
var logger = new Logger_1.default("[DATA STRUCTURES] [Lucifer Systems]");
exports.Radio_Community_Keys_Discord = new Array();
exports.Radio_Community_DiscordOwner = new Array();
var Communities = new Array();
exports.Registered_Community_Keys = new Array();
exports.Registered_RadioChannels = new Array();
exports.Registered_STATE_RadioChannels = new Array();
function Add_Community_Radio_Channel(CommunityKey, ChannelID, ChannelName, Job) {
    try {
        exports.Registered_RadioChannels.push(ChannelID);
        for (var x = 0; x <= Communities.length - 1; x++) {
            var CommunityObj = Communities[x];
            if (CommunityObj[0].indexOf(CommunityKey) >= 0) {
                if (CommunityObj.length <= 2) {
                    logger.warn("Community " + CommunityObj[0][0] + " Is Missing the Radio Channel Object.. Creating one");
                    var RCA = new Array();
                    var Obj = [{
                            CommunityName: Get_Community_Data(CommunityKey, "CommunityName"),
                            CommunityKey: String(CommunityKey),
                            ChannelName: String(ChannelName),
                            ChannelID: String(ChannelID),
                            Job: String(Job)
                        }];
                    if (Settings_1.Police_Jobs.indexOf(String(Job)) >= 0) {
                        if (exports.Registered_STATE_RadioChannels.indexOf(ChannelID) <= -1) {
                            exports.Registered_STATE_RadioChannels.push(ChannelID);
                        }
                    }
                    if (Settings_1.Rescue_Jobs.indexOf(String(Job)) >= 0) {
                        if (exports.Registered_STATE_RadioChannels.indexOf(ChannelID) <= -1) {
                            exports.Registered_STATE_RadioChannels.push(ChannelID);
                        }
                    }
                    RCA.push(Obj);
                    CommunityObj.push(RCA);
                    return true;
                }
                else {
                    var isfound = false;
                    var Channels_ = CommunityObj[2];
                    for (var x_1 = 1; x_1 <= Channels_.length; x_1++) {
                        if (String(Channels_[x_1 - 1][0].ChannelID) === String(ChannelID)) {
                            isfound = true;
                            logger.error("Community " + CommunityObj[0][0] + " Already Has Channel: " + ChannelID);
                            return false;
                        }
                    }
                    if (!isfound) {
                        var Obj = [{
                                CommunityName: Get_Community_Data(CommunityKey, "CommunityName"),
                                CommunityKey: String(CommunityKey),
                                ChannelName: String(ChannelName),
                                ChannelID: String(ChannelID),
                                Job: String(Job)
                            }];
                        if (Settings_1.Police_Jobs.indexOf(String(Job)) >= 0) {
                            if (exports.Registered_STATE_RadioChannels.indexOf(ChannelID) <= -1) {
                                exports.Registered_STATE_RadioChannels.push(ChannelID);
                            }
                        }
                        if (Settings_1.Rescue_Jobs.indexOf(String(Job)) >= 0) {
                            if (exports.Registered_STATE_RadioChannels.indexOf(ChannelID) <= -1) {
                                exports.Registered_STATE_RadioChannels.push(ChannelID);
                            }
                        }
                        Channels_.push(Obj);
                        logger.success("Community " + CommunityObj[0][0] + " Added Channel " + ChannelName + " ID: " + ChannelID);
                        return true;
                    }
                }
            }
            else {
                logger.error("Community Dosnt Exist for Key: " + CommunityKey);
            }
        }
    }
    catch (e) {
        // @ts-ignore
        logger.error(e.message);
        return null;
    }
}
exports.Add_Community_Radio_Channel = Add_Community_Radio_Channel;
function Add_Users(CommunityKey, UserOb) {
    try {
        for (var x = 0; x <= Communities.length - 1; x++) {
            var Community_Obj = Communities[x];
            var Community_IDObj = Community_Obj[0];
            var Community_UsersObj = Community_Obj[1][0];
            console.log("TOTAL USERS: " + Community_UsersObj.length);
            var IsFound_User = false;
            if (Community_IDObj.indexOf(String(CommunityKey)) >= 0) {
                logger.success("Found Community User obj for: " + CommunityKey);
                for (var u = 0; u <= Community_UsersObj.length - 1; u++) {
                    console.log(Community_UsersObj.length);
                    var User = Community_UsersObj[u];
                    var User_ID = User[0].discordID;
                    if (String(User_ID) === (String(UserOb[0].discordID))) {
                        logger.error("Found User: " + User_ID);
                        IsFound_User = true;
                        return false;
                    }
                }
                if (!IsFound_User) {
                    Communities[x][1][0].push(UserOb[0]);
                    logger.success("Created User Object for: " + UserOb[0]);
                    return true;
                }
            }
            else {
                logger.error("Couldnt Find a community with the key: " + CommunityKey);
                return null;
            }
        }
    }
    catch (e) {
        logger.error("ERROR IN ADD_USERS FUNC");
        //@ts-ignore
        logger.error(String(e.message));
        return null;
    }
}
exports.Add_Users = Add_Users;
function Add_Community(CommunityName, CommunityKey, DiscordID) {
    var isFound = false;
    logger.info("Working on: " + CommunityKey);
    if (exports.Registered_Community_Keys.indexOf(CommunityKey) <= -1) {
        exports.Registered_Community_Keys.push(CommunityKey);
    }
    try {
        for (var x = 0; x <= Communities.length - 1; x++) {
            var CommunityObj = Communities[x];
            var CommunityIDData = CommunityObj[0];
            if (CommunityIDData.indexOf(CommunityKey) >= 0) {
                isFound = true;
                logger.success("Found Community: " + CommunityIDData[0] + " Key: " + CommunityIDData[1]);
                return false;
            }
        }
        if (!isFound) {
            var Community = new Array();
            var Community_IDDATA = new Array();
            var Community_Misc = new Array();
            var Community_Users = new Array();
            Community_IDDATA.push(CommunityName);
            Community_IDDATA.push(CommunityKey);
            Community_IDDATA.push(DiscordID);
            Community_IDDATA.push(true);
            Community_Misc.push(Community_Users);
            Community.push(Community_IDDATA);
            Community.push(Community_Misc);
            Communities.push(Community);
            logger.success("Created Community: " + CommunityName + " Key: " + CommunityKey);
            return true;
        }
    }
    catch (e) {
        // @ts-ignore
        logger.error(e.message);
        return null;
    }
}
exports.Add_Community = Add_Community;
function Get_Community_Data(ICommunityKey, request) {
    var isfound = false;
    try {
        for (var x = 0; x <= Communities.length; x++) {
            var Community = Communities[x];
            var CommunityIDObj = Community[0];
            var CommunityName = CommunityIDObj[0];
            var CommunityKey = CommunityIDObj[1];
            if (String(CommunityKey) === ICommunityKey) {
                logger.info("Found Community in request");
                switch (request) {
                    case "CommunityName":
                        isfound = true;
                        return CommunityName;
                        break;
                    case "Channels":
                        isfound = true;
                        var d = [{
                                CommunityName: CommunityName,
                                CommunityKey: CommunityKey,
                                CommunityDiscord: CommunityIDObj[2],
                                CommunityActive: CommunityIDObj[3],
                                Channels: Community[2]
                            }];
                        return d;
                        break;
                    case "Users":
                        return Community[1][0];
                    case "Owner":
                        isfound = true;
                        return CommunityIDObj[2];
                }
            }
        }
        if (!isfound) {
            return null;
        }
    }
    catch (e) {
        // @ts-ignore
        logger.error("Error in Getting Data: " + e.message);
        return null;
    }
}
exports.Get_Community_Data = Get_Community_Data;
function Create_DiscordAuthorizedUser(discordID, communitykey, discordname) {
    try {
        if (exports.Radio_Community_DiscordOwner.indexOf(String(discordID)) <= -1) {
            exports.Radio_Community_DiscordOwner.push(discordID);
            exports.Radio_Community_Keys_Discord.push(communitykey);
            (0, sql_1.Create_AuthorizedUser)(discordID, communitykey);
        }
        else {
            return;
        }
    }
    catch (e) {
        // @ts-ignore
        logger.error(e.message);
    }
}
exports.Create_DiscordAuthorizedUser = Create_DiscordAuthorizedUser;
function Del_DiscordAuthorizedUser(discordID) {
    try {
        if (exports.Radio_Community_DiscordOwner.indexOf(String(discordID)) >= 0) {
            var p = exports.Radio_Community_DiscordOwner.indexOf(String(discordID));
            exports.Radio_Community_DiscordOwner.splice(p, 1);
            exports.Radio_Community_Keys_Discord.splice(p, 1);
            (0, sql_1.DEL_AuthorizedUser)(discordID);
        }
        else {
            return;
        }
    }
    catch (e) {
        // @ts-ignore
        logger.error(e.message);
    }
}
exports.Del_DiscordAuthorizedUser = Del_DiscordAuthorizedUser;
