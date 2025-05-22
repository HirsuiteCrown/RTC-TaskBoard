import React from 'react';
import { BoardProvider } from './context/BoardContext';
import Board from './components/Board';

function App() {

  return (
    <BoardProvider>
      <Board />
    </BoardProvider>
  )
}

export default App
