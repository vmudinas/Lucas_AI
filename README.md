# Lucas_AI

A modern React web application featuring an interactive landing page and a fully functional Connect Four game.

## Project Overview

Lucas_AI is a single-page application built as a demonstration of modern web development practices. The project consists of:

- **Landing Page**: A clean, responsive welcome page that introduces users to the application
- **Connect Four Game**: A fully interactive implementation of the classic Connect Four board game with win detection and game state management
- **Navigation**: Seamless routing between different sections of the application

### Tech Stack

- **React 19**: Modern React framework with hooks for state management
- **Vite 6.3.5**: Fast development build tool with hot module replacement
- **React Router DOM 7.6.1**: Client-side routing for navigation between pages
- **CSS3**: Custom styling with responsive design principles
- **ESLint & Prettier**: Code quality and formatting tools

## Setup & Run Locally

### Prerequisites
- Node.js (version 16 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/vmudinas/Lucas_AI.git
cd Lucas_AI
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Additional Commands

```bash
# Build for production
npm run build

# Lint code
npm run lint

# Format code
npm run format

# Preview production build
npm run preview
```

## Landing Page

**Files created:**
- `src/pages/LandingPage.jsx` - Main landing page component
- `src/styles/LandingPage.css` - Landing page specific styles

### UI/UX Decisions

The landing page was designed with the following principles:

1. **Minimalist Design**: Clean, centered layout that doesn't overwhelm users
2. **Clear Call-to-Action**: Prominent "Play Connect Four" button that guides users to the main feature
3. **Responsive Layout**: Flexible design that adapts to different screen sizes
4. **Consistent Branding**: Uses the same color scheme and typography as the rest of the application
5. **Fast Loading**: Minimal assets and optimized CSS for quick initial page load

The page serves as an entry point that immediately communicates the application's purpose while providing an intuitive path to the Connect Four game.

## Connect Four Implementation

### Key Components

**Main Component**: `src/components/ConnectFour.jsx`
- Manages the complete game logic and rendering
- Handles user interactions and game state transitions

**Supporting Files**:
- `src/pages/ConnectFourPage.jsx` - Page wrapper with navigation
- `src/styles/ConnectFour.css` - Game-specific styling and animations

### State Shape

The Connect Four game manages the following state:

```javascript
// 6x7 grid representing the game board (6 rows, 7 columns)
const [grid, setGrid] = useState(Array(6).fill().map(() => Array(7).fill(null)));

// Current player (1 or 2)
const [currentPlayer, setCurrentPlayer] = useState(1);

// Winner of the game (null if no winner yet)
const [winner, setWinner] = useState(null);

// Game over status
const [gameOver, setGameOver] = useState(false);
```

### Drop Logic Implementation

The disc dropping mechanism follows these steps:

1. **Column Selection**: User clicks on any column to drop a disc
2. **Gravity Simulation**: The algorithm finds the lowest available cell in the selected column
3. **Validation**: Checks if the column has space (not full)
4. **Placement**: Places the current player's disc in the calculated position
5. **State Update**: Updates the grid and triggers win/tie checking

```javascript
const handleColumnClick = (columnIndex) => {
  // Find lowest empty cell starting from bottom (row 5)
  let rowIndex = 5;
  while (rowIndex >= 0 && newGrid[rowIndex][columnIndex] !== null) {
    rowIndex--;
  }
  
  // Place disc and update game state
  newGrid[rowIndex][columnIndex] = currentPlayer;
};
```

### Win Detection Algorithm

The win detection system checks for four consecutive discs in all possible directions:

1. **Horizontal**: Scans each row for 4 consecutive matching discs
2. **Vertical**: Scans each column for 4 consecutive matching discs  
3. **Diagonal (↘)**: Checks top-left to bottom-right diagonal lines
4. **Diagonal (↙)**: Checks bottom-left to top-right diagonal lines

The algorithm optimizes performance by only checking around the most recently placed disc rather than scanning the entire board.

### Game Features

- **Visual Player Indicators**: Colored discs (red for Player 1, yellow for Player 2)
- **Turn Display**: Clear indication of whose turn it is
- **Win Announcement**: Prominent display when a player wins
- **Tie Detection**: Automatic detection when the board is full with no winner
- **Game Reset**: One-click reset functionality to start a new game
- **Responsive Design**: Works on desktop and mobile devices

## Routing

The application uses React Router DOM for client-side navigation with the following configuration:

### Router Setup (`src/App.jsx`)

```javascript
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/connect-four" element={<ConnectFourPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}
```

### Route Structure

- `/` - Landing page (default route)
- `/home` - Alternative home page
- `/about` - About page with project information
- `/connect-four` - Connect Four game page

### Navigation Component (`src/components/Navbar.jsx`)

The navigation bar provides consistent access to all major sections:
- Uses React Router's `Link` component for client-side navigation
- Maintains active state and visual feedback
- Responsive design that adapts to mobile screens

## Tests

**Current Status**: No unit tests are currently implemented.

**Future Testing Plans**:
- Unit tests for Connect Four win detection logic
- Component rendering tests with React Testing Library
- Integration tests for game flow and user interactions
- Performance tests for game state updates

Recommended testing approach:
```javascript
// Example test structure for win detection
describe('Connect Four Win Detection', () => {
  test('detects horizontal win', () => {
    // Test horizontal four-in-a-row detection
  });
  
  test('detects vertical win', () => {
    // Test vertical four-in-a-row detection
  });
  
  test('detects diagonal wins', () => {
    // Test both diagonal directions
  });
});
```

## Deployment

**Current Status**: CI/CD pipeline is configured and active.

**Live Application**: [https://vmudinas.github.io/Lucas_AI/](https://vmudinas.github.io/Lucas_AI/)

### GitHub Pages CI/CD

The application is automatically deployed to GitHub Pages using the following setup:

1. **Build Process**: Automated builds triggered on push to main branch
2. **Static Hosting**: Deploy to GitHub Pages for free hosting
3. **Quality Checks**: ESLint validation before deployment
4. **Automatic Updates**: New deployments on every merged pull request

### GitHub Actions Workflow

The current deployment workflow (`.github/workflows/deploy.yml`) provides:

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - name: Install Dependencies
        run: npm ci
      - name: Lint
        run: npm run lint
      - name: Build
        run: npm run build
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

This setup provides:
- Automatic deployment on code changes
- Build validation and linting before deployment  
- Proper permissions for GitHub Pages deployment
- Modern GitHub Actions deployment with artifact uploads
- Efficient caching for faster builds
- Rollback capability if deployments fail

**Note**: GitHub Pages must be manually enabled in repository settings with "GitHub Actions" as the source for the deployment to work.

## Development Workflow

### Code Quality
- **ESLint**: Enforces consistent code style and catches potential errors
- **Prettier**: Automatic code formatting for consistent style
- **Git Hooks**: Pre-commit hooks for code quality checks (future enhancement)

### File Structure
```
src/
├── components/     # Reusable UI components
├── pages/         # Top-level page components
├── styles/        # CSS files organized by component
├── assets/        # Static assets (images, icons)
├── App.jsx        # Main application component
└── index.jsx      # Application entry point
```

### Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
