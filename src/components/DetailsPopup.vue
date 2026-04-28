<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import type { Product } from '../stores/product'

interface Props {
  product: Product | null
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
}>()

const currentImageIndex = ref(0)
const isImageViewMode = ref(false)

const images = computed(() => {
  if (!props.product) return []

  if (props.product.type === 'package') {
    // Return multiple images for package products
    return [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1554655715-519e5a71c3e6?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1554655715-519e5a71c3e6?w=600&h=400&fit=crop',
    ]
  } else {
    // Return single image for single products
    return [
      props.product.image ||
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
    ]
  }
})

const currentImage = computed(() => {
  return images.value[currentImageIndex.value] || ''
})

const nextImage = () => {
  if (images.value.length > 0) {
    currentImageIndex.value = (currentImageIndex.value + 1) % images.value.length
  }
}

const prevImage = () => {
  if (images.value.length > 0) {
    currentImageIndex.value =
      currentImageIndex.value === 0 ? images.value.length - 1 : currentImageIndex.value - 1
  }
}

const openImageView = (index: number) => {
  currentImageIndex.value = index
  isImageViewMode.value = true
}

const closeImageView = () => {
  isImageViewMode.value = false
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 0,
  }).format(price)
}

const getPackageFeatures = () => {
  if (!props.product || props.product.type !== 'package') return []

  // Return sample features for package products
  return [
    { name: 'Barkod Okuyucu', description: 'Hızlı ve hassas barkod okuma özelliği' },
    { name: 'Terazi Entegrasyonu', description: 'Dijital terazi ile tam entegrasyon' },
    { name: 'Fiş Yazıcı', description: 'Otomatik fiş yazdırma sistemi' },
    { name: 'Stok Takibi', description: 'Gerçek zamanlı stok yönetimi' },
    { name: 'Raporlama', description: 'Detaylı satış ve stok raporları' },
  ]
}

const closeDetails = () => {
  emit('close')
}
</script>

