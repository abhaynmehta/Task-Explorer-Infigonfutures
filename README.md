# Product Explorer Dashboard

A product catalog application built with Next.js, TypeScript, and Tailwind CSS. Browse products from FakeStore API with search, filtering, and favorites functionality.

## Features

- Product listing with responsive grid layout
- Search products by title
- Filter by category
- Sort by price (low to high, high to low) or name (A-Z, Z-A)
- Product detail pages with full information
- Favorites system with localStorage persistence
- Dark mode toggle
- Responsive design (mobile, tablet, desktop)
- Loading states and error handling

## Tech Stack

- Next.js 16.1.1 (App Router)
- TypeScript
- Tailwind CSS v4
- FakeStore API

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Deployment

This project is configured for Vercel deployment. Connect your GitHub repository to Vercel for automatic deployments.

## Notes

- Products are fetched from FakeStore API with 60-second cache revalidation
- Favorites are stored in localStorage and persist across sessions
- Images are optimized using Next.js Image component
