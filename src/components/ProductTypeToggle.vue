<script setup lang="ts">
import { ref } from 'vue'

const productType = ref<'single' | 'package'>('single')

defineProps<{
  onTypeChange?: (type: 'single' | 'package') => void
}>()

const toggleType = (type: 'single' | 'package') => {
  productType.value = type
}
</script>

<template>
  <div class="product-type-toggle">
    <h2 class="toggle-title">Ürün Türü Seç</h2>

    <div class="toggle-container">
      <button
        :class="['toggle-btn', { active: productType === 'single' }]"
        @click="toggleType('single')"
      >
        <span class="icon">📦</span>
        <span class="label">Tekil Ürün</span>
      </button>

      <button
        :class="['toggle-btn', { active: productType === 'package' }]"
        @click="toggleType('package')"
      >
        <span class="icon">🎁</span>
        <span class="label">Ürün Paketi</span>
      </button>
    </div>

    <slot :productType="productType" />
  </div>
</template>

<style scoped>
.product-type-toggle {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  transition: all 0.3s ease;
}

.toggle-title {
  margin: 0 0 1.5rem 0;
  font-size: 1.3rem;
  color: var(--text-main);
}

.toggle-container {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.toggle-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1.5rem;
  border: 2px solid var(--border-color);
  border-radius: 12px;
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 1rem;
  font-weight: 600;
}

.toggle-btn:hover {
  border-color: var(--accent-color);
  color: var(--accent-color);
  transform: translateY(-2px);
}

.toggle-btn.active {
  background: linear-gradient(135deg, var(--accent-color) 0%, rgba(51, 51, 255, 0.1) 100%);
  border-color: var(--accent-color);
  color: var(--accent-color);
  box-shadow: 0 4px 12px rgba(51, 51, 255, 0.2);
}

.icon {
  font-size: 2rem;
  display: block;
}

.label {
  font-size: 0.95rem;
}

/* Light Mode */
[data-theme='light'] .product-type-toggle {
  background: #f5f5f5;
  border-color: #ddd;
}

[data-theme='light'] .toggle-btn {
  border-color: #ddd;
  color: #666;
}

[data-theme='light'] .toggle-btn:hover {
  border-color: #3333ff;
  color: #3333ff;
}

[data-theme='light'] .toggle-btn.active {
  background: linear-gradient(135deg, #3333ff 0%, rgba(51, 51, 255, 0.1) 100%);
  border-color: #3333ff;
  color: #3333ff;
}
</style>
