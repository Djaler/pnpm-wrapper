import semver from 'semver';

import { installPnpmIfNotInstalled } from '@/pnpm-manager';
import { writeVersion } from '@/version-manager';

export function useVersion(version: semver.SemVer | semver.Range) {
    const installedVersion = installPnpmIfNotInstalled(version);

    writeVersion(installedVersion);
}
