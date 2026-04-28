<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useProductStore } from '../stores/product'
import type { Product } from '../stores/product'

interface Props {
  product: Product | null
  isOpen: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
}>()

const productStore = useProductStore()
const currentImageIndex = ref(0)
const selectedProductId = ref<string | null>(null)
const hoverRating = ref(0)
const currentRating = ref(4.9)

const close = () => {
  emit('close')
}

const nextImage = () => {
  if (!props.product) return
  const images = getProductImages(props.product)
  currentImageIndex.value = (currentImageIndex.value + 1) % images.length
}

const prevImage = () => {
  if (!props.product) return
  const images = getProductImages(props.product)
  currentImageIndex.value =
    currentImageIndex.value === 0 ? images.length - 1 : currentImageIndex.value - 1
}

const getProductImages = (product: Product): string[] => {
  if (product.image) {
    return [product.image]
  }

  // Generate multiple placeholder images for slider
  const baseImage =
    product.type === 'package'
      ? 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop'
      : getProductCategoryImage(product)

  return [
    baseImage,
    `${baseImage}&auto=format&fit=crop&w=800&h=600&q=80`,
    `${baseImage}&auto=format&fit=crop&w=800&h=600&q=60`,
  ]
}

const getProductCategoryImage = (product: Product): string => {
  const categoryImages: Record<string, string> = {
    'Manav Barkod Sistemi':
      'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=800&h=600&fit=crop',
    'Market Barkod Sistemi':
      'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800&h=600&fit=crop',
    'Nalbur Barkod Sistemi':
      'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=800&h=600&fit=crop',
    'Butik Barkod Sistemi':
      'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&h=600&fit=crop',
    'İşletim Sistemi':
      'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&h=600&fit=crop',
    Yazılım: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=600&fit=crop',
    Güvenlik: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop',
    Donanım: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&h=600&fit=crop',
  }
  const category = product.type === 'single' ? product.category : undefined
  return (
    categoryImages[category || ''] ||
    'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=800&h=600&fit=crop'
  )
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 0,
  }).format(price)
}

const packageProducts = computed(() => {
  if (!props.product || props.product.type !== 'package') return []
  return productStore.getPackageProducts(props.product.id)
})

const features = computed(() => {
  if (!props.product || props.product.type !== 'package') return []

  const products = packageProducts.value
  return products.map((p) => ({
    name: p.name,
    description: p.description,
    price: formatPrice(p.price),
    stock: p.stock,
  }))
})

const selectedProduct = computed(() => {
  if (!selectedProductId.value) {
    // If no product selected, default to the current product if it's single
    if (props.product?.type === 'single') {
      return props.product
    }
    return null
  }
  return packageProducts.value.find((p) => p.id === selectedProductId.value)
})

const productFeatures = computed(() => {
  const p = selectedProduct.value || props.product
  if (!p) return []
  const features = []
  if (p.color) features.push({ label: 'Renk', value: p.color })
  if (p.scent) features.push({ label: 'Koku', value: p.scent })
  if (p.width) features.push({ label: 'En', value: p.width })
  if (p.height) features.push({ label: 'Boy', value: p.height })
  if (p.depth) features.push({ label: 'Yükseklik', value: p.depth })
  if (p.inch) features.push({ label: 'İnç', value: p.inch })
  if (p.ram) features.push({ label: 'RAM', value: p.ram })
  if (p.battery) features.push({ label: 'Batarya', value: p.battery })
  if (features.length === 0) {
    features.push({ label: 'Bilgi', value: 'Bu ürün için özellik bilgisi mevcut değil' })
  }
  return features
})
</script>

