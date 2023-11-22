"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messaging_server = exports.client = void 0;
// @ts-ignore
var express_1 = __importDefault(require("express"));
var Logger_1 = __importDefault(require("./Classes/Logger"));
var fs_1 = __importStar(require("fs"));
var http = __importStar(require("http"));
var discord_js_1 = require("discord.js");
var console_1 = __importDefault(require("console"));
var Structures_1 = require("./API/Structures");
var sql_1 = require("./Classes/sql");
var embedcreator_1 = require("./Classes/embedcreator");
var System_1 = require("./API/System");
var Settings_1 = require("./Classes/Settings");
var path_1 = __importDefault(require("path"));
var _a = require('discord.js'), Client = _a.Client, Collection = _a.Collection, Events = _a.Events, GatewayIntentBits = _a.GatewayIntentBits;
var https = require('https');
var app = (0, express_1.default)();
var logger = new Logger_1.default("[CORE] [Lucifer Systems]");
var httpServer = http.createServer({}, app);
exports.client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
    ],
});
exports.client.commands = new Collection();
var options = {
    key: fs_1.default.readFileSync(Settings_1.SSL_TLS_PRIVATEKEY_FILENAME),
    cert: fs_1.default.readFileSync(Settings_1.SSL_TLS_CERT_FILENAME),
    ca: fs_1.default.readFileSync(Settings_1.SSL_TLS_CACERT_FILENAME)
};
var httpsServer = https.createServer({
    key: fs_1.default.readFileSync(Settings_1.SSL_TLS_PRIVATEKEY_FILENAME),
    cert: fs_1.default.readFileSync(Settings_1.SSL_TLS_CERT_FILENAME),
    ca: fs_1.default.readFileSync(Settings_1.SSL_TLS_CACERT_FILENAME)
}, app);
httpsServer.listen(Settings_1.HTTPS_PORT, function () {
    logger.info('WSS/HTTPS Server running on port ' + Settings_1.HTTPS_PORT);
});
httpServer.listen(Settings_1.HTTP_PORT, function () {
    logger.info('WS/HTTP Server running on port ' + Settings_1.HTTP_PORT);
    (0, Structures_1.Add_Community)(Settings_1.Community_Name, Settings_1.Community_AuthenticationKey, Settings_1.Community_Owner);
    (0, sql_1.Load_SyncUsers)();
    (0, sql_1.Load_Channels)();
    (0, sql_1.Load_AuthorizedUsers)();
});
logger.success("SYSTEM STARTED");
var io = require('socket.io')(httpServer, { pingTimeout: 60000, allowEIO3: true, origin: "*",
    methods: ["GET", "POST", "OPTIONS"], transports: ['websocket', 'polling', 'flashsocket'] });
