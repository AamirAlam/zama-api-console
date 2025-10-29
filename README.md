# API Console

A sandbox console for API management and monitoring. This application provides a complete interface for managing API keys, monitoring usage analytics, and accessing documentation.

## Features

- **Dashboard** - Overview with key metrics and quick actions
- **API Key Management** - Create, regenerate, revoke, and manage API keys with local persistence
- **Usage Analytics** - Interactive charts, time-based filtering, and detailed usage statistics with Chart v2 feature toggle
- **Documentation** - Complete integration guides with copy-to-clipboard code snippets
- **Feature Flag System** - Development panel for testing UI variations and gradual feature rollouts

## Quick Start

### Prerequisites

- Node.js (version 18 or higher)
- npm or pnpm package manager

### Installation & Setup

1. **Clone the repository**

```bash
git clone <repository-url>
cd zama-api-console
```

2. **Install dependencies**

```bash
npm install
# or
pnpm install
```

3. **Environment setup**

```bash
cp .env.example .env
# Update .env file with: VITE_NODE_ENV=development
```

4. **Start the development server**

```bash
npm run dev
# or
pnpm dev
```

5. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

### Login Credentials

Use guest login button to access the application (authentication is simulated for demo purposes).

## Data & Synthetic Data Generation

### Synthetic Data

The application uses pre-generated synthetic data located in `/src/data/syntheticData.json`. This data includes:

- **Daily Usage Data** - 29 days of API usage statistics with status code breakdowns
- **API Keys** - Sample API keys with creation dates and usage status
- **Status Codes** - Realistic distribution of HTTP status codes (200, 400, 401, 500)

### Data Structure

```json
{
  "dailyUsage": [
    {
      "date": "2024-10-01",
      "requests": 1250,
      "status_codes": {
        "200": 1180,
        "400": 35,
        "401": 20,
        "500": 15
      },
      "api_keys": {
        "sk_live_abc123": 450,
        "sk_live_def456": 380,
        "sk_live_ghi789": 420
      }
    }
  ],
  "apiKeys": [...]
}
```

### Regenerating Synthetic Data

To generate new synthetic data, you can modify `/src/data/syntheticData.json` or create a data generation script. The current data covers:

- 29 days of usage data
- Realistic request volumes (1000-2000 requests/day)
- Status code distributions mimicking real API usage
- Multiple API key usage patterns

## Feature Flag System

### Overview

The application includes a comprehensive feature flag system designed to demonstrate gradual feature rollouts and A/B testing capabilities. This system mimics production feature flag services like LaunchDarkly or Unleash.

### How to Use

1. **Access the Dev Panel** - Click the floating settings button (⚙️) in the bottom-right corner
2. **Toggle Features** - Enable/disable features in real-time
3. **See Changes** - UI updates immediately when flags are toggled
4. **Reset All** - Use the reset button to return to default state

### Available Feature Flags

#### Chart v2 (`chartV2`)

- **Purpose**: Switches the Usage page chart from a bar chart (showing total requests) to a line chart (showing status code breakdown over time)
- **Impact**: Completely changes the chart visualization and data presentation
- **Use Case**: Testing new chart designs before full rollout

#### Modern Colors (`modernColors`)

- **Purpose**: Updates the chart color palette from standard colors to a modern, accessibility-focused scheme
- **Impact**: Changes chart line colors from default green/yellow/red to modern teal/coral/purple
- **Use Case**: Testing design system updates

### Why Feature Flags Are Valuable

1. **Risk Mitigation** - Deploy code without exposing features to all users
2. **Gradual Rollouts** - Release features to small user segments first
3. **A/B Testing** - Compare different implementations with real users
4. **Quick Rollbacks** - Instantly disable problematic features without code deployment
5. **Development Flexibility** - Test features in production environment safely
6. **Business Control** - Non-technical teams can control feature releases

### Technical Implementation

The feature flag system uses:

- **React Context** for global state management
- **TypeScript interfaces** for type safety
- **Floating UI component** for non-intrusive access
- **Real-time updates** without page refreshes

```typescript
// Example usage in components
const { flags } = useFeatureFlags()

return (
  <div>
    {flags.chartV2 ? <StatusCodeLineChart /> : <BarChart />}
  </div>
)
```

## Development & Testing

### Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Format code
npm run format

# Type checking
npm run type-check
```

## Tech Stack

- **React 19** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Shadcn UI** - Reusable UI components

## Deployment

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment to any static hosting service.

## Testing

### Unit Testing

```bash
npm run test:unit
```

### E2E Testing

```bash
npm run test:e2e
```

### Application architecture

### Architectural Decisions and Tradeoffs

#### State Management

I used a custom hook for state management. I didn't use Redux or any other state management solution because I wanted a simpler solution that was easier to implement for the first iteration. We can use a state management library like redux or zustand if more complex state management is required in the future.

#### Routing

I used `react-router-dom` for routing. It's a popular and feature-rich library for routing in React applications. It's easy to use and has good documentation.

#### Testing Approach

I used `vitest` and `playwright` for testing. `vitest` is a lightweight testing library built for Vite. It's easy to use and has good performance. It's also easy to reason about and debug.

`playwright` is an end-to-end testing library. It's used to test the entire application, including the UI and API. It's easy to use and has good documentation.

## Development Time Estimate

**Total Development Time: ~12-14 hours**

### Time Breakdown:

- **Initial Setup & Base Components** (3-4 hours)
  - Project setup with Vite, TypeScript, Tailwind
  - Basic routing and layout structure
  - Authentication system setup

- **Core Features Implementation** (7-8 hours)
  - Dashboard with metrics
  - API key management with local storage
  - Usage analytics with charts (Recharts integration)
  - Documentation page with code examples

- **Feature Flag System** (2 hours)
  - FeatureFlags context implementation
  - DevPanel floating component
  - Chart v2 (StatusCodeLineChart) development
  - Modern colors feature flag
  - Integration and testing

- **Testing & Polish** (1 -2 hour)
  - Unit tests setup
  - E2E tests configuration
  - Code cleanup and documentation

### Future Improvements if I had more time

- **Authentication** - Add real authentication with JWT tokens
- **Real-time Analytics** - WebSocket integration for live data
- **Mobile Responsive** - Add mobile responsive design (Currently optimized for desktop only)
- **Rate Limiting** - API key usage limits and throttling
- **Usage Alerts** - Email/SMS notifications for usage thresholds
- **Advanced Feature Flags** - User segmentation and percentage rollouts
- **Data Persistence** - Backend API integration
- **Advanced Charts** - More visualization types and interactive features

## AI Coding Assistance

### What Worked Well

- **Code Consistency**: Helped maintain consistent patterns across similar components (e.g., matching test file styles)
- **Documentation**: Efficient at creating comprehensive README sections and code comments

### What Did Not Work Well

- **Complex State Logic**: Required manual refinement of feature flag context and state management
- **Environment Configuration**: Needed iterative debugging for Playwright environment variable setup

---
