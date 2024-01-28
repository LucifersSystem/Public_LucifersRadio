export function Get_MDTUSER (DiscordID:string){
    const axios = require('axios');
    let a = new Array();

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://api-mdt.unitedroleplay.me/v1/admin/manage/users/'+String(DiscordID),
        headers: {
            'snaily-cad-api-token': 'sng_QT7kGavi0pcq6Bdfzd6e9YdrdZJC-aB6AhNx74klcD4PLCxzxk9Itm4N'
        }
    };

    axios.request(config)
        .then((response: { data: any; }) => {
            a.push(JSON.stringify(response.data));
        })
        .catch((error: any) => {
            console.log(error);
        });


    console.log(a);

}