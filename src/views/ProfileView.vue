<script setup lang="ts">
import Account from '../components/Account.vue'
import Customer from '../components/Customer.vue'

const handleEditProfile = () => {
  console.log('Kişisel bilgileri düzenle')
}

const handleBackupInfo = () => {
  console.log('Bilgileri kurtar')
}

const handleOrderHistory = () => {
  console.log('Sipariş geçmişim')
}

const handleApprovedCards = () => {
  console.log('Onaylı kartlarım')
}

const handleDiscountReceipts = () => {
  console.log('İndirim fişlerim')
}

const handleSecurityPrivacy = () => {
  console.log('Güvenlik ve gizlilik')
}

const handleAdvertisingOptions = () => {
  console.log('Reklam seçenekleri')
}
</script>

<template>
  <main class="profile-page">
    <Account
      class="profile-account"
      @edit-profile="handleEditProfile"
      @backup-info="handleBackupInfo"
      @order-history="handleOrderHistory"
      @approved-cards="handleApprovedCards"
      @discount-receipts="handleDiscountReceipts"
      @security-privacy="handleSecurityPrivacy"
      @advertising-options="handleAdvertisingOptions"
    />
    <section class="profile-main">
      <Customer />
    </section>
  </main>
</template>

<style scoped>
.profile-page {
  display: flex;
  width: 100%;
  min-height: calc(100vh - 84px - 80px);
  margin-top: 84px;
  margin-bottom: 80px;
  box-sizing: border-box;
}

.profile-account {
  width: 33%;
  min-width: 260px;
  max-width: 380px;
  height: 100%;
  flex-shrink: 0;
}

.profile-main {
  flex: 1;
  min-height: 100%;
  width: 100%;
  overflow-y: auto;
  display: block;
  padding: 1.5rem;
  box-sizing: border-box;
}

/* Mobile: hide account sidebar */
@media (max-width: 768px) {
  .profile-account {
    display: none;
  }

  .profile-page {
    min-height: calc(100vh - 84px - 80px);
  }

  .profile-main {
    padding: 1rem;
  }
}
</style>
