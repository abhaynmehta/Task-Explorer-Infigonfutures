# Product Explorer Dashboard

A modern product catalog built with Next.js, TypeScript, and Tailwind CSS. Browse products from FakeStore API with real-time search, filtering, sorting, and favorites management.

## Overview

This application demonstrates a production-ready frontend implementation featuring:
- Server-side data fetching with Next.js App Router
- Client-side state management for filters and favorites
- Responsive design that works across all devices
- Dark mode support with persistent theme preference
- Error handling and loading states

## Features

**Core Functionality**
- Product listing with responsive grid layout
- Real-time search by product title
- Category filtering with dropdown selector
- Multi-criteria sorting (price, name, ascending/descending)
- Product detail pages with full information display
- Favorites system with localStorage persistence
- Dark/light mode toggle

**Technical Features**
- Server Components for optimal performance
- Dynamic routing for product pages
- Image optimization with Next.js Image
- Error boundaries and graceful error handling
- Loading skeletons for better UX
- Accessibility features (ARIA labels, keyboard navigation)

## Tech Stack

- **Framework**: Next.js 16.1.1 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **API**: FakeStore API (https://fakestoreapi.com)
- **Logging**: Winston (server-side), console (client-side)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/abhaynmehta/Task-Explorer-Infigonfutures.git
cd Task-Explorer-Infigonfutures

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── products/[id]/     # Dynamic product detail route
│   ├── page.tsx           # Home page (product listing)
│   ├── layout.tsx         # Root layout with header
│   ├── loading.tsx        # Loading state
│   ├── error.tsx          # Error boundary
│   └── not-found.tsx      # 404 page
├── components/            # React components
│   ├── ProductCard.tsx   # Individual product card
│   ├── ProductGrid.tsx   # Responsive grid layout
│   ├── ProductFilters.tsx # Search and filter controls
│   ├── ProductExplorer.tsx # Main container component
│   └── skeletons/         # Loading skeleton components
├── hooks/                 # Custom React hooks
│   └── useFavorites.ts   # Favorites management hook
├── lib/                   # Utility functions
│   ├── api.ts            # API fetching functions
│   ├── types.ts          # TypeScript type definitions
│   ├── logger.ts         # Server-side logging
│   └── theme.tsx         # Theme context provider
└── public/               # Static assets
```

## Usage

### Product Listing
- Browse all products in a responsive grid
- Use the search input to filter by product title
- Select a category from the dropdown to narrow results
- Choose sorting option (price or name, ascending/descending)
- Toggle "Show Favorites" to view only saved products

### Product Details
- Click any product card to view full details
- See product image, description, price, category, and rating
- Use the back button to return to the listing

### Favorites
- Click the star icon on any product card to add/remove favorites
- Favorites persist across browser sessions via localStorage
- Filter to show only favorites using the toggle button

### Dark Mode
- Click the theme toggle in the header to switch between light/dark modes
- Preference is saved and persists across sessions

## Deployment

This project is configured for Vercel deployment. The repository is connected to Vercel for automatic deployments on push to main branch.

**Manual Deployment:**
```bash
npm run build
npx vercel
```

## Implementation Details

**Data Fetching**
- Products are fetched server-side using Next.js Server Components
- API calls include retry logic for handling rate limits
- 60-second cache revalidation for optimal performance
- Dynamic rendering prevents build-time API failures

**State Management**
- Client-side filters managed with React useState
- Favorites stored in localStorage with hydration handling
- Theme preference persisted in localStorage

**Error Handling**
- Server-side error logging with Winston
- Client-side error boundaries for graceful failures
- User-friendly error messages for different failure scenarios

**Performance**
- Server Components reduce client bundle size
- Image optimization with Next.js Image component
- Memoized filtering and sorting operations
- Efficient re-renders with proper React hooks usage

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project was created as a technical assessment submission.

## Author

Abhay Mehta
