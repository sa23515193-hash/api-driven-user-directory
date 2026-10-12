# API-Driven User Directory

A responsive React directory that fetches user profiles from JSONPlaceholder and lets visitors search and filter the results.

## Features
- Fetches data from `https://jsonplaceholder.typicode.com/users`
- Uses `useEffect` and `useState` for API lifecycle and UI state
- Loading spinner, error feedback, retry action, and empty results state
- Live search across names, email addresses, company names, and cities
- Company filter, responsive profile cards, and mail/website links
- `AbortController` prevents stale fetch updates when the component unmounts

## Tech Stack
- React 18
- Vite
- Fetch API
- CSS Grid and responsive CSS

## Run Locally
```bash
npm install
npm run dev
```
Open the URL shown by Vite. An internet connection is required to load API data.

## Production Build
```bash
npm run build
npm run preview
```

## GitHub Repository
- **Suggested repository name:** `api-driven-user-directory`
- **Suggested description:** A responsive React user directory that fetches, searches, and filters people from a public API.

## API
This demo uses JSONPlaceholder sample data. The people and contact details are not a real company directory.