<template>
  <div v-if="isOpen && product" class="details-overlay" @click.self="close">
    <div class="details-container">
      <!-- Close Button -->
      <button class="close-btn" @click="close">
        <Icon icon="material-symbols:close" width="24" height="24" />
      </button>

      <!-- Image Dots (Top Center) -->
      <div v-if="getProductImages(product).length > 1" class="image-dots-top">
        <button
          v-for="(image, index) in getProductImages(product)"
          :key="index"
          class="dot"
          :class="{ active: currentImageIndex === index }"
          @click="currentImageIndex = index"
        />
      </div>

      <!-- Scrollable Content -->
      <div class="details-content">
        <!-- Image Gallery -->
        <div class="image-gallery">
          <div class="main-image">
            <img
              :src="getProductImages(product)[currentImageIndex]"
              :alt="product.name"
              class="gallery-image"
            />
            <div class="image-gradient"></div>
            <!-- Left Hover Zone -->
            <div
              v-if="getProductImages(product).length > 1"
              class="nav-zone nav-zone-left"
              @click="prevImage"
            >
              <div class="nav-zone-overlay"></div>
              <Icon icon="material-symbols:chevron-left" width="32" height="32" class="nav-arrow" />
            </div>
            <!-- Right Hover Zone -->
            <div
              v-if="getProductImages(product).length > 1"
              class="nav-zone nav-zone-right"
              @click="nextImage"
            >
              <div class="nav-zone-overlay"></div>
              <Icon
                icon="material-symbols:chevron-right"
                width="32"
                height="32"
                class="nav-arrow"
              />
            </div>
          </div>
        </div>

        <!-- Product Name -->
        <div class="product-name-section">
          <h1 class="product-name">{{ product.name }}</h1>
        </div>

        <!-- Product Info -->
        <div class="product-info">
          <div class="product-header">
            <div class="product-type">
              <Icon
                :icon="
                  product.type === 'package'
                    ? 'material-symbols:inventory-2'
                    : 'material-symbols:cube'
                "
                width="20"
                height="20"
              />
              <span>{{ product.type === 'package' ? 'Paket' : 'Tekil' }}</span>
            </div>
            <button class="price-button-header">
              {{ formatPrice(product.price) }}
            </button>
          </div>

          <p class="product-description">{{ product.description }}</p>

          <!-- Package Products Radio List -->
          <div class="package-products-list">
            <h3 class="section-title">
              {{ product.type === 'package' ? 'Paket Ürünleri' : 'Ürün' }}
            </h3>
            <div class="radio-list">
              <label
                v-for="pkgProduct in product.type === 'package' ? packageProducts : [product]"
                :key="pkgProduct.id"
                class="radio-item"
                :class="{
                  active:
                    selectedProductId === pkgProduct.id ||
                    (product.type === 'single' && !selectedProductId),
                }"
              >
                <input
                  type="radio"
                  :name="'package-product'"
                  :value="pkgProduct.id"
                  v-model="selectedProductId"
                  class="radio-input"
                  :checked="product.type === 'single' && !selectedProductId"
                />
                <span class="radio-label">{{ pkgProduct.name }}</span>
              </label>
            </div>
          </div>

          <!-- Product Features Table -->
          <div class="product-features-section">
            <h3 class="section-title">{{ (selectedProduct || product).name }} Özellikleri</h3>
            <div class="features-table">
              <div v-for="feature in productFeatures" :key="feature.label" class="feature-row">
                <div class="feature-label">{{ feature.label }}</div>
                <div class="feature-value">{{ feature.value }}</div>
              </div>
            </div>
          </div>

          <!-- Features Table for Package Products -->
          <div v-if="product.type === 'package' && features.length > 0" class="features-section">
            <h3 class="section-title">Ürün Özellikleri</h3>
            <div class="features-table">
              <div class="table-header">
                <div class="table-cell">Ürün</div>
                <div class="table-cell">Açıklama</div>
                <div class="table-cell">Fiyat</div>
                <div class="table-cell">Stok</div>
              </div>
              <div v-for="feature in features" :key="feature.name" class="table-row">
                <div class="table-cell">{{ feature.name }}</div>
                <div class="table-cell">{{ feature.description }}</div>
                <div class="table-cell">{{ feature.price }}</div>
                <div class="table-cell">{{ feature.stock }}</div>
              </div>
            </div>
          </div>

          <!-- Single Product Info -->
          <div v-else-if="product.type === 'single'" class="single-product-info">
            <div class="info-row">
              <span class="info-label">Kategori:</span>
              <span class="info-value">{{ product.category || 'Genel' }}</span>
            </div>
            <div class="info-row">
              <span class="info-label">Stok:</span>
              <span class="info-value">{{ product.stock }}</span>
            </div>
          </div>

          <!-- Seller Section -->
          <div class="seller-section">
            <div class="seller-info">
              <div class="seller-photo">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=250&h=250&fit=crop&crop=face"
                  alt="Satıcı"
                />
              </div>
              <div class="seller-details">
                <h3 class="seller-name">Profse Destek</h3>
                <div class="seller-rating">
                  <div class="star-rating" @mouseleave="hoverRating = 0">
                    <Icon
                      v-for="n in 5"
                      :key="n"
                      :icon="
                        n <= (hoverRating || Math.floor(currentRating))
                          ? 'material-symbols:star'
                          : 'material-symbols:star-outline'
                      "
                      width="16"
                      height="16"
                      class="star-icon"
                      :class="{ filled: n <= (hoverRating || Math.floor(currentRating)) }"
                      @mouseenter="hoverRating = n"
                      @click="currentRating = n"
                    />
                  </div>
                  <span class="rating-text">{{ currentRating.toFixed(1) }} (120+ satış)</span>
                </div>
              </div>
            </div>
            <button class="contact-seller-button">
              <Icon icon="ic:baseline-call" width="20" height="20" />
              Satıcı ile İletişime Geç
            </button>
          </div>
        </div>
      </div>

      <!-- Fixed Price Button (Desktop) -->
      <button class="price-button-desktop">
        {{ formatPrice(product.price) }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.details-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  animation: fadeIn 0.3s ease-out;
}

