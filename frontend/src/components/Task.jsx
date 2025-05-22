import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Edit2, MessageCircle } from 'lucide-react';
import { useBoardContext } from '../context/BoardContext';
import TaskModal from './TaskModal';

const Task = ({ task, columnId }) => {
  const { updateTask, deleteTask } = useBoardContext();
  const [showModal, setShowModal] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1
  };

  const handleSave = (updatedTask) => {
    updateTask(columnId, task.id, updatedTask);
  };

  const handleDelete = () => {
    deleteTask(columnId, task.id);
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        className="bg-gray-700 p-4 rounded-lg shadow-md border border-gray-600 hover:border-gray-500 hover:shadow-lg transition-all cursor-grab active:cursor-grabbing"
      >
        <div className="flex justify-between items-start">
          <div
            {...listeners}
            className="flex-1"
          >
            <h4 className="font-medium text-sm text-white">{task.title}</h4>
            {task.description && (
              <p className="text-xs text-gray-300 mt-1">{task.description}</p>
            )}
            {task.comments.length > 0 && (
              <div className="flex items-center mt-2 text-gray-400">
                <MessageCircle size={12} />
                <span className="text-xs ml-1">{task.comments.length}</span>
              </div>
            )}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setShowModal(true);
            }}
            className="text-gray-400 hover:text-blue-400 p-1 rounded hover:bg-gray-600 flex-shrink-0 transition-colors"
          >
            <Edit2 size={14} />
          </button>
        </div>
      </div>

      {showModal && (
        <TaskModal
          task={task}
          columnId={columnId}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}
    </>
  );
};

export default Task;