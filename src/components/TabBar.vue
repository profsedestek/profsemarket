<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useProductStore } from '../stores/product'
import { Icon } from '@iconify/vue'

const router = useRouter()
const route = useRoute()
const productStore = useProductStore()

const currentRoute = computed(() => route.name)

// Stats
const productCount = computed(() => productStore.products.length)
const packageCount = computed(() => productStore.packages.length)

const navigationItems = [
  {
    id: 'home',
    name: 'Ana Sayfa',
    icon: 'material-symbols:home',
    path: '/',
    badge: null,
  },
  {
    id: 'explore',
    name: 'Keşfet',
    icon: 'material-symbols:explore',
    path: '/explore',
    badge: productCount.value + packageCount.value,
  },
  {
    id: 'customer',
    name: 'Hesap',
    icon: 'profile',
    path: '/customer',
    badge: null,
  },
  {
    id: 'basket',
    name: 'Siparişlerim',
    icon: 'basket',
    path: '/basket',
    badge: null,
  },
]

const navigateTo = (path: string) => {
  router.push(path)
}

const isActive = (routeName: string) => {
  return currentRoute.value === routeName
}
</script>

<template>
  <nav class="tab-bar">
    <div class="tab-bar-container">
      <button
        v-for="item in navigationItems"
        :key="item.id"
        :class="['tab-item', { active: isActive(item.id) }]"
        @click="navigateTo(item.path)"
        :title="item.name"
      >
        <!-- Profile image for customer item -->
        <img
          v-if="item.icon === 'profile'"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face"
          alt="Profile"
          class="profile-tab-icon"
        />
        <!-- Basket icon for basket item -->
        <Icon
          v-else-if="item.icon === 'basket'"
          :icon="'material-symbols:shopping-cart'"
          class="tab-icon"
          width="24"
          height="24"
        />
        <!-- Regular icon for other items -->
        <Icon v-else :icon="item.icon" class="tab-icon" width="24" height="24" />
        <span class="tab-label">{{ item.name }}</span>
        <span v-if="item.badge && item.badge > 0" class="tab-badge">
          {{ item.badge }}
        </span>
      </button>
    </div>
  </nav>
</template>

<style scoped>
.tab-bar {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 400px;
  background: rgba(30, 30, 40, 0.75);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 250px;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.3),
    0 2px 8px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  z-index: 50;
  transition: all 0.3s ease;
  padding: 0.5rem;
}

[data-theme='light'] .tab-bar {
  background: rgba(255, 255, 255, 0.8);
  border-color: rgba(0, 0, 0, 0.06);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.1),
    0 2px 8px rgba(0, 0, 0, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

.tab-bar-container {
  width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.25rem;
  height: 56px;
}

.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.75rem;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

[data-theme='light'] .tab-item {
  color: rgba(0, 0, 0, 0.5);
}

.tab-item:hover {
  color: rgba(255, 255, 255, 0.9);
}

[data-theme='light'] .tab-item:hover {
  color: rgba(0, 0, 0, 0.8);
}

.tab-item.active {
  color: white;
  background: linear-gradient(135deg, var(--accent-color) 0%, rgba(51, 51, 255, 0.8) 100%);
  border-radius: 50px;
  box-shadow: 0 4px 12px rgba(51, 51, 255, 0.3);
}

.tab-icon {
  display: block;
  transition: transform 0.3s ease;
}

.profile-tab-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease;
}

[data-theme='light'] .profile-tab-icon {
  border-color: rgba(0, 0, 0, 0.1);
}

.tab-item:hover .tab-icon {
  transform: scale(1.1);
}

.tab-item:hover .profile-tab-icon {
  transform: scale(1.1);
}

.tab-item.active .tab-icon {
  transform: scale(1.1);
  animation: bounce 0.4s ease-out;
}

.tab-item.active .profile-tab-icon {
  transform: scale(1.1);
  animation: bounce 0.4s ease-out;
}

@keyframes bounce {
  0% {
    transform: scale(1.1) translateY(0);
  }
  50% {
    transform: scale(1.1) translateY(-3px);
  }
  100% {
    transform: scale(1.1) translateY(0);
  }
}

.tab-label {
  font-size: 0.65rem;
  font-weight: 600;
  white-space: nowrap;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}

.tab-item.active .tab-label {
  font-size: 0.65rem;
  font-weight: 700;
}

.tab-badge {
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  background: linear-gradient(135deg, #ff6b6b 0%, #ff4444 100%);
  color: white;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6rem;
  font-weight: 700;
  animation: badgeBounce 0.5s ease-out;
}

@keyframes badgeBounce {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

/* Mobile-first Responsive */
@media (max-width: 640px) {
  .tab-bar {
    bottom: 2rem;
    border-radius: 250px;
  }

  .tab-bar-container {
    height: 52px;
  }

  .tab-item {
    padding: 0.4rem;
    gap: 0.2rem;
  }

  .tab-label {
    font-size: 0.6rem;
  }

  .profile-tab-icon {
    width: 20px;
    height: 20px;
  }

  .tab-badge {
    width: 16px;
    height: 16px;
    font-size: 0.55rem;
    top: 0.15rem;
    right: 0.15rem;
  }
}

/* Tablet */
@media (min-width: 768px) {
  .tab-bar-container {
    height: 60px;
    gap: 0.25rem;
  }

  .tab-label {
    font-size: 0.7rem;
  }
}
</style>
