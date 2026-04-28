<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const mouseX = ref(0)
const mouseY = ref(0)
const isVisible = ref(false)
let timeoutId: ReturnType<typeof setTimeout> | null = null

const updateMousePosition = (e: MouseEvent) => {
  mouseX.value = e.clientX
  mouseY.value = e.clientY
  isVisible.value = true

  // Clear existing timeout
  if (timeoutId) clearTimeout(timeoutId)

  // Hide after mouse stops moving
  timeoutId = setTimeout(() => {
    isVisible.value = false
  }, 100)
}

const handleMouseEnter = () => {
  isVisible.value = true
}

const handleMouseLeave = () => {
  isVisible.value = false
}

onMounted(() => {
  document.addEventListener('mousemove', updateMousePosition, { passive: true })
  document.addEventListener('mouseenter', handleMouseEnter)
  document.addEventListener('mouseleave', handleMouseLeave)
})

onUnmounted(() => {
  document.removeEventListener('mousemove', updateMousePosition)
  document.removeEventListener('mouseenter', handleMouseEnter)
  document.removeEventListener('mouseleave', handleMouseLeave)
  if (timeoutId) clearTimeout(timeoutId)
})
</script>

<template>
  <div class="mouse-follower-container">
    <!-- Ana mavi ışık -->
    <div
      class="mouse-light"
      :style="{
        transform: `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`,
        opacity: isVisible ? 1 : 0,
      }"
    />
    <!-- Dış glow efekti -->
    <div
      class="mouse-glow-outer"
      :style="{
        transform: `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`,
        opacity: isVisible ? 0.6 : 0,
      }"
    />
    <!-- İç parlak nokta -->
    <div
      class="mouse-core"
      :style="{
        transform: `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`,
        opacity: isVisible ? 1 : 0,
      }"
    />
  </div>
</template>

<style scoped>
.mouse-follower-container {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 99999;
}

.mouse-light {
  position: absolute;
  top: 0;
  left: 0;
  width: 250px;
  height: 250px;
  background: radial-gradient(
    circle,
    rgba(51, 51, 255, 0.5) 0%,
    rgba(51, 51, 255, 0.3) 15%,
    rgba(51, 51, 255, 0.15) 35%,
    rgba(51, 51, 255, 0.05) 55%,
    transparent 100%
  );
  filter: blur(0px);
  transition: opacity 0.15s ease;
  will-change: transform;
}

.mouse-glow-outer {
  position: absolute;
  top: 0;
  left: 0;
  width: 400px;
  height: 400px;
  background: radial-gradient(
    circle,
    rgba(51, 51, 255, 0.2) 0%,
    rgba(51, 51, 255, 0.1) 25%,
    rgba(51, 51, 255, 0.05) 45%,
    transparent 65%
  );
  filter: blur(15px);
  transition: opacity 0.2s ease;
  will-change: transform;
}

.mouse-core {
  position: absolute;
  top: 0;
  left: 0;
  width: 6px;
  height: 6px;
  background: #3333ff;
  border-radius: 50%;
  box-shadow:
    0 0 8px #3333ff,
    0 0 16px #3333ff,
    0 0 32px #3333ff,
    0 0 60px rgba(51, 51, 255, 0.5);
  transition: opacity 0.1s ease;
  will-change: transform;
}

/* Mobil cihazlarda gizle */
@media (pointer: coarse) {
  .mouse-follower-container {
    display: none;
  }
}
</style>
