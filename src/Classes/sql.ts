import Logger from "./Logger";
import {Add_Community_Radio_Channel, Add_Users, Radio_Community_DiscordOwner, Radio_Community_Keys_Discord} from "../API/Structures";
import {Community_SQL_CONN_HOST, Community_SQL_CONN_PASS, Community_SQL_CONN_USERNAME,Community_SQL_DBNAME} from "./Settings";
import {DB_SYNC_Char} from "../API/System";

var mysql = require('mysql');
const logger = new Logger("[SQL] [Lucifer Systems]");

var con = mysql.createConnection({
    host: Community_SQL_CONN_HOST,
    user: Community_SQL_CONN_USERNAME,
    password: Community_SQL_CONN_PASS,
    database: Community_SQL_DBNAME,
    charset : 'utf8'
});

// @ts-ignore
con.connect(function(err) {
    if (err) {
        logger.error("DB ERROR: "+ err.message);
    }
    logger.success("Connected to DB!");
});





export function Load_Channels(){

    try {
        // @ts-ignore
        con.query("SELECT * FROM `radio_registeredchannels`", function (err, result){
            if (err) return null;
            for(var i = 0; i < result.length; i++) {
                try {
                    logger.info("[DB] Adding Radio Channel: "+result[i].channelID);
                    let CommunityKey = result[i].communitykey;
                    let ChannelID = result[i].channelID;
                    let ChannelName = result[i].channelName;
                    let Jobname = result[i].job;
                    let CreatorDiscord = result[i].creatordiscordID;
                    Add_Community_Radio_Channel(CommunityKey, ChannelID, ChannelName, Jobname);
                }catch (e) {
                    // @ts-ignore
                    logger.error("ERROR IN ADDING CHANNELS (DB): "+ e.message);
                }
            }
        })
    }catch (e) {
        // @ts-ignore
        logger.error("ERROR IN ADDING CHANNELS (DB): "+ e.message);
    }
}

export function Load_AuthorizedUsers(){

    try {
        // @ts-ignore
        con.query("SELECT * FROM `radio_authorizedadmins`", function (err, result){
            if (err) return null;
            for(var i = 0; i < result.length; i++) {
                if(Radio_Community_DiscordOwner.indexOf(String(result[i].DiscordID)) <= -1) {
                    try {
                        logger.info("[DB] Adding Authorized User: " + result[i].DiscordID);
                        let CommunityKey = result[i].CommunityKey;
                        let DiscordID = result[i].DiscordID;
                        Radio_Community_Keys_Discord.push(CommunityKey);
                        Radio_Community_DiscordOwner.push(DiscordID);
                    } catch (e) {
                        // @ts-ignore
                        logger.error("ERROR IN ADDING AU (DB): " + e.message);
                    }
                }else{
                    logger.warn("User Already is Authorized: "+result[i].DiscordID);
                }
            }
        })
    }catch (e) {
        // @ts-ignore
        logger.error("ERROR IN ADDING AU (DB): "+ e.message);
    }
}
export function Load_SyncUsers(){

    try {
        // @ts-ignore
        con.query("SELECT * FROM `radio_syncedusers`", function (err, result){
            if (err) return null;
            for(var i = 0; i <= result.length -1; i++) {
                let d = JSON.parse(result[i].data)[0];
                var userObj = [{
                    MDTAPIKEY: d.MDTAPIKEY,
                    fivemLicenseID: d.fivemLicenseID,
                    discordID: d.discordID,
                    discordName: d.discordName,
                    currjob: d.currjob,
                    currpostal: d.currpostal,
                    currsocketID: d.currsocketID,
                    Ckey: d.Ckey,
                    chars: d.chars
                }]
                console.log(userObj);
                let res = Add_Users(d.Ckey, userObj);
            }
        })
    }catch (e) {
        // @ts-ignore
        logger.error("ERROR IN ADDING SYNC USERS  (DB): "+ e.message);
    }
}


