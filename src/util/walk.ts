import fs from "fs";
import path from "path";

/*
 *
 * Source code from https://gist.github.com/lovasoa/8691344, edited for speed and typescript
 *
 */

export default function walk(dir: string) {
  return new Promise<string[]>((resolve, reject) => {
    fs.readdir(dir, (error, files) => {
      if (error) {
        return reject(error);
      }
      Promise.all(
        files.map((file) => {
          return new Promise((resolve, reject) => {
            const filepath = path.join(dir, file);
            fs.stat(filepath, (error, stats) => {
              if (error) {
                return reject(error);
              }
              if (stats.isDirectory()) {
                walk(filepath).then(resolve);
              } else if (stats.isFile()) {
                resolve(filepath);
              }
            });
          });
        })
      ).then((foldersContents) => {
        resolve(
          foldersContents.reduce(
            (all: string[], folderContents: any) => all.concat(folderContents),
            []
          )
        );
      });
    });
  });
}
