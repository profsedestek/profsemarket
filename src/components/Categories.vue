<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '../stores/product'
import type { Product } from '../stores/product'

const productStore = useProductStore()
const router = useRouter()

const selectedCategory = ref('Tümü')
const sortBy = ref('popular')

const categories = [
  { id: 'all', name: 'Tümü', icon: 'material-symbols:grid-view' },
  { id: 'os', name: 'İşletim Sistemi', icon: 'material-symbols:computer' },
  { id: 'software', name: 'Yazılım', icon: 'material-symbols:apps' },
  { id: 'security', name: 'Güvenlik', icon: 'material-symbols:shield' },
  { id: 'hardware', name: 'Donanım', icon: 'material-symbols:memory' },
  { id: 'manav', name: 'Manav Barkod', icon: 'material-symbols:shopping-basket' },
  { id: 'market', name: 'Market Barkod', icon: 'material-symbols:store' },
  { id: 'nalbur', name: 'Nalbur Barkod', icon: 'material-symbols:handyman' },
  { id: 'butik', name: 'Butik Barkod', icon: 'material-symbols:checkroom' },
]

const sortOptions = [
  { value: 'popular', label: 'Popüler', icon: 'material-symbols:trending-up' },
  { value: 'price-low', label: 'Fiyat (Düşük)', icon: 'material-symbols:arrow-upward' },
  { value: 'price-high', label: 'Fiyat (Yüksek)', icon: 'material-symbols:arrow-downward' },
  { value: 'name', label: 'İsim', icon: 'material-symbols:sort' },
]

const filteredProducts = computed(() => {
  let all = productStore.allProducts

  // Filter by category
  if (selectedCategory.value !== 'all') {
    all = all.filter((p: Product) => {
      if (p.type === 'single') {
        return p.category === getCategoryName(selectedCategory.value)
      }
      return false
    })
  }

  // Sort
  return [...all].sort((a, b) => {
    switch (sortBy.value) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'name':
        return a.name.localeCompare(b.name)
      case 'popular':
      default:
        return 0
    }
  })
})

const getCategoryName = (id: string): string => {
  if (id === 'all') return 'Tümü'
  if (id === 'os') return 'İşletim Sistemi'
  if (id === 'software') return 'Yazılım'
  if (id === 'security') return 'Güvenlik'
  if (id === 'hardware') return 'Donanım'
  if (id === 'manav') return 'Manav Barkod Sistemi'
  if (id === 'market') return 'Market Barkod Sistemi'
  if (id === 'nalbur') return 'Nalbur Barkod Sistemi'
  if (id === 'butik') return 'Butik Barkod Sistemi'
  return ''
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 0,
  }).format(price)
}

const openDetails = (product: Product) => {
  router.push(`/explore/product/${product.id}`)
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
</script>

<template>
  <div class="categories">
    <!-- Hero Banner -->
    <div class="hero-banner">
      <div class="hero-banner-image" />
      <div class="hero-banner-gradient" />
    </div>

    <!-- Category Tabs -->
    <div class="category-tabs">
      <button
        v-for="cat in categories"
        :key="cat.id"
        class="category-tab"
        :class="{ active: selectedCategory === cat.id }"
        @click="selectedCategory = cat.id"
      >
        <Icon :icon="cat.icon" width="18" height="18" />
        <span>{{ cat.name }}</span>
      </button>
    </div>

    <!-- Sort Options -->
    <div class="sort-section">
      <div class="sort-label">Sırala:</div>
      <div class="sort-options">
        <button
          v-for="opt in sortOptions"
          :key="opt.value"
          class="sort-option"
          :class="{ active: sortBy === opt.value }"
          @click="sortBy = opt.value"
        >
          <Icon :icon="opt.icon" width="16" height="16" />
          <span>{{ opt.label }}</span>
        </button>
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
          <button class="info-btn" @click="openDetails(product)">
            <Icon icon="material-symbols:info" width="16" height="16" />
          </button>
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
.categories {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Hero Banner */
.hero-banner {
  position: relative;
  width: 100%;
  height: 120px;
  overflow: hidden;
}

.hero-banner-image {
  position: absolute;
  inset: 0;
  background: url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=300&fit=crop')
    center/cover no-repeat;
}

.hero-banner-gradient {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, var(--bg-color) 100%),
    linear-gradient(135deg, rgba(51, 51, 255, 0.15) 0%, transparent 60%);
}

/* Category Tabs */
.category-tabs {
  display: flex;
  gap: 0.5rem;
  padding: 0 0.5rem;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.category-tabs::-webkit-scrollbar {
  display: none;
}

.category-tab {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: transparent;
  color: var(--text-muted);
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;
}

.category-tab:hover {
  background: rgba(51, 51, 255, 0.06);
  color: var(--text-main);
}

.category-tab.active {
  background: var(--accent-color);
  border-color: var(--accent-color);
  color: white;
}

/* Sort Section */
.sort-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.5rem;
  gap: 1rem;
}

.sort-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-muted);
}

.sort-options {
  display: flex;
  gap: 0.25rem;
}

.sort-option {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.35rem 0.6rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: transparent;
  color: var(--text-muted);
  font-size: 0.7rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.sort-option:hover {
  background: rgba(51, 51, 255, 0.06);
  color: var(--text-main);
}

.sort-option.active {
  background: rgba(51, 51, 255, 0.1);
  border-color: rgba(51, 51, 255, 0.3);
  color: var(--accent-color);
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

.info-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  border: none;
  background: rgba(51, 51, 255, 0.1);
  color: var(--accent-color);
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.info-btn:hover {
  background: rgba(51, 51, 255, 0.2);
  transform: scale(1.05);
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
    height: 80px;
  }

  .sort-section {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    padding: 0 0.5rem;
  }

  .category-tabs {
    padding: 0 0.5rem;
  }

  .product-info {
    padding: 0.5rem;
    gap: 0.5rem;
  }

  .product-name {
    font-size: 0.7rem;
  }

  .info-btn {
    width: 24px;
    height: 24px;
  }

  .price-btn {
    font-size: 0.65rem;
    padding: 0.25rem 0.5rem;
  }
}

@media (max-width: 360px) {
  .category-tab {
    font-size: 0.75rem;
    padding: 0.4rem 0.6rem;
  }

  .sort-option {
    font-size: 0.65rem;
    padding: 0.3rem 0.5rem;
  }
}
</style>
