<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      Çok yakında PWA uygulamamızla tanışacaksınız! Şimdilik 
      <a href="https://profse.com/" target="_blank" rel="noopener">Profse</a> +
      <a href="https://profsecloud.com/" target="_blank" rel="noopener">Profse Cloud</a>. sayfalarımızı ziyaret edebilirsiniz.
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
