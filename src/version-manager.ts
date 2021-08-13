import fs from 'fs';
import path from 'path';
import semver from 'semver';

const versionFile = path.join(process.cwd(), 'pnpm.version');
const packageJsonFile = path.join(process.cwd(), 'package.json');

function getVersionFromFile() {
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

function getVersionFromEngines() {
    if (!fs.existsSync(packageJsonFile)) {
        return null;
    }

    const packageJson = JSON.parse(fs.readFileSync(packageJsonFile, 'utf-8'));

    return (packageJson.engines?.pnpm ?? null) as string | null;
}

export function getRequiredVersion() {
    return getVersionFromFile()
        || getVersionFromEngines();
}

export function writeVersion(version: string) {
    fs.writeFileSync(versionFile, version);
}

export function isVersionValid(version: string) {
    return semver.validRange(version) !== null;
}
