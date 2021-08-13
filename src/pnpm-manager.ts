import child_process from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';

import { copyDirectoryRecursive, removeDirectoryRecursive } from '@/utils/fs';
import { installPackage } from '@/utils/npm';

const wrappersDir = path.join(os.homedir(), '.pnpm-wrapper');

function installPnpm(requiredVersion: string) {
    const installDir = path.join(wrappersDir, 'tmp');
    installPackage('pnpm', requiredVersion, installDir);
    copyDirectoryRecursive(path.join(installDir, 'node_modules', 'pnpm'), path.join(wrappersDir, requiredVersion));
    removeDirectoryRecursive(installDir);
}

function isPnpmAlreadyInstalled(requiredVersion: string) {
    return fs.existsSync(path.join(wrappersDir, requiredVersion));
}

export function installPnpmIfNotInstalled(version: string) {
    if (!isPnpmAlreadyInstalled(version)) {
        installPnpm(version);
    } else {
        console.log('skip install');
    }
}

export function runPnpm(version: string, args: string[]) {
    const packageJson = JSON.parse(fs.readFileSync(path.join(wrappersDir, version, 'package.json'), 'utf-8'));
    const pnpmPath = path.join(wrappersDir, version, packageJson.bin.pnpm);

    child_process.fork(pnpmPath, args);
}
