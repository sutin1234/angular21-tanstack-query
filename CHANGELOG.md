# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2026-01-04

### Added
- **User Management System**:
  - User List component with grid view and sorting capabilities.
  - User Detail component for individual user profiles.
  - User Service with TanStack Query integration for state management.
- **UI/UX Enhancements**:
  - Modern, responsive design using custom CSS variables and glassmorphism.
  - Interactive animations for loading states and route transitions.
  - Client-side sorting toggle (A-Z).
- **Project Infrastructure**:
  - Angular 21 setup with Standalone components.
  - TanStack Angular Query (Experimental) integration.
  - TailwindCSS support (configured via PostCSS).
- **Documentation**:
  - Added comprehensive `README.md` with features, tech stack, and project structure.
  - Added application screenshot.

### Changed
- Updated `app.config.ts` to include TanStack Query providers.
- Updated `app.routes.ts` to include routes for `/users` and `/users/:id`.
