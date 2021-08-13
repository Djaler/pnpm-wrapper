import child_process from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';
import semver from 'semver';

import { copyDirectoryRecursive, listSubdirectories, removeDirectoryRecursive } from '@/utils/fs';
import { installPackage } from '@/utils/npm';

const wrappersDir = path.join(os.homedir(), '.pnpm-wrapper');

function installPnpm(requiredVersion: string) {
    const installDir = path.join(wrappersDir, 'tmp');
    installPackage('pnpm', requiredVersion, installDir);

    const packageJson = JSON.parse(fs.readFileSync(path.join(installDir, 'node_modules', 'pnpm', 'package.json'), 'utf-8'));
    const installedVersion = packageJson.version as string;

    copyDirectoryRecursive(path.join(installDir, 'node_modules', 'pnpm'), path.join(wrappersDir, installedVersion));
    removeDirectoryRecursive(installDir);

    return installedVersion;
}

function findInstalledPnpmVersion(requiredVersion: string) {
    const installedVersions = listSubdirectories(wrappersDir).map(dir => dir.name);
    return semver.maxSatisfying(installedVersions, requiredVersion);
}

export function installPnpmIfNotInstalled(version: string) {
    return findInstalledPnpmVersion(version) || installPnpm(version);
}

export function runPnpm(version: string, args: string[]) {
    const packageJson = JSON.parse(fs.readFileSync(path.join(wrappersDir, version, 'package.json'), 'utf-8'));
    const pnpmPath = path.join(wrappersDir, version, packageJson.bin.pnpm);

    child_process.fork(pnpmPath, args);
}