<template>
  <div class="details-overlay" @click.self="closeDetails">
    <div class="details-container" @click.stop>
      <!-- Close Button -->
      <button class="close-btn" @click="closeDetails">
        <Icon icon="material-symbols:close" width="24" height="24" />
      </button>

      <!-- Image Gallery with Full Width -->
      <div class="image-section">
        <div class="image-container">
          <!-- Main Image Display -->
          <div class="main-image-wrapper">
            <div
              v-if="!isImageViewMode"
              class="main-image"
              :style="{ backgroundImage: `url(${currentImage})` }"
              @click="openImageView(currentImageIndex)"
            />
            <div v-else class="main-image" :style="{ backgroundImage: `url(${currentImage})` }" />

            <!-- Navigation Buttons for Image View Mode -->
            <button
              v-if="isImageViewMode && images.length > 1"
              class="nav-btn prev-btn"
              @click="prevImage"
            >
              <Icon icon="material-symbols:chevron-left" width="24" height="24" />
            </button>
            <button
              v-if="isImageViewMode && images.length > 1"
              class="nav-btn next-btn"
              @click="nextImage"
            >
              <Icon icon="material-symbols:chevron-right" width="24" height="24" />
            </button>
            <button v-if="isImageViewMode" class="close-image-btn" @click="closeImageView">
              <Icon icon="material-symbols:close" width="24" height="24" />
            </button>
          </div>

          <!-- Slide Indicators -->
          <div v-if="images.length > 1" class="slide-indicators">
            <button
              v-for="(image, index) in images"
              :key="index"
              class="slide-dot"
              :class="{ active: index === currentImageIndex }"
              @click="currentImageIndex = index"
            />
          </div>
        </div>
      </div>

      <!-- Product Info -->
      <div class="info-section">
        <!-- Product Name and Type -->
        <div class="product-header">
          <h2 class="product-name">{{ props.product?.name }}</h2>
          <div class="product-type">
            <Icon
              :icon="
                props.product?.type === 'package'
                  ? 'material-symbols:inventory-2'
                  : 'material-symbols:package-2'
              "
              class="type-icon"
            />
            <span class="type-text">
              {{
                props.product?.type === 'package'
                  ? 'Bu ürün bir paket ürünüdür'
                  : 'Bu ürün tekil üründür'
              }}
            </span>
          </div>
        </div>

        <!-- Product Description -->
        <div class="product-description">
          <p>{{ props.product?.description }}</p>
        </div>

        <!-- Product Specifications Table -->
        <div class="specifications-section">
          <h3 class="specifications-title">Ürün Özellikleri</h3>
          <div class="specifications-table">
            <div class="spec-row">
              <div class="spec-label">Kategori</div>
              <div class="spec-value">
                {{ props.product?.type === 'single' ? props.product.category : 'Paket Ürünü' }}
              </div>
            </div>
            <div class="spec-row">
              <div class="spec-label">Stok Durumu</div>
              <div class="spec-value">
                {{ props.product?.type === 'single' ? `${props.product.stock} adet` : 'Sınırsız' }}
              </div>
            </div>
            <div class="spec-row">
              <div class="spec-label">Ürün Kodu</div>
              <div class="spec-value">
                PRD-{{ props.product?.id?.toString().padStart(6, '0') || '000001' }}
              </div>
            </div>
            <div class="spec-row">
              <div class="spec-label">Garanti Süresi</div>
              <div class="spec-value">24 Ay</div>
            </div>
            <div class="spec-row">
              <div class="spec-label">Teslimat Süresi</div>
              <div class="spec-value">2-3 İş Günü</div>
            </div>
          </div>
        </div>

        <!-- Package Features Table -->
        <div v-if="props.product?.type === 'package'" class="features-section">
          <h3 class="features-title">Paket Özellikleri</h3>
          <div class="features-table">
            <div v-for="feature in getPackageFeatures()" :key="feature.name" class="feature-row">
              <div class="feature-name">
                <Icon icon="material-symbols:check-circle" class="feature-icon" />
                <span>{{ feature.name }}</span>
              </div>
              <div class="feature-description">{{ feature.description }}</div>
            </div>
          </div>
        </div>

        <!-- Single Product Info -->
        <div v-if="props.product?.type === 'single'" class="single-product-info">
          <div class="info-row">
            <span class="info-label">Kategori:</span>
            <span class="info-value">{{ props.product?.category }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Stok:</span>
            <span class="info-value">{{ props.product?.stock }} adet</span>
          </div>
        </div>

        <!-- Seller Information -->
        <div class="seller-section">
          <div class="seller-info">
            <div class="seller-photo">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=250&h=250&fit=crop&crop=face"
                alt="Satıcı"
              />
            </div>
            <div class="seller-details">
              <h4 class="seller-name">Profse Teknoloji</h4>
              <p class="seller-description">Profesyonel market çözümleri sağlayıcısı</p>
            </div>
          </div>
          <button class="contact-seller-btn">
            <Icon icon="material-symbols:chat" width="20" height="20" />
            Satıcı ile iletişime geç
          </button>
        </div>
      </div>

      <!-- Fixed Price Button -->
      <div class="price-section">
        <button class="price-btn">
          {{ formatPrice(props.product?.price || 0) }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.details-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  overflow-y: auto;
}

.details-container {
  background: var(--card-bg);
  border-radius: 16px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: var(--accent-color);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 10;
}

.close-btn:hover {
  opacity: 0.8;
  transform: scale(1.05);
}

.image-section {
  position: relative;
  width: 100%;
  height: 80vh;
  background: var(--bg-color);
  overflow: hidden;
}

.image-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.main-image-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.main-image {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
  transition: all 0.3s ease;
}

.main-image:hover {
  transform: scale(1.02);
}

.slide-indicators {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 5;
}

.slide-dot {
  width: 250px;
  height: 250px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.slide-dot::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.8);
  opacity: 0;
  transition: all 0.3s ease;
}

.slide-dot.active {
  background: var(--accent-color);
}

.slide-dot.active::before {
  opacity: 1;
}

.slide-dot:hover {
  background: rgba(255, 255, 255, 0.5);
}

.slide-dot.active:hover {
  background: var(--accent-color);
  opacity: 0.8;
}

.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.nav-btn:hover {
  background: rgba(0, 0, 0, 0.9);
}

.prev-btn {
  left: 1rem;
}

.next-btn {
  right: 1rem;
}

.close-image-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.close-image-btn:hover {
  background: rgba(0, 0, 0, 0.9);
}

.info-section {
  padding: 2rem;
}

.product-header {
  margin-bottom: 1.5rem;
}

.product-name {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-main);
  margin: 0 0 1rem 0;
  line-height: 1.2;
}

