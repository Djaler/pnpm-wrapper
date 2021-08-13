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
    return new semver.Range(version);
}

function getVersionFromEngines() {
    if (!fs.existsSync(packageJsonFile)) {
        return null;
    }

    const packageJson = JSON.parse(fs.readFileSync(packageJsonFile, 'utf-8'));

    const enginesPnpm = packageJson.engines?.pnpm;
    if (!enginesPnpm) {
        return null;
    }

    return new semver.Range(enginesPnpm);
}

export function getRequiredVersion() {
    return getVersionFromFile()
        || getVersionFromEngines();
}

export function writeVersion(version: semver.SemVer) {
    fs.writeFileSync(versionFile, version.version);
}
