import type { Task } from '@/types/task'

// The key used to store tasks in localStorage
const STORAGE_KEY = 'todo-manager-tasks'

// Reads and parses the tasks array from localStorage
// Returns an empty array if nothing is stored or if the data is corrupted
export function loadTasks(): Task[] {
  const data = localStorage.getItem(STORAGE_KEY)
  if (!data) return []
  try {
    return JSON.parse(data) as Task[]
  } catch {
    return []
  }
}

// Serializes and saves the tasks array to localStorage
export function saveTasks(tasks: Task[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
}
