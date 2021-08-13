import { installPnpmIfNotInstalled, runPnpm } from '@/pnpm-manager';
import { getLatestPackageVersion } from '@/utils/npm';
import { getRequiredVersion, writeVersion } from '@/version-manager';

export function delegateToPnpm(args: string[]) {
    let version = getRequiredVersion();
    if (!version) {
        version = getLatestPackageVersion('pnpm');
        writeVersion(version);
    }

    console.log(`used version - ${version}`);

    installPnpmIfNotInstalled(version);

    runPnpm(version, args);
}
