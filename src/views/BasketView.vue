<script setup lang="ts">
import Wallet from '../components/Wallet.vue'
import Orders from '../components/Orders.vue'
</script>

<template>
  <main class="basket-page">
    <aside class="basket-wallet">
      <Wallet />
    </aside>
    <section class="basket-main">
      <Orders />
    </section>
  </main>
</template>

<style scoped>
.basket-page {
  display: flex;
  width: 100%;
  min-height: calc(100vh - 84px - 80px);
  margin-top: 84px;
  margin-bottom: 80px;
  box-sizing: border-box;
}

.basket-wallet {
  width: 33%;
  min-width: 260px;
  max-width: 380px;
  height: 100%;
  flex-shrink: 0;
  overflow-y: auto;
}

.basket-main {
  flex: 1;
  min-height: 100%;
  width: 100%;
  overflow-y: auto;
  display: block;
  padding: 1.5rem;
  box-sizing: border-box;
}

/* Mobile: hide wallet sidebar */
@media (max-width: 768px) {
  .basket-wallet {
    display: none;
  }

  .basket-page {
    min-height: calc(100vh - 84px - 80px);
  }

  .basket-main {
    padding: 1rem;
  }
}
</style>
