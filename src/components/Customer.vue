<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const showMenu = ref(false)
const selectedLanguage = ref('tr')
const filterEnabled = ref(true)

const handleShareProfile = () => {
  showMenu.value = false
  console.log('Profil paylaş')
}

const handleEditProfile = () => {
  showMenu.value = false
  console.log('Profil düzenle')
}

const closeMenu = () => {
  showMenu.value = false
}

const handleAppleConnect = () => {
  console.log('Apple ile bağlan')
}

const handleGoogleConnect = () => {
  console.log('Google ile bağlan')
}

const handleToggleFilter = () => {
  filterEnabled.value = !filterEnabled.value
}
</script>

<template>
  <div class="customer">
    <!-- Profile Banner -->
    <div class="profile-banner">
      <div class="banner-gradient" />
      <div class="banner-content">
        <div class="profile-info">
          <div class="profile-photo">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=250&h=250&fit=crop&crop=face"
              alt="Profile"
              class="profile-img"
            />
          </div>
          <div class="profile-details">
            <h3 class="profile-name">Ahmet Yılmaz</h3>
            <span class="profile-role">Müşteri</span>
          </div>
        </div>

        <!-- Menu Button -->
        <button class="menu-btn" @click="showMenu = !showMenu">
          <Icon icon="material-symbols:more-vert" width="24" height="24" />
        </button>
      </div>
    </div>

    <!-- Menu Popup -->
    <Transition name="menu-popup">
      <div v-if="showMenu" class="menu-popup" @click="closeMenu">
        <div class="menu-content" @click.stop>
          <button class="menu-item" @click="handleShareProfile">
            <Icon icon="material-symbols:share" width="20" height="20" />
            <span>Profili paylaş</span>
          </button>
          <button class="menu-item" @click="handleEditProfile">
            <Icon icon="material-symbols:edit" width="20" height="20" />
            <span>Profili düzenle</span>
          </button>
        </div>
      </div>
    </Transition>

    <!-- Settings Section -->
    <div class="settings-section">
      <div class="settings-header">
        <Icon icon="material-symbols:settings" width="20" height="20" />
        <span>Ayarlar</span>
      </div>
    </div>

    <!-- Connection Buttons -->
    <div class="connection-section">
      <button class="connect-btn apple-btn" @click="handleAppleConnect">
        <img src="/apple.svg" alt="Apple" class="connect-icon" />
        <span>Apple ile bağlan</span>
      </button>
      <button class="connect-btn google-btn" @click="handleGoogleConnect">
        <img src="/google.svg" alt="Google" class="connect-icon" />
        <span>Google ile bağlan</span>
      </button>
    </div>

    <!-- Language Selection -->
    <div class="language-section">
      <span class="section-label">Dil</span>
      <select v-model="selectedLanguage" class="language-select">
        <option value="tr">Türkçe</option>
        <option value="en">English</option>
        <option value="de">Deutsch</option>
        <option value="fr">Français</option>
      </select>
    </div>

    <!-- Filter Toggle -->
    <div class="filter-section">
      <span class="section-label">Önemsiz olabilecekleri filtrele</span>
      <button class="toggle-btn" :class="{ active: filterEnabled }" @click="handleToggleFilter">
        <div class="toggle-slider"></div>
      </button>
    </div>

    <!-- Favorites Section -->
    <div class="favorites-section">
      <div class="section-header">
        <Icon icon="material-symbols:favorite" width="20" height="20" />
        <span>Favoriler</span>
      </div>
    </div>

    <!-- Footer -->
    <div class="customer-footer">
      <img src="/profselong.svg" alt="Profse" class="footer-logo" />
      <span class="footer-text">Mağaza</span>
    </div>

    <!-- Footer Links -->
    <div class="footer-links">
      <!-- Şirket Category -->
      <div class="link-category">
        <h4 class="category-header">Şirket</h4>
        <div class="link-list">
          <a href="#" class="footer-link">Kariyer</a>
          <a href="#" class="footer-link">Yazılım</a>
          <a href="#" class="footer-link">Diğer ürünler</a>
        </div>
      </div>

      <!-- Topluluk Category -->
      <div class="link-category">
        <h4 class="category-header">Topluluk</h4>
        <div class="link-list">
          <a href="#" class="footer-link">Geliştiriciler</a>
          <a href="#" class="footer-link">Reklamverenler</a>
          <a href="#" class="footer-link">Yatırımcılar</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.customer {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Profile Banner */
.profile-banner {
  position: relative;
  width: 100%;
  height: 200px;
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
  justify-content: space-between;
  padding: 2rem;
}

.profile-info {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.profile-photo {
  position: relative;
  width: 125px;
  height: 125px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid rgba(255, 255, 255, 0.2);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  isolation: isolate; /* Create stacking context for pseudo-elements */
}

[data-theme='light'] .profile-photo {
  border-color: rgba(0, 0, 0, 0.1);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.8);
}

/* Neon Stroke Animation */
.profile-photo::before {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    transparent 0deg,
    var(--accent-color) 45deg,
    transparent 90deg,
    var(--accent-color) 135deg,
    transparent 180deg,
    var(--accent-color) 225deg,
    transparent 270deg,
    var(--accent-color) 315deg,
    transparent 360deg
  );
  animation: neonRotate 3s linear infinite;
  z-index: -1;
}

