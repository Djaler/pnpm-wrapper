import child_process from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';
import semver from 'semver';

import { copyDirectoryRecursive, listSubdirectories, removeDirectoryRecursive } from '@/utils/fs';
import { installPackage } from '@/utils/npm';

const wrappersDir = path.join(os.homedir(), '.pnpm-wrapper');

function installPnpm(version: semver.SemVer | semver.Range) {
    const installDir = path.join(wrappersDir, 'tmp');
    installPackage('pnpm', version, installDir);

    const packageJson = JSON.parse(fs.readFileSync(path.join(installDir, 'node_modules', 'pnpm', 'package.json'), 'utf-8'));
    const installedVersion = packageJson.version as string;

    copyDirectoryRecursive(path.join(installDir, 'node_modules', 'pnpm'), path.join(wrappersDir, installedVersion));
    removeDirectoryRecursive(installDir);

    return new semver.SemVer(installedVersion);
}

function findInstalledPnpmVersion(requiredVersion: semver.SemVer | semver.Range) {
    const installedVersions = listSubdirectories(wrappersDir).map(dir => dir.name);

    if (requiredVersion instanceof semver.Range) {
        return semver.parse(
            semver.maxSatisfying(installedVersions, requiredVersion),
        );
    }
    return semver.parse(
        installedVersions.find(version => version === requiredVersion.version),
    );
}

export function installPnpmIfNotInstalled(version: semver.SemVer | semver.Range) {
    return findInstalledPnpmVersion(version) || installPnpm(version);
}

export function runPnpm(version: semver.SemVer, args: string[]) {
    const packageJson = JSON.parse(fs.readFileSync(path.join(wrappersDir, version.version, 'package.json'), 'utf-8'));
    const pnpmPath = path.join(wrappersDir, version.version, packageJson.bin.pnpm);

    child_process.fork(pnpmPath, args);
}
