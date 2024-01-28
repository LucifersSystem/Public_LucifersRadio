import {SonoranAPIKey, SonoranCommunityID, SonoranServerID} from "./Settings";

export function SONORAN_Create_Character_APIDATA(data:any){
    let x = {
        id: SonoranCommunityID,
        key: SonoranAPIKey,
        type: "NEW_CHARACTER",
        data:[{
            user: data[0].DiscordID,
            useDictionary: true,
            recordTypeId: 7,
            replaceValues:{
                first: data[0].Firstname,
                last: data[0].Lastname
            },
            record: true
        }]
    }
    return x;
}