<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '../stores/product'
import type { Product } from '../stores/product'
import Details from '../components/Details.vue'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()

const product = ref<Product | null>(null)
const showDetails = ref(true)

onMounted(() => {
  const productId = route.params.id as string
  const foundProduct = productStore.allProducts.find((p) => p.id === productId)

  if (foundProduct) {
    product.value = foundProduct
    productStore.addToHistory(foundProduct)
  } else {
    // Product not found, redirect to explore
    router.push('/explore')
  }
})

const closeDetails = () => {
  router.push('/explore')
}
</script>

<template>
  <div class="product-detail-view">
    <Details
      v-if="product && showDetails"
      :product="product"
      :is-open="showDetails"
      @close="closeDetails"
    />
  </div>
</template>

<style scoped>
.product-detail-view {
  width: 100%;
  height: 100vh;
  background: var(--bg-color);
}
</style>
