# Free Retirement Savings Calculator

A React TypeScript application for calculating retirement savings shortfalls and pension planning. This is based on the free-rs-calculator repository with the core calculator functionality, excluding the BUOM Unified ecosystem features.

## Features

- **FREE Retirement Calculator** - Calculate pension shortfalls without registration
- **APF (Alternative Pension Funding) Registration** - Enhanced pension funding options
- **Net Asset Value Tracking** - Manage assets and liabilities
- **Dashboard** - Personal financial overview
- **User Profile Management** - Personal and pension details

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **Backend**: Supabase (Database + Authentication)
- **Charts**: Recharts
- **Routing**: React Router

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account (for backend)

### Installation

1. Clone the repository
```bash
git clone https://github.com/DTSCDev/my-buom-app.git
cd my-buom-app
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
# Add your Supabase URL and API key
```

4. Start the development server
```bash
npm run dev
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui base components
│   ├── Calculator/     # Calculator-specific components
│   ├── Dashboard/      # Dashboard components
│   ├── APFRegistration/ # APF registration flow
│   ├── NetAssetValue/  # Asset management components
│   └── Layout/         # Layout components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
└── integrations/       # External service integrations
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Deployment

This project can be deployed to any static hosting platform:

- **Vercel** (recommended)
- **Netlify**
- **GitHub Pages**
- **AWS S3 + CloudFront**

## License

MIT License - see LICENSE file for details.
