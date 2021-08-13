import fs from 'fs';
import path from 'path';

export function removeDirectoryRecursive(dir: string) {
    for (const entry of fs.readdirSync(dir)) {
        const entryPath = path.join(dir, entry);
        let stats;
        try {
            stats = fs.lstatSync(entryPath);
        } catch (e) {
            continue; // Guard against https://github.com/nodejs/node/issues/4760
        }
        if (stats.isDirectory()) {
            removeDirectoryRecursive(entryPath);
        } else {
            fs.unlinkSync(entryPath);
        }
    }
    fs.rmdirSync(dir);
}

export function copyDirectoryRecursive(src: string, dest: string) {
    fs.mkdirSync(dest, { recursive: true });
    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            copyDirectoryRecursive(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}
