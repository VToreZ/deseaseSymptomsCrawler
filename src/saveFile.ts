import { appendFileSync, writeFileSync } from 'fs';

export function write(str: string) {
    writeFileSync('data.json', str, 'utf-8');
}

export function append(str: string) {
    appendFileSync('data.json', str);
}
