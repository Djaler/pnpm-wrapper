import child_process from 'child_process';
import fs from 'fs';
import path from 'path';

export function installPackage(name: string, version: string, installDir: string) {
    fs.mkdirSync(installDir, { recursive: true });
    fs.writeFileSync(path.join(installDir, 'package.json'), '{}');

    child_process.execSync(`npm install --loglevel=error --prefer-offline --no-audit --progress=false ${name}@${version}`, {
        cwd: installDir,
        stdio: 'pipe',
        env: process.env,
    });
}

export function getLatestPackageVersion(name: string) {
    const latestVersion = child_process.execSync(`npm show ${name} version`, {
        encoding: 'utf-8',
    });
    return latestVersion.trim();
}
