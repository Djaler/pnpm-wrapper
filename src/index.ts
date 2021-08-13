import { delegateToPnpm } from '@/delegate';
import { useVersion } from '@/use-version';
import { isVersionValid } from '@/version-manager';

const args = process.argv.slice(2);

switch (args[0]) {
    case 'use': {
        const requiredVersion = args[1];
        if (!isVersionValid(requiredVersion)) {
            throw new Error(`"${requiredVersion}" is not a valid version`);
        }
        useVersion(requiredVersion);
        break;
    }
    default: {
        delegateToPnpm(args);
        break;
    }
}
