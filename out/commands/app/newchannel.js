"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var Structures_1 = require("../../API/Structures");
var System_1 = require("../../API/System");
var embedcreator_1 = require("../../Classes/embedcreator");
var sql_1 = require("../../Classes/sql");
var scheck_1 = require("../../API/scheck");
var index_1 = require("../../index");
var Settings_1 = require("../../Classes/Settings");
module.exports = {
    name: "newchannel",
    data: new discord_js_1.SlashCommandBuilder()
        .setName('newchannel')
        .setDescription('Creates a Radio Channel Instantly for your community.')
        .addStringOption(function (option) {
        return option.setName('channelname')
            .setRequired(true)
            .setDescription('The new Channel Name.');
    })
        .addStringOption(function (option) {
        return option.setName('job')
            .setRequired(true)
            .setDescription('The Relevant Job Name');
    }),
    execute: function (interaction) {
        return __awaiter(this, void 0, void 0, function () {
            var interactionUser, userId, channelID, chname, jobname, channelid, p, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, interaction.guild.members.fetch(interaction.user.id)];
                    case 1:
                        interactionUser = _a.sent();
                        userId = interactionUser.id;
                        channelID = interaction.channelId;
                        chname = interaction.options.get("channelname").value;
                        jobname = interaction.options.get("job").value;
                        channelid = (0, System_1.GenerateChannelID)();
                        if (Structures_1.Radio_Community_DiscordOwner.indexOf(String(userId)) >= 0 && !(0, scheck_1.IL_CHAR)(chname) || String(userId) === String(Settings_1.Community_Owner)) {
                            p = (0, embedcreator_1.NewChannel)(chname, String(channelid));
                            (0, Structures_1.Add_Community_Radio_Channel)(Settings_1.Community_AuthenticationKey, channelid, chname, jobname);
                            (0, sql_1.Create_Community_Channel)(Settings_1.Community_AuthenticationKey, channelid, chname, userId, jobname);
                            (0, System_1.Send_Embeded)(p, channelID);
                            res = (0, Structures_1.Get_Community_Data)(Settings_1.Community_AuthenticationKey, "Channels");
                            index_1.messaging_server.emit("Server_Update");
                            interaction.reply("Created, it is instantly active across the network.");
                        }
                        else {
                            interaction.reply("ERROR, YOUR NOT REGISTERED IN THE COMMUNITY AS AN ADMIN+");
                        }
                        return [2 /*return*/];
                }
            });
        });
    },
};
