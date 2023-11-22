"use strict";
//THIS IS A SECURITY CHECK FILE CONTAINING FUNCTIONS TO CHECK FOR ILLEGAL CHARS, RULE INPUTS.
// @ts-ignore
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DISC_RULE = exports.IL_CHAR = void 0;
var ansi_colors_1 = __importDefault(require("ansi-colors"));
var Logger_js_1 = __importDefault(require("../Classes/Logger.js"));
// @ts-ignore
var Illegal = ["/", "'\'", "@", "-", "=", "+", "*", "%", "!", "~", "'", "`", "$", ".", "(", ")", ";"];
var Illegal_words = ["console", "window", "process", "global", "require", "exports", "module", "system", "sys", "insert", "update", "remove", "get", "set"];
var logger = new Logger_js_1.default("SECURITY");
function IL_CHAR(data) {
    var B = [];
    var A = [];
    var x = 0;
    var M = "";
    if (data != undefined) {
        try {
            if (data.length >= 90) {
                logger.info("Length to long to be valid, assuming illegal");
                return true;
            }
            M = data;
            for (var j = 0; j <= data.length; j++) {
                var n = data.charAt(j);
                if (Illegal.includes(n)) {
                    B.push(n);
                    A.push(j);
                    var K = M;
                    var color = ansi_colors_1.default;
                    logger.error(color.bgGreen("Illegal Char: " + color.bgRed(n) + ": As Position: " + color.bold(String(j))));
                    logger.info("Illegal Char: " + n + ": As Position: " + String(j));
                    M = K.replace(n, color.bgBlue("{#P" + j + "}"));
                    // @ts-ignore
                }
            }
            for (j = 0; j <= Illegal_words.length; j++) {
                if (data.toUpperCase() == undefined) {
                    console.log("Undefined to lowercase");
                    console.log("data: " + data);
                }
                {
                    if (data.includes(Illegal_words[j])) {
                        var N = data.indexOf(Illegal_words[j]);
                        B.push(N);
                        A.push(Illegal_words[j]);
                        var K = M;
                        var color = ansi_colors_1.default;
                        logger.error(color.bgGreen("Illegal Word: " + color.bgRed(Illegal_words[j]) + ": As Position: " + color.bold(String(N))));
                        logger.info("Illegal Word: " + Illegal_words[j] + ": As Position: " + String(N));
                        M = K.replace(Illegal_words[j], color.bgBlue("{#P" + B.indexOf(N) + "}"));
                        // @ts-ignore
                    }
                }
            }
            // @ts-ignore
            if (B.length === 0) {
                logger.debug("FILTER PASSED: " + data);
                return false;
            }
            else {
                // @ts-ignore
                logger.error("ILLEGAL STRING: " + color.bgGreen(color.red(M)));
                logger.info("MODIFIED ILLEGAL STRING: " + M);
                return true;
            }
        }
        catch (err) {
            console.log(err);
            return true;
        }
    }
    else {
        logger.error("DATA UNDEFINED: " + data);
        logger.discord.info("DATA UNDEFINED: " + data);
        return true;
    }
}
exports.IL_CHAR = IL_CHAR;
function DISC_RULE(data) {
    try {
        if (!IL_CHAR(data) && (data === null || data === void 0 ? void 0 : data.length) >= 17 && (data === null || data === void 0 ? void 0 : data.length) << 20) {
            logger.debug("'DISC RULE' PASSED");
            return true;
        }
        else {
            return false;
        }
    }
    catch (err) {
        logger.error("'DISC RULE' FAILED");
        return false;
    }
}
exports.DISC_RULE = DISC_RULE;
