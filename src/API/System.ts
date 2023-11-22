import {client, messaging_server} from "../index";
import {Add_Users, Registered_RadioChannels} from "./Structures";
import {Create_Community_Channel, Create_SyncedUser} from "../Classes/sql";
import Logger from "../Classes/Logger";
import {Emb_Fivem_User_SEND_Message, Emb_Sync_User} from "../Classes/embedcreator";


let logger = new Logger("System");


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

export function Create_User(channelID:string, CommunityKey:string, DiscordID:string, DiscordName:string){
    try{
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