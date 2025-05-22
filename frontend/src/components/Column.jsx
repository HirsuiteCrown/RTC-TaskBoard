import React, { useState } from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Plus, Trash2 } from 'lucide-react';
import { useBoardContext } from '../context/BoardContext';
import Task from './Task';
import TaskModal from './TaskModal';

const Column = ({ column }) => {
  const { updateColumn, deleteColumn, addTask } = useBoardContext();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(column.title);
  const [showTaskModal, setShowTaskModal] = useState(false);

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
    <div className="bg-gray-100 p-4 rounded-lg w-72 flex-shrink-0">
      <div className="flex items-center justify-between mb-3">
        {isEditing ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleTitleSave}
            onKeyPress={(e) => e.key === 'Enter' && handleTitleSave()}
            className="font-semibold bg-transparent border-b border-gray-400 focus:outline-none"
            autoFocus
          />
        ) : (
          <h3 
            className="font-semibold cursor-pointer hover:text-blue-600"
            onClick={() => setIsEditing(true)}
          >
            {column.title}
          </h3>
        )}
        <button
          onClick={() => deleteColumn(column.id)}
          className="text-gray-400 hover:text-red-500"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <SortableContext items={column.tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-2 mb-3">
          {column.tasks.map(task => (
            <Task key={task.id} task={task} columnId={column.id} />
          ))}
        </div>
      </SortableContext>

      <button
        onClick={() => setShowTaskModal(true)}
        className="w-full p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded flex items-center justify-center gap-1 transition-colors"
      >
        <Plus size={16} />
        Add a task
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