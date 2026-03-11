# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Modern standalone Angular 21 application using signals, Vite/esbuild build system, Tailwind CSS 4, and Vitest for testing. No NgModules — uses standalone component architecture with `bootstrapApplication()`.

## Commands

- **Dev server**: `npm start` (serves at http://localhost:4200/)
- **Build**: `npm run build` (production output to `dist/`)
- **Watch build**: `npm run watch`
- **Run all tests**: `npm test` (Vitest via Angular CLI)
- **Run single test**: `npx ng test --include src/app/path-to.spec.ts`

## Architecture

- **Entry point**: `src/main.ts` → bootstraps `App` component with `appConfig`
- **App config**: `src/app/app.config.ts` — provides router and global error listeners
- **Routing**: `src/app/app.routes.ts` — route definitions; `app.html` contains `<router-outlet />`
- **Component prefix**: `app` (enforced in `angular.json`)
- **State management**: Angular signals (`signal()`, `computed()`) for reactive state; services use `providedIn: 'root'` for singleton injection
- **Styling**: Tailwind CSS 4 via PostCSS; global styles in `src/styles.css`

## Code Conventions

- **Strict TypeScript**: `strict`, `noImplicitOverride`, `noImplicitReturns`, `noFallthroughCasesInSwitch`
- **Strict Angular templates**: `strictTemplates`, `strictInjectionParameters`, `strictInputAccessModifiers`
- **Formatting**: Prettier (100 char width, single quotes, 2-space indent); HTML files use the `angular` parser (see `.prettierrc`)
- **Component files**: Separate `.ts`, `.html`, `.css` files per component (not inline); component class files are named `feature.ts` (not `feature.component.ts`)
- **Dependency injection**: Use `inject()` function, not constructor injection
- **Testing**: Vitest with Angular TestBed; spec files colocated as `*.spec.ts`

## Bundle Budgets

- Initial bundle: warn at 500kB, error at 1MB
- Component styles: warn at 4kB, error at 8kB
