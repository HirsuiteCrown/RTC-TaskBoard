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
        {...listeners}
        className="bg-white p-3 rounded shadow-sm border cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow"
      >
        <div className="flex justify-between items-start">
          <h4 className="font-medium text-sm">{task.title}</h4>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowModal(true);
            }}
            className="text-gray-400 hover:text-gray-600"
          >
            <Edit2 size={14} />
          </button>
        </div>
        {task.description && (
          <p className="text-xs text-gray-600 mt-1">{task.description}</p>
        )}
        {task.comments.length > 0 && (
          <div className="flex items-center mt-2 text-gray-500">
            <MessageCircle size={12} />
            <span className="text-xs ml-1">{task.comments.length}</span>
          </div>
        )}
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
