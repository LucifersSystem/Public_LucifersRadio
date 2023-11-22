// @ts-ignore
import Logger from "../classes/Logger";
import {Create_AuthorizedUser} from "../Classes/sql";
const logger = new Logger("[DATA STRUCTURES] [Lucifer Systems]");

export const Radio_Community_Keys_Discord = new Array();
export const Radio_Community_DiscordOwner = new Array();

const Communities = new Array();
export const Registered_Community_Keys = new Array();
export const Registered_RadioChannels = new Array();

export function Add_Community_Radio_Channel(CommunityKey: string, ChannelID:any, ChannelName:string, Job:string){
  try{
    Registered_RadioChannels.push(ChannelID);
      for(let x = 0; x<=Communities.length -1; x++){
        let CommunityObj = Communities[x];
        if(CommunityObj[0].indexOf(CommunityKey) >= 0){
        if(CommunityObj.length <=2){
            logger.warn("Community "+ CommunityObj[0][0] + " Is Missing the Radio Channel Object.. Creating one");
            let RCA = new Array();
            var Obj = [{
              CommunityName: Get_Community_Data(CommunityKey, "CommunityName"),
              CommunityKey: String(CommunityKey),
              ChannelName: String(ChannelName),
              ChannelID: String(ChannelID),
              Job: String(Job)
            }]
            RCA.push(Obj)
            CommunityObj.push(RCA);
            return true;
        }else {
          let isfound = false;
          let Channels_ = CommunityObj[2];
          for (let x = 1; x <= Channels_.length; x++) {
            if (String(Channels_[x-1][0].ChannelID) === String(ChannelID)){
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
            }]
            Channels_.push(Obj);
            logger.success("Community " + CommunityObj[0][0] + " Added Channel " + ChannelName + " ID: " + ChannelID);
            return true;
          }
        }
        }else{
          logger.error("Community Dosnt Exist for Key: "+ CommunityKey);
        }

      }
  }catch (e){
    // @ts-ignore
    logger.error(e.message);
    return null;
  }
}

export function Add_Users(CommunityKey:string, UserOb:any){
  try{
    for(let x = 0; x<= Communities.length -1;x++){
      let Community_Obj = Communities[x];
      let Community_IDObj = Community_Obj[0];
      let Community_UsersObj = Community_Obj[1][0];
      console.log("TOTAL USERS: "+ Community_UsersObj.length);
      let IsFound_User = false;

      if(Community_IDObj.indexOf(String(CommunityKey)) >= 0){
        logger.success("Found Community User obj for: "+ CommunityKey);
        for(let u = 0; u<= Community_UsersObj.length-1; u++){
          console.log(Community_UsersObj.length);
          let User = Community_UsersObj[u];
          let User_ID = User[0].discordID;
          if (String(User_ID) === (String(UserOb[0].discordID))) {
              logger.error("Found User: " + User_ID);
              IsFound_User = true;
              return false;
          }
        }
        if(!IsFound_User){
          Communities[x][1][0].push(UserOb[0]);
          logger.success("Created User Object for: "+ UserOb[0]);
          return true;
        }
      }else{
        logger.error("Couldnt Find a community with the key: "+ CommunityKey);
        return null;
      }


    }
  }catch (e) {
    logger.error("ERROR IN ADD_USERS FUNC");
    //@ts-ignore
    logger.error(String(e.message));
    return null;
  }
}
export function Add_Community(CommunityName:string, CommunityKey:string, DiscordID:string){
  let isFound = false;
  logger.info("Working on: "+ CommunityKey);
  if(Registered_Community_Keys.indexOf(CommunityKey) <=-1){
    Registered_Community_Keys.push(CommunityKey);
  }
  try{
    for(let x = 0; x <= Communities.length -1; x++){
      let CommunityObj = Communities[x];
      let CommunityIDData = CommunityObj[0];
      if(CommunityIDData.indexOf(CommunityKey) >= 0){
        isFound = true;
        logger.success("Found Community: "+ CommunityIDData[0] + " Key: "+ CommunityIDData[1]);
        return false;
      }
    }
    if(!isFound){
      let Community = new Array();
      let Community_IDDATA = new Array();
      let Community_Misc = new Array();
      let Community_Users = new Array();
      Community_IDDATA.push(CommunityName);
      Community_IDDATA.push(CommunityKey);
      Community_IDDATA.push(DiscordID);
      Community_IDDATA.push(true);
      Community_Misc.push(Community_Users);
      Community.push(Community_IDDATA);
      Community.push(Community_Misc);
      Communities.push(Community);
      logger.success("Created Community: "+ CommunityName + " Key: "+ CommunityKey);
      return true;
    }
  }catch (e) {
    // @ts-ignore
    logger.error(e.message);
    return null;
  }
}

export function Get_Community_Data(ICommunityKey: string, request:string){
  let isfound = false;
  try{
    for(let x = 0; x <= Communities.length; x++){
      let Community = Communities[x];
      let CommunityIDObj = Community[0];
      let CommunityName = CommunityIDObj[0];
      let CommunityKey = CommunityIDObj[1];

      if(String(CommunityKey) === ICommunityKey) {
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
    if(!isfound){
      return null;
    }
  }catch (e) {
    // @ts-ignore
    logger.error("Error in Getting Data: "+e.message);
    return null;
  }
}

export function Create_DiscordAuthorizedUser(discordID:any, communitykey: any, discordname:any){
  try{
    if(Radio_Community_DiscordOwner.indexOf(String(discordID)) <= -1){
      Radio_Community_DiscordOwner.push(discordID);
      Radio_Community_Keys_Discord.push(communitykey);
      Create_AuthorizedUser(discordID, communitykey);
    }else{
      return;
    }
  }catch (e) {
    // @ts-ignore
    logger.error(e.message);
  }
}