# Deployment to Google Cloud Platform #

This document describes the automated deployment processes that have been setup in the
repository.

## Github Actions ##

CI/CD operations are run by Github Actions. The workflow manifests are stored in the [.github/workflows/](.github/workflows/) folder.

### Workflows ###

| Workflow File | Trigger Action(s) | Trigger Branch(es) | Expected Outcome |
| --- | --- | --- | --- |
| [.github/workflows/dev-pull-request.yaml](.github/workflows/dev-pull-request.yaml) | Pull [ Open, Sync, Reopen, Close ] | `develop` | All action types except _Close_ build and deploy a version of the service named/tagged with the name of the branch being compared to the trigger branch without directing traffic to the version. A comment will be added to the PR with a URL where the version can be accessed for preview prior to merge.<br>The _Close_ action type will delete the PR preview version. |
| [.github/workflows/dev-push.yaml](.github/workflows/dev-push.yaml) | Push | `develop` | Builds and deploys the service to the development instance. |
