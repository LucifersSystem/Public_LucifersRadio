//THIS IS A SECURITY CHECK FILE CONTAINING FUNCTIONS TO CHECK FOR ILLEGAL CHARS, RULE INPUTS.
// @ts-ignore

import dotEnv from "dotenv";
import ansiColors from "ansi-colors";
import {all} from "axios";
import Logger from "../Classes/Logger.js";
// @ts-ignore
const Illegal = ["/", "'\'", "@", "-", "=", "+", "*", "%", "!", "~", "'", "`", "$", ".", "(", ")", ";"];
const Illegal_words = ["console", "window", "process", "global", "require", "exports", "module", "system", "sys", "insert", "update", "remove", "get", "set"];
const logger = new Logger("SECURITY");
export function IL_CHAR(data:string){ // Checks for illegal/unexpected chars
    let B = [];
    let A = [];
    var x = 0;
    let M = "";
    if(data != undefined) {
        try {
            if(data.length >= 90){
                logger.info("Length to long to be valid, assuming illegal")
                return true;
            }
            M = data;
            for (var j = 0; j <= data.length; j++) {
                var n = data.charAt(j);
                if (Illegal.includes(n)) {

                    B.push(n);
                    A.push(j);
                    var K = M;
                    var color = ansiColors;
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
                        var color = ansiColors;
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
            } else {
                // @ts-ignore
                logger.error("ILLEGAL STRING: " + color.bgGreen(color.red(M)));
                logger.info("MODIFIED ILLEGAL STRING: " + M);
                return true;
            }
        } catch (err) {
            console.log(err);
            return true;
        }

    }else{
        logger.error("DATA UNDEFINED: " + data);
        logger.discord.info("DATA UNDEFINED: " + data);
        return true;
    }
}

export function DISC_RULE(data:string){ //Discord ID Length Check
    try {
        if (!IL_CHAR(data) && data?.length >= 17 && data?.length << 20) {
            logger.debug("'DISC RULE' PASSED");
            return true;
        } else {

            return false;
        }
    }catch (err){
        logger.error("'DISC RULE' FAILED");
        return false;
    }
}

