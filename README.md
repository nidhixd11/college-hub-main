# College Hub — CMIS

A modern, responsive college management interface built with React, TypeScript and Tailwind CSS. This project—College Management Information System (CMIS)-is a polished admin dashboard template that includes user authentication screens, dashboards, fees and course management, and a library of reusable UI primitives.

Live features
- Authentication flow and UI: [`Auth`](src/pages/Auth.tsx)
- Dashboard overview with stats: [`Dashboard`](src/pages/Dashboard.tsx)
- Fees management with payments table and tabs: [`Fees`](src/pages/Fees.tsx)
- Courses CRUD UI patterns: [`Courses`](src/pages/Courses.tsx)
- Reusable UI components in: [`src/components/ui`](src/components/ui) (toasts, dialogs, tabs, sidebar, charts, etc.)
- Mocked demo data: [`src/data/mockData.ts`](src/data/mockData.ts)
- Lightweight hooks: [`src/hooks/use-toast.tsx`](src/hooks/use-toast.tsx), [`src/hooks/use-mobile.tsx`](src/hooks/use-mobile.tsx)

Quick links
- Project root: [package.json](package.json)
- Dev tooling: [vite.config.ts](vite.config.ts), [tsconfig.json](tsconfig.json)
- UI primitives entry: [`src/components/ui`](src/components/ui)
- Styles & tokens: [`src/index.css`](src/index.css), [`tailwind.config.ts`](tailwind.config.ts)

Tech stack
- Frontend: React + TypeScript
- Styling: Tailwind CSS
- Bundler: Vite
- Icons: lucide-react
- UI primitives: Radix + custom components
- Toasts: sonner (used in [`Auth`](src/pages/Auth.tsx) and [`src/components/ui/toaster.tsx`](src/components/ui/toaster.tsx))

Getting started

1. Install dependencies
```sh
# Node / npm
npm install
```