<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'

</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>Dökümentasyon</template>

    Profse
    <a href="https://profse.com/" target="_blank" rel="noopener">resmi dökümantasyon</a>
    sana başlamana yardımcı olur.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>Ekosistem</template>

    Profse ekosistemi, projeni geliştirmek ve üretime almak için ihtiyacın olan her şeyi sunar.
    <a href="https://profsecloud.com/" target="_blank" rel="noopener">Profse Cloud</a>
    ile uygulamanı kolayca dağıtabilir, izleyebilir ve yönetebilirsin.
  </WelcomeItem>

</template>
