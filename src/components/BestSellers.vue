<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useProductStore } from '../stores/product'
import type { Product } from '../stores/product'

const productStore = useProductStore()

const showFilter = ref(false)
const selectedCategory = ref('Tümü')

const categories = [
  'Tümü',
  'Manav Barkod Sistemi',
  'Market Barkod Sistemi',
  'Nalbur Barkod Sistemi',
  'Butik Barkod Sistemi',
]

const getCategory = (p: Product): string | undefined => {
  if (p.type === 'single') return p.category
  return undefined
}

const filteredProducts = computed(() => {
  const all = productStore.allProducts
  if (selectedCategory.value === 'Tümü') return all
  return all.filter((p: Product) => getCategory(p) === selectedCategory.value)
})

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 0,
  }).format(price)
}

const getProductImage = (product: Product) => {
  if (product.image) return product.image
  if (product.type === 'package') {
    return 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop'
  }
  const categoryImages: Record<string, string> = {
    'Manav Barkod Sistemi':
      'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&h=300&fit=crop',
    'Market Barkod Sistemi':
      'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=400&h=300&fit=crop',
    'Nalbur Barkod Sistemi':
      'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=400&h=300&fit=crop',
    'Butik Barkod Sistemi':
      'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=400&h=300&fit=crop',
    'İşletim Sistemi':
      'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=400&h=300&fit=crop',
    Yazılım: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop',
    Güvenlik: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop',
    Donanım: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&h=300&fit=crop',
  }
  return (
    categoryImages[product.category || ''] ||
    'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=400&h=300&fit=crop'
  )
}

const closeFilter = () => {
  showFilter.value = false
}
</script>

<template>
  <div class="bestsellers">
    <!-- Hero Banner -->
    <div class="hero-banner">
      <div class="hero-banner-image" />
      <div class="hero-banner-gradient" />
    </div>

    <!-- Section Header -->
    <div class="section-header">
      <h2 class="section-title">En çok satanlar</h2>
      <button class="filter-toggle" @click="showFilter = true" title="Filtrele">
        <Icon icon="material-symbols:filter-list" width="22" height="22" />
      </button>
    </div>

    <!-- Active Filter Chip -->
    <div v-if="selectedCategory !== 'Tümü'" class="active-filter">
      <span>{{ selectedCategory }}</span>
      <button class="clear-filter" @click="selectedCategory = 'Tümü'">
        <Icon icon="material-symbols:close" width="14" height="14" />
      </button>
    </div>

    <!-- Filter Popup -->
    <div v-if="showFilter" class="filter-overlay" @click.self="closeFilter">
      <div class="filter-popup">
        <div class="filter-popup-header">
          <h3>Kategoriler</h3>
          <button class="filter-popup-close" @click="closeFilter">
            <Icon icon="material-symbols:close" width="22" height="22" />
          </button>
        </div>
        <div class="filter-popup-body">
          <label
            v-for="cat in categories"
            :key="cat"
            class="filter-option"
            :class="{ active: selectedCategory === cat }"
          >
            <input
              type="radio"
              name="category"
              :value="cat"
              v-model="selectedCategory"
              @change="closeFilter"
            />
            <span class="radio-circle">
              <span v-if="selectedCategory === cat" class="radio-dot" />
            </span>
            <span class="filter-label">{{ cat }}</span>
          </label>
        </div>
      </div>
    </div>

    <!-- Products Grid -->
    <div v-if="filteredProducts.length > 0" class="products-grid">
      <div v-for="product in filteredProducts" :key="product.id" class="product-card">
        <div
          class="product-image"
          :style="{ backgroundImage: `url(${getProductImage(product)})` }"
        />
        <div class="product-info">
          <h4 class="product-name">{{ product.name }}</h4>
          <button class="price-btn">{{ formatPrice(product.price) }}</button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="empty-state">
      <Icon icon="material-symbols:shopping-bag-outline" width="48" height="48" />
      <p>Bu kategoride ürün bulunamadı.</p>
    </div>
  </div>
</template>

