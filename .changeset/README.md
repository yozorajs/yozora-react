# Changesets

The 11 public packages form one fixed version group. Root and demo packages are
private and are neither versioned nor tagged. Automatic commits are disabled.

Keep prerelease mode on `alpha` until a stable release is approved. Add changesets
with the agreed bump, inspect `pnpm exec changeset status`, and version once.
Processed alpha changesets remain in `pre/` for the eventual stable changelog.

See [RELEASING.md](../RELEASING.md) for versioning, artifact publishing and recovery.
