import { Task } from "../models/Task.js";


export const getTasks = async (req, res) => {
  const tasks = await Task.findAll({ where: { userId: req.user.id } });
  res.json(tasks);
};

export const createTask = async (req, res) => {
  const { title, description, status } = req.body;
  const task = await Task.create({ title, description, status, userId: req.user.id });
  res.status(201).json(task);
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findOne({ where: { id, userId: req.user.id } });
  if (!task) return res.status(404).json({ message: "Task non trovato" });

  await task.update(req.body);
  res.json(task);
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findOne({ where: { id, userId: req.user.id } });
  if (!task) return res.status(404).json({ message: "Task non trovato" });

  await task.destroy();
  res.json({ message: "Task eliminato" });
};