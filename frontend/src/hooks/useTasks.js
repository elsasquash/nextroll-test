import React, { useState, useContext, createContext, useEffect } from "react";
import moment from "moment";
import TasksService from "../services/TaskService";

const tasksContext = createContext();

export const ProvideTasks = ({ children }) => {
  const tasks = useProvideTasks();
  return (
    <tasksContext.Provider value={tasks}>{children}</tasksContext.Provider>
  );
};

export const useTasks = () => useContext(tasksContext);

const completedSamples = [
  {
    id: 1,
    text: "Kuala lumpur",
    dueDate: moment(),
    priority: 5,
    completed: true,
  },
];

const pendingSamples = [
  {
    id: 2,
    text: "lalala",
    dueDate: moment(),
    priority: 1,
    completed: false,
  },
  {
    id: 3,
    text: "pepe porto",
    dueDate: moment(),
    priority: 2,
    completed: false,
  },
];

const useProvideTasks = () => {
  const [completed, setCompleted] = useState(completedSamples);
  const [pending, setPending] = useState(pendingSamples);
  const { listTasks, createTask, deleteTask, updateTask } = TasksService();

  const _listTasks = async () => {
    const tasks = await listTasks();
    const completedTasks = [];
    tasks.filter((task) => task.completed);
    const pendingTasks = [];
    tasks.forEach((task) =>
      task.completed ? completedTasks.push(task) : pendingTasks.push(task)
    );
    setCompleted(completedTasks);
    setPending(pendingTasks);
  };

  const _createTask = async (task) => {
    await createTask(task);
    await _listTasks();
  };

  const _deleteTask = async (task) => {
    await deleteTask(task);
    await _listTasks();
  };

  const completeTask = async (task) => {
    await updateTask(task);
    await _listTasks();
  };

  useEffect(() => {
    _listTasks();
  }, []);

  return {
    completed,
    pending,
    completeTask,
    listTasks: _listTasks,
    createTask: _createTask,
    deleteTask: _deleteTask,
  };
};
