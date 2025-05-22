import React, { useState } from 'react';
import { DndContext, DragOverlay, closestCorners } from '@dnd-kit/core';
import { Plus } from 'lucide-react';
import { useBoardContext } from '../context/BoardContext';
import Column from './Column';

const Board = () => {
  const { columns, addColumn, moveTask } = useBoardContext();
  const [showAddColumn, setShowAddColumn] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState('');
  const [activeId, setActiveId] = useState(null);

  const handleAddColumn = () => {
    if (newColumnTitle.trim()) {
      addColumn(newColumnTitle.trim());
      setNewColumnTitle('');
      setShowAddColumn(false);
    }
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      moveTask(active.id, over.id);
    }
    setActiveId(null);
  };

  const activeTask = activeId ?
    columns.find(col => col.tasks.some(task => task.id === activeId))
    ?.tasks.find(task => task.id === activeId) : null;

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="p-6 min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <h1 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          My Trello Board
        </h1>

        <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          {columns.map(column => (
            <Column key={column.id} column={column} />
          ))}

          <div className="w-80 flex-shrink-0">
            {showAddColumn ? (
              <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 shadow-lg">
                <input
                  type="text"
                  placeholder="Enter column title"
                  value={newColumnTitle}
                  onChange={(e) => setNewColumnTitle(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddColumn()}
                  className="w-full p-3 mb-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                  autoFocus
                />
                <div className="flex gap-3">
                  <button
                    onClick={handleAddColumn}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md"
                  >
                    Add Column
                  </button>
                  <button
                    onClick={() => {
                      setShowAddColumn(false);
                      setNewColumnTitle('');
                    }}
                    className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowAddColumn(true)}
                className="w-full p-4 bg-gray-800 hover:bg-gray-700 rounded-xl border-2 border-dashed border-gray-600 flex items-center justify-center gap-2 text-gray-400 hover:text-white transition-all duration-300"
              >
                <Plus size={20} />
                Add another column
              </button>
            )}
          </div>
        </div>
      </div>

      <DragOverlay>
        {activeTask ? (
          <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-4 rounded-xl shadow-2xl border border-gray-600 rotate-3 backdrop-blur-sm">
            <h4 className="font-medium text-sm text-white">{activeTask.title}</h4>
            {activeTask.description && (
              <p className="text-xs text-gray-300 mt-1">{activeTask.description}</p>
            )}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Board;