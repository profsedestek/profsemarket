import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
  const initTheme = () => {
    // Check localStorage first
    const stored = localStorage.getItem('theme')
    if (stored) {
      return stored === 'dark'
    }
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  }

  const isDark = ref(initTheme())

  const updateDocumentClass = () => {
    if (isDark.value) {
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      document.documentElement.setAttribute('data-theme', 'light')
    }
  }

  const toggleTheme = () => {
    isDark.value = !isDark.value
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
    updateDocumentClass()
  }

  const setTheme = (dark: boolean) => {
    isDark.value = dark
    localStorage.setItem('theme', dark ? 'dark' : 'light')
    updateDocumentClass()
  }

  // Initialize on store creation
  updateDocumentClass()

  return {
    isDark: computed(() => isDark.value),
    toggleTheme,
    setTheme,
    updateDocumentClass
  }
})
