<template>
  <section class="task-form" aria-label="Créer une tâche">
    <h2 class="task-form__title">Nouvelle tâche</h2>

    <form class="task-form__form" @submit.prevent="handleSubmit" novalidate>
      <div class="task-form__field">
        <label for="task-title" class="task-form__label">Titre de la tâche</label>
        <input
          id="task-title"
          v-model="title"
          type="text"
          class="task-form__input"
          :class="{ 'task-form__input--error': errorMessage }"
          placeholder="Ex : Préparer la présentation..."
          aria-required="true"
          :aria-describedby="errorMessage ? 'task-title-error' : undefined"
          @input="errorMessage = ''"
        />
        <!-- Error message shown when the input is invalid -->
        <p
          v-if="errorMessage"
          id="task-title-error"
          class="task-form__error"
          role="alert"
          aria-live="polite"
        >
          {{ errorMessage }}
        </p>
      </div>

      <button type="submit" class="task-form__submit">Ajouter la tâche</button>
    </form>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// The event emitted when the user submits a valid task title
const emit = defineEmits<{
  add: [title: string]
}>()

const title = ref('')
const errorMessage = ref('')

function handleSubmit(): void {
  const trimmed = title.value.trim()

  // Validation: the title must not be empty
  if (!trimmed) {
    errorMessage.value = 'Le titre de la tâche ne peut pas être vide.'
    return
  }

  emit('add', trimmed)
  title.value = ''
  errorMessage.value = ''
}
</script>

<style scoped>
.task-form {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 1.25rem;
}

.task-form__title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 1rem;
  color: var(--color-text);
}

.task-form__field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 0.75rem;
}

.task-form__label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text);
}

.task-form__input {
  padding: 0.55rem 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.2s;
  background-color: #fff;
  color: var(--color-text);
}

.task-form__input:focus {
  border-color: var(--color-primary);
}

.task-form__input--error {
  border-color: var(--color-danger);
}

.task-form__error {
  color: var(--color-danger);
  font-size: 0.8rem;
  margin: 0;
}

.task-form__submit {
  width: 100%;
  padding: 0.6rem;
  background-color: var(--color-primary);
  color: #fff;
  border: none;
  border-radius: var(--radius);
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.task-form__submit:hover {
  background-color: var(--color-primary-dark);
}
</style>