exports.client.once(Events.ClientReady, function (c) {
    var p = (0, embedcreator_1.System_Status)("STARTED");
    (0, System_1.Send_Embeded)(p, Settings_1.Community_SystemLogs_Discord_Channel);
    logger.warn("Ready! Logged in as ".concat(c.user.tag));
});
exports.client.login(Settings_1.Discord_Bot_Token);
exports.client.commands = new Collection();
var commands = [];
var commands_inter = new Array();
var commandsNames = new Array();
// Grab all the command files from the commands directory you created earlier
var foldersPath = path_1.default.join(__dirname, 'commands');
var commandFolders = fs_1.default.readdirSync(foldersPath);
for (var _i = 0, commandFolders_1 = commandFolders; _i < commandFolders_1.length; _i++) {
    var folder = commandFolders_1[_i];
    // Grab all the command files from the commands directory you created earlier
    var commandsPath = path_1.default.join(foldersPath, folder);
    var commandFiles = fs_1.default.readdirSync(commandsPath).filter(function (file) { return file.endsWith('.js'); });
    // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
    for (var _b = 0, commandFiles_1 = commandFiles; _b < commandFiles_1.length; _b++) {
        var file = commandFiles_1[_b];
        var filePath = path_1.default.join(commandsPath, file);
        var command = require(filePath);
        if ('data' in command && 'execute' in command) {
            commands.push(command.data.toJSON());
            commands_inter.push(command);
            commandsNames.push(command.name);
        }
        else {
            console_1.default.log("[WARNING] The command at ".concat(filePath, " is missing a required \"data\" or \"execute\" property."));
        }
    }
}
// Construct and prepare an instance of the REST module
var rest = new discord_js_1.REST().setToken(Settings_1.Discord_Bot_Token);
// @ts-ignore
// and deploy your commands!
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var data, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, rest.put(discord_js_1.Routes.applicationGuildCommands(Settings_1.Discord_Bot_clientId, Settings_1.Discord_Community_GUID), { body: commands })];
            case 1:
                data = _a.sent();
                // @ts-ignore
                logger.warn("Successfully Loaded ".concat(data.length, " discord (/) commands."));
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console_1.default.error(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); })();
// @ts-ignore
exports.client.on(Events.InteractionCreate, function (interaction) { return __awaiter(void 0, void 0, void 0, function () {
    var x, command, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!interaction.isChatInputCommand())
                    return [2 /*return*/];
                x = commandsNames.indexOf(interaction.commandName);
                command = commands_inter[x];
                if (!command) {
                    console_1.default.error("No command matching ".concat(interaction.commandName, " was found."));
                    console_1.default.error(String(interaction.client.commands));
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 8]);
                return [4 /*yield*/, command.execute(interaction)];
            case 2:
                _a.sent();
                return [3 /*break*/, 8];
            case 3:
                error_2 = _a.sent();
                console_1.default.error(error_2);
                if (!(interaction.replied || interaction.deferred)) return [3 /*break*/, 5];
                return [4 /*yield*/, interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true })];
            case 4:
                _a.sent();
                return [3 /*break*/, 7];
            case 5: return [4 /*yield*/, interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7: return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); });
