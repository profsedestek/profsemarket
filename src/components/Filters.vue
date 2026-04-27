<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const priceRange = ref([0, 10000])
const selectedCategories = ref<string[]>([])
const selectedRatings = ref<number[]>([])
const inStock = ref(true)

const categories = [
  'İşletim Sistemi',
  'Yazılım',
  'Güvenlik',
  'Donanım',
  'Manav Barkod Sistemi',
  'Market Barkod Sistemi',
  'Nalbur Barkod Sistemi',
  'Butik Barkod Sistemi',
]

const ratings = [5, 4, 3, 2, 1]

const toggleCategory = (category: string) => {
  const index = selectedCategories.value.indexOf(category)
  if (index > -1) {
    selectedCategories.value.splice(index, 1)
  } else {
    selectedCategories.value.push(category)
  }
}

const toggleRating = (rating: number) => {
  const index = selectedRatings.value.indexOf(rating)
  if (index > -1) {
    selectedRatings.value.splice(index, 1)
  } else {
    selectedRatings.value.push(rating)
  }
}

const clearAll = () => {
  priceRange.value = [0, 10000]
  selectedCategories.value = []
  selectedRatings.value = []
  inStock.value = true
}
</script>

<template>
  <div class="filters">
    <div class="filters-header">
      <div class="filters-title">
        <Icon icon="material-symbols:filter-list" width="20" height="20" />
        <span>Filtreler</span>
      </div>
      <button class="clear-all" @click="clearAll" title="Tümünü Temizle">
        <Icon icon="material-symbols:clear-all" width="18" height="18" />
      </button>
    </div>

    <div class="filters-body">
      <!-- Fiyat Aralığı -->
      <div class="filter-section">
        <h4 class="filter-section-title">Fiyat Aralığı</h4>
        <div class="price-range">
          <div class="range-inputs">
            <div class="range-input">
              <span>Min</span>
              <input
                type="number"
                v-model.number="priceRange[0]"
                min="0"
                :max="priceRange[1]"
                class="price-input"
              />
            </div>
            <div class="range-input">
              <span>Max</span>
              <input
                type="number"
                v-model.number="priceRange[1]"
                :min="priceRange[0]"
                max="50000"
                class="price-input"
              />
            </div>
          </div>
          <div class="range-slider">
            <input
              type="range"
              v-model.number="priceRange[0]"
              min="0"
              :max="priceRange[1]"
              class="slider min-slider"
            />
            <input
              type="range"
              v-model.number="priceRange[1]"
              :min="priceRange[0]"
              max="50000"
              class="slider max-slider"
            />
          </div>
        </div>
      </div>

      <!-- Kategoriler -->
      <div class="filter-section">
        <h4 class="filter-section-title">Kategoriler</h4>
        <div class="filter-options">
          <label
            v-for="cat in categories"
            :key="cat"
            class="filter-option"
            :class="{ active: selectedCategories.includes(cat) }"
          >
            <input
              type="checkbox"
              :checked="selectedCategories.includes(cat)"
              @change="toggleCategory(cat)"
            />
            <span class="checkmark">
              <Icon v-if="selectedCategories.includes(cat)" icon="material-symbols:check" width="14" height="14" />
            </span>
            <span class="filter-label">{{ cat }}</span>
          </label>
        </div>
      </div>

      <!-- Değerlendirme -->
      <div class="filter-section">
        <h4 class="filter-section-title">Değerlendirme</h4>
        <div class="filter-options">
          <label
            v-for="rating in ratings"
            :key="rating"
            class="filter-option"
            :class="{ active: selectedRatings.includes(rating) }"
          >
            <input
              type="checkbox"
              :checked="selectedRatings.includes(rating)"
              @change="toggleRating(rating)"
            />
            <span class="checkmark">
              <Icon v-if="selectedRatings.includes(rating)" icon="material-symbols:check" width="14" height="14" />
            </span>
            <span class="filter-label">
              <span class="stars">
                <Icon
                  v-for="i in rating"
                  :key="i"
                  icon="material-symbols:star"
                  width="12"
                  height="12"
                  class="star"
                />
              </span>
              <span class="rating-text">{{ rating }} ve üzeri</span>
            </span>
          </label>
        </div>
      </div>

      <!-- Stok Durumu -->
      <div class="filter-section">
        <h4 class="filter-section-title">Stok Durumu</h4>
        <div class="filter-options">
          <label class="filter-option" :class="{ active: inStock }">
            <input type="checkbox" v-model="inStock" />
            <span class="checkmark">
              <Icon v-if="inStock" icon="material-symbols:check" width="14" height="14" />
            </span>
            <span class="filter-label">Sadece stoktakiler</span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.filters {
  width: 100%;
  height: 100%;
  background: var(--bg-color);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Header */
.filters-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--border-color);
  flex-shrink: 0;
}

.filters-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-main);
}

.clear-all {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 10px;
  border: none;
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.2s ease;
}

.clear-all:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-main);
}

/* Body */
.filters-body {
  flex: 1;
  overflow-y: auto;
  padding: 1rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Filter Section */
.filter-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.filter-section-title {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--text-main);
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Price Range */
.price-range {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.range-inputs {
  display: flex;
  gap: 0.75rem;
}

.range-input {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.range-input span {
  font-size: 0.7rem;
  color: var(--text-muted);
  font-weight: 600;
}

.price-input {
  width: 100%;
  padding: 0.4rem 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.02);
  color: var(--text-main);
  font-size: 0.8rem;
  outline: none;
  transition: all 0.2s ease;
}

.price-input:focus {
  border-color: rgba(51, 51, 255, 0.4);
  box-shadow: 0 0 0 3px rgba(51, 51, 255, 0.08);
}

.range-slider {
  position: relative;
  height: 32px;
  display: flex;
  align-items: center;
}

.slider {
  position: absolute;
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background: var(--border-color);
  outline: none;
  -webkit-appearance: none;
  appearance: none;
  pointer-events: none;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--accent-color);
  cursor: pointer;
  pointer-events: all;
  box-shadow: 0 2px 8px rgba(51, 51, 255, 0.3);
}

.slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--accent-color);
  cursor: pointer;
  pointer-events: all;
  border: none;
  box-shadow: 0 2px 8px rgba(51, 51, 255, 0.3);
}

.min-slider {
  z-index: 2;
}

.max-slider {
  z-index: 1;
}

/* Filter Options */
.filter-options {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.filter-option {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 0.75rem;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.15s ease;
  border: none;
  background: transparent;
  color: var(--text-main);
  font-size: 0.85rem;
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

.checkmark {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 4px;
  border: 2px solid var(--border-color);
  flex-shrink: 0;
  transition: all 0.15s ease;
  color: white;
}

.filter-option.active .checkmark {
  background: var(--accent-color);
  border-color: var(--accent-color);
}

.filter-label {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stars {
  display: flex;
  align-items: center;
  gap: 1px;
}

.star {
  color: #ffaa00;
}

.rating-text {
  font-size: 0.8rem;
  color: var(--text-muted);
}

/* Mobile */
@media (max-width: 768px) {
  .filters {
    border-right: none;
    border-bottom: 1px solid var(--border-color);
  }

  .filters-body {
    padding: 0.75rem 1rem;
    gap: 1rem;
  }

  .filter-section-title {
    font-size: 0.8rem;
  }

  .filter-option {
    padding: 0.5rem 0.6rem;
    font-size: 0.8rem;
  }
}
</style>
