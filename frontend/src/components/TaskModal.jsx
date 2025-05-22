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
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl p-6 w-96 max-h-[80vh] overflow-y-auto border border-gray-600 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            {task ? 'Edit Task' : 'Add Task'}
          </h3>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
          />

          <textarea
            placeholder="Task description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
          />

          {task && (
            <div>
              <h4 className="font-medium mb-2 text-gray-300">Comments</h4>
              <div className="space-y-2 mb-3 max-h-32 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600">
                {task.comments.map(comment => (
                  <div key={comment.id} className="bg-gray-700 p-3 rounded-lg text-sm text-gray-200">
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
                  onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                  className="flex-1 p-2 bg-gray-700 border border-gray-600 rounded text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                  onClick={handleAddComment}
                  className="px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded text-sm hover:from-blue-600 hover:to-blue-700 transition-all shadow-md"
                >
                  Add
                </button>
              </div>
            </div>
          )}

          <div className="flex gap-3 justify-end pt-4">
            {task && (
              <button
                onClick={() => { onDelete(); onClose(); }}
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all shadow-md"
              >
                Delete
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all shadow-md disabled:opacity-50"
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