<template>
  <footer class="app-footer" role="contentinfo">
    <p class="app-footer__text">&copy; {{ currentYear }} To-Do Manager &mdash; Code2Work</p>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.app-footer {
  background-color: var(--color-surface);
  border-top: 1px solid var(--color-border);
  padding: 1rem;
  text-align: center;
}

.app-footer__text {
  color: var(--color-text-muted);
  font-size: 0.85rem;
  margin: 0;
}
</style>
