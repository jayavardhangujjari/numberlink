import {Cell, Grid, Level} from './types'

 // --- Solver / Win Checker ---
export function solveLevel(grid: Grid, level: Level): boolean {
  // 1. Check if all cells are filled
  for (let r = 0; r < level.size; r++) {
    for (let c = 0; c < level.size; c++) {
      if (grid[r][c].color === null) return false;
    }
  }

  // 2. Check if every endpoint pair is connected
  for (const ep of level.endpoints) {
    if (!isConnected(grid, ep)) return false;
  }

  return true;
}

function isConnected(grid: Grid, endpoint: Endpoint): boolean {
  const { a, b, color } = endpoint;
  const visited = new Set<string>();
  const stack = [{ r: a.row, c: a.col }];

  while (stack.length > 0) {
    const { r, c } = stack.pop()!;
    const key = `${r},${c}`;

    if (r === b.row && c === b.col) return true;
    if (visited.has(key)) continue;
    visited.add(key);

    // Check 4 neighbors
    const directions = [
      { r: r + 1, c }, { r: r - 1, c },
      { r, c: c + 1 }, { r, c: c - 1 }
    ];

    for (const d of directions) {
      if (
        d.r >= 0 && d.r < grid.length &&
        d.c >= 0 && d.c < grid.length &&
        grid[d.r][d.c].color === color &&
        !visited.has(`${d.r},${d.c}`)
      ) {
        stack.push(d);
      }
    }
  }
  return false;
}