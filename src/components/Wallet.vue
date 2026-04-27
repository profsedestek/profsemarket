<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'

const isPlaying = ref(true)
const isMuted = ref(true)
const selectedPeriod = ref('1 hafta')

const videoRef = ref<HTMLVideoElement>()

const togglePlayPause = () => {
  if (videoRef.value) {
    if (isPlaying.value) {
      videoRef.value.pause()
    } else {
      videoRef.value.play()
    }
    isPlaying.value = !isPlaying.value
  }
}

const toggleMute = () => {
  if (videoRef.value) {
    videoRef.value.muted = !isMuted.value
    isMuted.value = !isMuted.value
  }
}

onMounted(() => {
  if (videoRef.value) {
    videoRef.value.play()
    videoRef.value.muted = true
  }
})
</script>

<template>
  <div class="wallet">
    <!-- Video Section -->
    <div class="video-section">
      <video
        ref="videoRef"
        src="/wallet.mp4"
        class="wallet-video"
        autoplay
        loop
        muted
        playsinline
        disablepictureinpicture
        controlslist="nodownload noremoteplayback"
      />
    </div>

    <!-- Header Section -->
    <div class="wallet-header">
      <div class="header-left">
        <Icon icon="material-symbols:account-balance-wallet" class="wallet-icon" />
        <h2 class="wallet-title">Cüzdanım</h2>
      </div>
      <div class="header-right">
        <button class="control-btn" @click="togglePlayPause">
          <Icon :icon="isPlaying ? 'material-symbols:pause' : 'material-symbols:play-arrow'" />
        </button>
        <button class="control-btn" @click="toggleMute">
          <Icon :icon="isMuted ? 'material-symbols:volume-off' : 'material-symbols:volume-up'" />
        </button>
      </div>
    </div>

    <!-- Info Section -->
    <div class="info-section">
      <div class="info-content">
        <div class="info-left">
          <Icon icon="material-symbols:info" class="info-icon" />
          <span class="info-text">Nasıl kullanılır?</span>
        </div>
        <button class="info-btn">Beni oraya götür</button>
      </div>
    </div>

    <!-- Balance Section -->
    <div class="balance-section">
      <div class="balance-header">
        <h3 class="balance-title">Bakiye</h3>
      </div>
      <div class="balance-amount">
        <span class="amount-number">2,450</span>
        <Icon icon="material-symbols:currency-lira" class="tl-icon" />
      </div>
      <div class="balance-chart">
        <!-- Simple chart representation -->
        <div class="chart-placeholder">
          <div class="chart-bar" style="height: 60%"></div>
          <div class="chart-bar" style="height: 80%"></div>
          <div class="chart-bar" style="height: 45%"></div>
          <div class="chart-bar" style="height: 90%"></div>
          <div class="chart-bar" style="height: 70%"></div>
          <div class="chart-bar" style="height: 85%"></div>
          <div class="chart-bar" style="height: 65%"></div>
        </div>
      </div>
      <p class="performance-text">Cüzdana yükleme performansınız</p>
      <select v-model="selectedPeriod" class="period-select">
        <option value="1 hafta">Son 1 hafta</option>
        <option value="1 ay">Son 1 ay</option>
        <option value="1 yıl">Son 1 yıl</option>
      </select>
    </div>

    <!-- Main Action Buttons -->
    <div class="action-buttons">
      <button class="action-btn primary">
        <Icon icon="material-symbols:add-circle" />
        <span>Cüzdana para yükle</span>
      </button>
      <button class="action-btn secondary">
        <Icon icon="material-symbols:remove-circle" />
        <span>Para çek</span>
      </button>
    </div>

    <!-- Bottom Buttons -->
    <div class="bottom-buttons">
      <button class="bottom-btn">
        <Icon icon="material-symbols:discount" />
        <span>İndirim fişi kullan</span>
      </button>
      <button class="bottom-btn">
        <Icon icon="material-symbols:sell" />
        <span>Kuponu para çek</span>
      </button>
      <button class="bottom-btn">
        <Icon icon="material-symbols:account-balance" />
        <span>Para yükle</span>
      </button>
      <button class="bottom-btn discount-upload">
        <Icon icon="material-symbols:upload" />
        <span>İndirim fişi yükle</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.wallet {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}

/* Video Section */
.video-section {
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  background: var(--card-bg);
}

.wallet-video {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  pointer-events: none;
}

/* Header Section */
.wallet-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: var(--card-bg);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.wallet-icon {
  width: 24px;
  height: 24px;
  color: var(--accent-color);
}

.wallet-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-main);
  margin: 0;
}

.header-right {
  display: flex;
  gap: 0.5rem;
}

.control-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 250px;
  border: none;
  background: var(--accent-color);
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.control-btn:hover {
  background: var(--accent-color);
  opacity: 0.8;
}

/* Info Section */
.info-section {
  padding: 1rem;
  background: var(--card-bg);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.info-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.info-left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.info-icon {
  width: 20px;
  height: 20px;
  color: var(--text-muted);
}

.info-text {
  font-size: 0.9rem;
  color: var(--text-main);
}

.info-btn {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
  background: var(--accent-color);
  color: white;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.info-btn:hover {
  opacity: 0.8;
}

/* Balance Section */
.balance-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--card-bg);
  border-radius: 12px;
  border: 1px solid var(--border-color);
}

.balance-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-main);
  margin: 0;
}

.balance-amount {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.amount-number {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-main);
}

.tl-icon {
  width: 24px;
  height: 24px;
  color: var(--text-main);
}

.balance-chart {
  padding: 1rem 0;
}

.chart-placeholder {
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
  height: 60px;
}

.chart-bar {
  flex: 1;
  background: var(--accent-color);
  border-radius: 4px 4px 0 0;
  min-height: 20px;
}

.performance-text {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin: 0;
}

.period-select {
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--card-bg);
  color: var(--text-main);
  font-size: 0.85rem;
  cursor: pointer;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 250px;
  border: none;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn.primary {
  background: var(--accent-color);
  color: white;
}

.action-btn.primary:hover {
  opacity: 0.8;
}

.action-btn.secondary {
  background: transparent;
  color: var(--text-main);
  border: 1px solid var(--border-color);
}

.action-btn.secondary:hover {
  background: var(--card-bg);
}

/* Bottom Buttons */
.bottom-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.bottom-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 250px;
  border: none;
  background: transparent;
  color: var(--text-main);
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
}

.bottom-btn:hover {
  background: var(--card-bg);
}

.bottom-btn.discount-upload {
  border-radius: 10px;
}

/* Mobile */
@media (max-width: 768px) {
  .wallet {
    padding: 0.5rem;
  }

  .wallet-header {
    padding: 0.75rem;
  }

  .wallet-title {
    font-size: 1rem;
  }

  .control-btn {
    width: 36px;
    height: 36px;
  }

  .balance-section {
    padding: 1rem;
  }

  .amount-number {
    font-size: 1.5rem;
  }

  .action-btn {
    padding: 0.75rem;
    font-size: 0.85rem;
  }

  .bottom-btn {
    padding: 0.6rem 0.8rem;
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .wallet-title {
    font-size: 0.9rem;
  }

  .amount-number {
    font-size: 1.25rem;
  }

  .control-btn {
    width: 32px;
    height: 32px;
  }

  .action-btn {
    padding: 0.6rem;
    font-size: 0.8rem;
  }

  .bottom-btn {
    padding: 0.5rem 0.7rem;
    font-size: 0.75rem;
  }
}
</style>
