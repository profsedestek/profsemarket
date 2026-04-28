<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useRouter } from 'vue-router'
import { useThemeStore } from '../stores/theme'

const router = useRouter()

// App.vue'dan gelen kontrol değişkeni
defineProps<{
  isAiActive: boolean
}>()

// App.vue'ya AI modunu açma/kapama emri göndermek için
const emit = defineEmits(['toggleAi'])

const themeStore = useThemeStore()

const isSearchOpen = ref(false)
const searchQuery = ref('')
const isMenuOpen = ref(false)
const isHistoryOpen = ref(false)
const isLogoHovered = ref(false)

const openSearch = () => {
  isSearchOpen.value = true
  isMenuOpen.value = false
  isHistoryOpen.value = false
  setTimeout(() => {
    const input = document.querySelector('.search-input') as HTMLInputElement
    if (input) input.focus()
  }, 50)
}

const closeSearch = () => {
  isSearchOpen.value = false
  searchQuery.value = ''
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  if (isMenuOpen.value) isHistoryOpen.value = false
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const goToAbout = () => {
  router.push('/about')
}
</script>

<template>
  <nav class="navbar">
    <div class="container">
      <div v-if="!isSearchOpen" class="nav-content">
        <button
          class="logo-link"
          @click="goToAbout"
          @touchstart.passive="goToAbout"
          @mouseenter="isLogoHovered = true"
          @mouseleave="isLogoHovered = false"
        >
          <!-- Normal state: profsesvg.svg -->
          <img v-if="!isLogoHovered" src="/profsesvg.svg" alt="Profse" class="logo-icon" />

          <!-- Hover state: profselogo.svg + Mağaza text (desktop only) -->
          <div v-else class="logo-hover-content">
            <img src="/profselong.svg" alt="Profse" class="logo-hover-icon" />
            <span class="logo-text">Mağaza</span>
          </div>
        </button>

        <div class="nav-right">
          <ul class="nav-links">
            <li class="nav-icon-item" @click="openSearch">
              <Icon icon="material-symbols:search" width="30" height="30" />
            </li>

            <li
              class="nav-icon-item theme-toggle-btn"
              @click="themeStore.toggleTheme()"
              :title="themeStore.isDark ? 'Açık moda geç' : 'Koyu moda geç'"
            >
              <Icon
                :icon="
                  themeStore.isDark ? 'material-symbols:light-mode' : 'material-symbols:dark-mode'
                "
                width="30"
                height="30"
              />
            </li>

            <li class="nav-icon-item menu-trigger" @click="toggleMenu">
              <Icon
                :icon="isMenuOpen ? 'material-symbols:close' : 'material-symbols:menu'"
                width="30"
                height="30"
              />
              <div v-if="isMenuOpen" class="menu-popup">
                <a href="/notifications" class="menu-item-link" @click.stop="closeMenu">
                  <Icon icon="material-symbols:notifications" width="24" height="24" />
                  <span>Bildirimler</span>
                </a>
                <a href="/shipping" class="menu-item-link" @click.stop="closeMenu">
                  <Icon icon="material-symbols:local-shipping" width="24" height="24" />
                  <span>Kargolama</span>
                </a>
              </div>
            </li>

            <li
              class="nav-icon-item ai-toggle-btn"
              :class="{ 'is-active': isAiActive }"
              @click="emit('toggleAi')"
            >
              <Icon
                :icon="isAiActive ? 'material-symbols:close-rounded' : 'ic:baseline-auto-fix-high'"
                width="30"
                height="30"
              />
            </li>
          </ul>
        </div>
      </div>

      <div v-else class="search-overlay">
        <Icon icon="material-symbols:search" width="28" height="28" />
        <input
          type="text"
          v-model="searchQuery"
          class="search-input"
          placeholder="Ara..."
          @keyup.esc="closeSearch"
        />
        <div class="search-actions">
          <Icon icon="material-symbols:mic" width="28" height="28" class="action-icon" />
          <Icon
            icon="material-symbols:close"
            width="32"
            height="32"
            class="action-icon close-btn"
            @click="closeSearch"
          />
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* Dark Mode (default) */
.navbar {
  max-width: 600px;
  margin: 0 auto;
  background-color: transparent;
  color: #fff;
  padding: 0 1rem;
  height: 64px;
  display: flex;
  align-items: center;
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 2rem);
  z-index: 100;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}

@media screen and (max-width: 640px) {
  .navbar {
    min-width: 90%;
    border-radius: 0;
  }
}

/* Light Mode */
[data-theme='light'] .navbar {
  background-color: transparent;
  color: #1a1a1a;
}

.container {
  width: 100%;
  height: 100%;
  position: relative;
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
}

.nav-right {
  display: flex;
  align-items: center;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
}

.nav-icon-item {
  position: relative;
  cursor: pointer;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  transition: all 0.2s ease;
}

/* Dark Mode - hover */
.navbar .nav-icon-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 0;
}