// @ts-ignore
exports.messaging_server = io.of("/net").on("connection", function (socket) {
    logger.info("Got Connection from socket: " + socket.id);
    socket.on("Auth", function (data) {
        var v = data[0];
        var CommunityKey = v.Key;
        var isfound = false;
        if (Structures_1.Registered_Community_Keys.indexOf(CommunityKey) >= 0) {
            //Community Is Registered
            var users_arr = (0, Structures_1.Get_Community_Data)(Settings_1.Community_AuthenticationKey, "Users");
            for (var x = 0; x <= users_arr.length - 1; x++) {
                var user = users_arr[x];
                if (user.discordID === v.Discord) {
                    var tmp_channels = new Array();
                    var emb = (0, embedcreator_1.Emb_Fivem_User_Connected)(v.Fivem, v.Discord);
                    var channels = (0, Structures_1.Get_Community_Data)(Settings_1.Community_AuthenticationKey, "Channels")[0].Channels;
                    var job = v.CurrJob;
                    console_1.default.log("REQUEST FOR RADIO CHANNELS FOR: " + v.Discord + " FOR JOB: " + job);
                    var res = (0, Structures_1.Get_Community_Data)(Settings_1.Community_AuthenticationKey, "Channels")[0].Channels;
                    console_1.default.log(res);
                    if (res === undefined) {
                        socket.emit("error", "No Radio Channels setup: " + String(job));
                        var em = (0, embedcreator_1.Emb_Fivem_User_DENIED_CONNECTION)(v.Fivem, v.Discord, "No Radio Channels setup: " + String(job));
                        (0, System_1.Send_Embeded)(em, Settings_1.Community_SystemLogs_Discord_Channel);
                        socket.disconnect();
                    }
                    else {
                        for (var i = 0; i <= res.length - 1; i++) {
                            var channel = res[i][0];
                            var chJob = channel.Job;
                            if (Settings_1.CIVILIAN_Jobs.indexOf(String(job)) >= 0) {
                                if (Settings_1.CIVILIAN_Jobs.indexOf(String(chJob)) >= 0) {
                                    tmp_channels.push(channel);
                                }
                            }
                            if (Settings_1.Police_Jobs.indexOf(String(job)) >= 0) {
                                if (Settings_1.Police_Jobs.indexOf(String(chJob)) >= 0) {
                                    tmp_channels.push(channel);
                                }
                            }
                            if (Settings_1.Rescue_Jobs.indexOf(String(job)) >= 0) {
                                if (Settings_1.Rescue_Jobs.indexOf(String(chJob)) >= 0) {
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
                            var em = (0, embedcreator_1.Emb_Fivem_User_DENIED_CONNECTION)(v.Fivem, v.Discord, "No Radio Channels for job: " + String(job));
                            (0, System_1.Send_Embeded)(em, Settings_1.Community_SystemLogs_Discord_Channel);
                            socket.disconnect();
                        }
                        else {
                            socket.emit("Authorized");
                            socket.emit("Channels_INIT", tmp_channels);
                            (0, System_1.Send_Embeded)(emb, Settings_1.Community_SystemLogs_Discord_Channel);
                        }
                        break;
                    }
                }
            }
            if (!isfound || users_arr.length == 0) {
                socket.emit("error", "Discord User Not Recognized, Please re-sync using the '/syncuser' command.");
                var em = (0, embedcreator_1.Emb_Fivem_User_DENIED_CONNECTION)(v.Fivem, v.Discord, "NO DISCORD USER WITH ID: " + v.Key + " WAS FOUND");
                (0, System_1.Send_Embeded)(em, Settings_1.Community_SystemLogs_Discord_Channel);
                socket.disconnect();
            }
        }
        else {
            //Community Is Not Registered
            socket.emit("error", "Not Authorized");
            var em = (0, embedcreator_1.Emb_Fivem_User_DENIED_CONNECTION)(v.Fivem, v.Discord, "NO COMMUNITY WITH ID: " + v.Key + " WAS FOUND");
            (0, System_1.Send_Embeded)(em, Settings_1.Community_SystemLogs_Discord_Channel);
            socket.disconnect();
        }
    });
    socket.on("EH", function (data) {
        var d = data[0];
        var e = (0, embedcreator_1.Emb_Radio_User_ERROR_CLIENT)(String(d.discord), String(d.Fivem), String(d.hash), String(d.error));
        (0, System_1.Send_Embeded)(e, Settings_1.Community_ClientError_Discord_Channel);
    });
    socket.on("BUG", function (data) {
        var d = data[0];
        var e = (0, embedcreator_1.Emb_Radio_User_BUG_CLIENT)(String(d.discord), String(d.Fivem), String(d.hash), String(d.error));
        (0, System_1.Send_Embeded)(e, Settings_1.Community_ClientError_Discord_Channel);
    });
    socket.on("Channel_Update", function (data) {
        var v = data[0];
        var CommunityKey = v.Key;
        var isfound = false;
        if (Structures_1.Registered_Community_Keys.indexOf(CommunityKey) >= 0) {
            //Community Is Registered
            var users_arr = (0, Structures_1.Get_Community_Data)(Settings_1.Community_AuthenticationKey, "Users");
            for (var x = 0; x <= users_arr.length - 1; x++) {
                var user = users_arr[x];
                if (user.discordID === v.Discord) {
                    var tmp_channels = new Array();
                    var emb = (0, embedcreator_1.Emb_Fivem_User_Connected)(v.Fivem, v.Discord);
                    var job = v.CurrJob;
                    console_1.default.log("REQUEST FOR RADIO CHANNELS FOR: " + v.Discord + " FOR JOB: " + job);
                    var res = (0, Structures_1.Get_Community_Data)(Settings_1.Community_AuthenticationKey, "Channels")[0].Channels;
                    console_1.default.log(res);
                    if (res === undefined) {
                        socket.emit("error", "No Radio Channels setup: " + String(job));
                        var em = (0, embedcreator_1.Emb_Fivem_User_DENIED_CONNECTION)(v.Fivem, v.Discord, "No Radio Channels setup: " + String(job));
                        (0, System_1.Send_Embeded)(em, Settings_1.Community_SystemLogs_Discord_Channel);
                        socket.disconnect();
                    }
                    else {
                        for (var i = 0; i <= res.length - 1; i++) {
                            var channel = res[i][0];
                            var chJob = channel.Job;
                            if (Settings_1.CIVILIAN_Jobs.indexOf(String(job)) >= 0) {
                                if (Settings_1.CIVILIAN_Jobs.indexOf(String(chJob)) >= 0) {
                                    tmp_channels.push(channel);
                                }
                            }
                            if (Settings_1.Police_Jobs.indexOf(String(job)) >= 0) {
                                if (Settings_1.Police_Jobs.indexOf(String(chJob)) >= 0) {
                                    tmp_channels.push(channel);
                                }
                            }
                            if (Settings_1.Rescue_Jobs.indexOf(String(job)) >= 0) {
                                if (Settings_1.Rescue_Jobs.indexOf(String(chJob)) >= 0) {
                                    tmp_channels.push(channel);
                                }
                            }
                        }
                        user.currjob = String(job);
                        isfound = true;
                        if (tmp_channels.length <= 0) {
                            socket.emit("error", "No Radio Channels for job: " + String(job));
                            var em = (0, embedcreator_1.Emb_Fivem_User_DENIED_CONNECTION)(v.Fivem, v.Discord, "No Radio Channels for job: " + String(job));
                            (0, System_1.Send_Embeded)(em, Settings_1.Community_SystemLogs_Discord_Channel);
                            socket.disconnect();
                        }
                        else {
                            socket.emit("Channels_Sync", tmp_channels);
                            (0, System_1.Send_Embeded)(emb, Settings_1.Community_SystemLogs_Discord_Channel);
                        }
                        break;
                    }
                }
            }
        }
    });
    socket.on("Update_Job", function (data) {
        var d = data[0];
        var users_arr = (0, Structures_1.Get_Community_Data)(Settings_1.Community_AuthenticationKey, "Users");
        for (var x = 0; x <= users_arr.length - 1; x++) {
            var o = users_arr[x];
            console_1.default.log(o);
            if (String(o.discordID) === String(d.DiscordID)) {
                o.currjob = String(d.CurrJob);
                socket.emit("Server_Update");
                break;
            }
        }
    });
    socket.on("Update_Cords", function (data) {
        var d = data[0];
        var users_arr = (0, Structures_1.Get_Community_Data)(Settings_1.Community_AuthenticationKey, "Users");
        for (var x = 0; x <= users_arr.length - 1; x++) {
            var o = users_arr[x];
            var user = o;
            if (String(user.discordID) === String(d.DiscordID)) {
                o.x = String(d.X);
                o.y = String(d.Y);
                o.z = String(d.Z);
                console_1.default.log("Updating cords");
                break;
            }
        }
    });
    socket.on("priority_active", function (data) {
        var d = data[0];
        var x = d.sourcex;
        var y = d.sourcey;
        var z = d.sourcez;
        var discord = d.DiscordID;
        var fivem = d.FivemID;
        var e = (0, embedcreator_1.Emb_Radio_User_Start_Priority)(String(discord), String(fivem), String(x), String(y), String(z));
        (0, System_1.Send_Embeded)(e, Settings_1.Community_SystemLogs_Discord_Channel);
        var p = [{
                discord: discord,
                Fivem: fivem,
                x: x,
                y: y,
                z: z
            }];
        exports.messaging_server.emit("priority_sync", p);
    });
    socket.on("priority_disable", function (data) {
        var d = data[0];
        var discord = d.DiscordID;
        var Fivem = d.FivemID;
        var x = (0, embedcreator_1.Emb_Radio_User_STOP_Priority)(String(discord), String(Fivem));
        (0, System_1.Send_Embeded)(x, Settings_1.Community_SystemLogs_Discord_Channel);
        exports.messaging_server.emit("priority_disable");
    });
});
// @ts-ignore
var namespaces = io.of(/^\/dynamic-\d+$/).on('connect', function (socket) {
    var isAUTHORIZED = false;
    var ns = socket.nsp;
    var newNamespace = socket.nsp.name.toString(); // newNamespace.name === '/dynamic-101'
    var channelid = newNamespace.replace("/dynamic-", "");
    logger.success("Socket Connected: " + socket.id);
    logger.warn("Connection request for Namespace: " + channelid);
    console_1.default.info(Structures_1.Registered_RadioChannels);
    for (var x = 0; x <= Structures_1.Registered_RadioChannels.length; x++) {
        if (String(Structures_1.Registered_RadioChannels[x]) == channelid) {
            isAUTHORIZED = true;
            logger.success(socket.id + " Socket Accessed Authorized Channel");
            socket.emit("VC_ALLOWED");
        }
    }
    if (!isAUTHORIZED) {
        logger.warn("Unknown NameSpace Called: " + channelid);
        socket.emit('error', "Not Authorized");
        logger.error("Socket: " + socket.id + " Forcibly Disconnected");
        socket.disconnect();
    }
    socket.on("vc_packet", function (data) {
        logger.info("VC SENDING PACKET IN: " + newNamespace);
        ns.emit("vc_packet", socket.id, data);
    });
    socket.on("priority_active", function (data) {
        logger.info("Priority Active IN: " + newNamespace);
        ns.emit("priority_active", data);
    });
    socket.on("priority_disable", function () {
        logger.info("Priority Disabled IN: " + newNamespace);
        ns.emit("priority_disable");
    });
});
//@ts-ignore
app.use(function (err, req, res, next) {
    console_1.default.log('Middleware error handling');
    logger.error(String(err.message));
    var content = (0, fs_1.readFileSync)("200.html");
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(content);
});
// @ts-ignore
app.get('/sounds/pttactive.mp3', function (req, res) {
    try {
        var content = (0, fs_1.readFileSync)("mic_click_on.mp3");
        res.writeHead(200, { 'Content-Type': 'application/mp3' });
        res.write(content);
        res.end();
    }
    catch (err) {
        var content = (0, fs_1.readFileSync)("200.html");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
    }
});
// @ts-ignore
app.get('/channels/info', function (req, res) {
    try {
        var r = (0, Structures_1.Get_Community_Data)(Settings_1.Community_AuthenticationKey, "Channels");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(String(JSON.stringify(r)));
        res.end();
    }
    catch (err) {
        // @ts-ignore
        logger.error(String(err.message));
        var content = (0, fs_1.readFileSync)("200.html");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
    }
});
// @ts-ignore
app.get('/sounds/pttdisabled.mp3', function (req, res) {
    try {
        var content = (0, fs_1.readFileSync)("mic_click_off.mp3");
        res.writeHead(200, { 'Content-Type': 'application/mp3' });
        res.write(content);
        res.end();
    }
    catch (err) {
        var content = (0, fs_1.readFileSync)("200.html");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
    }
});
// @ts-ignore
app.get('/sounds/panic-button.mp3', function (req, res) {
    try {
        var content = (0, fs_1.readFileSync)("panic-button.mp3");
        res.writeHead(200, { 'Content-Type': 'application/mp3' });
        res.write(content);
        res.end();
    }
    catch (err) {
        var content = (0, fs_1.readFileSync)("200.html");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
    }
});
// @ts-ignore
app.get('/sounds/deny.mp3', function (req, res) {
    try {
        var content = (0, fs_1.readFileSync)("Deny.mp3");
        res.writeHead(200, { 'Content-Type': 'application/mp3' });
        res.write(content);
        res.end();
    }
    catch (err) {
        var content = (0, fs_1.readFileSync)("200.html");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
    }
});
// @ts-ignore
app.get('/js/jq.js', function (req, res) {
    try {
        var content = (0, fs_1.readFileSync)("jq.js");
        res.writeHead(200, { 'Content-Type': 'text/javascript' });
        res.write(content);
        res.end();
    }
    catch (err) {
        var content = (0, fs_1.readFileSync)("200.html");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
    }
});
// @ts-ignore
app.get('/js/socket.js', function (req, res) {
    try {
        var content = (0, fs_1.readFileSync)("socket.js");
        res.writeHead(200, { 'Content-Type': 'text/javascript' });
        res.write(content);
        res.end();
    }
    catch (err) {
        var content = (0, fs_1.readFileSync)("200.html");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
    }
});
// @ts-ignore
app.get('/js/voice.js', function (req, res) {
    try {
        var content = (0, fs_1.readFileSync)("voice.js");
        res.writeHead(200, { 'Content-Type': 'text/javascript' });
        res.write(content);
        res.end();
    }
    catch (err) {
        var content = (0, fs_1.readFileSync)("200.html");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
    }
});
// @ts-ignore
app.get('/users/get/', function (req, res) {
    try {
        var u = (0, Structures_1.Get_Community_Data)(String(Settings_1.Community_AuthenticationKey), "Users");
        var e = (0, embedcreator_1.Emb_API_Req)("users/get");
        (0, System_1.Send_Embeded)(e, Settings_1.Community_SystemLogs_Discord_Channel);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(JSON.stringify(u));
        res.end();
    }
    catch (err) {
        var content = (0, fs_1.readFileSync)("200.html");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
    }
});
// @ts-ignore
app.get('/api/channels', function (req, res) {
    try {
        var a = new Array();
        var b = (0, Structures_1.Get_Community_Data)(Settings_1.Community_AuthenticationKey, "Channels")[1];
        var channelIDs = b.ID;
        var Channelnames = b.name;
        var e = (0, embedcreator_1.Emb_API_Req)("api/channels");
        (0, System_1.Send_Embeded)(e, Settings_1.Community_SystemLogs_Discord_Channel);
        for (var x = 0; x <= channelIDs.length - 1; x++) {
            var h = [{
                    CommunityKey: Settings_1.Community_AuthenticationKey,
                    ChannelName: Channelnames[x],
                    ChannelID: channelIDs[x]
                }];
            a.push(h);
        }
        var content = JSON.stringify(a);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(content);
        res.end();
    }
    catch (err) {
        logger.error(String(err));
        var p = (0, embedcreator_1.Api_Error)(String(err), String(req.hostname));
        (0, System_1.Send_Embeded)(p, Settings_1.Community_SystemLogs_Discord_Channel);
        var content = (0, fs_1.readFileSync)("200.html");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
    }
});
// @ts-ignore
app.get('*', function (req, res) {
    try {
        var content = (0, fs_1.readFileSync)("200.html");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        for (var x = 0; x <= 15; x++) {
            res.write("<!-- NO SNOOPIN U ASS LOVE LUCIFER --!>");
        }
        res.write("<! -- LOVE U --!>");
        res.write("<body><script><script>\n" +
            "  setTimeout(function() {\n" +
            "      window.close()\n" +
            "  }, 1000);\n" +
            "</script></script></body>");
        res.end("<! -- NO SNOOPIN U ASS --!>" + content + " --!>");
    }
    catch (err) {
        var content = (0, fs_1.readFileSync)("200.html");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
    }
});
// @ts-ignore
app.post('*', function (req, res) {
    try {
        var content = (0, fs_1.readFileSync)("200.html");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
    }
    catch (err) {
        var content = (0, fs_1.readFileSync)("200.html");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
    }
});
// @ts-ignore
app.put('*', function (req, res) {
    try {
        var content = (0, fs_1.readFileSync)("200.html");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
    }
    catch (err) {
        var content = (0, fs_1.readFileSync)("200.html");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
    }
});
// @ts-ignore
app.patch('*', function (req, res) {
    try {
        var content = (0, fs_1.readFileSync)("200.html");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
    }
    catch (err) {
        var content = (0, fs_1.readFileSync)("200.html");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
    }
});
// @ts-ignore
app.delete('*', function (req, res) {
    try {
        var content = (0, fs_1.readFileSync)("200.html");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
    }
    catch (err) {
        var content = (0, fs_1.readFileSync)("200.html");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
    }
});
// @ts-ignore
app.head('*', function (req, res) {
    try {
        var content = (0, fs_1.readFileSync)("200.html");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
    }
    catch (err) {
        var content = (0, fs_1.readFileSync)("200.html");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
    }
});
// @ts-ignore
app.options('*', function (req, res) {
    try {
        var content = (0, fs_1.readFileSync)("200.html");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
    }
    catch (err) {
        var content = (0, fs_1.readFileSync)("200.html");
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
    }
});
