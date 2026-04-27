<script setup lang="ts">
import { ref } from 'vue'
import type { SingleProduct } from '../stores/product'
import { useProductStore } from '../stores/product'

const productStore = useProductStore()

const form = ref({
  name: '',
  description: '',
  price: 0,
  category: '',
  stock: 0,
  image: ''
})

const categories = ['İşletim Sistemi', 'Yazılım', 'Güvenlik', 'Donanım', 'Ağ', 'Diğer']
const loading = ref(false)
const success = ref(false)

const submitForm = () => {
  if (!form.value.name || !form.value.price || form.value.stock < 0) {
    alert('Lütfen zorunlu alanları doldurun!')
    return
  }

  loading.value = true

  setTimeout(() => {
    productStore.addProduct({
      name: form.value.name,
      description: form.value.description,
      price: form.value.price,
      category: form.value.category,
      stock: form.value.stock,
      image: form.value.image,
      type: 'single'
    })

    productStore.saveToStorage()

    // Reset form
    form.value = {
      name: '',
      description: '',
      price: 0,
      category: '',
      stock: 0,
      image: ''
    }

    success.value = true
    loading.value = false

    setTimeout(() => {
      success.value = false
    }, 3000)
  }, 500)
}
</script>

<template>
  <div class="single-product-form">
    <h3>Tekil Ürün Ekle</h3>

    <transition name="fade">
      <div v-if="success" class="success-message">
        ✓ Ürün başarıyla eklendi!
      </div>
    </transition>

    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">Ürün Adı *</label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          placeholder="Örn: Windows 11 Pro"
          required
        />
      </div>

      <div class="form-group">
        <label for="description">Açıklama</label>
        <textarea
          id="description"
          v-model="form.description"
          placeholder="Ürün açıklaması..."
          rows="3"
        ></textarea>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label for="price">Fiyat (₺) *</label>
          <input
            id="price"
            v-model.number="form.price"
            type="number"
            placeholder="1000"
            min="0"
            required
          />
        </div>

        <div class="form-group">
          <label for="stock">Stok Miktarı *</label>
          <input
            id="stock"
            v-model.number="form.stock"
            type="number"
            placeholder="10"
            min="0"
            required
          />
        </div>
      </div>

      <div class="form-group">
        <label for="category">Kategori</label>
        <select id="category" v-model="form.category">
          <option value="">Kategori Seçin</option>
          <option v-for="cat in categories" :key="cat" :value="cat">
            {{ cat }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="image">Resim URL</label>
        <input
          id="image"
          v-model="form.image"
          type="url"
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <button type="submit" :disabled="loading" class="submit-btn">
        <span v-if="!loading">ürün Ekle</span>
        <span v-else>Ekleniyor...</span>
      </button>
    </form>
  </div>
</template>

<style scoped>
.single-product-form {
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

.success-message {
  background: rgba(76, 175, 80, 0.2);
  border: 1px solid #4CAF50;
  color: #4CAF50;
  padding: 0.75rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-weight: 600;
}

.form-group {
  margin-bottom: 1.25rem;
  display: flex;
  flex-direction: column;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

label {
  margin-bottom: 0.5rem;
  color: var(--text-main);
  font-weight: 600;
  font-size: 0.95rem;
}

input, select, textarea {
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

.submit-btn {
  background: linear-gradient(135deg, var(--accent-color) 0%, rgba(51, 51, 255, 0.8) 100%);
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.5rem;
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
[data-theme='light'] .single-product-form {
  background: #f5f5f5;
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

/* Mobile */
@media (max-width: 640px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
