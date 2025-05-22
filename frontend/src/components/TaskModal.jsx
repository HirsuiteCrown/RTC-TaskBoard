import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useBoardContext } from '../context/BoardContext';

const TaskModal = ({ task, columnId, onClose, onSave, onDelete }) => {
  const { addComment } = useBoardContext();
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [newComment, setNewComment] = useState('');

  const handleSave = () => {
    onSave({ title, description });
    onClose();
  };

  const handleAddComment = () => {
    if (newComment.trim() && task) {
      addComment(columnId, task.id, newComment.trim());
      setNewComment('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 max-h-96 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{task ? 'Edit Task' : 'Add Task'}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <textarea
            placeholder="Task description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded h-20 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {task && (
            <div>
              <h4 className="font-medium mb-2">Comments</h4>
              <div className="space-y-2 mb-3 max-h-32 overflow-y-auto">
                {task.comments.map(comment => (
                  <div key={comment.id} className="bg-gray-50 p-2 rounded text-sm">
                    {comment.text}
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1 p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleAddComment}
                  className="px-3 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                >
                  Add
                </button>
              </div>
            </div>
          )}
          
          <div className="flex gap-2 justify-end">
            {task && (
              <button
                onClick={() => { onDelete(); onClose(); }}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              disabled={!title.trim()}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
