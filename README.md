# ten-days-in-istanbul

A tiny, mission-based Turkish survival panel for a short stay in Istanbul.

Built from the layout ideas of `esponyol-inator`, but organized around real tasks rather than a general language curriculum.

## Live site

GitHub Pages: https://aeirya.github.io/ten-days-in-istanbul/

Deployments run from `.github/workflows/pages.yml` on pushes to `master`.

## KMANWeb CI

The repository has an opt-in `.github/workflows/kmanweb-ci.yml` workflow for a dedicated repository-level KMANWeb runner.

Expected runner labels:

```text
self-hosted
kmanweb
docker
ten-days-in-istanbul
```

Because this is a public repository, the self-hosted workflow is deliberately `workflow_dispatch`-only and does not execute fork pull-request code. The normal GitHub Pages workflow stays on GitHub-hosted runners until a repository-scoped KMANWeb runner is registered and verified.

The existing `ojs-inator` organization runner pool cannot be assigned directly to this personal `aeirya` repository; GitHub scopes organization runners to repositories in that organization. A repository-level runner must therefore be registered specifically for `aeirya/ten-days-in-istanbul` (or the repository must move into the organization).

## MVP missions

- Get home from the airport
- Buy groceries
- Order and explore food
- Navigate Istanbul
- Get a MacBook repaired

## Run locally

This is a zero-dependency static site. From the repository root:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

The phrase data lives in `config/missions.json` and can be edited without touching the UI code.