.details-container {
  background: var(--bg-color);
  border-radius: 0;
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.4);
  animation: slideUp 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  color: var(--text-main);
}

.details-content {
  flex: 1;
  overflow-y: auto;
  padding: 0;
  padding-bottom: 8rem;
}

.product-name-section {
  padding: 1.5rem 2rem 1rem;
  margin-top: -3rem;
  position: relative;
  z-index: 2;
}

.product-name {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--text-main);
  margin: 0;
  text-align: left;
}

.image-gallery {
  margin-bottom: 0;
}

.main-image {
  position: relative;
  width: 100%;
  height: 72vh;
  border-radius: 0;
  overflow: hidden;
  background: var(--border-color);
  margin-top: 0;
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0;
}

.image-gradient {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40%;
  background: linear-gradient(to top, var(--bg-color) 0%, transparent 100%);
  pointer-events: none;
}

.nav-zone {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 20%;
  display: flex;
  align-items: center;
  cursor: pointer;
  z-index: 5;
}

.nav-zone-left {
  left: 0;
  justify-content: flex-start;
  padding-left: 1rem;
}

.nav-zone-right {
  right: 0;
  justify-content: flex-end;
  padding-right: 1rem;
}

.nav-zone-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%);
  transition: all 0.3s ease;
  pointer-events: none;
}

.nav-zone-left .nav-zone-overlay {
  background: linear-gradient(to right, rgba(0, 0, 0, 0.3) 0%, transparent 100%);
  opacity: 0;
}

.nav-zone-right .nav-zone-overlay {
  background: linear-gradient(to left, rgba(0, 0, 0, 0.3) 0%, transparent 100%);
  opacity: 0;
}

.nav-zone:hover .nav-zone-overlay {
  opacity: 1;
}

.nav-arrow {
  color: white;
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.3s ease;
  z-index: 6;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
}

.nav-zone:hover .nav-arrow {
  opacity: 1;
  transform: scale(1);
}

.image-dots-top {
  position: absolute;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  z-index: 20;
  background: rgba(0, 0, 0, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 250px;
  backdrop-filter: blur(4px);
}

.dot {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: none;
  background: var(--border-color);
  cursor: pointer;
  transition: all 0.2s ease;
}

.dot.active {
  background: var(--accent-color);
  transform: scale(1.2);
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 0 2rem 2rem;
}

.product-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}

.product-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-main);
  margin: 0;
  line-height: 1.2;
}

.product-type {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(51, 51, 255, 0.1);
  border: 1px solid rgba(51, 51, 255, 0.2);
  border-radius: 20px;
  color: var(--accent-color);
  font-size: 0.8rem;
  font-weight: 600;
  flex-shrink: 0;
}

.product-description {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-muted);
  margin: 0;
}

.package-products-list {
  margin-top: 1.5rem;
}

.radio-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
}

.radio-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: rgba(51, 51, 255, 0.05);
  border: 1px solid var(--border-color);
  border-radius: 250px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.radio-item:hover {
  background: rgba(51, 51, 255, 0.1);
  border-color: var(--accent-color);
}

.radio-item.active {
  background: var(--accent-color);
  border-color: var(--accent-color);
  color: white;
}

.radio-item.active .radio-label {
  color: white;
}

.radio-input {
  appearance: none;
  width: 18px;
  height: 18px;
  border: 2px solid var(--border-color);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
}

.radio-input:checked {
  background: white;
  border-color: white;
}

.radio-item.active .radio-input {
  border-color: white;
}

.radio-item.active .radio-input:checked {
  background: white;
}

.radio-label {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-main);
  transition: color 0.2s ease;
}

.product-features-section {
  margin-top: 1.5rem;
}

.features-table {
  border: 1px solid var(--border-color);
  border-radius: 0;
  overflow: hidden;
  margin-top: 1rem;
}

.feature-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-bottom: 1px solid var(--border-color);
}

.feature-row:last-child {
  border-bottom: none;
}

.feature-label {
  padding: 1rem;
  font-weight: 600;
  color: var(--accent-color);
  background: rgba(51, 51, 255, 0.05);
  border-right: 1px solid var(--border-color);
}

.feature-value {
  padding: 1rem;
  color: var(--text-main);
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-main);
  margin: 0;
}

.features-section {
  margin-top: 1rem;
}

.features-table {
  border: 1px solid var(--border-color);
  border-radius: 0;
  overflow: hidden;
  margin-top: 1rem;
}

.table-header {
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 1fr;
  background: rgba(51, 51, 255, 0.05);
  border-bottom: 1px solid var(--border-color);
}