@keyframes neonRotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Additional neon glow effect */
.profile-photo::after {
  content: '';
  position: absolute;
  inset: -8px;
  border-radius: 50%;
  background: radial-gradient(
    circle at 50% 50%,
    rgba(51, 51, 255, 0.4) 0%,
    rgba(51, 51, 255, 0.2) 30%,
    transparent 70%
  );
  animation: neonPulse 2s ease-in-out infinite alternate;
  z-index: -2;
}

@keyframes neonPulse {
  from {
    opacity: 0.6;
    transform: scale(1);
  }
  to {
    opacity: 1;
    transform: scale(1.1);
  }
}

.profile-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.profile-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.profile-name {
  font-size: 2rem;
  font-weight: 700;
  color: white;
  margin: 0;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

[data-theme='light'] .profile-name {
  color: var(--text-main);
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.profile-role {
  font-size: 1rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

[data-theme='light'] .profile-role {
  color: var(--text-muted);
}

/* Menu Button */
.menu-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid var(--border-color);
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.2s ease;
  align-self: flex-end;
  margin-bottom: 0.5rem;
}

.menu-btn:hover {
  background: rgba(51, 51, 255, 0.06);
  color: var(--text-main);
  border-color: rgba(51, 51, 255, 0.2);
}

/* Menu Popup */
.menu-popup {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 20vh;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.menu-content {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 0.5rem;
  min-width: 200px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  animation: popupSlide 0.2s ease-out;
}

@keyframes popupSlide {
  from {
    opacity: 0;
    transform: translateY(-10px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 12px;
  background: transparent;
  color: var(--text-main);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
}

.menu-item:hover {
  background: rgba(51, 51, 255, 0.06);
  color: var(--accent-color);
}

.menu-item:first-child:hover {
  color: #00c853;
}

.menu-item:last-child:hover {
  color: #ff9800;
}

/* Transitions */
.menu-popup-enter-active,
.menu-popup-leave-active {
  transition: all 0.2s ease;
}

.menu-popup-enter-from,
.menu-popup-leave-to {
  opacity: 0;
}

.menu-popup-enter-from .menu-content,
.menu-popup-leave-to .menu-content {
  transform: translateY(-10px) scale(0.95);
}

/* Settings Section */
.settings-section {
  padding: 1rem 0;
  border-bottom: 1px solid var(--border-color);
}

.settings-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-main);
}

/* Connection Section */
.connection-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem 0;
}

.connect-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.8rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: transparent;
  color: var(--text-main);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.connect-icon {
  width: 20px;
  height: 20px;
  filter: invert(1);
}

[data-theme='light'] .connect-icon {
  filter: none;
}

.connect-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.apple-btn:hover {
  border-color: #000;
  background: rgba(0, 0, 0, 0.05);
}

[data-theme='light'] .apple-btn:hover {
  background: rgba(0, 0, 0, 0.02);
}

.google-btn:hover {
  border-color: #4285f4;
  background: rgba(66, 133, 244, 0.05);
}

[data-theme='light'] .google-btn:hover {
  background: rgba(66, 133, 244, 0.02);
}

/* Language Section */
.language-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px solid var(--border-color);
}

.section-label {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-main);
}

