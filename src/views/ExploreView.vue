<script setup lang="ts">
import { useProductStore } from '../stores/product'
import Filters from '../components/Filters.vue'
import Categories from '../components/Categories.vue'

const productStore = useProductStore()
productStore.loadDemoData()
</script>

<template>
  <main class="explore-page">
    <Filters class="explore-filters" />
    <section class="explore-main">
      <Categories />
    </section>
  </main>
</template>

<style scoped>
.explore-page {
  display: flex;
  width: 100%;
  height: calc(100vh - 84px - 80px);
  margin-top: 84px;
  margin-bottom: 80px;
  overflow: hidden;
  box-sizing: border-box;
}

.explore-filters {
  width: 33%;
  min-width: 260px;
  max-width: 380px;
  height: 100%;
  flex-shrink: 0;
}

.explore-main {
  flex: 1;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 1.5rem;
  box-sizing: border-box;
}

/* Mobile: hide filters */
@media (max-width: 768px) {
  .explore-filters {
    display: none;
  }

  .explore-page {
    height: calc(100vh - 84px - 80px);
  }

  .explore-main {
    padding: 1rem;
  }
}
</style>