/* Light Mode - hover */
[data-theme='light'] .navbar .nav-icon-item:hover {
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 0;
}

/* Theme Toggle Button */
.theme-toggle-btn {
  transition: transform 0.3s ease;
}

.theme-toggle-btn:hover {
  transform: scale(1.1);
  border-radius: 0;
}

/* AI Butonu Özel Stili */
.ai-toggle-btn.is-active {
  background-color: rgba(51, 51, 255, 0.15);
  color: #3333ff;
}

.ai-toggle-btn.is-active:hover {
  background-color: rgba(51, 51, 255, 0.25);
  border-radius: 0;
}

/* Arama Overlay */
.search-overlay {
  display: flex;
  align-items: center;
  width: calc(100% + 2rem);
  height: 100%;
  background-color: rgba(30, 30, 40, 0.85);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  position: absolute;
  top: 0;
  left: -1rem;
  padding: 0 1.5rem;
  border-radius: 250px;
  z-index: 10;
  animation: fadeIn 0.15s ease-out;
  transition: background-color 0.3s ease;
}

/* Light Mode - search overlay */
[data-theme='light'] .search-overlay {
  background-color: rgba(220, 220, 230, 0.9);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.search-input {
  flex: 1;
  background: transparent;
  border: none;
  color: inherit;
  font-size: 1.2rem;
  padding: 0 15px;
  outline: none;
}

/* Light Mode - search input */
[data-theme='light'] .search-input {
  color: #1a1a1a;
}

/* Popup Menü */
.menu-popup {
  position: absolute;
  top: 70px;
  right: 0;
  background-color: #333;
  border: 1px solid #444;
  border-radius: 14px;
  padding: 8px;
  min-width: 180px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
  z-index: 9999;
  animation: popIn 0.2s ease-out;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;
}

/* Light Mode - menu popup */
[data-theme='light'] .menu-popup {
  background-color: #f5f5f5;
  border-color: #ddd;
}

@keyframes popIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.menu-item-link {
  display: flex;
  align-items: center;
  gap: 12px;
  color: inherit;
  text-decoration: none;
  padding: 12px;
  border-radius: 8px;
  transition: background 0.2s;
}

/* Dark Mode - menu item */
.navbar .menu-item-link {
  color: #fff;
}

.navbar .menu-item-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* Light Mode - menu item */
[data-theme='light'] .navbar .menu-item-link {
  color: #1a1a1a;
}

[data-theme='light'] .navbar .menu-item-link:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.action-icon:hover {
  border-radius: 50%;
}

/* Dark Mode - action icon hover */
.navbar .action-icon:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* Light Mode - action icon hover */
[data-theme='light'] .navbar .action-icon:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.search-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo-link {
  color: inherit;
  display: flex;
  align-items: center;
}

.logo-icon {
  width: 30px;
  height: 30px;
  filter: invert(1);
  transition: all 0.3s ease;
}

[data-theme='light'] .logo-icon {
  filter: none;
}

/* Logo Hover Content */
.logo-hover-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: all 0.3s ease;
}

.logo-hover-icon {
  width: 120px;
  height: auto;
  filter: invert(1);
}

[data-theme='light'] .logo-hover-icon {
  filter: none;
}

.logo-text {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-main);
  white-space: nowrap;
}

/* Mobile: Hide hover content */
@media (max-width: 768px) {
  .logo-hover-content {
    display: none;
  }

  .logo-link:hover .logo-icon {
    display: block;
  }
}

.logo-link {
  color: inherit;
  display: flex;
  align-items: center;
  text-decoration: none;
  border: none;
  background: none;
  cursor: pointer;
  padding: 8px;
  transition: background 0.2s;
  font-family: inherit;
  font-size: inherit;
}

/* Dark Mode - logo link */
.navbar .logo-link {
  color: #fff;
}

.navbar .logo-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* Light Mode - logo link */
[data-theme='light'] .navbar .logo-link {
  color: #1a1a1a;
}

[data-theme='light'] .navbar .logo-link:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

/* Mobile History Drawer */
.history-drawer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 9998;
  display: flex;
  justify-content: flex-end;
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.history-drawer {
  width: min(85%, 380px);
  height: 100%;
  background: var(--bg-color);
  display: flex;
  flex-direction: column;
  animation: slideIn 0.25s cubic-bezier(0.32, 0.72, 0, 1);
  border-left: 1px solid var(--border-color);
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

.history-drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--border-color);
  flex-shrink: 0;
}

.history-drawer-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-main);
}

.history-drawer-close {
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

.history-drawer-close:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-main);
}

.history-drawer-body {
  flex: 1;
  overflow: hidden;
}

.history-drawer-body .left-bar {
  border-right: none;
}

[data-theme='light'] .history-drawer-close:hover {
  background: rgba(0, 0, 0, 0.08);
}

@media (min-width: 769px) {
  .history-drawer-overlay {
    display: none;
  }
}
</style>
