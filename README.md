# Finite Automata Simulator

Frontend app to design and simulate DFA and NFA (with epsilon transitions) using an interactive React Flow canvas.

## Tech stack

- React + Vite + TailwindCSS + React Flow
- Simulation and validation logic run in the browser (no backend required)

## Setup

1. Install dependencies from root:

```bash
npm install
npm run install:all
```

2. Start the app:

```bash
npm run dev
```

## Port

- App: `http://localhost:5173`

## Features

- Interactive canvas to add/rename/delete states and transitions
- DFA/NFA mode toggle
- Epsilon transition support in NFA mode (`ε`)
- Validation for malformed automata
- Step-by-step simulation with next/previous/autoplay/reset
- Active state and edge highlighting on each step
- Step log and input progress display
- Preset automata examples
- Export automaton JSON and simulation summary

