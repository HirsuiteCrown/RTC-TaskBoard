import React, { useState } from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { Plus, Trash2 } from 'lucide-react';
import { useBoardContext } from '../context/BoardContext';
import Task from './Task';
import TaskModal from './TaskModal';

const Column = ({ column }) => {
  const { updateColumn, deleteColumn, addTask } = useBoardContext();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(column.title);
  const [showTaskModal, setShowTaskModal] = useState(false);

  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  const handleTitleSave = () => {
    if (title.trim()) {
      updateColumn(column.id, title.trim());
    }
    setIsEditing(false);
  };

  const handleAddTask = (taskData) => {
    addTask(column.id, taskData);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl w-80 flex-shrink-0 shadow-lg border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        {isEditing ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleTitleSave}
            onKeyPress={(e) => e.key === 'Enter' && handleTitleSave()}
            className="font-semibold bg-gray-700 text-white border-b border-gray-500 focus:outline-none focus:border-blue-500 w-full"
            autoFocus
          />
        ) : (
          <h3
            className="font-semibold text-white cursor-pointer hover:text-blue-400 transition-colors"
            onClick={() => setIsEditing(true)}
          >
            {column.title}
          </h3>
        )}
        <button
          onClick={() => deleteColumn(column.id)}
          className="text-gray-400 hover:text-red-400 p-1 rounded-full hover:bg-gray-700 transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div
        ref={setNodeRef}
        className={`min-h-[100px] rounded-lg transition-all duration-200 ${
          isOver ? 'bg-gray-700 border-2 border-dashed border-blue-400' : 'bg-gray-700/50'
        }`}
      >
        <SortableContext items={column.tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3 mb-3 p-1">
            {column.tasks.map(task => (
              <Task key={task.id} task={task} columnId={column.id} />
            ))}
            {column.tasks.length === 0 && (
              <div className="text-gray-500 text-sm text-center py-6">
                Drop tasks here
              </div>
            )}
          </div>
        </SortableContext>
      </div>

      <button
        onClick={() => setShowTaskModal(true)}
        className="w-full p-3 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 mt-2"
      >
        <Plus size={16} />
        <span>Add a task</span>
      </button>

      {showTaskModal && (
        <TaskModal
          columnId={column.id}
          onClose={() => setShowTaskModal(false)}
          onSave={handleAddTask}
          onDelete={() => {}}
        />
      )}
    </div>
  );
};

export default Column;