.table-row {
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 1fr;
  border-bottom: 1px solid var(--border-color);
}

.table-row:last-child {
  border-bottom: none;
}

.table-cell {
  padding: 1rem;
  font-size: 0.9rem;
  color: var(--text-main);
  border-right: 1px solid var(--border-color);
  display: flex;
  align-items: center;
}

.table-cell:last-child {
  border-right: none;
}

.table-header .table-cell {
  font-weight: 600;
  color: var(--accent-color);
}

.single-product-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: rgba(51, 51, 255, 0.05);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.info-label {
  font-weight: 600;
  color: var(--text-muted);
}

.info-value {
  font-weight: 600;
  color: var(--text-main);
}

.seller-section {
  margin-top: 2rem;
  padding: 1.5rem;
  background: rgba(51, 51, 255, 0.05);
  border-radius: 0;
  border: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}

.seller-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.seller-photo {
  width: 80px;
  height: 80px;
  border-radius: 250px;
  overflow: hidden;
  flex-shrink: 0;
}

.seller-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.seller-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.seller-name {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--text-main);
  margin: 0;
}

.seller-rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--text-muted);
  margin: 0;
}

.star-rating {
  display: flex;
  align-items: center;
  gap: 0.125rem;
}

.star-icon {
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.15s ease;
}

.star-icon.filled {
  color: #fbbf24;
}

.star-icon:hover {
  transform: scale(1.15);
}

.rating-text {
  font-size: 0.9rem;
  color: var(--text-muted);
}

.contact-seller-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border-radius: 250px;
  border: none;
  background: linear-gradient(135deg, var(--accent-color) 0%, rgba(51, 51, 255, 0.85) 100%);
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(51, 51, 255, 0.3);
  transition: all 0.2s ease;
  white-space: nowrap;
}

.contact-seller-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(51, 51, 255, 0.4);
}

.price-button-desktop {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 250px;
  height: 56px;
  border-radius: 28px;
  border: none;
  background: linear-gradient(135deg, var(--accent-color) 0%, rgba(51, 51, 255, 0.85) 100%);
  color: white;
  font-size: 1.125rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(51, 51, 255, 0.3);
  transition: all 0.2s ease;
  z-index: 10000;
}

.price-button-desktop:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(51, 51, 255, 0.4);
}

.price-button-header {
  display: none;
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, var(--accent-color) 0%, rgba(51, 51, 255, 0.85) 100%);
  border: 1px solid rgba(51, 51, 255, 0.2);
  border-radius: 20px;
  color: white;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(51, 51, 255, 0.3);
  transition: all 0.2s ease;
  white-space: nowrap;
}

.price-button-header:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(51, 51, 255, 0.4);
}

/* Light mode overrides */
[data-theme='light'] .details-container {
  background: white;
}

[data-theme='light'] .close-btn {
  background: rgba(0, 0, 0, 0.06);
}

[data-theme='light'] .close-btn:hover {
  background: rgba(0, 0, 0, 0.12);
}

/* Responsive */
@media (max-width: 768px) {
  .details-container {
    max-height: 95vh;
    border-radius: 0;
  }

  .details-content {
    padding: 0;
    padding-bottom: 7rem;
  }

  .main-image {
    height: 60vh;
  }

  .product-name-section {
    padding: 1rem 1.5rem 0.5rem;
  }

  .product-name {
    font-size: 1.5rem;
  }

  .product-info {
    padding: 0 1.5rem 1.5rem;
  }

  .radio-list {
    flex-direction: column;
    gap: 0.5rem;
  }

  .feature-row {
    grid-template-columns: 1fr;
  }

  .feature-label {
    border-right: none;
    border-bottom: 1px solid var(--border-color);
  }

  .feature-row:last-child .feature-label {
    border-bottom: none;
  }

  .product-header {
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  }

  .table-header,
  .table-row {
    grid-template-columns: 1fr;
  }

  .table-cell {
    border-right: none;
    border-bottom: 1px solid var(--border-color);
  }

  .table-cell:last-child {
    border-bottom: none;
  }

  .table-header {
    display: none;
  }

  .table-row {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
    border-bottom: 1px solid var(--border-color);
  }

  .table-cell {
    padding: 0;
    border: none;
  }

  .table-cell::before {
    content: attr(data-label);
    font-weight: 600;
    color: var(--accent-color);
    margin-bottom: 0.25rem;
  }

  .seller-section {
    flex-direction: column;
    text-align: center;
  }

  .seller-info {
    flex-direction: column;
  }

  .seller-photo {
    width: 80px;
    height: 80px;
  }

  .contact-seller-button {
    width: 100%;
    justify-content: center;
  }

  .price-button-desktop {
    display: none;
  }

  .price-button-header {
    display: block;
  }
}
</style>
