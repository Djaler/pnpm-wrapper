import { delegateToPnpm } from '@/delegate';
import { useVersion } from '@/use-version';

const args = process.argv.slice(2);

switch (args[0]) {
    case 'use': {
        const requiredVersion = args[1];
        useVersion(requiredVersion);
        break;
    }
    default: {
        delegateToPnpm(args);
        break;
    }
}
