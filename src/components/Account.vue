<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const emit = defineEmits<{
  editProfile: []
  backupInfo: []
  orderHistory: []
  approvedCards: []
  discountReceipts: []
  securityPrivacy: []
  advertisingOptions: []
}>()

const handleManagePlan = () => {
  // Plan yönetimi
}
</script>

<template>
  <div class="account">
    <!-- Gradient Header -->
    <div class="account-header">
      <div class="header-gradient" />
      <div class="header-content">
        <div class="plan-info">
          <span class="plan-label">Planın:</span>
          <span class="plan-name">Free</span>
        </div>
        <button class="manage-btn" @click="handleManagePlan">
          <Icon icon="material-symbols:settings" width="16" height="16" />
          Yönet
        </button>
      </div>
    </div>

    <!-- Account Actions -->
    <div class="account-body">
      <!-- Personal Info Section -->
      <div class="account-section">
        <h4 class="section-title">Hesap</h4>
        <div class="action-buttons">
          <button class="action-btn" @click="emit('editProfile')">
            <Icon icon="material-symbols:edit" width="20" height="20" />
            <span>Kişisel bilgileri düzenle</span>
          </button>
          <button class="action-btn" @click="emit('backupInfo')">
            <Icon icon="material-symbols:backup" width="20" height="20" />
            <span>Bilgileri kurtar</span>
          </button>
        </div>
      </div>

      <!-- Orders Section -->
      <div class="account-section">
        <h4 class="section-title">Siparişlerim</h4>
        <div class="action-buttons">
          <button class="action-btn" @click="emit('orderHistory')">
            <Icon icon="material-symbols:history" width="20" height="20" />
            <span>Sipariş geçmişim</span>
          </button>
          <button class="action-btn" @click="emit('approvedCards')">
            <Icon icon="material-symbols:credit-card" width="20" height="20" />
            <span>Onaylı kartlarım</span>
          </button>
          <button class="action-btn" @click="emit('discountReceipts')">
            <Icon icon="material-symbols:receipt-long" width="20" height="20" />
            <span>İndirim fişlerim</span>
          </button>
        </div>
      </div>

      <!-- Security Section -->
      <div class="account-section">
        <h4 class="section-title">Güvenlik</h4>
        <div class="action-buttons">
          <button class="action-btn" @click="emit('securityPrivacy')">
            <Icon icon="material-symbols:security" width="20" height="20" />
            <span>Güvenlik ve gizlilik</span>
          </button>
        </div>
      </div>

      <!-- Advertising Section -->
      <div class="account-section">
        <h4 class="section-title">Pazarlama</h4>
        <div class="action-buttons">
          <button class="action-btn" @click="emit('advertisingOptions')">
            <Icon icon="material-symbols:campaign" width="20" height="20" />
            <span>Reklam seçenekleri</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.account {
  width: 100%;
  height: 100%;
  background: var(--bg-color);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Header */
.account-header {
  position: relative;
  height: 120px;
  overflow: hidden;
}

.header-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--accent-color) 0%, rgba(0, 0, 0, 0.8) 100%);
  opacity: 0.9;
}

[data-theme='light'] .header-gradient {
  background: linear-gradient(135deg, var(--accent-color) 0%, rgba(255, 255, 255, 0.9) 100%);
  opacity: 0.95;
}

.header-content {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 1.25rem;
  gap: 1rem;
}

.plan-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.plan-label {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
}

[data-theme='light'] .plan-label {
  color: rgba(0, 0, 0, 0.6);
}

.plan-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

[data-theme='light'] .plan-name {
  color: var(--text-main);
}

.manage-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  background: var(--accent-color);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(51, 51, 255, 0.3);
}

.manage-btn:hover {
  background: #2929ff;
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(51, 51, 255, 0.4);
}

/* Body */
.account-body {
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Section */
.account-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.section-title {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--text-main);
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding-bottom: 0.25rem;
  border-bottom: 1px solid var(--border-color);
}

/* Action Buttons */
.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: transparent;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  color: var(--text-main);
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
}

.action-btn:hover {
  background: rgba(51, 51, 255, 0.06);
  border-color: rgba(51, 51, 255, 0.2);
  transform: translateX(2px);
}

.action-btn:active {
  transform: translateX(2px) scale(0.98);
}

/* Mobile */
@media (max-width: 768px) {
  .account {
    border-right: none;
    border-bottom: 1px solid var(--border-color);
  }

  .account-header {
    height: 100px;
  }

  .header-content {
    padding: 1rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .plan-name {
    font-size: 1.25rem;
  }

  .manage-btn {
    align-self: flex-end;
    padding: 0.5rem 0.75rem;
    font-size: 0.8rem;
  }

  .account-body {
    padding: 1rem;
    gap: 1rem;
  }

  .section-title {
    font-size: 0.8rem;
  }

  .action-btn {
    padding: 0.6rem 0.75rem;
    font-size: 0.8rem;
  }
}
</style>
