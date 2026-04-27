<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Navbar from './components/NavBar.vue'
import TabBar from './components/TabBar.vue'
import AiMode from './components/AIMode.vue'
import LazyLoad from './components/LazyLoad.vue'
import { useThemeStore } from './stores/theme'

const themeStore = useThemeStore()
const isAiOpen = ref(false)
const isLoading = ref(true)

const handleAiToggle = () => {
  isAiOpen.value = !isAiOpen.value
}

const closeAi = () => {
  isAiOpen.value = false
}

const handleLoaded = () => {
  isLoading.value = false
}

onMounted(() => {
  // Ensure theme is applied on mount
  themeStore.updateDocumentClass?.()
})
</script>

<template>
  <!-- Loading Screen -->
  <LazyLoad v-if="isLoading" @loaded="handleLoaded" />

  <!-- Main App -->
  <div v-else class="app-container">
    <Navbar :isAiActive="isAiOpen" @toggleAi="handleAiToggle" />

    <Transition name="ai-slide">
      <AiMode v-if="isAiOpen" @close="closeAi" />
    </Transition>

    <router-view v-if="!isAiOpen" />

    <!-- Tab Bar Navigation -->
    <TabBar />
  </div>
</template>

<style>
.app-container {
  height: 100vh;
  background-color: var(--bg-color);
  color: var(--text-main);
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
  overflow: hidden;
}

/* AI Modu Geçiş Animasyonu */
.ai-slide-enter-active,
.ai-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.ai-slide-enter-from,
.ai-slide-leave-to {
  opacity: 0;
  transform: translateY(-30px) scale(0.95);
}
</style>
