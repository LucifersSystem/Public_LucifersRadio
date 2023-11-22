"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadJSONFile = void 0;
var fs_1 = __importDefault(require("fs"));
function ReadJSONFile(filename) {
    var p = fs_1.default.readFileSync(filename);
    var x = JSON.parse(p.toString());
    return x;
}
exports.ReadJSONFile = ReadJSONFile;
