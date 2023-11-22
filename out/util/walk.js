"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
/*
 *
 * Source code from https://gist.github.com/lovasoa/8691344, edited for speed and typescript
 *
 */
function walk(dir) {
    return new Promise(function (resolve, reject) {
        fs_1.default.readdir(dir, function (error, files) {
            if (error) {
                return reject(error);
            }
            Promise.all(files.map(function (file) {
                return new Promise(function (resolve, reject) {
                    var filepath = path_1.default.join(dir, file);
                    fs_1.default.stat(filepath, function (error, stats) {
                        if (error) {
                            return reject(error);
                        }
                        if (stats.isDirectory()) {
                            walk(filepath).then(resolve);
                        }
                        else if (stats.isFile()) {
                            resolve(filepath);
                        }
                    });
                });
            })).then(function (foldersContents) {
                resolve(foldersContents.reduce(function (all, folderContents) { return all.concat(folderContents); }, []));
            });
        });
    });
}
exports.default = walk;
