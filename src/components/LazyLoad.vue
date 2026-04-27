<script setup lang="ts">
import { onMounted, ref } from 'vue'

const isVisible = ref(false)

const emit = defineEmits<{
  loaded: []
}>()

onMounted(() => {
  isVisible.value = true
  
  // 2 saniye sonra loaded event'i gönder
  setTimeout(() => {
    emit('loaded')
  }, 2000)
})
</script>

<template>
  <div v-if="isVisible" class="lazy-load">
    <div class="lazy-content">
      <img 
        src="/profsesvg.svg" 
        alt="Profse" 
        class="lazy-logo"
      />
      <div class="lazy-text">
        <div class="lazy-dots">
          <span class="dot"></span>
          <span class="dot"></span>
          <span class="dot"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.lazy-load {
  position: fixed;
  inset: 0;
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-color);
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.lazy-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.lazy-logo {
  width: 80px;
  height: 80px;
  animation: rotateLogo 2s linear infinite;
  filter: invert(1);
}

[data-theme='light'] .lazy-logo {
  filter: none;
}

@keyframes rotateLogo {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.lazy-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.lazy-dots {
  display: flex;
  gap: 0.5rem;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent-color);
  animation: dotPulse 1.4s ease-in-out infinite both;
}

.dot:nth-child(1) {
  animation-delay: -0.32s;
}

.dot:nth-child(2) {
  animation-delay: -0.16s;
}

.dot:nth-child(3) {
  animation-delay: 0s;
}

@keyframes dotPulse {
  0%, 80%, 100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  40% {
    transform: scale(1.2);
    opacity: 1;
  }
}

/* Exit animation */
.lazy-load.exit {
  animation: fadeOut 0.3s ease-out forwards;
}

@keyframes fadeOut {
  from { 
    opacity: 1;
  }
  to { 
    opacity: 0;
  }
}
</style>
