
# 5x5 Numberlink Puzzle Game (React Native)

A simple **Numberlink-style puzzle game** built in **React Native** with drag-to-connect gameplay, solver validation, and win detection.

----------

## 🎮 Game Rules

-   The board is a **5x5 grid**.
    
-   Each color has **two endpoints**.
    
-   Connect matching pairs with a continuous path:
    
    -   Moves allowed: **up, down, left, right**
        
    -   Paths **cannot cross** or overlap
        
    -   Paths **cannot branch**
        
-   Puzzle is complete when:
    
    -   All pairs are connected
        
    -   The entire grid is filled
        

----------

## ⚡ Features

-   **Dynamic 5x5 board**
    
-   **Drag-to-connect** paths starting from endpoints
    
-   **Active color selection** and real-time path coloring
    
-   **Reset button** to restart the level
    
-   **“You Won” message** with styling upon successful completion
    
-   **Solver function** (`solveLevel`) to validate solutions or provide hints
    

----------

## 🛠️ Installation

1.  Clone the repository:
    

git clone https://github.com/your-username/numberlink-5x5.git  
cd numberlink-5x5

2.  Install dependencies:
    

npm install  
# or  
yarn install

3.  Start the Expo server (recommended):
    

npx expo start

----------

## 📝 Usage

-   Tap an **endpoint** to activate its color.
    
-   **Drag** along empty cells to connect endpoints.
    
-   Release finger to stop drawing the path.
    
-   Press **Reset** to restart the puzzle.
    
-   When all paths are connected correctly, the **🎉 You Won!** message appears.
    

----------

## 🧩 Solver

The game includes a **`solveLevel`** function for:

-   Checking win conditions
    
-   Generating hints (optional)
    

Example usage:

import { solveLevel } from  './solver'  
import  type { Level, Grid } from  './types'  
  
const  solution: Grid  |  null  =  solveLevel(level)  
if (solution) {  
  console.log('Valid solution exists!')  
}

-   Returns a complete grid solution or `null` if impossible
    

----------

## 🖌️ Styling

-   The **board** uses a 5x5 grid of square cells.
    
-   **Paths** are colored dynamically when dragging.
    
-   The **“You Won” message** uses bold text, bright background, and optional overlay for visual feedback.
    

----------

## 🔧 File Structure (Minimal)

/src  
 App.tsx           # Main game component  
 solver.ts         # Backtracking solver  
 types.ts          # TypeScript types (Grid, Cell, Level, Endpoint)  
 assets/           # Optional images/icons

----------

## 💡 Future Improvements

-   Multiple levels and dynamic difficulty
    
-   Hint button using the solver
    
-   Confetti animation on win
    
-   Animations for dragging paths