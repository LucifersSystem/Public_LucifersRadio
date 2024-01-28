"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SONORAN_Create_Character_APIDATA = void 0;
var Settings_1 = require("./Settings");
function SONORAN_Create_Character_APIDATA(data) {
    var x = {
        id: Settings_1.SonoranCommunityID,
        key: Settings_1.SonoranAPIKey,
        type: "NEW_CHARACTER",
        data: [{
                user: data[0].DiscordID,
                useDictionary: true,
                recordTypeId: 7,
                replaceValues: {
                    first: data[0].Firstname,
                    last: data[0].Lastname
                },
                record: true
            }]
    };
    return x;
}
exports.SONORAN_Create_Character_APIDATA = SONORAN_Create_Character_APIDATA;
