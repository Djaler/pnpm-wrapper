[![npm](https://img.shields.io/npm/v/pnpm-wrapper?style=for-the-badge)](https://www.npmjs.com/package/pnpm-wrapper)

# pnpm wrapper

> A tool to manage pnpm version for different projects.

## Why?

Because developers may have different pnpm versions installed, but your project may depend on specific version.

## Install

```sh
npm install --global pnpm-wrapper
```

## Usage

### Use pnpm for project

Just use `pnpm-wrapper` (or `pnpmw`) in place of `pnpm`. E.g., install dependencies via:

```sh
pnpm-wrapper install
```

Here is a list of sources to infer required `pnpm` version (in descending order of priority):
1. `pnpm.version` file;
2. `engines.pnpm` entry from `package.json`.

If version not found in all sources then latest `pnpm` version will be used. You can change it later in `pnpm.version`.

The inferred version of `pnpm` will be installed into the `~/.pnpm-wrapper` directory, or reused if already present.

### Set version for project

You can also set (or update) required pnpm version for project manually.

```sh
pnpm-wrapper use 6.13.0 # use specific version
```
```sh
pnpm-wrapper use ^6.0.0 # use semver range
```

This command will install pnpm for provided version (if not installed yet) and save that version in `pnpm.version` file.
