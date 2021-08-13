import child_process from 'child_process';
import fs from 'fs';
import path from 'path';
import semver from 'semver';

export function installPackage(name: string, version: semver.SemVer, installDir: string) {
    fs.mkdirSync(installDir, { recursive: true });
    fs.writeFileSync(path.join(installDir, 'package.json'), '{}');

    child_process.execSync(`npm install --loglevel=error --prefer-offline --no-audit --progress=false ${name}@${version.version}`, {
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

function getPackageVersions(name: string) {
    const versionsJson = child_process.execSync(`npm show ${name} versions --json`, {
        encoding: 'utf-8',
    });

    return JSON.parse(versionsJson) as string[];
}

export function getMaxPackageVersionForRange(name: string, range: semver.Range) {
    const versions = getPackageVersions(name);

    return semver.parse(
        semver.maxSatisfying(versions, range),
    );
}

export function getMaxPackageVersionForRangeOrThrow(name: string, range: semver.Range) {
    const version = getMaxPackageVersionForRange(name, range);

    if (!version) {
        throw new Error(`No ${name} versions found for package range ${range.range}`);
    }

    return version;
}
