import child_process from 'child_process';
import fs from 'fs';
import path from 'path';
import semver from 'semver';

export function installPackage(name: string, version: semver.SemVer | semver.Range, installDir: string) {
    fs.mkdirSync(installDir, { recursive: true });
    fs.writeFileSync(path.join(installDir, 'package.json'), '{}');

    child_process.execSync(`npm install --loglevel=error --prefer-offline --no-audit --progress=false ${name}@${version.toString()}`, {
        cwd: installDir,
        stdio: 'pipe',
        env: process.env,
    });
}

export function getLatestPackageVersion(name: string): semver.SemVer {
    const latestVersion = child_process.execSync(`npm show ${name} version`, {
        encoding: 'utf-8',
    });
    return new semver.SemVer(latestVersion);
}
