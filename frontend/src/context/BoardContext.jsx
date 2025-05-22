import React, { createContext, useContext, useState } from 'react';
import { arrayMove } from '@dnd-kit/sortable';

const BoardContext = createContext();

export const useBoardContext = () => {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error('useBoardContext must be used within BoardProvider');
  }
  return context;
};

export const BoardProvider = ({ children }) => {
  const [columns, setColumns] = useState([
    {
      id: 'col-1',
      title: 'To Do',
      tasks: [
        { id: 'task-1', title: 'Task 1', description: 'Description for task 1', comments: [] },
        { id: 'task-2', title: 'Task 2', description: 'Description for task 2', comments: [] }
      ]
    },
    {
      id: 'col-2',
      title: 'In Progress',
      tasks: [
        { id: 'task-3', title: 'Task 3', description: 'Description for task 3', comments: [] }
      ]
    },
    {
      id: 'col-3',
      title: 'Done',
      tasks: []
    }
  ]);

  const addColumn = (title) => {
    const newColumn = {
      id: `col-${Date.now()}`,
      title,
      tasks: []
    };
    setColumns([...columns, newColumn]);
  };

  const updateColumn = (columnId, newTitle) => {
    setColumns(columns.map(col => 
      col.id === columnId ? { ...col, title: newTitle } : col
    ));
  };

  const deleteColumn = (columnId) => {
    setColumns(columns.filter(col => col.id !== columnId));
  };

  const addTask = (columnId, task) => {
    const newTask = {
      id: `task-${Date.now()}`,
      title: task.title,
      description: task.description || '',
      comments: []
    };
    
    setColumns(columns.map(col => 
      col.id === columnId 
        ? { ...col, tasks: [...col.tasks, newTask] }
        : col
    ));
  };

  const updateTask = (columnId, taskId, updatedTask) => {
    setColumns(columns.map(col => 
      col.id === columnId 
        ? {
            ...col,
            tasks: col.tasks.map(task => 
              task.id === taskId ? { ...task, ...updatedTask } : task
            )
          }
        : col
    ));
  };

  const deleteTask = (columnId, taskId) => {
    setColumns(columns.map(col => 
      col.id === columnId 
        ? { ...col, tasks: col.tasks.filter(task => task.id !== taskId) }
        : col
    ));
  };

  const addComment = (columnId, taskId, comment) => {
    setColumns(columns.map(col => 
      col.id === columnId 
        ? {
            ...col,
            tasks: col.tasks.map(task => 
              task.id === taskId 
                ? { ...task, comments: [...task.comments, { id: Date.now(), text: comment, timestamp: new Date() }] }
                : task
            )
          }
        : col
    ));
  };

  const moveTask = (activeId, overId) => {
    const activeColumn = columns.find(col => col.tasks.some(task => task.id === activeId));
    const overColumn = columns.find(col => col.id === overId || col.tasks.some(task => task.id === overId));
    
    if (!activeColumn || !overColumn) return;

    const activeTask = activeColumn.tasks.find(task => task.id === activeId);
    
    if (activeColumn.id === overColumn.id) {
      const oldIndex = activeColumn.tasks.findIndex(task => task.id === activeId);
      const newIndex = overColumn.tasks.findIndex(task => task.id === overId);
      
      if (newIndex === -1) {
        return;
      }
      
      setColumns(columns.map(col => 
        col.id === activeColumn.id 
          ? { ...col, tasks: arrayMove(col.tasks, oldIndex, newIndex) }
          : col
      ));
    } else {
      setColumns(columns.map(col => {
        if (col.id === activeColumn.id) {
          return { ...col, tasks: col.tasks.filter(task => task.id !== activeId) };
        }
        if (col.id === overColumn.id) {
          return { ...col, tasks: [...col.tasks, activeTask] };
        }
        return col;
      }));
    }
  };

  return (
    <BoardContext.Provider value={{
      columns,
      addColumn,
      updateColumn,
      deleteColumn,
      addTask,
      updateTask,
      deleteTask,
      addComment,
      moveTask
    }}>
      {children}
    </BoardContext.Provider>
  );
};