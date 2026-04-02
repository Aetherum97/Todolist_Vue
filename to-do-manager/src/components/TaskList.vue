<template>
  <section class="task-list" aria-label="Liste des tâches">
    <!-- Empty state message -->
    <p v-if="tasks.length === 0" class="task-list__empty" role="status">
      Aucune tâche à afficher. Créez-en une ci-dessus !
    </p>

    <!-- The actual list of tasks -->
    <ul v-else class="task-list__list">
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @update="(id, status) => emit('update', id, status)"
        @rename="(id, title) => emit('rename', id, title)"
        @delete="(id) => emit('delete', id)"
      />
    </ul>
  </section>
</template>

<script setup lang="ts">
import TaskItem from './TaskItem.vue'
import type { Task } from '@/types/task'
import { Status } from '@/types/task'

// Receives the (possibly filtered) list of tasks to display
defineProps<{
  tasks: Task[]
}>()

const emit = defineEmits<{
  update: [id: string, status: Status]
  rename: [id: string, title: string]
  delete: [id: string]
}>()
</script>

<style scoped>
.task-list__empty {
  text-align: center;
  color: var(--color-text-muted);
  padding: 2rem 0;
  font-size: 0.95rem;
}

.task-list__list {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  padding: 0;
  margin: 0;
}
</style>
