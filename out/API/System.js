"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Create_DiscordChannel = exports.GenerateChannelID = exports.Send_Embeded = exports.Create_User = exports.SendNetMsg = exports.NewChar_Get_MDT_USER = exports.DB_SYNC_Char = exports.Proc_Delete_Char = void 0;
var index_1 = require("../index");
var Structures_1 = require("./Structures");
var sql_1 = require("../Classes/sql");
var Logger_1 = __importDefault(require("../Classes/Logger"));
var embedcreator_1 = require("../Classes/embedcreator");
var Settings_1 = require("../Classes/Settings");
var console_1 = __importDefault(require("console"));
var logger = new Logger_1.default("System");
function Proc_Delete_Char(data) {
    try {
        console_1.default.log("-------------DEL REQ DATA-------------");
        console_1.default.log(data);
        console_1.default.log("-------------DEL REQ DATA-------------");
        var users_arr = (0, Structures_1.Get_Community_Data)(Settings_1.Community_AuthenticationKey, "Users");
        for (var x = 0; x <= users_arr.length - 1; x++) {
            var o = users_arr[x];
            var user = o;
            if (String(user.discordID) === String(data[0].DiscordID)) {
                console_1.default.log("FOUND THE CORRECT USER");
                var APIKey = user.MDTAPIKEY;
                console_1.default.log("USER HAS CHARS: " + user.chars.length);
                for (var o_1 = 0; o_1 <= user.chars.length - 1; o_1++) {
                    logger.info("CHECKING USER: ");
                    var u = user.chars[o_1][0];
                    console_1.default.log(user);
                    if (String(u.QBID) === data[0].qbID) {
                        logger.success("FOUND USER FOR DELTION REQUEST");
                        var d = [{
                                APIKey: APIKey,
                                DiscordID: data[0].DiscordID,
                                QBID: data[0].qbID,
                                MDTID: u.MDTID,
                                FirstName: u.FirstName,
                                LastName: u.LastName,
                                Gender: u.Gender,
                                Phone: u.Phone,
                                SSN: u.SSN,
                                AID: o_1
                            }];
                        API_DEL_CHAR_REQ(d);
                    }
                }
            }
        }
    }
    catch (e) {
        logger.error(String(e));
    }
}
exports.Proc_Delete_Char = Proc_Delete_Char;
function API_DEL_CHAR_REQ(origin) {
    try {
        var axios_1 = require('axios');
        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api-mdt.unitedroleplay.me/v1/citizen/' + String(origin[0].MDTID) + '/deceased',
            headers: {
                'snaily-cad-user-api-token': String(origin[0].APIKey)
            }
        };
        axios_1.request(config)
            .then(function (response) {
            FINISH_DELCHAR(origin);
        })
            .catch(function (error) {
            console_1.default.log(error);
        });
    }
    catch (e) {
        logger.error(String(e));
    }
}
function FINISH_DELCHAR(data) {
    try {
        var Index = data[0].AID;
        var users_arr = (0, Structures_1.Get_Community_Data)(Settings_1.Community_AuthenticationKey, "Users");
        for (var x = 0; x <= users_arr.length - 1; x++) {
            var o = users_arr[x];
            console_1.default.log(o);
            var user = o;
            if (String(user.discordID) === String(data[0].DiscordID)) {
                logger.success("PROCESSING DELETION OF CHARACTER FOR USER: " + user.discordID);
                user.chars.splice(Index, 1);
                var e = (0, embedcreator_1.Emb_MDT_DELCHAR)(data);
                Send_Embeded(e, "1186948711243333742");
                logger.success("KILLED THE FALLOWING RECORDS");
                console_1.default.log(data);
            }
        }
    }
    catch (e) {
        logger.error(String(e));
    }
}
function DB_SYNC_Char(data) {
    try {
        console_1.default.log(data);
        var users_arr = (0, Structures_1.Get_Community_Data)(Settings_1.Community_AuthenticationKey, "Users");
        for (var x = 0; x <= users_arr.length - 1; x++) {
            var o = users_arr[x];
            var user = o;
            console_1.default.log("CHECKING USER..");
            console_1.default.log(user);
            if (String(user.discordID) === String(data[0].DiscordID)) {
                console_1.default.log("ADDING CHARACTER: " + data[0].MDTID + " For: " + data[0].DiscordID);
                user.chars.push(data);
                break;
            }
        }
    }
    catch (e) {
        // @ts-ignore
        logger.error(String(e.message));
    }
}
exports.DB_SYNC_Char = DB_SYNC_Char;
function NewChar_Get_MDT_USER(originalData) {
    try {
        var users_arr = (0, Structures_1.Get_Community_Data)(Settings_1.Community_AuthenticationKey, "Users");
        for (var x = 0; x <= users_arr.length - 1; x++) {
            var o = users_arr[x];
            console_1.default.log(o);
            var user = o;
            if (String(user.discordID) === String(originalData[0].DiscordID)) {
                console_1.default.log(user);
                var APIKey = user.MDTAPIKEY;
                var isFound = false;
                for (var z = 0; z <= user.chars.length - 1; z++) {
                    var char = user.chars[z][0];
                    if (String(char.QBID) === String(originalData[0].qbID)) {
                        isFound = true;
                    }
                }
                if (!isFound) {
                    if (String(originalData[0].gender) === String(0)) {
                        var M_Civ_Data = [{
                                FirstName: originalData[0].FirstName,
                                LastName: originalData[0].LastName,
                                Gender: "clqftdolk012ub4fjsx90tk81",
                                dob: "1990-07-01T07:00:00.000Z",
                                Phone: originalData[0].Phone,
                                DiscordID: originalData[0].DiscordID,
                                APIKey: APIKey,
                                qbID: originalData[0].qbID
                            }];
                        Create_MDT_CHAR(M_Civ_Data);
                    }
                    else {
                        var F_Civ_Data = [{
                                FirstName: originalData[0].FirstName,
                                LastName: originalData[0].LastName,
                                Gender: "clqftdolm012vb4fj82xxlztk",
                                dob: "1990-07-01T07:00:00.000Z",
                                Phone: originalData[0].Phone,
                                DiscordID: originalData[0].DiscordID,
                                APIKey: APIKey,
                                qbID: originalData[0].qbID
                            }];
                        Create_MDT_CHAR(F_Civ_Data);
                    }
                }
            }
        }
    }
    catch (e) {
        console_1.default.log(e);
    }
}
exports.NewChar_Get_MDT_USER = NewChar_Get_MDT_USER;
function Create_MDT_CHAR(chardata) {
    try {
        var axios_2 = require('axios');
        var data = JSON.stringify({
            "name": chardata[0].FirstName,
            "surname": chardata[0].LastName,
            "gender": chardata[0].Gender,
            "phoneNumber": chardata[0].Phone,
            "occupation": "Unemployed",
            "ethnicity": "clqlmm0lv001myf30nvp2jk14",
            "address": "Unknown",
            "dateOfBirth": chardata[0].dob,
            "hairColor": "Unknown",
            "eyeColor": "Unknown",
            "weight": "00",
            "height": "00",
            "additionalInfo": chardata[0].qbID
        });
        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api-mdt.unitedroleplay.me/v1/citizen/',
            headers: {
                'snaily-cad-user-api-token': String(chardata[0].APIKey),
                'Content-Type': 'application/json'
            },
            data: data
        };
        axios_2.request(config)
            .then(function (response) {
            process_char(chardata, JSON.stringify(response.data));
        })
            .catch(function (error) {
            console_1.default.log(error);
        });
    }
    catch (e) {
        logger.error("ERROR IN 'CREATE MDT CHAR!!'");
        // @ts-ignore
        logger.error(String(e.message));
    }
}
function process_char(origindata, data) {
    try {
        var users_arr = (0, Structures_1.Get_Community_Data)(Settings_1.Community_AuthenticationKey, "Users");
        for (var x = 0; x <= users_arr.length - 1; x++) {
            var o = users_arr[x];
            var user = o;
            var ds = JSON.parse(data);
            if (String(user.discordID) === String(origindata[0].DiscordID)) {
                logger.info("PROCESSING NEW CHAR FOR DISCORD USER: " + origindata[0].DiscordID);
                if (origindata[0].Gender === "clqftdolm012vb4fj82xxlztk") {
                    var F_CHAR_Data = [{
                            QBID: origindata[0].qbID,
                            MDTID: ds.id,
                            DiscordID: origindata[0].DiscordID,
                            APIKey: origindata[0].APIKey,
                            FirstName: origindata[0].FirstName,
                            LastName: origindata[0].LastName,
                            Gender: "Female",
                            Phone: origindata[0].Phone,
                            SSN: ds.socialSecurityNumber
                        }];
                    var e = (0, embedcreator_1.Emb_MDT_NEWCHAR)(F_CHAR_Data);
                    user.chars.push(F_CHAR_Data);
                    (0, sql_1.Create_Char)(JSON.stringify(F_CHAR_Data), String(origindata[0].qbID));
                    Send_Embeded(e, "1186948711243333742");
                    logger.success("CREATED NEW CHAR");
                    logger.success(String(JSON.stringify(F_CHAR_Data)));
                }
                else {
                    var M_CHAR_Data = [{
                            QBID: origindata[0].qbID,
                            MDTID: ds.id,
                            DiscordID: origindata[0].DiscordID,
                            APIKey: origindata[0].APIKey,
                            FirstName: origindata[0].FirstName,
                            LastName: origindata[0].LastName,
                            Gender: "Male",
                            Phone: origindata[0].Phone,
                            SSN: ds.socialSecurityNumber
                        }];
                    var e = (0, embedcreator_1.Emb_MDT_NEWCHAR)(M_CHAR_Data);
                    user.chars.push(M_CHAR_Data);
                    (0, sql_1.Create_Char)(JSON.stringify(M_CHAR_Data), String(origindata[0].qbID));
                    console_1.default.log(M_CHAR_Data);
                    Send_Embeded(e, "1186948711243333742");
                    logger.success(String(JSON.stringify(M_CHAR_Data)));
                }
            }
        }
    }
    catch (e) {
        // @ts-ignore
        logger.error(String(e.message));
    }
}
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
function Create_User(channelID, CommunityKey, DiscordID, DiscordName, APIKEY) {
    try {
        var d = [{
                MDTAPIKEY: APIKEY,
                fivemLicenseID: "null",
                discordID: String(DiscordID),
                discordName: String(DiscordName),
                currjob: "Unknown",
                currpostal: "0",
                currsocketID: "0",
                Ckey: String(CommunityKey),
                x: "null",
                y: "null",
                z: "null",
                chars: []
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
