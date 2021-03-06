import semver from 'semver';

import { installPnpmIfNotInstalled, runPnpm } from '@/pnpm-manager';
import { getLatestPackageVersion } from '@/utils/npm';
import { getRequiredVersion, writeVersion } from '@/version-manager';

export function delegateToPnpm(args: string[]) {
    let version: semver.SemVer | semver.Range | null = getRequiredVersion();
    if (!version) {
        version = getLatestPackageVersion('pnpm');
        writeVersion(version);
    }

    const installedVersion = installPnpmIfNotInstalled(version);

    runPnpm(installedVersion, args);
}
