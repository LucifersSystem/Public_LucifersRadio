import {client, messaging_server} from "../index";
import {Add_Users, Get_Community_Data, Registered_RadioChannels} from "./Structures";
import {Create_Char, Create_Community_Channel, Create_SyncedUser, DEL_CHAR} from "../Classes/sql";
import Logger from "../Classes/Logger";
import {
    Emb_Fivem_User_SEND_Message, Emb_MDT_DELCHAR, Emb_MDT_NEWCHAR,
    Emb_Radio_User_ERROR_CLIENT,
    Emb_Sync_User,
    Emb_Useralreadysynced
} from "../Classes/embedcreator";
import {Community_AuthenticationKey} from "../Classes/Settings";
import console from "console";
import axios from "axios/index";


let logger = new Logger("System");


export function Proc_Delete_Char(data:any){
    try{
        console.log("-------------DEL REQ DATA-------------");
        console.log(data);
        console.log("-------------DEL REQ DATA-------------");
        let users_arr = Get_Community_Data(Community_AuthenticationKey, "Users");
        for (let x = 0; x <= users_arr.length - 1; x++) {
            let o = users_arr[x];
            let user = o;
            if (String(user.discordID) === String(data[0].DiscordID)) {
                console.log("FOUND THE CORRECT USER");
                let APIKey = user.MDTAPIKEY;
                console.log("USER HAS CHARS: "+ user.chars.length);
                for(let o = 0; o<= user.chars.length -1; o++){
                    logger.info("CHECKING USER: ");
                    let u = user.chars[o][0];
                    console.log(user)
                    if(String(u.QBID) === data[0].qbID){
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
                            AID: o
                        }];

                        API_DEL_CHAR_REQ(d);

                    }
                }
            }


        }
    }catch (e) {
        logger.error(String(e));
    }
}

function API_DEL_CHAR_REQ(origin:any){
    try{
        const axios = require('axios');

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api-mdt.unitedroleplay.me/v1/citizen/'+String(origin[0].MDTID)+'/deceased',
            headers: {
                'snaily-cad-user-api-token': String(origin[0].APIKey)
            }
        };

        axios.request(config)
            .then((response: { data: any; }) => {
                FINISH_DELCHAR(origin);
            })
            .catch((error: any) => {
                console.log(error);
            });

    }catch (e) {
        logger.error(String(e));
    }
}

