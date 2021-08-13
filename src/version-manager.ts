import fs from 'fs';
import path from 'path';
import semver from 'semver';

const versionFile = path.join(process.cwd(), 'pnpm.version');

export function getRequiredVersion() {
    if (!fs.existsSync(versionFile)) {
        return null;
    }

    let version = fs.readFileSync(versionFile, 'utf-8');
    version = version.trim();
    if (!isVersionValid(version)) {
        throw new Error(`Expected a valid version in pnpm.version, got "${version}" instead`);
    }
    return version;
}

export function writeVersion(version: string) {
    fs.writeFileSync(versionFile, version);
}

export function isVersionValid(version: string) {
    return semver.validRange(version) !== null;
}
