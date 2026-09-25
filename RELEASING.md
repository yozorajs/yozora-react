# Releasing

Use the local Changesets CLI. The 11 public packages form one fixed version group;
root and `@yozora/demo` are private and are neither versioned nor tagged.
Automatic Changesets commits are disabled. Publishing runs locally; CI only validates.
`verifyDepsBeforeRun: false` prevents pnpm run/exec from installing dependencies
and running install hooks implicitly. Install dependencies explicitly before release preparation.

The current prepared candidate is `3.0.0-alpha.26`. It has already been versioned:
do not run `version` again for this candidate. The processed changeset is retained
in `.changeset/pre/` for the eventual stable release.

## Prepare the next candidate

1. Start from a clean worktree and select the bump with the release owner. Add a
   changeset describing consumer-visible changes. Keep alpha prerelease mode
   enabled in `.changeset/pre.json`; use `changeset pre enter alpha` only when
   starting a new prerelease cycle, never `npm version patch`.
2. Inspect and save the Changesets plan outside the repository, together with each
   package's current manifest version and release baseline:

   ```sh
   pnpm exec changeset status --output /path/to/release/status.json
   pnpm run :version
   ```

   The version script updates manifests, changelogs and versioned README/source
   links without installing dependencies or staging files. Internal dependencies
   stay as `workspace:^`; pnpm converts them during packing. Review private-package
   changes and the lockfile. Version-only edits do not change workspace link entries.
3. Update the root release notes, migration examples and known limitations. Use
   package tags such as `@yozora/react-yozora@3.0.0-alpha.26` in versioned URLs.
   Validate their target paths locally before creating tags.
4. Run lint, typecheck and coverage checks. Build production output last if an
   ordinary build was also needed, then validate the exact output to be packed:

   ```sh
   pnpm lint
   pnpm typecheck
   pnpm test:coverage
   pnpm build:production
   pnpm test:dist
   ```

## Review and freeze

Inspect npm authentication, versions and dist-tags without reading credentials.
Export the actual registry-based plan separately from the version plan:

```sh
pnpm exec changeset publish-plan --output /path/to/release/publish-plan.json
```

Check that it contains exactly the approved package/version pairs, each with
`kind: publish`, `access: public` and `tag: alpha`, and uses the intended registry
(`https://registry.npmjs.org/` for this release). Stop on extra packages, tag
mismatches or failed registry queries. Changesets can choose `latest` for some
prerelease histories, so prerelease mode alone is not sufficient proof of the tag.

Before approval, a preview pack may be inspected for contents and dependency ranges.
After explicit approval of commit, branch push, publish and release tags, make one
release commit on `main` and record its OID. Keep HEAD and the worktree fixed from
this point through registry verification and tagging. Pack from that commit:

```sh
pnpm exec changeset pack --from-publish-plan /path/to/release/publish-plan.json --out-dir /path/to/release/frozen
```

Inspect every tarball's manifests, entry points, CSS, declarations, licenses and
versioned links. For this candidate, packed internal dependencies must be
`^3.0.0-alpha.26`. Record the release OID and tarball SHA-256 checksums. Recheck that
packing did not alter source files. Publish these exact tarballs without rebuilding.

## Publish and verify

Dry-run and then push only the approved `main:main` refspec to `origin`, using
`--no-follow-tags`. Recheck the frozen checksums, HEAD, worktree, registry versions
and planned Git tags. Publish the frozen directory:

```sh
pnpm run :publish:all /path/to/release/frozen
```

The script requires an artifact directory and disables automatic Git tags. Access
and dist-tag come from the saved artifact plan; do not add `--tag` overrides.
If npm requires OTP, enter it directly in the designated terminal without echoing
or saving it, and pass it to Changesets through `--otp`. Never put OTP in chat.

Verify every target version and its `alpha` dist-tag, compare registry tarball
checksums to the frozen files, and verify `gitHead` when provided. Existing
`latest` tags should remain unchanged. Only after all packages pass verification,
create annotated `@yozora/<package>@3.0.0-alpha.26` tags at the release OID. Check
for existing/conflicting tags, then dry-run and push only the exact approved tag
refspecs with `--no-follow-tags`. Verify remote refs and versioned links.

If publishing partly succeeds, preserve the original plan and tarballs. Reconcile
registry state and save a recovery plan containing only the unpublished packages
with their original files and checksums. Do not re-version, re-commit or rerun the
entire batch. A stable release needs a separate version/tag decision and resolution
of the documented MathJax type limitation and browser-validation gaps.
