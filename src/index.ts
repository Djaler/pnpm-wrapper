import semver from 'semver';

import { delegateToPnpm } from '@/delegate';
import { useVersion } from '@/use-version';

const args = process.argv.slice(2);

switch (args[0]) {
    case 'use': {
        useVersion(new semver.Range(args[1]));
        break;
    }
    default: {
        delegateToPnpm(args);
        break;
    }
}
