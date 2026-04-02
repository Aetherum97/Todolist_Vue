import { describe, it, expect, beforeEach } from 'vitest'
import { loadTasks, saveTasks } from '../services/localStorage.service'
import { Status } from '../types/task'
import type { Task } from '../types/task'

// Reset localStorage before each test so tests are independent
beforeEach(() => {
  localStorage.clear()
})

describe('loadTasks', () => {
  it('returns an empty array when localStorage is empty', () => {
    expect(loadTasks()).toEqual([])
  })

  it('returns the tasks that were previously saved', () => {
    const tasks: Task[] = [
      { id: '1', title: 'First task', status: Status.TODO },
      { id: '2', title: 'Second task', status: Status.DONE },
    ]
    localStorage.setItem('todo-manager-tasks', JSON.stringify(tasks))
    expect(loadTasks()).toEqual(tasks)
  })

  it('returns an empty array when the stored data is not valid JSON', () => {
    localStorage.setItem('todo-manager-tasks', 'not-json')
    expect(loadTasks()).toEqual([])
  })
})

describe('saveTasks', () => {
  it('serializes the tasks array to localStorage', () => {
    const tasks: Task[] = [{ id: '1', title: 'My task', status: Status.IN_PROGRESS }]
    saveTasks(tasks)
    const stored = localStorage.getItem('todo-manager-tasks')
    expect(stored).toBe(JSON.stringify(tasks))
  })

  it('persists an empty array correctly', () => {
    saveTasks([])
    expect(localStorage.getItem('todo-manager-tasks')).toBe('[]')
  })
})
