import React, { useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  PanResponder,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { solveLevel } from './solver'
import {Cell, Grid, Level} from './types'


// --- Constants ---
const CELL_SIZE = 60;
const BOARD_SIZE = 5;

const level: Level = {
  size: BOARD_SIZE,
  endpoints: [
    { id: "1", color: "#e74c3c", a: { row: 0, col: 0 }, b: { row: 4, col: 0 } },
    { id: "2", color: "#3498db", a: { row: 0, col: 4 }, b: { row: 4, col: 4 } },
  ],
};

const DEFAULT_COLOR = level.endpoints[0]?.color || null

function createInitialGrid(): Grid {
  const grid: Grid = Array.from({ length: level.size }, () =>
    Array.from({ length: level.size }, () => ({ color: null }))
  );
  for (const ep of level.endpoints) {
    grid[ep.a.row][ep.a.col] = { color: ep.color, endpointId: ep.id };
    grid[ep.b.row][ep.b.col] = { color: ep.color, endpointId: ep.id };
  }
  return grid;
}

export default function App() {
  const [grid, setGrid] = useState(createInitialGrid());
  // Refs to handle the logic without closure staleness
  const gridRef = useRef(grid);
  const activeColorRef = useRef(DEFAULT_COLOR);
  const lastCellRef = useRef(null);
  const [won,setWon] = useState(false)

  const updateGridState = (newGrid: Grid) => {
    gridRef.current = newGrid;
    setGrid(newGrid);
  };

  const reset = () => {
    const newGrid = createInitialGrid();
    updateGridState(newGrid);
    activeColorRef.current = DEFAULT_COLOR;
    lastCellRef.current = null;
    setWon(false)
  };

  const handleCellTap = (row: number, col: number) => {
  const cell = grid[row][col]

  // let colorToUse = cell.color

  // // If cell is empty, assign a new color (e.g., from a palette or a default)
  // if (!colorToUse) {
  //   colorToUse = "#3498db" // Default or pick from palette
  // }

  // setActiveColor(colorToUse)
  // activeColorRef.current = colorToUse

  // setLastCell({ row, col })

  // Paint tapped cell immediately
  // setGrid((prev) => {
    
    const newGrid = gridRef.current.map((r) => r.map((c) => ({ ...c })))
    newGrid[row][col].color = activeColorRef.current
       if (checkWin(newGrid, level)) {
    setWon(true);
  }

updateGridState(newGrid)
  // })
}

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,

      onPanResponderGrant: (e) => {
        const { pageX, pageY } = e.nativeEvent;
      const row = Math.floor(e.nativeEvent.locationY / CELL_SIZE)
      const col = Math.floor(e.nativeEvent.locationX / CELL_SIZE)
    

        if (row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE) {
          const cell = gridRef.current[row][col];
    
         if(!cell.color) handleCellTap(row, col)
          else {
    
            activeColorRef.current = cell.color;
            lastCellRef.current = { row, col };
          }
        }
      },

      onPanResponderMove: (e) => {
    
        if (!activeColorRef.current || !lastCellRef.current || won) return;

        const { pageX, pageY } = e.nativeEvent;
         const row = Math.floor(e.nativeEvent.locationY / CELL_SIZE)
      const col = Math.floor(e.nativeEvent.locationX / CELL_SIZE)

        // Basic bounds check
        if (row < 0 || row >= BOARD_SIZE || col < 0 || col >= BOARD_SIZE) return;

        const last = lastCellRef.current;
        if (row === last.row && col === last.col) return;

        // Adjacency check (no diagonals)
        const rowDiff = Math.abs(row - last.row);
        const colDiff = Math.abs(col - last.col);
        if (rowDiff + colDiff === 1) {
          const newGrid = [...gridRef.current.map((r) => [...r])];
          const targetCell = newGrid[row][col];

          // Prevent overwriting other endpoints
          if (targetCell.endpointId && targetCell.color !== activeColorRef.current) return;

          newGrid[row][col] = { ...targetCell, color: activeColorRef.current };
          lastCellRef.current = { row, col };
       if (checkWin(newGrid, level)) {
    setWon(true);
  }
          updateGridState(newGrid);
        }
      },

      onPanResponderRelease: () => {

        lastCellRef.current = null;

      },
    })
  ).current;

  const showHint = () => {
  const solution = solveLevel(level)
  if (!solution) return
  // For example, highlight next move based on solution
}

  function checkWin(newGrid: Grid,level): boolean {
  const solution = solveLevel(newGrid ,level)

  return solution
  // if (!solution) return false

  // // Compare the current grid with the solution
  // // For small 5x5, simple JSON string comparison works:
  // return JSON.stringify(newGrid) === JSON.stringify(solution)
}

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connect the Dots</Text>
      
      <View
        style={styles.board}
        {...panResponder.panHandlers}
      >
        {grid.map((row, r) => (
          <View key={r} style={styles.row}>
            {row.map((cell, c) => (
              <View
                key={c}
                style={[
                  styles.cell,
                  { backgroundColor: cell.color ?? "#34495e" },
                ]}
              >
                {cell.endpointId && <View style={styles.endpointInner} />}
              </View>
            ))}
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={reset}>
        <Text style={styles.buttonText}>Reset Game</Text>
      </TouchableOpacity>
      {won && (
  <View style={styles.winContainer}>
    <Text style={styles.winText}>🎉 You Won!</Text>
  </View>
)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2c3e50",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    color: "white",
    marginBottom: 20,
    fontWeight: "bold",
  },
  board: {
    width: CELL_SIZE * BOARD_SIZE,
    height: CELL_SIZE * BOARD_SIZE,
    backgroundColor: "#2c3e50",
    borderWidth: 2,
    borderColor: "#bdc3c7",
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderWidth: 0.5,
    borderColor: "#455a64",
    justifyContent: "center",
    alignItems: "center",
  },
  endpointInner: {
    width: CELL_SIZE * 0.6,
    height: CELL_SIZE * 0.6,
    borderRadius: CELL_SIZE,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderWidth: 3,
    borderColor: "white",
  },
  button: {
    marginTop: 40,
    paddingHorizontal: 30,
    paddingVertical: 12,
    backgroundColor: "#e67e22",
    borderRadius: 25,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  winContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f1c40f',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#f39c12',
    alignItems: 'center',
    justifyContent: 'center',
  },
  winText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e67e22',
    textAlign: 'center',
  },
});

