"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Get_MDTUSER = void 0;
function Get_MDTUSER(DiscordID) {
    var axios = require('axios');
    var a = new Array();
    var config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://api-mdt.unitedroleplay.me/v1/admin/manage/users/' + String(DiscordID),
        headers: {
            'snaily-cad-api-token': 'sng_QT7kGavi0pcq6Bdfzd6e9YdrdZJC-aB6AhNx74klcD4PLCxzxk9Itm4N'
        }
    };
    axios.request(config)
        .then(function (response) {
        a.push(JSON.stringify(response.data));
    })
        .catch(function (error) {
        console.log(error);
    });
    console.log(a);
}
exports.Get_MDTUSER = Get_MDTUSER;