.product-type {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: var(--bg-color);
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.type-icon {
  width: 20px;
  height: 20px;
  color: var(--accent-color);
}

.type-text {
  font-size: 0.9rem;
  color: var(--text-muted);
  font-weight: 500;
}

.product-description {
  margin-bottom: 2rem;
}

.product-description p {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-muted);
  margin: 0;
}

.features-section {
  margin-bottom: 2rem;
}

.features-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-main);
  margin: 0 0 1rem 0;
}

.features-table {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
}

.feature-row {
  display: grid;
  grid-template-columns: 200px 1fr;
  border-bottom: 1px solid var(--border-color);
}

.feature-row:last-child {
  border-bottom: none;
}

.feature-name {
  padding: 1rem;
  background: var(--bg-color);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  color: var(--text-main);
  border-right: 1px solid var(--border-color);
}

.feature-icon {
  width: 16px;
  height: 16px;
  color: var(--accent-color);
  flex-shrink: 0;
}

.feature-description {
  padding: 1rem;
  color: var(--text-muted);
  font-size: 0.9rem;
  line-height: 1.5;
}

.specifications-section {
  margin-bottom: 2rem;
}

.specifications-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-main);
  margin: 0 0 1rem 0;
}

.specifications-table {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
}

.spec-row {
  display: grid;
  grid-template-columns: 200px 1fr;
  border-bottom: 1px solid var(--border-color);
}

.spec-row:last-child {
  border-bottom: none;
}

.spec-label {
  padding: 1rem;
  background: var(--bg-color);
  font-weight: 500;
  color: var(--text-main);
  border-right: 1px solid var(--border-color);
}

.spec-value {
  padding: 1rem;
  color: var(--text-muted);
  font-size: 0.9rem;
  line-height: 1.5;
}

.seller-section {
  margin-top: 2rem;
  padding: 1.5rem;
  background: var(--bg-color);
  border-radius: 8px;
  border: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.seller-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.seller-photo {
  width: 250px;
  height: 250px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.seller-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.seller-details {
  flex: 1;
}

.seller-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-main);
  margin: 0 0 0.5rem 0;
}

.seller-description {
  font-size: 0.9rem;
  color: var(--text-muted);
  margin: 0;
  line-height: 1.4;
}

.contact-seller-btn {
  background: var(--accent-color);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 250px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
}

.contact-seller-btn:hover {
  opacity: 0.8;
  transform: translateY(-1px);
}

.price-section {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1001;
}

.price-btn {
  background: var(--accent-color);
  color: white;
  border: none;
  padding: 1rem 3rem;
  border-radius: 250px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 200px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.price-btn:hover {
  opacity: 0.8;
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
}

.single-product-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: var(--bg-color);
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.info-label {
  font-weight: 500;
  color: var(--text-muted);
}

.info-value {
  font-weight: 600;
  color: var(--text-main);
}

/* Mobile */
@media (max-width: 768px) {
  .details-overlay {
    padding: 0.5rem;
  }

  .details-container {
    max-height: 95vh;
    border-radius: 12px;
  }

  .image-section {
    height: 60vh;
  }

  .slide-dot {
    width: 60px;
    height: 60px;
  }

  .slide-dot::before {
    width: 8px;
    height: 8px;
  }

  .info-section {
    padding: 1rem;
  }

  .product-name {
    font-size: 1.5rem;
  }

  .specifications-table {
    grid-template-columns: 1fr;
  }

  .spec-label {
    border-right: none;
    border-bottom: 1px solid var(--border-color);
  }

  .spec-value {
    border-bottom: 1px solid var(--border-color);
  }

  .features-table {
    grid-template-columns: 1fr;
  }

  .feature-name {
    border-right: none;
    border-bottom: 1px solid var(--border-color);
  }

  .feature-description {
    border-bottom: 1px solid var(--border-color);
  }

  .seller-section {
    flex-direction: column;
    align-items: flex-start;
  }

  .seller-photo {
    width: 80px;
    height: 80px;
  }

  .price-section {
    bottom: 1rem;
    right: 1rem;
  }

  .price-btn {
    padding: 0.875rem 2rem;
    font-size: 1rem;
    min-width: 150px;
  }
}

@media (max-width: 480px) {
  .image-section {
    height: 50vh;
  }

  .product-type {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }

  .seller-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .contact-seller-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
