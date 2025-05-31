# Brev.ly Frontend

A modern, responsive URL shortener built with React and Vite.

## Features

- Create short links
- Prevent creation of links with invalid or duplicate slugs
- Delete links
- Retrieve the original URL from a short link
- List all registered URLs
- Increment the access count for each link
- Download a CSV report of all created links

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- pnpm

### Installation

```bash
pnpm install
```

### Running the Application

```bash
pnpm run dev
```

### Building for Production

```bash
pnpm run build
```

## Useful Tips

- Make sure your backend is running and accessible for API requests.
- To customize environment variables, copy `.env.example` to `.env` and adjust as needed.
- For the best experience, use the latest version of Chrome, Firefox, or Edge.
- If you encounter issues, check the browser console for errors and ensure all dependencies are installed.
