// @ts-ignore
import express, * as Express from "express";
import Logger from "./Classes/Logger";
import fs, {readFileSync} from "fs";
import * as http from "http";
import {REST, Routes} from "discord.js";
import console from "console";
import {
    Add_Community, Add_Community_Radio_Channel,
    Get_Community_Data,
    Registered_Community_Keys,
    Registered_RadioChannels,
    Registered_STATE_RadioChannels
} from "./API/Structures";
import {Delete_Channel, Load_AuthorizedUsers, Load_Channels, Load_Chars, Load_SyncUsers} from "./Classes/sql";
import {
    Api_Error,
    Emb_API_Req,
    Emb_Fivem_User_Connected,
    Emb_Fivem_User_DENIED_CONNECTION,
    Emb_Radio_User_BUG_CLIENT,
    Emb_Radio_User_ERROR_CLIENT,
    Emb_Radio_User_Start_Priority,
    Emb_Radio_User_STOP_Priority, Emb_Useralreadysynced,
    Remove_Channels,
    System_Status
} from "./Classes/embedcreator";
import {NewChar_Get_MDT_USER, Proc_Delete_Char, Send_Embeded} from "./API/System";
import {
    CIVILIAN_Jobs,
    Community_AuthenticationKey,
    Community_ClientError_Discord_Channel,
    Community_Name,
    Community_Owner,
    Community_SystemLogs_Discord_Channel,
    Discord_Bot_clientId,
    Discord_Bot_Token,
    Discord_Community_GUID,
    Dispatch_ChannelID, Dispatch_HC_Job_IDs,
    Dispatch_Jobs, Dispatch_REG_Job_IDs,
    HTTP_PORT,
    HTTPS_PORT,
    isRadio_Debug,
    Police_HC_Job_IDs,
    Police_Jobs,
    Police_REG_Job_IDs,
    Rescue_HC_Job_IDs,
    Rescue_Jobs, Rescue_REG_Job_IDs,
    SSL_TLS_CACERT_FILENAME,
    SSL_TLS_CERT_FILENAME,
    SSL_TLS_PRIVATEKEY_FILENAME
} from "./Classes/Settings";
import path from "path";
import {Get_MDTUSER} from "./Classes/api";

const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const https = require('https');
const app = express();
const logger = new Logger("[CORE] [Lucifer Systems]");
const httpServer = http.createServer({}, app);
export const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
    ],
});
client.commands = new Collection();

const options = {
    key: fs.readFileSync(SSL_TLS_PRIVATEKEY_FILENAME),
    cert: fs.readFileSync(SSL_TLS_CERT_FILENAME),
    ca: fs.readFileSync(SSL_TLS_CACERT_FILENAME)
}

const httpsServer = https.createServer({
    key: fs.readFileSync(SSL_TLS_PRIVATEKEY_FILENAME),
    cert: fs.readFileSync(SSL_TLS_CERT_FILENAME),
    ca: fs.readFileSync(SSL_TLS_CACERT_FILENAME)
}, app);

httpsServer.listen(HTTPS_PORT, () => {
    logger.info('WSS/HTTPS Server running on port '+ HTTPS_PORT);
});


httpServer.listen(HTTP_PORT, () => {
    logger.info('WS/HTTP Server running on port '+ HTTP_PORT);
    Add_Community(Community_Name, Community_AuthenticationKey, Community_Owner);
    Add_Community_Radio_Channel(Community_AuthenticationKey, Dispatch_ChannelID, "DISPATCH", Dispatch_Jobs[0]);
    Load_SyncUsers();
    Load_Channels();
    Load_AuthorizedUsers();
    Load_Chars();
});


logger.success("SYSTEM STARTED");

const io = require('socket.io')(httpServer, {pingTimeout: 60000, allowEIO3: true, origin: "*",
    methods: ["GET", "POST", "OPTIONS"], transports: ['websocket', 'polling', 'flashsocket']});

client.once(Events.ClientReady, (c: { user: { tag: any; }; }) => {
    let p = System_Status("STARTED");
    if(isRadio_Debug) {
        Send_Embeded(p, Community_SystemLogs_Discord_Channel);
    }
    logger.success("SYSTEM STARTED");
    logger.warn(`Ready! Logged in as ${c.user.tag}`);
});

client.login(Discord_Bot_Token);
client.commands = new Collection();