function FINISH_DELCHAR(data:any){
    try{

        let Index = data[0].AID;

        let users_arr = Get_Community_Data(Community_AuthenticationKey, "Users");
        for (let x = 0; x <= users_arr.length - 1; x++) {
            let o = users_arr[x];
            console.log(o);
            let user = o;
            if (String(user.discordID) === String(data[0].DiscordID)) {
                logger.success("PROCESSING DELETION OF CHARACTER FOR USER: "+ user.discordID);
                user.chars.splice(Index, 1);
                let e = Emb_MDT_DELCHAR(data);
                Send_Embeded(e, "1186948711243333742");
                logger.success("KILLED THE FALLOWING RECORDS");
                console.log(data);
            }


        }

    }catch (e) {
        logger.error(String(e));
    }
}
export function DB_SYNC_Char(data:any){
    try{
        console.log(data);
        let users_arr = Get_Community_Data(Community_AuthenticationKey, "Users");
        for (let x = 0; x <= users_arr.length - 1; x++) {
            let o = users_arr[x];
            let user = o;
            console.log("CHECKING USER..");
            console.log(user);
            if (String(user.discordID) === String(data[0].DiscordID)) {
                console.log("ADDING CHARACTER: "+ data[0].MDTID + " For: "+data[0].DiscordID);
                user.chars.push(data);
                break;
            }
        }
    }catch (e) {
        // @ts-ignore
        logger.error(String(e.message));
    }
}
export function NewChar_Get_MDT_USER(originalData:any){
    try{
        let users_arr = Get_Community_Data(Community_AuthenticationKey, "Users");
        for (let x = 0; x <= users_arr.length - 1; x++) {
            let o = users_arr[x];
            console.log(o);
            let user = o;
            if (String(user.discordID) === String(originalData[0].DiscordID)) {
                console.log(user);
                let APIKey = user.MDTAPIKEY;
                let isFound = false;
                for(let z = 0; z<= user.chars.length -1; z++){
                    let char = user.chars[z][0];
                    if(String(char.QBID) === String(originalData[0].qbID)){
                        isFound = true;
                    }
                }
                if(!isFound) {
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
                    } else {
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
    }catch (e){
        console.log(e);
    }
}

function Create_MDT_CHAR(chardata:any){
    try{
        const axios = require('axios');
        let data = JSON.stringify({
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

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api-mdt.unitedroleplay.me/v1/citizen/',
            headers: {
                'snaily-cad-user-api-token': String(chardata[0].APIKey),
                'Content-Type': 'application/json'
            },
            data : data
        };

        axios.request(config)
            .then((response: { data: any; }) => {
                process_char(chardata,JSON.stringify(response.data));
            })
            .catch((error: any) => {
                console.log(error);
            });
    }catch (e) {
        logger.error("ERROR IN 'CREATE MDT CHAR!!'");
        // @ts-ignore
        logger.error(String(e.message));
    }
}

function process_char(origindata:any,data:any){
    try{
        let users_arr = Get_Community_Data(Community_AuthenticationKey, "Users");
        for (let x = 0; x <= users_arr.length - 1; x++) {
            let o = users_arr[x];
            let user = o;
            let ds = JSON.parse(data);
            if (String(user.discordID) === String(origindata[0].DiscordID)) {
                logger.info("PROCESSING NEW CHAR FOR DISCORD USER: "+ origindata[0].DiscordID);
                if(origindata[0].Gender === "clqftdolm012vb4fj82xxlztk"){
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
                }]
                let e = Emb_MDT_NEWCHAR(F_CHAR_Data);
                user.chars.push(F_CHAR_Data);
                Create_Char(JSON.stringify(F_CHAR_Data), String(origindata[0].qbID));
                Send_Embeded(e, "1186948711243333742");
                logger.success("CREATED NEW CHAR");
                logger.success(String(JSON.stringify(F_CHAR_Data)));
                }else{
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
                    }]
                    let e = Emb_MDT_NEWCHAR(M_CHAR_Data);
                    user.chars.push(M_CHAR_Data);
                    Create_Char(JSON.stringify(M_CHAR_Data), String(origindata[0].qbID));
                    console.log(M_CHAR_Data);
                    Send_Embeded(e, "1186948711243333742");
                    logger.success(String(JSON.stringify(M_CHAR_Data)));
                }
            }


        }
    }catch (e) {
        // @ts-ignore
        logger.error(String(e.message));
    }
}
export function SendNetMsg(recpt:string,sendername:string, senderID:string, msg:string, priority:boolean, communitiyID:string, channelID:string, channelname:string){
    let v = [{
        ckey: communitiyID,
        type: "Direct_Message",
        recptID: recpt,
        senderID: sendername,
        msgtype: String(priority),
        msg: msg

    }]
    messaging_server.emit("Net_Update", v);
    let e = Emb_Fivem_User_SEND_Message(String(senderID), String(recpt), String(msg), String(priority), String(channelname));
    Send_Embeded(e, "1171865769961869322");
    Send_Embeded(e, channelID);
}

export function Create_User(channelID:string, CommunityKey:string, DiscordID:string, DiscordName:string, APIKEY:string){
    try{
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
        }]
        let res = Add_Users(CommunityKey, d);
        if(res === false){
            logger.info("User Alreaady Exists");
            let e = Emb_Sync_User(DiscordID, DiscordName, "User Already Synced");
            Send_Embeded(e, channelID);
        }
        if(res === true){
            logger.success("Radio User created");
            Create_SyncedUser(JSON.stringify(d));
            let e = Emb_Sync_User(DiscordID, DiscordName, "Success");
            Send_Embeded(e, channelID);
        }
        if(res === null){
            logger.error("Error returned");
            let e = Emb_Sync_User(DiscordID, DiscordName, "Internal Error");
            Send_Embeded(e, channelID);
        }
        return res;
    }catch (e) {
        // @ts-ignore
        logger.error(String(e.message));
    }
}

export function Send_Embeded(Object: any, channelID: any){
    try{
        client.channels.cache.get(channelID).send({embeds: [Object]});
        return;
    }catch (e) {
        // @ts-ignore
        logger.error("DISCORD SENDING ERROR: "+String(e.message));
    }
}

export function GenerateChannelID(){
    try {
        let x = false;
        while (!x){
            let d = Math.floor(Math.random() * 99999);
            if(Registered_RadioChannels.indexOf(d) <= -1 || Registered_RadioChannels.indexOf(String(d)) <= -1){
                return d;
                break;
            }
        }
    }catch (e) {

    }
}

export function Create_DiscordChannel(CommunityKEY: string, ChannelID:any, ChannelName:string, DiscordID:string, Jobname:string){
    Create_Community_Channel(CommunityKEY, ChannelID, ChannelName, DiscordID, Jobname);
}