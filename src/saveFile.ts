import { appendFileSync, writeFileSync } from 'fs';

export function write(fileName: string, str: string) {
    if (fileName == null) {
        throw new Error('fileName === undefined')
    }
    writeFileSync(fileName, str, 'utf-8');
}

export function append(fileName: string, str: string) {
    if (fileName == null) {
        throw new Error('fileName === undefined')
    }
    appendFileSync(fileName, str);
}