const axios = require('axios');
const commands = [];
const commands_inter = new Array();
const commandsNames = new Array();
// Grab all the command files from the commands directory you created earlier
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);


for (const folder of commandFolders) {
    // Grab all the command files from the commands directory you created earlier
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
            commands_inter.push(command);
            commandsNames.push(command.name);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(Discord_Bot_Token);
// @ts-ignore


// and deploy your commands!
(async () => {
    try {

        const data = await rest.put(
            Routes.applicationGuildCommands(Discord_Bot_clientId, Discord_Community_GUID),
            { body: commands },
        );


        // @ts-ignore
        logger.warn(`Successfully Loaded ${data.length} discord (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})();

// @ts-ignore
client.on(Events.InteractionCreate, async interaction => {
    try {
        if (!interaction.isChatInputCommand()) return;

        let x = commandsNames.indexOf(interaction.commandName);
        let command = commands_inter[x];

        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            console.error(String(interaction.client.commands));
            return;
        }

        try {
            await interaction.deferReply({ ephemeral: true })
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({
                    content: 'There was an error while executing this command!',
                    ephemeral: true
                });
            } else {
                await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
            }
        }
    }catch (e) {
        // @ts-ignore
        logger.error(String(e.message));
    }
});

function DiscordRole_Check(data:any){
    let v = data[0];
    let DiscordID = v.Discord;
    let MainServer = v.GUID;
    let Job = v.Job;

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://discord.com/api/v10/guilds/'+String(MainServer)+'/members/'+String(DiscordID),
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bot OTM4NjA0NDg2MjMzMDU5MzI5.Gkz9Am.PL5toA46XF7ulwY4XA_rLUPw3XcSORQ2HHiDjQ'
        }
    };
        // @ts-ignore
        axios.request(config)
            // @ts-ignore
            .then((response) => {
                Process_DiscordJob_Res(JSON.stringify(response.data), Job);
            })
            // @ts-ignore
            .catch((error) => {
                logger.error(String(error));
                throw error;
            });



}

function Process_DiscordJob_Res(data:any, OJob: any){
    let res = JSON.parse(data);
    let user = res.user;
    let roles = res.roles;
    let isFound = false;
    let isFound_HC = false;

    if(OJob === "police" || OJob === "Police") {
        for (let x = 1; x <= Police_HC_Job_IDs.length; x++) {
            let Job = Police_HC_Job_IDs[x - 1][0];
            if (roles.indexOf(String(Job.ID)) >= 0) {
                isFound = true;
                isFound_HC = true;
                if(Job.RoleName.includes("Command") || Job.RoleName.includes("Supervisor")){
                    var Data = [{
                        DiscordID: user.id,
                        Job: OJob,
                        HC: true
                    }];
                    Qbcoms.emit("Job_Update", Data);
                }
            }
        }
        if(!isFound_HC) {
            for (let x = 1; x <= Police_REG_Job_IDs.length; x++) {
                let Job = Police_REG_Job_IDs[x - 1][0];
                if (roles.indexOf(String(Job.ID)) >= 0) {
                    isFound = true;
                    var Data = [{
                        DiscordID: user.id,
                        Job: OJob,
                        HC: false
                    }];
                    Qbcoms.emit("Job_Update", Data);
                }
            }
        }

        if(!isFound){
            var D1 = [{
                DiscordID: user.id,
                Job: OJob,
                Error: "User dose not have Job"
            }];
            Qbcoms.emit("Job_error", D1);
        }
    }

    if(OJob === "rescue" || OJob === "Rescue") {
        for (let x = 1; x <= Rescue_HC_Job_IDs.length; x++) {
            let Job = Rescue_HC_Job_IDs[x - 1][0];
            if (roles.indexOf(String(Job.ID)) >= 0) {
                isFound = true;
                isFound_HC = true;
                if(Job.RoleName.includes("Command") || Job.RoleName.includes("Supervisor")){
                    var Data = [{
                        DiscordID: user.id,
                        Job: OJob,
                        HC: true
                    }];
                    Qbcoms.emit("Job_Update", Data);
                }
            }
        }
        if(!isFound_HC) {
            for (let x = 1; x <= Rescue_REG_Job_IDs.length; x++) {
                let Job = Rescue_REG_Job_IDs[x - 1][0];
                if (roles.indexOf(String(Job.ID)) >= 0) {
                    isFound = true;
                    var Data = [{
                        DiscordID: user.id,
                        Job: OJob,
                        HC: false
                    }];
                    Qbcoms.emit("Job_Update", Data);
                }
            }
        }

        if(!isFound){
            var D1 = [{
                DiscordID: user.id,
                Job: OJob,
                Error: "User dose not have Job"
            }];
            Qbcoms.emit("Job_error", D1);
        }
    }

    if(OJob === "dispatch" || OJob === "Dispatch") {
        for (let x = 1; x <= Dispatch_HC_Job_IDs.length; x++) {
            let Job = Dispatch_HC_Job_IDs[x - 1][0];
            if (roles.indexOf(String(Job.ID)) >= 0) {
                isFound = true;
                isFound_HC = true;
                if(Job.RoleName.includes("Command") || Job.RoleName.includes("Supervisor")){
                    var Data = [{
                        DiscordID: user.id,
                        Job: OJob,
                        HC: true
                    }];
                    Qbcoms.emit("Job_Update", Data);
                }
            }
        }
        if(!isFound_HC) {
            for (let x = 1; x <= Dispatch_REG_Job_IDs.length; x++) {
                let Job = Dispatch_REG_Job_IDs[x - 1][0];
                if (roles.indexOf(String(Job.ID)) >= 0) {
                    isFound = true;
                    var Data = [{
                        DiscordID: user.id,
                        Job: OJob,
                        HC: false
                    }];
                    Qbcoms.emit("Job_Update", Data);
                }
            }
        }

        if(!isFound){
            var D1 = [{
                DiscordID: user.id,
                Job: OJob,
                Error: "User dose not have Job"
            }];
            Qbcoms.emit("Job_error", D1);
        }
    }


}
// @ts-ignore
export const Qbcoms = io.of("/qb").on("connection", (socket)=>{
    logger.success("GOT CONNECTION REQUEST FROM A QB-CLIENT");

    socket.on("permCheck", function (data:any){
        let v = data[0];
        let CommunityKey = v.Key;
        if(Registered_Community_Keys.indexOf(CommunityKey) >= 0){
            let DiscordID = v.DiscordID;
            let Job = v.Job;

            var d = [{
                Discord: DiscordID,
                GUID: Discord_Community_GUID,
                Job: Job
            }];

            DiscordRole_Check(d);

        }
    });

    socket.on("syncChar", function (data:any){
        let v = data[0];
        let DiscordID = v.DiscordID;
        let QbID = v.qbID;
        let First_Name = v.FirstName;
        let Last_Name = v.LastName;
        let Phone = v.Phone;
        let Gender = v.gender;
        let dob = v.dob;

        var Data = [{
            FirstName: First_Name,
            LastName: Last_Name,
            gender: Gender,
            dob: dob,
            Phone: Phone,
            DiscordID: DiscordID,
            qbID: QbID
        }];
        NewChar_Get_MDT_USER(Data);
    });
})
// @ts-ignore
export const messaging_server = io.of("/net").on("connection", (socket) => {

    logger.info("Got Connection from socket: "+ socket.id);
    socket.on("Auth", function (data:any){
        let v = data[0];
        let CommunityKey = v.Key;
        let isfound = false;
        if(Registered_Community_Keys.indexOf(CommunityKey) >= 0){
            //Community Is Registered

            let users_arr = Get_Community_Data(Community_AuthenticationKey, "Users");
            for(let x = 0; x <= users_arr.length -1; x++){
                let user = users_arr[x];

                if(user.discordID === v.Discord){
                    let tmp_channels = new Array();
                    let channels = Get_Community_Data(Community_AuthenticationKey, "Channels")[0].Channels;
                    let job = v.CurrJob;
                    console.log("REQUEST FOR RADIO CHANNELS FOR: "+ v.Discord + " FOR JOB: "+ job);
                    let res = Get_Community_Data(Community_AuthenticationKey, "Channels")[0].Channels;
                    console.log(res);
                    if(res === undefined) {
                        socket.emit("error", "Your Job: " + String(job) + " dose not have any current radio channels assigned");
                        var em = Emb_Fivem_User_DENIED_CONNECTION(v.Fivem, v.Discord, "The fallowing Job dose not have any current radio channels: " + String(job) + " but yet was requested.");
                        logger.warn("A user with the job: "+ String(job) + " requested a radio channel");
                        Send_Embeded(em, Community_SystemLogs_Discord_Channel);
                        socket.disconnect();
                    }else {
                        for (let i = 0; i <= res.length - 1; i++) {
                            let channel = res[i][0];
                            let chJob = channel.Job;
                            if (CIVILIAN_Jobs.indexOf(String(job)) >= 0) {
                                if(String(chJob) === String(job)) {
                                    tmp_channels.push(channel);
                                }
                            }
                            if (Police_Jobs.indexOf(String(job)) >= 0) {
                                if(String(chJob) === String(job)) {
                                    tmp_channels.push(channel);
                                }
                            }
                            if (Rescue_Jobs.indexOf(String(job)) >= 0) {
                                if(String(chJob) === String(job)) {
                                    tmp_channels.push(channel);
                                }
                            }
                            if (Dispatch_Jobs.indexOf(String(job)) >= 0) {
                                if(String(chJob) === job){
                                    logger.success("FOUND DISPATCH JOB!!!");
                                    tmp_channels.push(channel);
                                }
                                if (Police_Jobs.indexOf(String(chJob)) >= 0) {
                                    tmp_channels.push(channel);
                                }
                                if (Rescue_Jobs.indexOf(String(chJob)) >= 0) {
                                    tmp_channels.push(channel);
                                }
                            }
                        }
                        user.currjob = String(job);
                        logger.success("Authenticating User with job: " + job + " " + user.discordID);
                        user.fivemLicenseID = v.Fivem;
                        user.currsocketID = String(socket.id);
                        isfound = true;
                        if (tmp_channels.length <= 0) {
                            socket.emit("error", "Radio is not setup for the job: " + String(job));
                            var em = Emb_Fivem_User_DENIED_CONNECTION(v.Fivem, v.Discord, "No Radio Channels for job: " + String(job));
                            if(isRadio_Debug) {
                                Send_Embeded(em, Community_SystemLogs_Discord_Channel);
                            }
                            socket.disconnect();
                        } else {
                            socket.emit("Authorized");
                            socket.emit("Channels_INIT", tmp_channels);
                            if(isRadio_Debug){
                                let emb = Emb_Fivem_User_Connected(v.Fivem, v.Discord);
                                Send_Embeded(emb, Community_SystemLogs_Discord_Channel);
                            }
                        }
                        break;
                    }
                }


            }

            if(!isfound || users_arr.length == 0){
                socket.emit("error", "Discord User Not Recognized, Please re-sync using the '/syncuser' command.");
                var em = Emb_Fivem_User_DENIED_CONNECTION(v.Fivem, v.Discord, "NO DISCORD USER WITH ID: "+v.Key +" WAS FOUND");
                Send_Embeded(em, Community_SystemLogs_Discord_Channel);
                socket.disconnect();
            }





        }else{
            //Community Is Not Registered
            socket.emit("error", "Not Authorized");
            var em = Emb_Fivem_User_DENIED_CONNECTION(v.Fivem, v.Discord, "NO COMMUNITY WITH ID: "+v.Key +" WAS FOUND");
            Send_Embeded(em, Community_SystemLogs_Discord_Channel);
            socket.disconnect();
        }
    });

    socket.on("EH", function (data:any){
        let d = data[0];
        logger.error("CLIENT REPORTED AN ERROR: "+ String(d));
        let e = Emb_Radio_User_ERROR_CLIENT(String(d.discord), String(d.Fivem), String(d.hash), String(d.error));
        Send_Embeded(e, Community_ClientError_Discord_Channel);
    });
    socket.on("BUG", function (data:any){
        let d = data[0];
        logger.error("CLIENT REPORTED AN BUG: "+ String(d))
        let e = Emb_Radio_User_BUG_CLIENT(String(d.discord), String(d.Fivem), String(d.hash), String(d.error));
        Send_Embeded(e, Community_ClientError_Discord_Channel);
    });
    socket.on("Channel_Update", function (data:any){
        let v = data[0];
        let CommunityKey = v.Key;
        let isfound = false;
        if(Registered_Community_Keys.indexOf(CommunityKey) >= 0) {
            //Community Is Registered

            let users_arr = Get_Community_Data(Community_AuthenticationKey, "Users");
            for (let x = 0; x <= users_arr.length - 1; x++) {
                let user = users_arr[x];

                if (user.discordID === v.Discord) {
                    let tmp_channels = new Array();
                    let emb = Emb_Fivem_User_Connected(v.Fivem, v.Discord);
                    let job = v.CurrJob;
                    console.log("REQUEST FOR RADIO CHANNELS FOR: " + v.Discord + " FOR JOB: " + job);
                    let res = Get_Community_Data(Community_AuthenticationKey, "Channels")[0].Channels;
                    console.log(res);
                    if (res === undefined) {
                        socket.emit("error", "No Radio Channels setup: " + String(job));
                        var em = Emb_Fivem_User_DENIED_CONNECTION(v.Fivem, v.Discord, "No Radio Channels setup: " + String(job));
                        Send_Embeded(em, Community_SystemLogs_Discord_Channel);
                        socket.disconnect();
                    } else {
                        for (let i = 0; i <= res.length - 1; i++) {
                            let channel = res[i][0];
                            let chJob = channel.Job;
                            if (CIVILIAN_Jobs.indexOf(String(job)) >= 0) {
                                if (CIVILIAN_Jobs.indexOf(String(chJob)) >= 0) {
                                    if(String(chJob) === String(job)) {
                                        tmp_channels.push(channel);
                                    }
                                }
                            }
                            if (Police_Jobs.indexOf(String(job)) >= 0) {
                                if (Police_Jobs.indexOf(String(chJob)) >= 0) {
                                    if(String(chJob) === String(job)) {
                                        tmp_channels.push(channel);
                                    }
                                }
                            }
                            if (Rescue_Jobs.indexOf(String(job)) >= 0) {
                                if (Rescue_Jobs.indexOf(String(chJob)) >= 0) {
                                    if(String(chJob) === String(job)) {
                                        tmp_channels.push(channel);
                                    }
                                }
                            }
                            if (Dispatch_Jobs.indexOf(String(job)) >= 0) {
                                if(String(chJob) === job){
                                    logger.success("FOUND DISPATCH JOB!!!");
                                    tmp_channels.push(channel);
                                }
                                if (Police_Jobs.indexOf(String(chJob)) >= 0) {
                                    tmp_channels.push(channel);
                                }
                                if (Rescue_Jobs.indexOf(String(chJob)) >= 0) {
                                    tmp_channels.push(channel);
                                }
                            }
                        }
                        user.currjob = String(job);
                        isfound = true;
                        if (tmp_channels.length <= 0) {
                            socket.emit("error", "No Radio Channels for job: " + String(job));
                            var em = Emb_Fivem_User_DENIED_CONNECTION(v.Fivem, v.Discord, "No Radio Channels for job: " + String(job));
                            Send_Embeded(em, Community_SystemLogs_Discord_Channel);
                            socket.disconnect();
                        } else {
                            socket.emit("Channels_Sync", tmp_channels);
                            if(isRadio_Debug){
                                Send_Embeded(emb, Community_SystemLogs_Discord_Channel);
                            }
                        }
                        break;
                    }
                }

            }
        }
    });
    socket.on("Update_Job", function (data:any){
        let d = data[0];
        let users_arr = Get_Community_Data(Community_AuthenticationKey, "Users");
        for(let x = 0; x <= users_arr.length -1; x++){
            let o = users_arr[x];
            console.log(o);

            if(String(o.discordID) === String(d.DiscordID)){
                o.currjob = String(d.CurrJob);
                socket.emit("Server_Update");
                break;
            }

        }
    });
    socket.on("Update_Cords", function (data:any){
        let d = data[0];
        let users_arr = Get_Community_Data(Community_AuthenticationKey, "Users");
        for(let x = 0; x <= users_arr.length -1; x++){
            let o = users_arr[x];
            let user = o;

            if(String(user.discordID) === String(d.DiscordID)){
                o.x = String(d.X);
                o.y = String(d.Y);
                o.z = String(d.Z);
                console.log("Updating cords");
                break;
            }

        }
    });

    socket.on("priority_active", function (data:any){
        let d = data[0];
        let x = d.sourcex;
        let y = d.sourcey;
        let z = d.sourcez;
        let discord = d.DiscordID;
        let fivem = d.FivemID;

        let e = Emb_Radio_User_Start_Priority(String(discord), String(fivem), String(x), String(y), String(z));
        Send_Embeded(e, Community_SystemLogs_Discord_Channel);

        var p = [{
            discord: discord,
            Fivem: fivem,
            x: x,
            y: y,
            z: z
        }];

        messaging_server.emit("priority_sync", p);
    });

    socket.on("priority_disable", function (data:any){
        let d = data[0];
        let discord = d.DiscordID;
        let Fivem = d.FivemID;

        let x = Emb_Radio_User_STOP_Priority(String(discord), String(Fivem));
        Send_Embeded(x, Community_SystemLogs_Discord_Channel);
        messaging_server.emit("priority_disable");
    });
});


// @ts-ignore
const namespaces = io.of(/^\/dynamic-\d+$/).on('connect', (socket) => {
    let isAUTHORIZED = false;
    let ns = socket.nsp;
    let newNamespace = socket.nsp.name.toString(); // newNamespace.name === '/dynamic-101'
    let channelid = newNamespace.replace("/dynamic-", "");
    logger.success("Socket Connected: "+ socket.id);
    logger.warn("Connection request for Namespace: "+ channelid);
    console.info(Registered_RadioChannels);
    for(let x = 0; x <= Registered_RadioChannels.length; x++){
        if(String(Registered_RadioChannels[x]) == channelid){
            isAUTHORIZED = true;
            logger.success(socket.id+ " Socket Accessed Authorized Channel");
            socket.emit("VC_ALLOWED");
        }
    }
    if(!isAUTHORIZED){
        logger.warn("Unknown NameSpace Called: "+ channelid);
        socket.emit('error', "Not Authorized");
        logger.error("Socket: "+ socket.id + " Forcibly Disconnected");
        socket.disconnect();
    }
    socket.on("PTT", function (data:any){
        logger.info("SET PTT: "+String(data[0].Status));

        var D = [{
            ChannelID: channelid,
            DiscordID: data[0].DiscordID,
            Status: data[0].Status
        }];
        ns.emit("PTT", D);
    });
    socket.on("vc_packet", function (data:any){
        logger.info("VC SENDING PACKET IN: "+ newNamespace);
        if(channelid === String(Dispatch_ChannelID)){
            for(let o = 0; o <= Registered_STATE_RadioChannels.length -1; o++){
                io.of('/dynamic-'+String(Registered_STATE_RadioChannels[o])).emit("vc_packet", socket.id, data);
                logger.debug("SENDING VOICE PACKET TO STATE CHANNELS");
            }
        }
        if(Registered_STATE_RadioChannels.indexOf(Number(channelid)) >= 0){
            io.of('/dynamic-'+String(Dispatch_ChannelID)).emit("vc_packet", socket.id, data);
            logger.debug("STATE UNIT TALKING TO DISPATCH");
        }
        ns.emit("vc_packet", socket.id, data);
    });

    socket.on("priority_active", function (data:any){
        logger.info("Priority Active IN: "+newNamespace);
        ns.emit("priority_active", data);
    });
    socket.on("priority_disable", function (){
        logger.info("Priority Disabled IN: "+newNamespace);
        ns.emit("priority_disable");
    });
});


//@ts-ignore
app.use((err, req, res, next) => {
    console.log('Middleware error handling');
    logger.error(String(err.message));
    let content = readFileSync("200.html");
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(content);
});


// @ts-ignore
app.get('/sounds/pttactive.mp3', function (req, res) {
    try {
        let content = readFileSync("mic_click_on.mp3");
        res.writeHead(200, { 'Content-Type': 'application/mp3' });
        res.write(content);
        res.end();


    }catch (err){
        let content = readFileSync("200.html");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
    }
});

app.get('/char/:charID/:disc', function (req, res) {
    try {
        let DiscID = req.params.disc;
        let CharID = req.params.charID;
        let d = DiscID.replace("discord:", "");
        let users_arr = Get_Community_Data(Community_AuthenticationKey, "Users");
        res.writeHead(200, { 'Content-Type': 'application/json' });
        if(DiscID != undefined) {
           var o = [{
               DiscordID: d,
               qbID: CharID
           }];
            Proc_Delete_Char(o);
        }else{
            console.log("DATA IS UNDEFINED");
        }
        res.end();

    }catch (err){
        let content = readFileSync("200.html");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
    }
});

// @ts-ignore
app.get('/char/new/:qbID/:firstname/:lastname/:gender/:dob/:phonenumber/:discordID', function (req, res) {
    try {
        let QBID = req.params.qbID;
        let firstname = req.params.firstname;
        let lastname = req.params.lastname;
        let dob = req.params.dob;
        let phonenumber = req.params.phonenumber;
        let discID = req.params.discordID;
        let gender = req.params.gender;
        let isfound = false;


        let users_arr = Get_Community_Data(Community_AuthenticationKey, "Users");
        for (let x = 0; x <= users_arr.length - 1; x++) {
            let o = users_arr[x];
            console.log(o);
            let user = o;
            if (String(user.discordID) === String(discID)) {
                isfound = true;
                break;
            }
        }

        if(!isfound){
            let content = readFileSync("200.html");
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.end(content)
        }

        if(isfound){
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write("DONE");
            res.end();

            var Data = [{
                FirstName: firstname,
                LastName: lastname,
                gender: gender,
                dob: dob,
                Phone: phonenumber,
                DiscordID: discID,
                qbID: QBID
            }];
            NewChar_Get_MDT_USER(Data);
        }




    }catch (err){
        let content = readFileSync("200.html");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
    }
});
//@ts-ignore
app.get('/isallow/:disc', function (req, res) {
    try {
        let DiscID = req.params.disc;
        let users_arr = Get_Community_Data(Community_AuthenticationKey, "Users");
        let ISFOUND = false;
        console.log(DiscID);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        if(DiscID != undefined) {
            for (let x = 0; x <= users_arr.length -1; x++) {
                let o = users_arr[x];
                let user = o;
                if (JSON.stringify(user.discordID) === JSON.stringify(DiscID)) {
                    console.log("USER: " + DiscID + " ALLOWED");
                    ISFOUND = true;
                    break;
                }
            }
        }else{
            console.log("DATA IS UNDEFINED");
        }
        if(ISFOUND){
            var d = [{
                result: true
            }]
            res.write(String(JSON.stringify(d)));
        }
        if(!ISFOUND){
            var d1 = [{
                result: false
            }]
            res.write(String(JSON.stringify(d1)));
        }
        res.end();

    }catch (err){
        let content = readFileSync("200.html");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
    }
});

app.get('/user/details/:disc', function (req, res) {
    try {
        let DiscID = req.params.disc;
        let users_arr = Get_Community_Data(Community_AuthenticationKey, "Users");
        console.log(DiscID);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        if(DiscID != undefined) {
            for (let x = 0; x <= users_arr.length -1; x++) {
                let o = users_arr[x];
                let user = o;
                if (JSON.stringify(user.discordID) === JSON.stringify(DiscID)) {
                    console.log("USER: " + DiscID + " ALLOWED");
                    res.write(JSON.stringify(user));
                    break;
                }
            }
        }else{
            console.log("DATA IS UNDEFINED");
        }
        res.end();

    }catch (err){
        let content = readFileSync("200.html");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
    }
});

// @ts-ignore
app.get('/mdt/user/:discord', function (req, res) {
    try {
        var id = req.params.discord;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        const axios = require('axios');

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://api-mdt.unitedroleplay.me/v1/admin/manage/users/'+String(id),
            headers: {
                'snaily-cad-api-token': 'sng_QT7kGavi0pcq6Bdfzd6e9YdrdZJC-aB6AhNx74klcD4PLCxzxk9Itm4N'
            }
        };

        axios.request(config)
            .then((response: { data: any; }) => {
                res.write(JSON.stringify(response.data));
            })
            .catch((error: any) => {
                console.log(error);
            });

        res.end();


    }catch (err){
        let content = readFileSync("200.html");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end();
    }
});
// @ts-ignore
app.get('/channels/info', function (req, res) {
    try {
        let r = Get_Community_Data(Community_AuthenticationKey, "Channels");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(String(JSON.stringify(r)));
        res.end();


    }catch (err){
        // @ts-ignore
        logger.error(String(err.message));
        let content = readFileSync("200.html");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
    }
});
// @ts-ignore
app.get('/sounds/pttdisabled.mp3', function (req, res) {
    try {
        let content = readFileSync("mic_click_off.mp3");
        res.writeHead(200, { 'Content-Type': 'application/mp3' });
        res.write(content);
        res.end();


    }catch (err){
        let content = readFileSync("200.html");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
    }
});
// @ts-ignore
app.get('/sounds/panic-button.mp3', function (req, res) {
    try {
        let content = readFileSync("panic-button.mp3");
        res.writeHead(200, { 'Content-Type': 'application/mp3' });
        res.write(content);
        res.end();


    }catch (err){
        let content = readFileSync("200.html");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
    }
});
// @ts-ignore
app.get('/sounds/pttdeny.mp3', function (req, res) {
    try {
        let content = readFileSync("mic_deny.mp3");
        res.writeHead(200, { 'Content-Type': 'application/mp3' });
        res.write(content);
        res.end();


    }catch (err){
        let content = readFileSync("200.html");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
    }
});
// @ts-ignore
app.get('/sounds/deny.mp3', function (req, res) {
    try {
        let content = readFileSync("Deny.mp3");
        res.writeHead(200, { 'Content-Type': 'application/mp3' });
        res.write(content);
        res.end();


    }catch (err){
        let content = readFileSync("200.html");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
    }
});
// @ts-ignore
app.get('/js/jq.js', function (req, res) {
    try {
        let content = readFileSync("jq.js");
        res.writeHead(200, { 'Content-Type': 'text/javascript' });
        res.write(content);
        res.end();


    }catch (err){
        let content = readFileSync("200.html");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
    }
});
// @ts-ignore
app.get('/js/socket.js', function (req, res) {
    try {
        let content = readFileSync("socket.js");
        res.writeHead(200, { 'Content-Type': 'text/javascript' });
        res.write(content);
        res.end();


    }catch (err){
        let content = readFileSync("200.html");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
    }
});
// @ts-ignore
app.get('/js/voice.js', function (req, res) {
    try {
        let content = readFileSync("voice.js");
        res.writeHead(200, { 'Content-Type': 'text/javascript' });
        res.write(content);
        res.end();


    }catch (err){
        let content = readFileSync("200.html");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
    }
});
// @ts-ignore
app.get('/users/get/', function (req, res) {
    try {
        let u = Get_Community_Data(String(Community_AuthenticationKey), "Users");
        let e = Emb_API_Req("users/get");
        Send_Embeded(e, Community_SystemLogs_Discord_Channel);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(JSON.stringify(u));
        res.end();


    }catch (err){
        let content = readFileSync("200.html");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
    }
});
// @ts-ignore
app.get('/api/channels', function (req, res) {
    try {
        let a = new Array();
        let b = Get_Community_Data(Community_AuthenticationKey, "Channels")[1];
        let channelIDs = b.ID;
        let Channelnames = b.name;
        let e = Emb_API_Req("api/channels");
        Send_Embeded(e, Community_SystemLogs_Discord_Channel);
        for(let x = 0;x<= channelIDs.length -1; x++){
            var h = [{
                CommunityKey: Community_AuthenticationKey,
                ChannelName: Channelnames[x],
                ChannelID: channelIDs[x]
            }]
            a.push(h);
        }
        let content = JSON.stringify(a);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(content);
        res.end();


    }catch (err){
        logger.error(String(err));
        let p = Api_Error(String(err), String(req.hostname));
        Send_Embeded(p, Community_SystemLogs_Discord_Channel);
        let content = readFileSync("200.html");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
    }
});

// @ts-ignore
app.get('*', function (req, res) {
    try {
        let content = readFileSync("200.html");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        for(let x = 0; x <= 15; x++){
            res.write("<!-- NO SNOOPIN U ASS LOVE LUCIFER --!>");
        }
        res.write("<! -- LOVE U --!>");
        res.write("<body><script><script>\n" +
            "  setTimeout(function() {\n" +
            "      window.close()\n" +
            "  }, 1000);\n" +
            "</script></script></body>")
        res.end("<! -- NO SNOOPIN U ASS --!>"+content +" --!>");


    }catch (err){
        let content = readFileSync("200.html");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
    }
});
// @ts-ignore
app.post('*', function (req, res) {
    try {
        let content = readFileSync("200.html");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);


    }catch (err){
        let content = readFileSync("200.html");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
    }
});
// @ts-ignore
app.put('*', function (req, res) {
    try {
        let content = readFileSync("200.html");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);


    }catch (err){
        let content = readFileSync("200.html");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
    }
});

// @ts-ignore
app.patch('*', function (req, res) {
    try {
        let content = readFileSync("200.html");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);


    }catch (err){
        let content = readFileSync("200.html");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
    }
});
// @ts-ignore
app.delete('*', function (req, res) {
    try {
        let content = readFileSync("200.html");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);


    }catch (err){
        let content = readFileSync("200.html");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
    }
});
// @ts-ignore
app.head('*', function (req, res) {
    try {
        let content = readFileSync("200.html");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);


    }catch (err){
        let content = readFileSync("200.html");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
    }
});

// @ts-ignore
app.options('*', function (req, res) {
    try {
        let content = readFileSync("200.html");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);


    }catch (err){
        let content = readFileSync("200.html");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
    }
});
