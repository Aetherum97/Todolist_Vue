<template>
  <nav class="task-filter" aria-label="Filtrer les tâches">
    <span class="task-filter__label">Filtrer :</span>
    <div class="task-filter__buttons" role="group" aria-label="Filtre par statut">
      <!-- One button per filter option -->
      <button
        v-for="option in filterOptions"
        :key="option.value"
        class="task-filter__btn"
        :class="{ 'task-filter__btn--active': modelValue === option.value }"
        :aria-pressed="modelValue === option.value"
        @click="emit('update:modelValue', option.value)"
      >
        {{ option.label }}
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { Status } from '@/types/task'

// The current active filter is passed in via v-model
defineProps<{
  modelValue: Status | 'all'
}>()

const emit = defineEmits<{
  'update:modelValue': [value: Status | 'all']
}>()

// All available filter options (including "all")
const filterOptions: { label: string; value: Status | 'all' }[] = [
  { label: 'Toutes', value: 'all' },
  { label: 'À faire', value: Status.TODO },
  { label: 'En cours', value: Status.IN_PROGRESS },
  { label: 'Terminées', value: Status.DONE },
]
</script>

<style scoped>
.task-filter {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.task-filter__label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-muted);
}

.task-filter__buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.task-filter__btn {
  padding: 0.35rem 0.85rem;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  background-color: #fff;
  font-size: 0.825rem;
  cursor: pointer;
  color: var(--color-text);
  transition:
    background-color 0.2s,
    border-color 0.2s,
    color 0.2s;
}

.task-filter__btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.task-filter__btn--active {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: #fff;
}
</style>
