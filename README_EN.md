# 2048 Game

A 2048 game implemented in vanilla JavaScript with responsive design and smooth animations.

## 📋 Description

This project is an implementation of the popular 2048 game, where the goal is to combine tiles with the same number to reach the 2048 tile. The game includes:

- ✅ Responsive interface that adapts to different screen sizes
- ✅ Smooth animations for new and merging tiles
- ✅ Scoring system with top score
- ✅ Win and loss detection
- ✅ Modular and well-organized code

## 🎮 How to Play

1. Use the **keyboard arrows** (↑ ↓ ← →) to move the tiles
2. Tiles move in the indicated direction and merge if they have the same value
3. Each merge adds points to your score
4. **Goal:** Reach the 2048 tile to win
5. The game ends when no more moves are possible

## 🚀 Installation & Running

### Download the repository

```bash
# Clone the repository
git clone git@github.com:migclay12/2048.git
```

### With Docker

```bash
# Navigate to the ex00/ folder
# Build and run with docker-compose
cd ex00/ && docker-compose up --build

# The game will be available at http://localhost:5173
```

## 📁 Project Structure

```
ex00/
├── index.html          # Main page
├── css/
│   └── style.css       # Styles and animations
├── js/
│   ├── main.js         # Initialization and event listeners
│   ├── game-state.js   # Game state and validations
│   ├── game-logic.js   # Movement and merging logic
│   ├── ui.js           # UI rendering and animations
│   └── utils.js        # Utility functions
├── Dockerfile          # Docker configuration
└── docker-compose.yml  # Docker orchestration
```

## 🏗️ Architecture

The code is organized into modules separated by responsibility:

- **`main.js`**: Defines global constants (GRID_SIZE, VICTORY_VALUE) and initializes the game
- **`game-state.js`**: Manages game state (gameState.table, gameState.mergedCells) and checks win/loss
- **`game-logic.js`**: Implements movement logic in all 4 directions and merging
- **`ui.js`**: Handles board rendering, score updates, and animations
- **`utils.js`**: Helper functions (copy tables, compare, random numbers)

## 🎨 Technical Features

- **Responsive Design**: Uses modern CSS units (vw, vh, clamp()) to adapt to any display
- **CSS Animations**: Smooth transitions and animations for new and merged tiles
- **Modular Code**: Clear separation of responsibilities for easy maintenance
- **No Dependencies**: Vanilla JavaScript, no external frameworks or libraries

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript
- Docker & Nginx

## 📝 Notes

- The game stores the top score during the session (it resets when reloading the page)
- Animations last 200ms
- The grid is 4x4 by default
