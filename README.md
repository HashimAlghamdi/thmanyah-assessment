# Thmanyah Assessment - Podcast Search App

A podcast search application with Arabic RTL support, built with Next.js frontend and Fastify backend.

## Features

- 🔍 **URL-Based Search**: Search queries are stored in URL parameters for bookmarkable searches
- 📱 **Responsive Design**: Mobile-first approach with collapsible sidebar
- 🌐 **RTL Support**: Full Arabic text support with proper RTL layout
- ⚡ **SSR Compliant**: Server-side rendering ready with proper Suspense boundaries
- 🎨 **Modern UI**: Clean design with hover effects and animations
- 🏠 **Smart Homepage**: Shows empty state when no search, search results when searching

## Tech Stack

### Frontend
- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- React Context API

### Backend  
- Fastify
- Prisma ORM
- iTunes API integration
- TypeScript

## Setup Instructions

### Prerequisites
- Node.js 18+
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Setup database:
```bash
npx prisma generate
npx prisma db push
```

4. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:3001`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file (optional):
```bash
# Create .env.local file with:
NEXT_PUBLIC_API_URL=http://localhost:3001
```

4. Start the frontend development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Search
- **POST** `/search`
- **Body**: `{ "term": "search query" }`
- **Response**: Array of podcast objects

## Project Structure

```
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   └── search.ts
│   │   ├── plugins/
│   │   ├── server.ts
│   │   └── index.ts
│   └── prisma/
├── frontend/
│   └── src/
│       └── app/
│           ├── components/
│           │   ├── TopPodcasts.tsx (handles both homepage and search results)
│           │   ├── HomeContent.tsx (manages URL params and content flow)
│           │   └── SearchInput.tsx (URL-driven search)
│           ├── contexts/
│           ├── lib/
│           └── page.tsx
└── README.md
```

## Search Flow

The search functionality follows this flow:

### Homepage (No Search)
- Shows empty state: "ابحث عن شيء لرؤية النتائج"
- TopEpisodes component always visible
- URL: `http://localhost:3000/`

### Search Active
- User types in search bar
- URL updates with query parameter: `http://localhost:3000/?q=search-term`
- TopPodcasts component displays search results
- Custom title: "نتائج البحث عن 'search-term'"
- Loading, error, and empty states handled within TopPodcasts
- TopEpisodes component remains visible below search results

### Key Features:
- **Debounced Search**: 500ms delay before URL update
- **URL Persistence**: Search queries are bookmarkable and shareable
- **Loading States**: Visual feedback during search
- **Error Handling**: User-friendly error messages in Arabic
- **Empty States**: Both homepage and no-results states
- **Responsive**: Works across all screen sizes

## Usage

1. Start both backend and frontend servers
2. Navigate to `http://localhost:3000`
3. Homepage shows empty state prompting to search
4. Type in search bar - URL updates automatically with `?q=` parameter
5. Search results appear using the TopPodcasts component
6. Clear search or navigate to `/` to return to homepage
7. TopEpisodes always visible regardless of search state

## Development Notes

- Search results reuse the existing TopPodcasts component for consistency
- URL-driven search allows for bookmarkable and shareable searches
- All search state managed through URL parameters
- SSR-safe with proper Suspense boundaries for useSearchParams
- TopEpisodes component preserved as-is for future use
- External images from iTunes properly configured in Next.js config 