<template>
  <div class="app">
    <AppHeader />

    <main class="app__main">
      <!-- Task creation form -->
      <TaskForm @add="addTask" />

      <!-- Filter bar + task count -->
      <div class="app__toolbar">
        <TaskFilter v-model="activeFilter" />
        <span class="app__count" aria-live="polite">
          {{ filteredTasks.length }} tâche{{ filteredTasks.length !== 1 ? 's' : '' }}
        </span>
      </div>

      <!-- Task list (filtered) -->
      <TaskList
        :tasks="filteredTasks"
        @update="updateTaskStatus"
        @rename="renameTask"
        @delete="deleteTask"
      />
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import TaskForm from '@/components/TaskForm.vue'
import TaskFilter from '@/components/TaskFilter.vue'
import TaskList from '@/components/TaskList.vue'
import { loadTasks, saveTasks } from '@/services/localStorage.service'
import { Status } from '@/types/task'
import type { Task } from '@/types/task'

// ── State ─────────────────────────────────────────────────────────────────────

// The master list of all tasks
const tasks = ref<Task[]>([])

// The currently selected filter (default: show all tasks)
const activeFilter = ref<Status | 'all'>('all')

// ── Computed ──────────────────────────────────────────────────────────────────

// Returns only the tasks that match the active filter
const filteredTasks = computed<Task[]>(() => {
  if (activeFilter.value === 'all') return tasks.value
  return tasks.value.filter((t) => t.status === activeFilter.value)
})

// ── Persistence ───────────────────────────────────────────────────────────────

// Load saved tasks from localStorage when the app starts
onMounted(() => {
  tasks.value = loadTasks()
})

// Automatically save tasks to localStorage whenever the array changes
watch(tasks, (newTasks) => saveTasks(newTasks), { deep: true })

// ── Actions ───────────────────────────────────────────────────────────────────

// Creates a new task with a unique id and the default status (TODO)
function addTask(title: string): void {
  const newTask: Task = {
    id: crypto.randomUUID(),
    title,
    status: Status.TODO,
  }
  tasks.value = [...tasks.value, newTask]
}

// Updates the status of a task identified by its id
function updateTaskStatus(id: string, status: Status): void {
  tasks.value = tasks.value.map((t) => (t.id === id ? { ...t, status } : t))
}

// Renames a task identified by its id
function renameTask(id: string, title: string): void {
  tasks.value = tasks.value.map((t) => (t.id === id ? { ...t, title } : t))
}

// Removes a task from the list by its id
function deleteTask(id: string): void {
  tasks.value = tasks.value.filter((t) => t.id !== id)
}
</script>

<style>
/* Global styles are imported in main.ts via style.css */
</style>