<style scoped>
.bestsellers {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Hero Banner */
.hero-banner {
  position: relative;
  width: 100%;
  height: 160px;
  overflow: hidden;
}

.hero-banner-image {
  position: absolute;
  inset: 0;
  background: url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop')
    center/cover no-repeat;
}

.hero-banner-gradient {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, var(--bg-color) 100%),
    linear-gradient(135deg, rgba(51, 51, 255, 0.15) 0%, transparent 60%);
}

/* Section Header */
.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.5rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-main);
  margin: 0;
}

.filter-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: none;
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-toggle:hover {
  background: rgba(51, 51, 255, 0.1);
  color: var(--accent-color);
}

/* Active Filter Chip */
.active-filter {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.8rem;
  background: rgba(51, 51, 255, 0.1);
  border: 1px solid rgba(51, 51, 255, 0.2);
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--accent-color);
  width: fit-content;
  margin: 0 0.5rem;
}

.clear-filter {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: none;
  background: rgba(51, 51, 255, 0.15);
  color: var(--accent-color);
  cursor: pointer;
  padding: 0;
  transition: all 0.2s ease;
}

.clear-filter:hover {
  background: rgba(51, 51, 255, 0.25);
}

/* Filter Popup */
.filter-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  z-index: 9998;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  animation: fadeIn 0.2s ease-out;
}

.filter-popup {
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 1.25rem;
  max-width: 320px;
  width: 100%;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.3);
  animation: popIn 0.2s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes popIn {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.filter-popup-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.filter-popup-header h3 {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-main);
  margin: 0;
}

.filter-popup-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-popup-close:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-main);
}

.filter-popup-body {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.filter-option {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.7rem 0.75rem;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.15s ease;
  border: none;
  background: transparent;
  color: var(--text-main);
  font-size: 0.9rem;
}

.filter-option:hover {
  background: rgba(51, 51, 255, 0.06);
}

.filter-option.active {
  background: rgba(51, 51, 255, 0.1);
  font-weight: 600;
}

.filter-option input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.radio-circle {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.15s ease;
}

.filter-option.active .radio-circle {
  border-color: var(--accent-color);
}

.radio-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--accent-color);
}

/* Products Grid */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
  padding: 0 0.5rem;
}

.product-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%);
  border: 1px solid var(--border-color);
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  border-color: rgba(51, 51, 255, 0.3);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.product-image {
  width: 100%;
  aspect-ratio: 16 / 10;
  background-size: cover;
  background-position: center;
  position: relative;
}

.product-image::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 60%, rgba(0, 0, 0, 0.3) 100%);
}

.product-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.75rem;
}

.product-name {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-main);
  margin: 0;
  line-height: 1.3;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}

.price-btn {
  flex-shrink: 0;
  padding: 0.4rem 0.8rem;
  border-radius: 200px;
  border: none;
  background: linear-gradient(135deg, var(--accent-color) 0%, rgba(51, 51, 255, 0.85) 100%);
  color: white;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: default;
  box-shadow: 0 4px 12px rgba(51, 51, 255, 0.25);
}

/* Empty State */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 3rem 1rem;
  color: var(--text-muted);
  text-align: center;
}

.empty-state p {
  font-size: 0.9rem;
  margin: 0;
}

/* Light mode overrides */
[data-theme='light'] .filter-toggle:hover {
  background: rgba(51, 51, 255, 0.08);
}

[data-theme='light'] .filter-popup-close:hover {
  background: rgba(0, 0, 0, 0.06);
}

[data-theme='light'] .product-card {
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.02) 0%, rgba(0, 0, 0, 0.01) 100%);
}

/* Responsive */
@media (max-width: 768px) {
  .products-grid {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    padding: 0;
  }

  .product-card {
    width: 90%;
    max-width: 360px;
  }

  .hero-banner {
    height: 100px;
  }

  .section-header {
    padding: 0 0.5rem;
  }

  .section-title {
    font-size: 1.1rem;
  }

  .filter-toggle {
    width: 36px;
    height: 36px;
  }

  .product-info {
    padding: 0.75rem;
    gap: 0.75rem;
  }

  .product-name {
    font-size: 0.85rem;
  }

  .price-btn {
    font-size: 0.8rem;
    padding: 0.35rem 0.75rem;
  }

  .active-filter {
    margin: 0 0.5rem;
  }
}
</style>
