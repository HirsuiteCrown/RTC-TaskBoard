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
      <div className="p-6 bg-blue-50 min-h-screen">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">My Trello Board</h1>
        
        <div className="flex gap-4 overflow-x-auto pb-4">
          {columns.map(column => (
            <Column key={column.id} column={column} />
          ))}
          
          <div className="w-72 flex-shrink-0">
            {showAddColumn ? (
              <div className="bg-gray-100 p-4 rounded-lg">
                <input
                  type="text"
                  placeholder="Enter column title"
                  value={newColumnTitle}
                  onChange={(e) => setNewColumnTitle(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddColumn()}
                  className="w-full p-2 mb-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleAddColumn}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => {
                      setShowAddColumn(false);
                      setNewColumnTitle('');
                    }}
                    className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowAddColumn(true)}
                className="w-full p-4 bg-gray-200 hover:bg-gray-300 rounded-lg flex items-center justify-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
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
          <div className="bg-white p-3 rounded shadow-lg border rotate-3">
            <h4 className="font-medium text-sm">{activeTask.title}</h4>
            {activeTask.description && (
              <p className="text-xs text-gray-600 mt-1">{activeTask.description}</p>
            )}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default Board;
