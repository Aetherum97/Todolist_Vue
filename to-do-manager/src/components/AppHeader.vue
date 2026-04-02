<template>
  <header class="app-header" role="banner">
    <div class="app-header__inner">
      <span class="app-header__logo" aria-hidden="true">✅</span>
      <h1 class="app-header__title">To-Do Manager</h1>
      <p class="app-header__subtitle">Organisez vos tâches simplement</p>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  background-color: var(--color-primary);
  color: #fff;
  padding: 1.5rem 1rem;
  text-align: center;
}

.app-header__inner {
  max-width: 720px;
  margin: 0 auto;
}

.app-header__logo {
  font-size: 2rem;
}

.app-header__title {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0.25rem 0 0;
}

.app-header__subtitle {
  font-size: 0.9rem;
  opacity: 0.85;
  margin: 0.25rem 0 0;
}
</style>
