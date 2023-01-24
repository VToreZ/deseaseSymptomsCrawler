import { appendFileSync, writeFileSync, mkdir, existsSync } from 'fs';
import {dirname} from "path";

export function write(fileName: string, str: string) {
    if (fileName == null) {
        throw new Error('fileName === undefined')
    }
    const folder = dirname(fileName);
    if(!existsSync(folder)){
        mkdir(folder, { recursive: true }, (err) => {
            if (err) throw err;
        });
    }
    writeFileSync(fileName, str, 'utf-8');
}

export function append(fileName: string, str: string) {
    if (fileName == null) {
        throw new Error('fileName === undefined')
    }
    appendFileSync(fileName, str);
}
