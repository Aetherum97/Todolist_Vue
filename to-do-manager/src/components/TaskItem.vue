<template>
  <li
    class="task-item"
    :class="`task-item--${task.status.replace(/ /g, '-')}`"
    :aria-label="`Tâche : ${task.title}`"
  >
    <!-- Title — shows input when editing, plain text otherwise -->
    <div class="task-item__title-area">
      <input
        v-if="isEditing"
        ref="editInputRef"
        v-model="editValue"
        class="task-item__edit-input"
        type="text"
        aria-label="Modifier le titre"
        @keyup.enter="confirmEdit"
        @keyup.escape="cancelEdit"
        @blur="confirmEdit"
      />
      <span v-else class="task-item__title">{{ task.title }}</span>
    </div>

    <!-- Controls: status select, edit button, delete button -->
    <div class="task-item__controls">
      <!-- Status selector -->
      <select
        class="task-item__status"
        :value="task.status"
        aria-label="Changer le statut"
        @change="onStatusChange"
      >
        <option v-for="s in statusOptions" :key="s.value" :value="s.value">
          {{ s.label }}
        </option>
      </select>

      <!-- Toggle edit mode -->
      <button
        v-if="!isEditing"
        class="task-item__btn task-item__btn--edit"
        aria-label="Modifier le titre"
        title="Modifier"
        @click="startEdit"
      >
        ✏️
      </button>
      <button
        v-else
        class="task-item__btn task-item__btn--confirm"
        aria-label="Confirmer la modification"
        title="Confirmer"
        @click="confirmEdit"
      >
        ✔️
      </button>

      <!-- Delete button -->
      <button
        class="task-item__btn task-item__btn--delete"
        aria-label="Supprimer la tâche"
        title="Supprimer"
        @click="emit('delete', task.id)"
      >
        🗑️
      </button>
    </div>
  </li>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { Status } from '@/types/task'
import type { Task } from '@/types/task'

const props = defineProps<{
  task: Task
}>()

const emit = defineEmits<{
  // Fired when the user changes the status via the <select>
  update: [id: string, status: Status]
  // Fired when the user renames the task
  rename: [id: string, title: string]
  // Fired when the user clicks the delete button
  delete: [id: string]
}>()

// ── Edit mode ────────────────────────────────────────────────────────────────
const isEditing = ref(false)
const editValue = ref('')
const editInputRef = ref<HTMLInputElement | null>(null)

async function startEdit(): Promise<void> {
  editValue.value = props.task.title
  isEditing.value = true
  // Wait for the input to be rendered, then focus it
  await nextTick()
  editInputRef.value?.focus()
}

function confirmEdit(): void {
  const trimmed = editValue.value.trim()
  if (trimmed && trimmed !== props.task.title) {
    emit('rename', props.task.id, trimmed)
  }
  isEditing.value = false
}

function cancelEdit(): void {
  isEditing.value = false
}

// ── Status change ─────────────────────────────────────────────────────────────
function onStatusChange(event: Event): void {
  const select = event.target as HTMLSelectElement
  emit('update', props.task.id, select.value as Status)
}

// ── Status options shown in the <select> ──────────────────────────────────────
const statusOptions: { label: string; value: Status }[] = [
  { label: '📋 À faire', value: Status.TODO },
  { label: '⏳ En cours', value: Status.IN_PROGRESS },
  { label: '✅ Terminée', value: Status.DONE },
]
</script>

<style scoped>
.task-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: var(--radius);
  border: 1px solid var(--color-border);
  background-color: #fff;
  list-style: none;
  transition: border-color 0.2s;
}

/* Left color accent depending on status */
.task-item--to-do {
  border-left: 4px solid var(--color-todo);
}
.task-item--in-progress {
  border-left: 4px solid var(--color-inprogress);
}
.task-item--done {
  border-left: 4px solid var(--color-done);
  opacity: 0.7;
}

.task-item__title-area {
  flex: 1;
  min-width: 0;
}

.task-item__title {
  font-size: 0.95rem;
  color: var(--color-text);
  word-break: break-word;
}

.task-item--done .task-item__title {
  text-decoration: line-through;
  color: var(--color-text-muted);
}

.task-item__edit-input {
  width: 100%;
  padding: 0.3rem 0.5rem;
  border: 1px solid var(--color-primary);
  border-radius: var(--radius);
  font-size: 0.95rem;
  outline: none;
}

.task-item__controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}

.task-item__status {
  padding: 0.3rem 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  font-size: 0.8rem;
  background-color: #fff;
  cursor: pointer;
}

.task-item__btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.2rem;
  border-radius: var(--radius);
  line-height: 1;
  transition: transform 0.1s;
}

.task-item__btn:hover {
  transform: scale(1.15);
}
</style>
