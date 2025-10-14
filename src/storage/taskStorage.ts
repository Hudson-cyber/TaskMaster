// src/storage/taskStorage.ts
import { MMKV } from 'react-native-mmkv';
import { ITask } from '../@types/task';

// Inicializa o storage. Você pode ter múltiplos "storages" com diferentes IDs.
const storage = new MMKV({ id: 'taskmaster-storage' });
const TASKS_KEY = 'tasks'; // A chave onde nossa lista será armazenada

export function getTasks(): ITask[] {
  try {
    const tasksJson = storage.getString(TASKS_KEY);
    // Se houver dados, converte de JSON para array. Se não, retorna array vazio.
    return tasksJson ? JSON.parse(tasksJson) : [];
  } catch (error) {
    console.error('Failed to load tasks.', error);
    // Tratamento de erro: se a leitura falhar, retorna um estado seguro.
    return [];
  }
}

// SAVE (Cobre Create, Update, Delete): Função para salvar a lista inteira de tarefas
function saveTasks(tasks: ITask[]) {
  try {
    storage.set(TASKS_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Failed to save tasks.', error);
  }
}

// CREATE: Função para adicionar uma nova tarefa
export function addTask(title: string): ITask {
  const currentTasks = getTasks();
  const newTask: ITask = {
    id: String(Date.now()),
    title,
    completed: false,
  };
  const updatedTasks = [...currentTasks, newTask];
  saveTasks(updatedTasks);
  return newTask;
}

// UPDATE: Função para alternar o status de uma tarefa
export function toggleTask(id: string): ITask[] {
  const currentTasks = getTasks();
  const updatedTasks = currentTasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveTasks(updatedTasks);
  return updatedTasks;
}

// DELETE: Função para remover uma tarefa
export function removeTask(id: string): ITask[] {
  const currentTasks = getTasks();
  const updatedTasks = currentTasks.filter(task => task.id !== id);
  saveTasks(updatedTasks);
  return updatedTasks;
}