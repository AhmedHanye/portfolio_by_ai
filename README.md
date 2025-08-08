# Ahmed — Portfolio

A responsive developer portfolio built with Next.js (App Router), Tailwind CSS v4, GSAP, and Spline.

## Features

- Spline 3D hero with subtle GSAP intro
- Scroll-triggered section reveals
- Responsive layout and mobile nav
- Accessible, prefers-reduced-motion friendly

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Customize

- Update text in components inside `app/components/*`.
- Replace the Spline scene URL in `app/components/Hero.tsx`.
- Edit metadata in `app/layout.tsx`.
- Add your projects in `app/components/Projects.tsx`.
- Set your email and social links in `app/components/Contact.tsx`.

## Build

```bash
npm run build && npm start
```

## Deploy

Any platform that supports Next.js (Vercel recommended).
