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
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-ignore
var MessageGroup_1 = __importDefault(require("./MessageGroup"));
var ansi_colors_1 = __importDefault(require("ansi-colors"));
var axios_1 = __importDefault(require("axios"));
var projectName = "API";
var Logger = /** @class */ (function () {
    function Logger(prefix) {
        var _Discord_webhook, _Discord_postWebhook, _a;
        this.discord = new (_a = /** @class */ (function () {
                function Discord() {
                    var _this = this;
                    // @ts-ignore
                    _Discord_webhook.set(this, process.env.DISCORD_WEBHOOK || "");
                    // @ts-ignore
                    _Discord_postWebhook.set(this, function (data) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, axios_1.default.post(__classPrivateFieldGet(this, _Discord_webhook, "f"), data)];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                }
                Discord.prototype.error = function (data) {
                    __classPrivateFieldGet(this, _Discord_postWebhook, "f").call(this, {
                        embeds: [
                            {
                                title: (data === null || data === void 0 ? void 0 : data.title) ||
                                    "Error reported in ".concat(process.env.DEVELOPMENT ? "Development" : "Production"),
                                color: (data === null || data === void 0 ? void 0 : data.color) || 16711680,
                                fields: data === null || data === void 0 ? void 0 : data.fields,
                                description: data === null || data === void 0 ? void 0 : data.description,
                                author: {
                                    name: new Date(Date.now()).toUTCString(),
                                },
                            },
                        ],
                        username: "Lucifer's API",
                        avatar_url: "https://www.onlygfx.com/wp-content/uploads/2019/10/10-grunge-gothic-cross-10.png?width=468&height=468",
                    });
                };
                Discord.prototype.info = function (data) {
                    if (typeof data === "string") {
                        data = {
                            description: data,
                        };
                    }
                    __classPrivateFieldGet(this, _Discord_postWebhook, "f").call(this, {
                        content: null,
                        embeds: [
                            {
                                title: (data === null || data === void 0 ? void 0 : data.title) ||
                                    "Information logged from ".concat(process.env.DEVELOPMENT ? "Development" : "Production"),
                                color: (data === null || data === void 0 ? void 0 : data.color) || 44543,
                                fields: data === null || data === void 0 ? void 0 : data.fields,
                                description: data === null || data === void 0 ? void 0 : data.description,
                                author: {
                                    name: new Date(Date.now()).toUTCString(),
                                },
                            },
                        ],
                        username: "Lucifer's API",
                        avatar_url: "https://www.onlygfx.com/wp-content/uploads/2019/10/10-grunge-gothic-cross-10.png?width=468&height=468",
                    });
                };
                return Discord;
            }()),
            _Discord_webhook = new WeakMap(),
            _Discord_postWebhook = new WeakMap(),
            _a)();
        this.prefix = prefix;
        this.application = projectName;
    }
    Logger.convertToMessageGroup = function (loggerMessage) {
        if (typeof loggerMessage === "string") {
            loggerMessage = new MessageGroup_1.default().addMessage(loggerMessage, false);
        }
        else if (Array.isArray(loggerMessage)) {
            loggerMessage = new MessageGroup_1.default().addMessages(loggerMessage);
        }
        return loggerMessage;
    };
    Logger.formatTime = function (date) {
        var dateAsString = String("00" + (date.getMonth() + 1)).slice(-2) +
            "/" +
            ("00" + date.getDate()).slice(-2) +
            "/" +
            date.getFullYear() +
            " " +
            ("00" + date.getHours()).slice(-2) +
            ":" +
            ("00" + date.getMinutes()).slice(-2) +
            ":" +
            ("00" + date.getSeconds()).slice(-2);
        return ansi_colors_1.default.blackBright.bold("[".concat(dateAsString, "]"));
    };
    Logger.prototype.info = function (loggerMessage) {
        var _this = this;
        var messageGroup = Logger.convertToMessageGroup(loggerMessage);
        var formattedMode = ansi_colors_1.default.blue.bold("[INFO]");
        messageGroup.loopMessages(function (text) {
            var formattedText = ansi_colors_1.default.blue("".concat(text));
            console.log(Logger.formatTime(new Date()), _this.formatApplication(), _this.formatPrefix(), formattedMode, formattedText);
        });
    };
    Logger.prototype.warn = function (loggerMessage) {
        var _this = this;
        var messageGroup = Logger.convertToMessageGroup(loggerMessage);
        var formattedMode = ansi_colors_1.default.yellow.bold("[WARNING]");
        messageGroup.loopMessages(function (text) {
            var formattedText = ansi_colors_1.default.yellow("".concat(text));
            console.log(Logger.formatTime(new Date()), _this.formatApplication(), _this.formatPrefix(), formattedMode, formattedText);
        });
    };
    Logger.prototype.error = function (loggerMessage) {
        var _this = this;
        var messageGroup = Logger.convertToMessageGroup(loggerMessage);
        var formattedMode = ansi_colors_1.default.red.bold("[ERROR]");
        messageGroup.loopMessages(function (text) {
            var formattedText = ansi_colors_1.default.red("".concat(text));
            console.log(Logger.formatTime(new Date()), _this.formatApplication(), _this.formatPrefix(), formattedMode, formattedText);
        });
    };
    Logger.prototype.debug = function (loggerMessage) {
        var _this = this;
        if (process.env.DEVELOPMENT != "true")
            return;
        var messageGroup = Logger.convertToMessageGroup(loggerMessage);
        var formattedMode = ansi_colors_1.default.magenta.bold("[DEBUG]");
        messageGroup.loopMessages(function (text) {
            var formattedText = ansi_colors_1.default.magenta("".concat(text));
            console.log(Logger.formatTime(new Date()), _this.formatApplication(), _this.formatPrefix(), formattedMode, formattedText);
        });
    };
    Logger.prototype.success = function (loggerMessage) {
        var _this = this;
        var messageGroup = Logger.convertToMessageGroup(loggerMessage);
        var formattedMode = ansi_colors_1.default.green.bold("[SUCCESS]");
        messageGroup.loopMessages(function (text) {
            var formattedText = ansi_colors_1.default.green("".concat(text));
            console.log(Logger.formatTime(new Date()), _this.formatApplication(), _this.formatPrefix(), formattedMode, formattedText);
        });
    };
    Logger.prototype.formatPrefix = function () {
        return ansi_colors_1.default.cyanBright.bold("[".concat(this.prefix, "]"));
    };
    Logger.prototype.formatApplication = function () {
        return ansi_colors_1.default.greenBright.bold("[".concat(this.application, "]"));
    };
    return Logger;
}());
exports.default = Logger;
