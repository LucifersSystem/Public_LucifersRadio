// @ts-ignore
import express, * as Express from "express";
import Logger from "./Classes/Logger";
import fs, {readFileSync} from "fs";
import * as http from "http";
import {REST, Routes} from "discord.js";
import console from "console";
import {Add_Community, Get_Community_Data, Registered_Community_Keys, Registered_RadioChannels} from "./API/Structures";
import {Delete_Channel, Load_AuthorizedUsers, Load_Channels, Load_SyncUsers} from "./Classes/sql";
import {
    Api_Error,
    Emb_API_Req,
    Emb_Fivem_User_Connected,
    Emb_Fivem_User_DENIED_CONNECTION,
    Emb_Radio_User_BUG_CLIENT,
    Emb_Radio_User_ERROR_CLIENT,
    Emb_Radio_User_Start_Priority,
    Emb_Radio_User_STOP_Priority,
    Remove_Channels,
    System_Status
} from "./Classes/embedcreator";
import {Send_Embeded} from "./API/System";
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
    HTTP_PORT,
    HTTPS_PORT, Police_Jobs, Rescue_Jobs,
    SSL_TLS_CACERT_FILENAME,
    SSL_TLS_CERT_FILENAME,
    SSL_TLS_PRIVATEKEY_FILENAME
} from "./Classes/Settings";
import path from "path";

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
    Load_SyncUsers();
    Load_Channels();
    Load_AuthorizedUsers();
});


logger.success("SYSTEM STARTED");

const io = require('socket.io')(httpServer, {pingTimeout: 60000, allowEIO3: true, origin: "*",
    methods: ["GET", "POST", "OPTIONS"], transports: ['websocket', 'polling', 'flashsocket']});

client.once(Events.ClientReady, (c: { user: { tag: any; }; }) => {
    let p = System_Status("STARTED");
    Send_Embeded(p, Community_SystemLogs_Discord_Channel);
    logger.warn(`Ready! Logged in as ${c.user.tag}`);
});

client.login(Discord_Bot_Token);
client.commands = new Collection();

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
    if (!interaction.isChatInputCommand()) return;

    let x = commandsNames.indexOf(interaction.commandName);
    let command = commands_inter[x];

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        console.error(String(interaction.client.commands));
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        } else {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
});



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
                    let emb = Emb_Fivem_User_Connected(v.Fivem, v.Discord);
                    let channels = Get_Community_Data(Community_AuthenticationKey, "Channels")[0].Channels;
                    let job = v.CurrJob;
                    console.log("REQUEST FOR RADIO CHANNELS FOR: "+ v.Discord + " FOR JOB: "+ job);
                    let res = Get_Community_Data(Community_AuthenticationKey, "Channels")[0].Channels;
                    console.log(res);
                    if(res === undefined) {
                        socket.emit("error", "No Radio Channels setup: " + String(job));
                        var em = Emb_Fivem_User_DENIED_CONNECTION(v.Fivem, v.Discord, "No Radio Channels setup: " + String(job));
                        Send_Embeded(em, Community_SystemLogs_Discord_Channel);
                        socket.disconnect();
                    }else {
                        for (let i = 0; i <= res.length - 1; i++) {
                            let channel = res[i][0];
                            let chJob = channel.Job;
                            if (CIVILIAN_Jobs.indexOf(String(job)) >= 0) {
                                if (CIVILIAN_Jobs.indexOf(String(chJob)) >= 0) {
                                    tmp_channels.push(channel);
                                }
                            }
                            if (Police_Jobs.indexOf(String(job)) >= 0) {
                                if (Police_Jobs.indexOf(String(chJob)) >= 0) {
                                    tmp_channels.push(channel);
                                }
                            }
                            if (Rescue_Jobs.indexOf(String(job)) >= 0) {
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
                            Send_Embeded(em, Community_SystemLogs_Discord_Channel);
                            socket.disconnect();
                        } else {
                            socket.emit("Authorized");
                            socket.emit("Channels_INIT", tmp_channels);
                            Send_Embeded(emb, Community_SystemLogs_Discord_Channel);
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
        let e = Emb_Radio_User_ERROR_CLIENT(String(d.discord), String(d.Fivem), String(d.hash), String(d.error));
        Send_Embeded(e, Community_ClientError_Discord_Channel);
    });
    socket.on("BUG", function (data:any){
        let d = data[0];
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
                                    tmp_channels.push(channel);
                                }
                            }
                            if (Police_Jobs.indexOf(String(job)) >= 0) {
                                if (Police_Jobs.indexOf(String(chJob)) >= 0) {
                                    tmp_channels.push(channel);
                                }
                            }
                            if (Rescue_Jobs.indexOf(String(job)) >= 0) {
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
                            Send_Embeded(emb, Community_SystemLogs_Discord_Channel);
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

    socket.on("vc_packet", function (data:any){
        logger.info("VC SENDING PACKET IN: "+ newNamespace);
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
