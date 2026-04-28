<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useProductStore } from '../stores/product'
import Filters from '../components/Filters.vue'
import Categories from '../components/Categories.vue'

const productStore = useProductStore()
productStore.loadDemoData()

const isDrawerOpen = ref(false)
const touchStartX = ref(0)
const touchEndX = ref(0)
const minSwipeDistance = 50

const openDrawer = () => {
  isDrawerOpen.value = true
}

const closeDrawer = () => {
  isDrawerOpen.value = false
}

const onTouchStart = (e: TouchEvent) => {
  touchStartX.value = e.touches[0]?.clientX ?? 0
}

const onTouchMove = (e: TouchEvent) => {
  touchEndX.value = e.touches[0]?.clientX ?? 0
}

const onTouchEnd = () => {
  const swipeDistance = touchEndX.value - touchStartX.value

  // Soldan sağa swipe (drawer aç)
  if (swipeDistance > minSwipeDistance && touchStartX.value < 50) {
    openDrawer()
  }

  // Sağdan sola swipe (drawer kapat)
  if (swipeDistance < -minSwipeDistance && isDrawerOpen.value) {
    closeDrawer()
  }
}

onMounted(() => {
  document.addEventListener('touchstart', onTouchStart, { passive: true })
  document.addEventListener('touchmove', onTouchMove, { passive: true })
  document.addEventListener('touchend', onTouchEnd, { passive: true })
})

onUnmounted(() => {
  document.removeEventListener('touchstart', onTouchStart)
  document.removeEventListener('touchmove', onTouchMove)
  document.removeEventListener('touchend', onTouchEnd)
})
</script>

<template>
  <main class="explore-page">
    <!-- Desktop Filters -->
    <Filters class="explore-filters" />

    <!-- Mobile Drawer Overlay -->
    <div
      v-if="isDrawerOpen"
      class="drawer-overlay"
      @click="closeDrawer"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
    >
      <div class="drawer-backdrop" @click="closeDrawer"></div>
      <aside class="mobile-drawer" @click.stop>
        <Filters />
      </aside>
    </div>

    <!-- Swipe Indicator (visible only on mobile when drawer closed) -->
    <div v-if="!isDrawerOpen" class="swipe-indicator" @click="openDrawer">
      <div class="swipe-line"></div>
    </div>

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

/* Mobile: hide filters and show drawer */
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

  .drawer-overlay {
    position: fixed;
    inset: 84px 0 80px 0;
    z-index: 1000;
    display: flex;
  }

  .drawer-backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    animation: fadeIn 0.3s ease;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .mobile-drawer {
    position: relative;
    width: min(85%, 380px);
    height: 100%;
    background: var(--bg-color);
    animation: slideIn 0.3s cubic-bezier(0.32, 0.72, 0, 1);
    z-index: 1001;
    overflow: hidden;
  }

  @keyframes slideIn {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }

  .mobile-drawer .filters {
    border-right: none;
  }

  .swipe-indicator {
    position: fixed;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 6px;
    height: 60px;
    background: var(--accent-color);
    border-radius: 0 4px 4px 0;
    opacity: 0.5;
    z-index: 5;
    cursor: pointer;
    transition: opacity 0.2s;
  }

  .swipe-indicator:hover,
  .swipe-indicator:active {
    opacity: 0.8;
  }

  .swipe-line {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 2px;
    height: 20px;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 1px;
  }
}
</style>
