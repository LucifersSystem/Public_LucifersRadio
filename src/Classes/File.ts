import fs, {readFileSync} from "fs";

export function ReadJSONFile(filename:string){
    let p = fs.readFileSync(filename);
    let x = JSON.parse(p.toString());
    return x;

}