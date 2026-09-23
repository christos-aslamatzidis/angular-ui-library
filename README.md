# RndAngular

An Angular 22 workspace with two projects:

- **[`projects/rnd-ui-lib`](./projects/rnd-ui-lib)** — the actual deliverable: a publishable, Tailwind-styled UI component library implementing a dark "Bitcoin DeFi" design system. **See [`projects/rnd-ui-lib/README.md`](./projects/rnd-ui-lib/README.md) for library installation, usage, theming, and full per-component documentation.**
- **`projects/consumer-app`** — an SSR demo app that dogfoods the library; every component has a live example under `/components/*`.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.1.8.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

This is a multi-project workspace, so `ng build`/`ng test` need a project name (or run `npm run build`/`npm run build:lib`, which already target the right project — see `package.json`):

```bash
ng build consumer-app   # the demo app
ng build rnd-ui-lib     # the library — prefer `npm run build:lib`, see below
```

Build artifacts land in `dist/<project-name>/`. For the library specifically, `npm run build:lib` is required (not just `ng build rnd-ui-lib`) — it also generates the Tailwind CSS output; see [`projects/rnd-ui-lib/README.md`](./projects/rnd-ui-lib/README.md#development) for why.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test consumer-app --watch=false
ng test rnd-ui-lib --watch=false
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
