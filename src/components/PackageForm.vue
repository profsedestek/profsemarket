<script setup lang="ts">
import { ref, computed } from 'vue'
import { useProductStore } from '../stores/product'

const productStore = useProductStore()

const form = ref({
  name: '',
  description: '',
  productIds: [] as string[],
  discount: 0,
  badge: '' as '' | 'ekonomik' | 'popüler' | 'sınırlı'
})

const loading = ref(false)
const success = ref(false)

// Tekil ürünleri listele
const availableProducts = computed(() => productStore.products)

// Seçili ürünleri göster
const selectedProducts = computed(() => {
  return availableProducts.value.filter(p => form.value.productIds.includes(p.id))
})

// Paket fiyatını hesapla
const packagePrice = computed(() => {
  const total = selectedProducts.value.reduce((sum, p) => sum + p.price, 0)
  if (form.value.discount) {
    return Math.round(total * (1 - form.value.discount / 100))
  }
  return total
})

// Original fiyat (indirim öncesi)
const originalPrice = computed(() => {
  return selectedProducts.value.reduce((sum, p) => sum + p.price, 0)
})

// Ürün seçimi toggle
const toggleProductSelection = (productId: string) => {
  const index = form.value.productIds.indexOf(productId)
  if (index > -1) {
    form.value.productIds.splice(index, 1)
  } else {
    form.value.productIds.push(productId)
  }
}

// Ürün seçimini kaldır
const removeProduct = (productId: string) => {
  form.value.productIds = form.value.productIds.filter(id => id !== productId)
}

const submitForm = () => {
  if (!form.value.name || form.value.productIds.length === 0) {
    alert('Lütfen paket adı girin ve en az bir ürün seçin!')
    return
  }

  loading.value = true

  setTimeout(() => {
    productStore.addPackage({
      name: form.value.name,
      description: form.value.description,
      price: packagePrice.value,
      productIds: form.value.productIds,
      discount: form.value.discount,
      badge: form.value.badge as 'ekonomik' | 'popüler' | 'sınırlı' | undefined,
      type: 'package'
    })

    productStore.saveToStorage()

    // Reset form
    form.value = {
      name: '',
      description: '',
      productIds: [],
      discount: 0,
      badge: ''
    }

    success.value = true
    loading.value = false

    setTimeout(() => {
      success.value = false
    }, 3000)
  }, 500)
}

const badgeOptions = [
  { value: '', label: 'Badge Seçilmedi' },
  { value: 'ekonomik', label: '💰 Ekonomik' },
  { value: 'popüler', label: '⭐ Popüler' },
  { value: 'sınırlı', label: '🔥 Sınırlı Stok' }
]
</script>

<template>
  <div class="package-form">
    <h3>Ürün Paketi Oluştur</h3>

    <transition name="fade">
      <div v-if="success" class="success-message">
        ✓ Paket başarıyla oluşturuldu!
      </div>
    </transition>

    <form @submit.prevent="submitForm">
      <!-- Temel Bilgiler -->
      <div class="form-group">
        <label for="pkg-name">Paket Adı *</label>
        <input
          id="pkg-name"
          v-model="form.name"
          type="text"
          placeholder="Örn: İş Paketi - Yazılım Seti"
          required
        />
      </div>

      <div class="form-group">
        <label for="pkg-desc">Açıklama</label>
        <textarea
          id="pkg-desc"
          v-model="form.description"
          placeholder="Paket açıklaması..."
          rows="2"
        ></textarea>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="discount">İndirim (%)</label>
          <input
            id="discount"
            v-model.number="form.discount"
            type="number"
            placeholder="15"
            min="0"
            max="100"
          />
        </div>

        <div class="form-group">
          <label for="badge">Badge Türü</label>
          <select id="badge" v-model="form.badge">
            <option v-for="opt in badgeOptions" :key="opt.value" :value="opt.value">
              {{ opt.label }}
            </option>
          </select>
        </div>
      </div>

      <!-- Ürün Seçimi -->
      <div class="form-section">
        <h4>Ürünleri Seç</h4>

        <div class="available-products">
          <button
            v-for="product in availableProducts"
            :key="product.id"
            type="button"
            :class="['product-item', { selected: form.productIds.includes(product.id) }]"
            @click="toggleProductSelection(product.id)"
          >
            <div class="checkbox">
              <input
                type="checkbox"
                :checked="form.productIds.includes(product.id)"
                readonly
              />
            </div>
            <div class="product-info">
              <div class="product-name">{{ product.name }}</div>
              <div class="product-price">{{ product.price }}₺</div>
            </div>
          </button>

          <div v-if="availableProducts.length === 0" class="no-products">
            Henüz ürün eklenmedi. Lütfen önce tekil ürün ekleyin.
          </div>
        </div>
      </div>

      <!-- Seçili Ürünler -->
      <div v-if="selectedProducts.length > 0" class="selected-section">
        <h4>Seçili Ürünler ({{ selectedProducts.length }})</h4>

        <div class="selected-products">
          <div v-for="product in selectedProducts" :key="product.id" class="selected-item">
            <span class="name">{{ product.name }}</span>
            <span class="price">{{ product.price }}₺</span>
            <button
              type="button"
              class="remove-btn"
              @click="removeProduct(product.id)"
              title="Kaldır"
            >
              ✕
            </button>
          </div>
        </div>

        <!-- Fiyat Özeti -->
        <div class="price-summary">
          <div class="price-row">
            <span>Toplam Fiyat:</span>
            <span class="price">{{ originalPrice }}₺</span>
          </div>
          <div v-if="form.discount > 0" class="price-row discount">
            <span>İndirim (-{{ form.discount }}%):</span>
            <span class="price">-{{ originalPrice - packagePrice }}₺</span>
          </div>
          <div class="price-row total">
            <span>Paket Fiyatı:</span>
            <span class="price">{{ packagePrice }}₺</span>
          </div>
        </div>
      </div>

      <button
        type="submit"
        :disabled="loading || selectedProducts.length === 0"
        class="submit-btn"
      >
        <span v-if="!loading">Paketi Oluştur</span>
        <span v-else>Oluşturuluyor...</span>
      </button>
    </form>
  </div>
