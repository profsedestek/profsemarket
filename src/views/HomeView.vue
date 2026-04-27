<script setup lang="ts">
import { useProductStore } from '../stores/product'
import LeftBar from '../components/LeftBar.vue'
import BestSellers from '../components/BestSellers.vue'

const productStore = useProductStore()
productStore.loadDemoData()

// Demo geçmiş verisi ekle (gerçek uygulamada ürün sayfasından eklenecek)
if (productStore.recentlyViewed.length === 0 && productStore.allProducts.length > 0) {
  productStore.allProducts.slice(0, 4).forEach((p) => {
    productStore.addToHistory(p)
  })
}
</script>

<template>
  <main class="home-page">
    <LeftBar class="home-leftbar" />
    <section class="home-main">
      <BestSellers />
    </section>
  </main>
</template>

<style scoped>
.home-page {
  display: flex;
  width: 100%;
  height: calc(100vh - 84px - 80px);
  margin-top: 84px;
  margin-bottom: 80px;
  overflow: hidden;
  box-sizing: border-box;
}

.home-leftbar {
  width: 33%;
  min-width: 260px;
  max-width: 380px;
  height: 100%;
  flex-shrink: 0;
}

.home-main {
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

/* Mobile: hide leftbar */
@media (max-width: 768px) {
  .home-leftbar {
    display: none;
  }

  .home-page {
    height: calc(100vh - 84px - 80px);
  }

  .home-main {
    padding: 1rem;
  }
}
</style>
