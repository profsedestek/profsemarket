<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const aiQuery = ref('')
const isProcessing = ref(false)
const showWarning = ref(false)
const selectedModel = ref('gemini')

const models = [
  { value: 'gemini', label: 'Gemini 2.4' },
  { value: 'claude', label: 'Claude Opus 4.1' },
  { value: 'gpt', label: 'GPT 5.1' },
  { value: 'kimi', label: 'Kimi K2.6' },
]

const emit = defineEmits<{
  close: []
}>()

const handleSend = () => {
  if (!aiQuery.value || isProcessing.value) return
  isProcessing.value = true
  setTimeout(() => {
    isProcessing.value = false
    aiQuery.value = ''
  }, 1500)
}

const toggleWarning = () => {
  showWarning.value = !showWarning.value
}

const dismissWarning = () => {
  showWarning.value = false
}
</script>

<template>
  <div class="ai-overlay" @click.self="emit('close')">
    <div class="ai-modal">
      <button class="ai-close" @click="emit('close')">
        <Icon icon="material-symbols:close" width="22" height="22" />
      </button>

      <!-- Hero Image -->
      <div class="ai-hero" />

      <!-- Title with Warning -->
      <div class="ai-header">
        <h3 class="ai-title">Aklınızdakini tarif edin</h3>
        <button class="warning-btn" @click="toggleWarning" title="Uyarı">
          <Icon icon="material-symbols:warning-rounded" width="20" height="20" />
        </button>
      </div>

      <!-- Warning Popup -->
      <div v-if="showWarning" class="warning-popup">
        <Icon
          icon="material-symbols:warning-rounded"
          width="18"
          height="18"
          class="warning-popup-icon"
        />
        <span class="warning-text">Yapay zeka hata yapabilir</span>
        <button class="warning-ok" @click="dismissWarning">Anladım</button>
      </div>

      <!-- Input -->
      <div class="ai-input-wrap">
        <button class="input-icon mic-btn" title="Mikrofon">
          <Icon icon="material-symbols:mic" width="20" height="20" />
        </button>
        <input
          v-model="aiQuery"
          type="text"
          placeholder="Bir şeyler sor..."
          class="ai-input"
          @keyup.enter="handleSend"
        />
        <button
          class="input-icon send-btn"
          @click="handleSend"
          :disabled="isProcessing || !aiQuery"
        >
          <Icon
            :icon="isProcessing ? 'svg-spinners:180-ring' : 'material-symbols:send-rounded'"
            width="20"
            height="20"
          />
        </button>
      </div>

      <!-- Footer Icons -->
      <div class="ai-footer">
        <div class="footer-left">
          <button class="footer-icon" title="Ekle">
            <Icon icon="material-symbols:attach-file" width="20" height="20" />
          </button>
          <button class="footer-icon" title="Paylaş">
            <Icon icon="material-symbols:share" width="20" height="20" />
          </button>
        </div>
        <div class="model-select-wrap">
          <select v-model="selectedModel" class="model-select">
            <option v-for="m in models" :key="m.value" :value="m.value">{{ m.label }}</option>
          </select>
          <Icon
            icon="material-symbols:keyboard-arrow-down"
            width="16"
            height="16"
            class="select-arrow"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ai-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(8px);
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

.ai-modal {
  position: relative;
  width: 100%;
  max-width: 600px;
  height: 320px;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.35);
  animation: popUp 0.25s cubic-bezier(0.32, 0.72, 0, 1);
}

@keyframes popUp {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Close Button */
.ai-close {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 10px;
  border: none;
  background: rgba(255, 255, 255, 0.08);
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.2s ease;
}

.ai-close:hover {
  background: rgba(255, 255, 255, 0.15);
  color: var(--text-main);
}

/* Hero Image */
.ai-hero {
  width: 100%;
  height: 100px;
  flex-shrink: 0;
  background:
    linear-gradient(180deg, transparent 40%, var(--bg-color) 100%),
    url('https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=200&fit=crop')
      center/cover no-repeat;
  mask-image: linear-gradient(180deg, black 60%, transparent 100%);
  -webkit-mask-image: linear-gradient(180deg, black 60%, transparent 100%);
}

/* Header */
.ai-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 1.25rem;
  margin-top: -0.5rem;
  margin-bottom: 0.75rem;
}

.ai-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text-main);
  margin: 0;
}

.warning-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: #ffaa00;
  cursor: pointer;
  transition: all 0.2s ease;
}

.warning-btn:hover {
  background: rgba(255, 170, 0, 0.1);
}

/* Warning Popup */
.warning-popup {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 1.25rem 0.75rem;
  padding: 0.6rem 0.75rem;
  background: rgba(255, 170, 0, 0.08);
  border: 1px solid rgba(255, 170, 0, 0.2);
  border-radius: 10px;
  font-size: 0.8rem;
  color: #ffaa00;
  animation: slideDown 0.15s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.warning-popup-icon {
  flex-shrink: 0;
}

.warning-text {
  flex: 1;
}

.warning-ok {
  padding: 0.3rem 0.75rem;
  border-radius: 8px;
  border: none;
  background: rgba(255, 170, 0, 0.15);
  color: #ffaa00;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.warning-ok:hover {
  background: rgba(255, 170, 0, 0.25);
}

/* Input */
.ai-input-wrap {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 1.25rem;
  padding: 0.5rem 0.6rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border-color);
  border-radius: 14px;
  transition: all 0.2s ease;
}

.ai-input-wrap:focus-within {
  border-color: rgba(51, 51, 255, 0.4);
  box-shadow: 0 0 0 3px rgba(51, 51, 255, 0.08);
}

.ai-input {
  flex: 1;
  background: transparent;
  border: none;
  padding: 0.4rem 0.2rem;
  font-size: 0.9rem;
  color: var(--text-main);
  outline: none;
}

.ai-input::placeholder {
  color: var(--text-muted);
}

.input-icon {
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
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.mic-btn:hover {
  background: rgba(51, 51, 255, 0.08);
  color: var(--accent-color);
}

.send-btn {
  color: var(--accent-color);
}

.send-btn:hover:not(:disabled) {
  background: rgba(51, 51, 255, 0.1);
}

.send-btn:disabled {
  opacity: 0.4;
  cursor: default;
}

/* Footer */
.ai-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding: 0.75rem 1.25rem 1rem;
}

.footer-left {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.footer-icon {
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

.footer-icon:hover {
  background: rgba(255, 255, 255, 0.06);
  color: var(--text-main);
}

/* Model Selector */
.model-select-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.model-select {
  appearance: none;
  -webkit-appearance: none;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  padding: 0.35rem 1.8rem 0.35rem 0.7rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-main);
  cursor: pointer;
  outline: none;
  transition: all 0.2s ease;
}

.model-select:hover {
  background: rgba(255, 255, 255, 0.07);
  border-color: rgba(51, 51, 255, 0.3);
}

.model-select:focus {
  border-color: rgba(51, 51, 255, 0.4);
  box-shadow: 0 0 0 3px rgba(51, 51, 255, 0.08);
}

.select-arrow {
  position: absolute;
  right: 6px;
  pointer-events: none;
  color: var(--text-muted);
}

/* Mobile */
@media (max-width: 640px) {
  .ai-modal {
    max-width: 90%;
    height: auto;
    min-height: 280px;
  }

  .ai-hero {
    height: 80px;
  }

  .ai-title {
    font-size: 0.95rem;
  }
}
</style>
