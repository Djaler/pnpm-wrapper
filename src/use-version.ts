import { installPnpmIfNotInstalled } from '@/pnpm-manager';
import { writeVersion } from '@/version-manager';

export function useVersion(version: string) {
    writeVersion(version);

    installPnpmIfNotInstalled(version);
}