</template>

<style scoped>
.package-form {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 1.5rem;
  animation: slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

h3 {
  margin: 0 0 1.5rem 0;
  color: var(--text-main);
  font-size: 1.1rem;
}

h4 {
  margin: 1.5rem 0 1rem 0;
  color: var(--text-main);
  font-size: 1rem;
}

.success-message {
  background: rgba(76, 175, 80, 0.2);
  border: 1px solid #4CAF50;
  color: #4CAF50;
  padding: 0.75rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-weight: 600;
}

.form-group, .form-row {
  margin-bottom: 1.25rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-main);
  font-weight: 600;
  font-size: 0.95rem;
}

input, select, textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: transparent;
  color: var(--text-main);
  font-family: inherit;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: var(--accent-color);
  box-shadow: 0 0 0 3px rgba(51, 51, 255, 0.1);
}

.form-section {
  background: rgba(51, 51, 255, 0.05);
  border: 1px dashed var(--border-color);
  border-radius: 8px;
  padding: 1rem;
  margin: 1.5rem 0;
}

.available-products {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.75rem;
}

.product-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  background: transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
}

.product-item:hover {
  border-color: var(--accent-color);
}

.product-item.selected {
  background: rgba(51, 51, 255, 0.1);
  border-color: var(--accent-color);
}

.checkbox {
  display: flex;
  align-items: center;
}

.checkbox input {
  width: 1.2rem;
  height: 1.2rem;
  cursor: pointer;
}

.product-info {
  flex: 1;
  min-width: 0;
}

.product-name {
  color: var(--text-main);
  font-weight: 600;
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.product-price {
  color: var(--text-muted);
  font-size: 0.85rem;
  margin-top: 0.25rem;
}

.no-products {
  grid-column: 1 / -1;
  text-align: center;
  color: var(--text-muted);
  padding: 2rem 1rem;
}

.selected-section {
  background: rgba(76, 175, 80, 0.05);
  border: 1px solid rgba(76, 175, 80, 0.2);
  border-radius: 8px;
  padding: 1rem;
  margin: 1.5rem 0;
}

.selected-products {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.selected-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: rgba(51, 51, 255, 0.05);
  border-radius: 6px;
  font-size: 0.95rem;
}

.selected-item .name {
  flex: 1;
  color: var(--text-main);
  font-weight: 500;
}

.selected-item .price {
  color: var(--accent-color);
  font-weight: 600;
  margin: 0 1rem;
}

.remove-btn {
  background: rgba(255, 0, 0, 0.1);
  border: 1px solid rgba(255, 0, 0, 0.3);
  color: #ff4444;
  width: 28px;
  height: 28px;
  padding: 0;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: bold;
}

.remove-btn:hover {
  background: rgba(255, 0, 0, 0.2);
  border-color: #ff4444;
}

.price-summary {
  background: rgba(51, 51, 255, 0.08);
  border-radius: 6px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.price-row {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  color: var(--text-main);
}

.price-row.discount {
  color: #ff9800;
}

.price-row.total {
  border-top: 2px solid var(--border-color);
  padding-top: 1rem;
  margin-top: 0.5rem;
  font-weight: 600;
  color: var(--accent-color);
}

.price {
  font-weight: 600;
}

.submit-btn {
  width: 100%;
  background: linear-gradient(135deg, var(--accent-color) 0%, rgba(51, 51, 255, 0.8) 100%);
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(51, 51, 255, 0.3);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Light Mode */
[data-theme='light'] .package-form {
  background: #f5f5f5;
  border-color: #ddd;
}

[data-theme='light'] .form-section {
  background: rgba(51, 51, 255, 0.03);
  border-color: #ddd;
}

[data-theme='light'] input,
[data-theme='light'] select,
[data-theme='light'] textarea {
  background: white;
  color: #1a1a1a;
  border-color: #ddd;
}

[data-theme='light'] input:focus,
[data-theme='light'] select:focus,
[data-theme='light'] textarea:focus {
  border-color: #3333ff;
}

[data-theme='light'] .product-item {
  border-color: #ddd;
}

[data-theme='light'] .product-item:hover,
[data-theme='light'] .product-item.selected {
  border-color: #3333ff;
}

/* Mobile */
@media (max-width: 640px) {
  .form-row,
  .available-products {
    grid-template-columns: 1fr;
  }
}
</style>
