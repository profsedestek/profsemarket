<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useProductStore } from '../stores/product'
import type { Product } from '../stores/product'

const productStore = useProductStore()
const showClearPopup = ref(false)

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 0,
  }).format(price)
}

const getProductImage = (product: Product) => {
  if (product.image) return product.image
  if (product.type === 'package') return 'https://cdn-icons-png.flaticon.com/512/679/679720.png'
  return 'https://cdn-icons-png.flaticon.com/512/3659/3659898.png'
}

const openClearPopup = () => {
  showClearPopup.value = true
}

const closeClearPopup = () => {
  showClearPopup.value = false
}

const confirmClear = () => {
  productStore.clearHistory()
  showClearPopup.value = false
}

const goToProduct = (product: Product) => {
  // Ürün detay sayfasına yönlendirme (ileride eklenebilir)
  // Şimdilik store sayfasına yönlendirelim
  window.location.href = '/store'
}
</script>

<template>
  <aside class="left-bar">
    <div class="left-bar-header">
      <div class="left-bar-title">
        <Icon icon="material-symbols:history" width="22" height="22" />
        <span>Geçmiş</span>
      </div>
      <button
        v-if="productStore.recentlyViewed.length > 0"
        class="clear-btn"
        @click="openClearPopup"
        title="Tümünü Sil"
      >
        <Icon icon="material-symbols:delete-outline" width="20" height="20" />
      </button>
    </div>

    <div class="left-bar-content">
      <div v-if="productStore.recentlyViewed.length === 0" class="empty-state">
        <Icon icon="material-symbols:history" width="48" height="48" />
        <p>Henüz bir ürün görüntülemediniz.</p>
      </div>

      <div
        v-for="product in productStore.recentlyViewed"
        :key="product.id"
        class="history-card"
      >
        <div class="history-card-image">
          <img :src="getProductImage(product)" :alt="product.name" />
        </div>
        <div class="history-card-info">
          <h4 class="history-card-name">{{ product.name }}</h4>
          <p class="history-card-price">{{ formatPrice(product.price) }}</p>
        </div>
        <button class="history-card-action" @click="goToProduct(product)">
          <Icon icon="material-symbols:arrow-forward" width="16" height="16" />
        </button>
      </div>
    </div>

    <!-- Clear All Popup -->
    <div v-if="showClearPopup" class="popup-overlay" @click.self="closeClearPopup">
      <div class="popup-dialog">
        <div class="popup-icon">
          <Icon icon="material-symbols:warning" width="40" height="40" />
        </div>
        <h3 class="popup-title">Tümünü Sil</h3>
        <p class="popup-desc">Geçmişteki tüm ürünleri silmek istediğinize emin misiniz?</p>
        <div class="popup-actions">
          <button class="popup-btn popup-btn-cancel" @click="closeClearPopup">İptal</button>
          <button class="popup-btn popup-btn-confirm" @click="confirmClear">Sil</button>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.left-bar {
  width: 100%;
  height: 100%;
  background: var(--bg-color);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.left-bar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--border-color);
  flex-shrink: 0;
}

.left-bar-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-main);
}

.clear-btn {
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

.clear-btn:hover {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.left-bar-content {
  flex: 1;
  overflow-y: auto;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 2rem 1rem;
  color: var(--text-muted);
  text-align: center;
}

.empty-state p {
  font-size: 0.85rem;
  margin: 0;
}

.history-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%);
  border: 1px solid var(--border-color);
  border-radius: 14px;
  transition: all 0.2s ease;
}

.history-card:hover {
  border-color: rgba(51, 51, 255, 0.25);
  transform: translateY(-1px);
}

.history-card-image {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  overflow: hidden;
  flex-shrink: 0;
  background: var(--bg-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
}

.history-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.history-card-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.history-card-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-main);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.history-card-price {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--accent-color);
  margin: 0;
}

.history-card-action {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 200px;
  border: none;
  background: linear-gradient(135deg, var(--accent-color) 0%, rgba(51, 51, 255, 0.85) 100%);
  color: white;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(51, 51, 255, 0.25);
}

.history-card-action:hover {
  transform: scale(1.08);
  box-shadow: 0 6px 16px rgba(51, 51, 255, 0.35);
}

/* Popup */
.popup-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
}

.popup-dialog {
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 1.5rem;
  max-width: 320px;
  width: 100%;
  text-align: center;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.3);
  animation: popIn 0.2s ease-out;
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

.popup-icon {
  color: #ef4444;
  margin-bottom: 0.75rem;
}

.popup-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-main);
  margin: 0 0 0.5rem 0;
}

.popup-desc {
  font-size: 0.9rem;
  color: var(--text-muted);
  margin: 0 0 1.25rem 0;
  line-height: 1.5;
}

.popup-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
}

.popup-btn {
  padding: 0.6rem 1.4rem;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
}

.popup-btn-cancel {
  background: rgba(255, 255, 255, 0.06);
  color: var(--text-main);
  border: 1px solid var(--border-color);
}

.popup-btn-cancel:hover {
  background: rgba(255, 255, 255, 0.1);
}

.popup-btn-confirm {
  background: #ef4444;
  color: white;
}

.popup-btn-confirm:hover {
  background: #dc2626;
  transform: translateY(-1px);
}

/* Scrollbar */
.left-bar-content::-webkit-scrollbar {
  width: 4px;
}

.left-bar-content::-webkit-scrollbar-track {
  background: transparent;
}

.left-bar-content::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 4px;
}

/* Light mode overrides */
[data-theme='light'] .history-card {
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.03) 0%, rgba(0, 0, 0, 0.01) 100%);
}

[data-theme='light'] .popup-btn-cancel {
  background: rgba(0, 0, 0, 0.05);
}

[data-theme='light'] .popup-btn-cancel:hover {
  background: rgba(0, 0, 0, 0.08);
}
</style>
