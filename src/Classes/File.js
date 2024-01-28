"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadJSONFile = void 0;
var fs_1 = require("fs");
function ReadJSONFile(filename) {
    var p = fs_1.default.readFileSync(filename);
    var x = JSON.parse(p.toString());
    return x;
}
exports.ReadJSONFile = ReadJSONFile;