export function Delete_Channel(discordid:string, channelname: string){

    try {
        // @ts-ignore
        con.query("DELETE FROM `radio_registeredchannels` WHERE `channelName` = \""+channelname+"\"", function (err, result){
            if (err) return logger.error(err);
            return;
        })
    }catch (e) {
        // @ts-ignore
        logger.error("ERROR IN DELETING RADIO CHANNEL (DB): "+ e.message);
    }
}
export function Create_Community_Channel(communitykey:string, channelID: any, channelName:string, creatordiscordID:string, Jobname:string){
    try {
        let sql = `INSERT INTO \`radio_registeredchannels\`(\`communitykey\`, \`channelID\`, \`channelName\`,\`job\`, \`creatordiscordID\`) VALUES (?,?,?,?,?)`;
        let Obj = new Array();
        let data = [communitykey, channelID, channelName, Jobname, creatordiscordID];
        // @ts-ignore
        con.query(sql, data, function (err, result){
            if (err) console.log(err);
            return true;
        })
    }catch (e) {
        // @ts-ignore
        logger.error("ERROR STORING NEW CHANNEL: "+ e.message);
        return false;
    }
}
export function Create_AuthorizedUser(DiscordID:string, CommunityKey: string){
    try {
            let sql = `INSERT INTO \`radio_authorizedadmins\`(\`CommunityKey\`, \`DiscordID\`) VALUES (?,?)`;
            let Obj = new Array();
            let data = [CommunityKey, DiscordID];
            // @ts-ignore
            con.query(sql, data, function (err, result) {
                if (err) console.log(err);
                return true;
            })

    }catch (e) {
        // @ts-ignore
        logger.error("ERROR STORING AU: "+ e.message);
        return false;
    }
}
export function Create_Char(json:string, QBID:string){
    try {
            let sql = `INSERT INTO \`radio_chars\`(\`data\`,\`qbID\`) VALUES (?,?)`;
            let Obj = new Array();
            let data = [json, QBID];
            // @ts-ignore
            con.query(sql, data, function (err, result) {
                if (err) console.log(err);
                return true;
            })

    }catch (e) {
        // @ts-ignore
        logger.error("ERROR STORING AU: "+ e.message);
        return false;
    }
}

export function Load_Chars(){
    try {
        // @ts-ignore
        con.query("SELECT * FROM `radio_chars`", function (err, result){
            if (err) return null;
            for(var i = 0; i <= result.length -1; i++) {
                let d = JSON.parse(result[i].data);
                DB_SYNC_Char(d);
            }
        })
    }catch (e) {
        // @ts-ignore
        logger.error("ERROR IN ADDING SYNC CHARS  (DB): "+ e.message);
    }
}
export function DEL_CHAR(QBID:string){
    try {
        let sql = `DELETE FROM \`radio_chars\ WHERE qbID=`+String(QBID);
        // @ts-ignore
        con.query(sql,function (err, result) {
            if (err) console.log(err);
            return true;
        })

    }catch (e) {
        // @ts-ignore
        logger.error("ERROR DELETING AU: "+ e.message);
        return false;
    }
}
export function DEL_AuthorizedUser(DiscordID:string){
    try {
            let sql = `DELETE FROM \`radio_authorizedadmins\ WHERE DiscordID=`+DiscordID;
            // @ts-ignore
            con.query(sql,function (err, result) {
                if (err) console.log(err);
                return true;
            })

    }catch (e) {
        // @ts-ignore
        logger.error("ERROR DELETING AU: "+ e.message);
        return false;
    }
}
export function Create_SyncedUser(user: string){
    try {
            let sql = `INSERT INTO \`radio_syncedusers\`(\`ID\`, \`data\`) VALUES (?,?)`;
            let data = [null, user];
            // @ts-ignore
            con.query(sql, data, function (err, result) {
                if (err) console.log(err);
                return true;
            })

    }catch (e) {
        // @ts-ignore
        logger.error("ERROR STORING SUS: "+ e.message);
        return false;
    }
}
