<script setup lang="ts">
import { Icon } from '@iconify/vue'

// Sample cart items
const cartItems = [
  {
    id: 1,
    name: 'Premium Ürün Paketi',
    price: 299.99,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=80&h=80&fit=crop',
  },
  {
    id: 2,
    name: 'Pro Lisans',
    price: 149.99,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=80&fit=crop',
  },
  {
    id: 3,
    name: 'Eklenti Seti',
    price: 79.99,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1554655715-519e5a71c3e6?w=80&h=80&fit=crop',
  },
]

// Sample past orders
const pastOrders = [
  {
    id: 'ORD-001',
    date: '2024-01-15',
    total: 449.98,
    status: 'Teslim Edildi',
    items: [
      { name: 'Enterprise Paket', quantity: 1 },
      { name: 'Destek Planı', quantity: 1 },
    ],
  },
  {
    id: 'ORD-002',
    date: '2024-01-08',
    total: 199.99,
    status: 'İşlemde',
    items: [{ name: 'Standart Lisans', quantity: 1 }],
  },
  {
    id: 'ORD-003',
    date: '2024-01-02',
    total: 89.99,
    status: 'Teslim Edildi',
    items: [{ name: 'Temel Paket', quantity: 1 }],
  },
]

const handlePurchase = () => {
  console.log('Satın al')
}

const handleDelete = (itemId: number) => {
  console.log('Ürün sil:', itemId)
}

const formatPrice = (price: number) => {
  return price.toFixed(2)
}

const calculateTotal = () => {
  return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
}
</script>

<template>
  <div class="orders">
    <!-- Header Banner -->
    <div class="orders-banner">
      <div class="banner-gradient" />
      <div class="banner-content">
        <div class="banner-header">
          <Icon icon="material-symbols:shopping-cart" class="banner-icon" />
          <h2 class="banner-title">Siparişlerim</h2>
        </div>
      </div>
    </div>

    <!-- Cart Items Section -->
    <div class="cart-section">
      <h3 class="section-title">Sepettekiler</h3>
      <div class="cart-items">
        <div v-for="item in cartItems" :key="item.id" class="cart-item">
          <div class="item-image">
            <img :src="item.image" :alt="item.name" />
          </div>
          <div class="item-details">
            <h4 class="item-name">{{ item.name }}</h4>
            <div class="item-price">
              <span class="price">{{ formatPrice(item.price) }} TL</span>
              <span class="quantity">x{{ item.quantity }}</span>
            </div>
          </div>
          <div class="item-actions">
            <button class="action-btn purchase-btn" @click="handlePurchase">
              <Icon icon="material-symbols:shopping-cart-checkout" />
              <span>Satın al</span>
            </button>
            <button class="action-btn delete-btn" @click="handleDelete(item.id)">
              <Icon icon="material-symbols:delete" />
              <span>Sil</span>
            </button>
          </div>
        </div>
      </div>
      <div class="cart-total">
        <span class="total-label">Toplam:</span>
        <span class="total-amount">{{ formatPrice(calculateTotal()) }} TL</span>
      </div>
    </div>

    <!-- Past Orders Section -->
    <div class="past-orders-section">
      <h3 class="section-title">Geçmiş Siparişlerim</h3>
      <div class="past-orders">
        <div v-for="order in pastOrders" :key="order.id" class="order-card">
          <div class="order-header">
            <div class="order-info">
              <span class="order-id">{{ order.id }}</span>
              <span class="order-date">{{ order.date }}</span>
            </div>
            <span class="order-status" :class="order.status.toLowerCase().replace(' ', '-')">
              {{ order.status }}
            </span>
          </div>
          <div class="order-items">
            <div v-for="(item, index) in order.items" :key="index" class="order-item">
              {{ item.name }} x{{ item.quantity }}
            </div>
          </div>
          <div class="order-total">
            <span>Toplam: {{ formatPrice(order.total) }} TL</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.orders {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem;
}

/* Header Banner */
.orders-banner {
  position: relative;
  width: 100%;
  height: 120px;
  overflow: hidden;
  border-radius: 0;
}

.banner-gradient {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(135deg, rgba(51, 51, 255, 0.3) 0%, transparent 50%),
    linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.7) 100%);
  z-index: 1;
}

[data-theme='light'] .banner-gradient {
  background:
    linear-gradient(135deg, rgba(51, 51, 255, 0.2) 0%, transparent 50%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.8) 100%);
}

.banner-content {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.banner-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.banner-icon {
  width: 32px;
  height: 32px;
  color: white;
}

[data-theme='light'] .banner-icon {
  color: var(--text-main);
}

.banner-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin: 0;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

[data-theme='light'] .banner-title {
  color: var(--text-main);
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Section Titles */
.section-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-main);
  margin: 0 0 1rem 0;
}

/* Cart Section */
.cart-section {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid var(--border-color);
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--bg-color);
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.item-image {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details {
  flex: 1;
}

.item-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-main);
  margin: 0 0 0.5rem 0;
}

.item-price {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.price {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--accent-color);
}

.quantity {
  font-size: 0.75rem;
  color: var(--text-muted);
  background: var(--card-bg);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
}

.item-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.8rem;
  border-radius: 6px;
  border: none;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.purchase-btn {
  background: var(--accent-color);
  color: white;
}

.purchase-btn:hover {
  opacity: 0.8;
}

.delete-btn {
  background: transparent;
  color: #ef4444;
  border: 1px solid #ef4444;
}

.delete-btn:hover {
  background: #ef4444;
  color: white;
}

.cart-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0 0 0;
  border-top: 1px solid var(--border-color);
  margin-top: 1rem;
}

.total-label {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-main);
}

.total-amount {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--accent-color);
}

/* Past Orders Section */
.past-orders-section {
  background: var(--card-bg);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid var(--border-color);
}

.past-orders {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.order-card {
  padding: 1rem;
  background: var(--bg-color);
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.order-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.order-id {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-main);
}

.order-date {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.order-status {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

.order-status.teslim-edildi {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.order-status.i̇şlemde {
  background: rgba(251, 146, 60, 0.1);
  color: #fb923c;
}

.order-items {
  margin-bottom: 0.75rem;
}

.order-item {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-bottom: 0.25rem;
}

.order-total {
  padding-top: 0.75rem;
  border-top: 1px solid var(--border-color);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-main);
}

/* Mobile */
@media (max-width: 768px) {
  .orders {
    padding: 0.5rem;
  }

  .orders-banner {
    height: 100px;
  }

  .banner-content {
    padding: 1rem;
  }

  .banner-title {
    font-size: 1.25rem;
  }

  .banner-icon {
    width: 28px;
    height: 28px;
  }

  .cart-section,
  .past-orders-section {
    padding: 1rem;
  }

  .cart-item {
    flex-direction: column;
    text-align: center;
    gap: 0.75rem;
  }

  .item-actions {
    width: 100%;
    flex-direction: row;
    justify-content: center;
  }

  .action-btn {
    flex: 1;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .orders-banner {
    height: 80px;
  }

  .banner-title {
    font-size: 1.1rem;
  }

  .item-image {
    width: 50px;
    height: 50px;
  }

  .action-btn {
    padding: 0.4rem 0.6rem;
    font-size: 0.7rem;
  }
}
</style>