.language-select {
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--card-bg);
  color: var(--text-main);
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  outline: none;
  transition: all 0.2s ease;
}

.language-select:focus {
  border-color: var(--accent-color);
  box-shadow: 0 0 0 3px rgba(51, 51, 255, 0.1);
}

/* Filter Section */
.filter-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px solid var(--border-color);
}

.toggle-btn {
  position: relative;
  width: 48px;
  height: 24px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--card-bg);
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 2px;
}

.toggle-slider {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--text-muted);
  transition: all 0.3s ease;
}

.toggle-btn.active {
  border-color: var(--accent-color);
  background: var(--accent-color);
}

.toggle-btn.active .toggle-slider {
  transform: translateX(24px);
  background: white;
}

/* Favorites Section */
.favorites-section {
  padding: 1rem 0;
  border-bottom: 1px solid var(--border-color);
}

.section-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-main);
}

.favorites-section .section-header {
  color: #e91e63;
}

/* Footer */
.customer-footer {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.5rem 0;
  margin-top: auto;
  border-top: 1px solid var(--border-color);
}

/* Footer Links */
.footer-links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  padding: 1rem 0;
  border-top: 1px solid var(--border-color);
}

.link-category {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.category-header {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--accent-color);
  margin: 0 0 0.5rem 0;
}

.link-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-link {
  font-size: 0.85rem;
  font-weight: 400;
  color: var(--text-muted);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: var(--text-main);
}

.footer-logo {
  height: 24px;
  filter: invert(1);
}

[data-theme='light'] .footer-logo {
  filter: none;
}

.footer-text {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-main);
}

/* Mobile */
@media (max-width: 768px) {
  .profile-banner {
    height: 160px;
    border-radius: 0;
  }

  .footer-links {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .banner-content {
    padding: 1rem;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
  }

  .profile-info {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  .profile-photo {
    width: 80px;
    height: 80px;
    border-width: 2px;
  }

  .profile-photo::before {
    inset: -3px;
  }

  .profile-photo::after {
    inset: -6px;
  }

  .profile-name {
    font-size: 1.5rem;
  }

  .profile-role {
    font-size: 0.9rem;
  }

  .menu-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 40px;
    height: 40px;
    margin-bottom: 0;
  }

  .menu-popup {
    padding-top: 30vh;
  }

  .menu-content {
    min-width: 180px;
  }

  .connect-btn {
    padding: 0.6rem 0.8rem;
    font-size: 0.85rem;
  }

  .language-select {
    padding: 0.4rem 0.6rem;
    font-size: 0.8rem;
  }

  .toggle-btn {
    width: 40px;
    height: 20px;
  }

  .toggle-btn.active .toggle-slider {
    transform: translateX(20px);
  }

  .footer-logo {
    height: 20px;
  }

  .footer-text {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .profile-banner {
    height: 140px;
    border-radius: 0;
  }

  .profile-photo {
    width: 70px;
    height: 70px;
    border-width: 2px;
  }

  .profile-photo::before {
    inset: -2px;
  }

  .profile-photo::after {
    inset: -5px;
  }

  .profile-name {
    font-size: 1.25rem;
  }

  .menu-btn {
    width: 36px;
    height: 36px;
  }

  .menu-item {
    padding: 0.6rem 0.8rem;
    font-size: 0.85rem;
  }

  .section-label,
  .section-header {
    font-size: 0.85rem;
  }

  .footer-links {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

@media (max-width: 360px) {
  .profile-banner {
    height: 120px;
    border-radius: 0;
  }

  .profile-photo {
    width: 60px;
    height: 60px;
  }

  .profile-name {
    font-size: 1.1rem;
  }

  .profile-role {
    font-size: 0.8rem;
  }

  .footer-links {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .category-header {
    font-size: 0.85rem;
  }

  .footer-link {
    font-size: 0.8rem;
  }
}
</style>
