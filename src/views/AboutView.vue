<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const scrollY = ref(0)
const isVisible = ref<{ [key: string]: boolean }>({})

const closeAbout = () => {
  router.push('/')
}

const handleScroll = () => {
  scrollY.value = window.scrollY
}

const observeElements = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value[entry.target.id] = true
        }
      })
    },
    { threshold: 0.1 },
  )

  document.querySelectorAll('.observe').forEach((el) => {
    observer.observe(el)
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  observeElements()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const features = [
  {
    id: 'partners',
    icon: 'material-symbols:handshake',
    title: 'Güçlü Çözüm Ortakları',
    desc: 'En iyi markalarla çalışıyoruz',
  },
  {
    id: 'budget',
    icon: 'material-symbols:account-balance',
    title: 'Bütçenize Uygun',
    desc: 'İşletmenize özel çözümler',
  },
  {
    id: 'innovation',
    icon: 'material-symbols:lightbulb',
    title: 'Yenilikçi Teknoloji',
    desc: 'Sürekli güncel ve yenilikçi',
  },
  {
    id: 'support',
    icon: 'material-symbols:support-agent',
    title: 'Kaliteli Destek',
    desc: 'Uzman kadro 7/24 destek',
  },
  {
    id: 'professional',
    icon: 'material-symbols:workspace-premium',
    title: 'Profesyonel Hizmet',
    desc: 'Uzman ekiplerle analiz',
  },
  {
    id: 'fast',
    icon: 'material-symbols:rocket-launch',
    title: 'Hızlı Çözümler',
    desc: 'Hızlı ve basit çözümler',
  },
]

const services = [
  {
    icon: 'material-symbols:qr-code-2',
    title: 'Barkodlu Satış',
    gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDdtZzV3b3B2b3Y1dXR0cGF0Z3RqY3Y2dXJtZ3JkY3V2Z3p6eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/3oKIPEqDGUULpEU0aQ/giphy.gif',
  },
  {
    icon: 'material-symbols:receipt-long',
    title: 'Ön Muhasebe',
    gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDdtZzV3b3B2b3Y1dXR0cGF0Z3RqY3Y2dXJtZ3JkY3V2Z3p6eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/26gR1sLKBOq8rsDVS/giphy.gif',
  },
  {
    icon: 'material-symbols:cloud-sync',
    title: 'E-Dönüşüm',
    gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDdtZzV3b3B2b3Y1dXR0cGF0Z3RqY3Y2dXJtZ3JkY3V2Z3p6eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/3oKIPEqDGUULpEU0aQ/giphy.gif',
  },
  {
    icon: 'material-symbols:storefront',
    title: 'Saha Satış',
    gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDdtZzV3b3B2b3Y1dXR0cGF0Z3RqY3Y2dXJtZ3JkY3V2Z3p6eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/l0HlNQ03J5JxX6lva/giphy.gif',
  },
  {
    icon: 'material-symbols:warehouse',
    title: 'Depo Yönetimi',
    gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDdtZzV3b3B2b3Y1dXR0cGF0Z3RqY3Y2dXJtZ3JkY3V2Z3p6eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/26gR1sLKBOq8rsDVS/giphy.gif',
  },
  {
    icon: 'material-symbols:precision-manufacturing',
    title: 'Üretim Takip',
    gif: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDdtZzV3b3B2b3Y1dXR0cGF0Z3RqY3Y2dXJtZ3JkY3V2Z3p6eSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/3oKIPEqDGUULpEU0aQ/giphy.gif',
  },
]

const industries = [
  { icon: 'material-symbols:shopping-bag', name: 'E-Ticaret' },
  { icon: 'material-symbols:domain', name: 'İnşaat' },
  { icon: 'material-symbols:dry-cleaning', name: 'Tekstil' },
  { icon: 'material-symbols:currency-exchange', name: 'Finans' },
  { icon: 'material-symbols:store', name: 'Perakende' },
  { icon: 'material-symbols:restaurant', name: 'Yiyecek' },
  { icon: 'material-symbols:campaign', name: 'Medya' },
  { icon: 'material-symbols:factory', name: 'Makina' },
  { icon: 'material-symbols:electrical-services', name: 'Elektrik' },
  { icon: 'material-symbols:directions-car', name: 'Otomotiv' },
  { icon: 'material-symbols:school', name: 'Eğitim' },
]
</script>

<template>
  <div class="about-page">
    <!-- Close Button -->
    <button class="close-btn" @click="closeAbout">
      <Icon icon="material-symbols:close" width="24" height="24" />
    </button>

    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-image-container">
        <img src="/arkaplan.jpg" alt="Hero" class="hero-image" />
        <div class="hero-gradient"></div>
      </div>
      <div class="hero-content" :style="{ transform: `translateY(${scrollY * 0.3}px)` }">
        <img src="/profsesvg.svg" alt="Profse" class="hero-logo" />
        <h1 class="hero-title">Profse Bilişim Teknolojileri</h1>
        <p class="hero-subtitle">TÜM TEKNOLOJİK ÇÖZÜMLERDE İŞLETMENİZİN YANINDAYIZ</p>
        <div class="hero-buttons">
          <a href="tel:+903426060890" class="hero-btn primary">
            <Icon icon="material-symbols:call" />
            <span>Bizi Arayın</span>
          </a>
          <button class="hero-btn secondary" @click="$router.push('/explore')">
            <Icon icon="material-symbols:explore" />
            <span>Keşfet</span>
          </button>
        </div>
      </div>
      <div class="scroll-indicator">
        <div class="mouse">
          <div class="wheel"></div>
        </div>
        <span>Aşağı kaydır</span>
      </div>
    </section>

    <!-- Main Content -->
    <main class="about-content">
      <!-- Why Choose Section -->
      <section class="why-section" id="why-section">
        <div class="section-header observe" id="why-header">
          <h2 :class="['section-title', { 'animate-in': isVisible['why-header'] }]">
            Neden Profse?
          </h2>
          <p :class="['section-desc', { 'animate-in': isVisible['why-header'] }]">
            Dünyanın en büyük markalarıyla çalışarak, her bütçeye uygun çözümler üretiyoruz.
          </p>
        </div>

        <div class="features-grid">
          <div
            v-for="(feature, index) in features"
            :key="feature.id"
            class="feature-card observe"
            :id="feature.id"
            :class="{ 'animate-in': isVisible[feature.id] }"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div class="feature-icon-wrapper">
              <Icon :icon="feature.icon" class="feature-icon" />
              <div class="feature-glow"></div>
            </div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.desc }}</p>
          </div>
        </div>
      </section>

      <!-- Services Section -->
      <section class="services-section" id="services-section">
        <div class="section-header observe" id="services-header">
          <h2 :class="['section-title', { 'animate-in': isVisible['services-header'] }]">
            Çözümlerimiz
          </h2>
          <p :class="['section-desc', { 'animate-in': isVisible['services-header'] }]">
            İşletmeniz için en uygun teknoloji çözümleri
          </p>
        </div>

        <div class="services-grid">
          <div
            v-for="(service, index) in services"
            :key="service.title"
            class="service-card observe"
            :id="`service-${index}`"
            :class="{ 'animate-in': isVisible[`service-${index}`] }"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div class="service-gif-wrapper">
              <img :src="service.gif" :alt="service.title" class="service-gif" />
              <div class="service-gif-overlay"></div>
            </div>
            <div class="service-content">
              <Icon :icon="service.icon" class="service-icon" />
              <h3>{{ service.title }}</h3>
            </div>
          </div>
        </div>
      </section>

      <!-- Industries Section -->
      <section class="industries-section" id="industries-section">
        <div class="section-header observe" id="industries-header">
          <h2 :class="['section-title', { 'animate-in': isVisible['industries-header'] }]">
            Sektörler
          </h2>
          <p :class="['section-desc', { 'animate-in': isVisible['industries-header'] }]">
            Hangi alanlarda çözüm üretiyoruz?
          </p>
        </div>

        <div class="industries-marquee">
          <div class="marquee-track">
            <div
              v-for="(industry, index) in [...industries, ...industries]"
              :key="`${industry.name}-${index}`"
              class="industry-card"
            >
              <Icon :icon="industry.icon" class="industry-icon" />
              <span>{{ industry.name }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="cta-section" id="cta-section">
        <div
          class="cta-content observe"
          id="cta-content"
          :class="{ 'animate-in': isVisible['cta-content'] }"
        >
          <h2>İşletmenizi Geleceğe Taşıyın</h2>
          <p>Hemen bize ulaşın ve özel çözümlerimizi keşfedin.</p>
          <div class="cta-buttons">
            <a href="tel:+903426060890" class="cta-btn primary">
              <Icon icon="material-symbols:call" />
              <span>+90 342 606 08 90</span>
            </a>
            <button class="cta-btn secondary">
              <Icon icon="material-symbols:mail" />
              <span>İletişim</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
/* Ana Sayfa Container */
.about-page {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: #0a0a0f;
  overflow-y: auto;
  overflow-x: hidden;
}

/* Kapat Butonu */
.close-btn {
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid rgba(51, 51, 255, 0.5);
  background: rgba(0, 0, 0, 0.6);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 1001;
  backdrop-filter: blur(10px);
}

.close-btn:hover {
  background: #3333ff;
  border-color: #3333ff;
  transform: scale(1.1) rotate(90deg);
}

/* Hero Section */
.hero-section {
  position: relative;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-image-container {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(10, 10, 15, 0.3) 0%,
    rgba(10, 10, 15, 0.6) 50%,
    rgba(10, 10, 15, 0.95) 100%
  );
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 2rem;
  max-width: 800px;
  animation: fadeInUp 1s ease-out;
}

.hero-logo {
  height: 80px;
  margin-bottom: 1.5rem;
  filter: brightness(0) invert(1) drop-shadow(0 0 20px rgba(51, 51, 255, 0.5));
}

.hero-title {
  font-size: 3rem;
  font-weight: 800;
  color: white;
  margin: 0 0 1rem 0;
  text-shadow: 0 0 40px rgba(51, 51, 255, 0.5);
  letter-spacing: -1px;
}

.hero-subtitle {
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  margin: 0 0 2rem 0;
  letter-spacing: 2px;
  text-transform: uppercase;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.hero-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border-radius: 0;
  border: 2px solid;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.hero-btn.primary {
  background: #3333ff;
  border-color: #3333ff;
  color: white;
}

.hero-btn.primary:hover {
  background: transparent;
  color: #3333ff;
  box-shadow: 0 0 30px rgba(51, 51, 255, 0.5);
}

.hero-btn.secondary {
  background: transparent;
  border-color: white;
  color: white;
}

.hero-btn.secondary:hover {
  background: white;
  color: #0a0a0f;
}

/* Scroll Indicator */
.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.85rem;
  animation: bounce 2s infinite;
}

.mouse {
  width: 26px;
  height: 40px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-radius: 13px;
  display: flex;
  justify-content: center;
  padding-top: 8px;
}

.wheel {
  width: 4px;
  height: 8px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 2px;
  animation: scroll 1.5s infinite;
}

/* Main Content */
.about-content {
  background: #0a0a0f;
  padding: 0;
}

/* Section Styles */
.why-section,
.services-section,
.industries-section,
.cta-section {
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin: 0 0 1rem 0;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease;
}

.section-title.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.section-desc {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.6);
  max-width: 600px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease 0.2s;
}

.section-desc.animate-in {
  opacity: 1;
  transform: translateY(0);
}

/* Features Grid */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(51, 51, 255, 0.2);
  border-radius: 0;
  padding: 2.5rem;
  text-align: center;
  transition: all 0.4s ease;
  opacity: 0;
  transform: translateY(30px);
  position: relative;
  overflow: hidden;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(51, 51, 255, 0.1), transparent);
  transition: left 0.5s ease;
}

.feature-card:hover::before {
  left: 100%;
}

.feature-card.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.feature-card:hover {
  border-color: #3333ff;
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(51, 51, 255, 0.2);
}

.feature-icon-wrapper {
  position: relative;
  display: inline-block;
  margin-bottom: 1.5rem;
}

.feature-icon {
  width: 56px;
  height: 56px;
  color: #3333ff;
  position: relative;
  z-index: 1;
}

.feature-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  background: radial-gradient(circle, rgba(51, 51, 255, 0.3) 0%, transparent 70%);
  animation: pulse 2s infinite;
}

.feature-card h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: white;
  margin: 0 0 0.75rem 0;
}

.feature-card p {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.6;
  margin: 0;
}

/* Services Grid */
.services-section {
  background: linear-gradient(180deg, #0a0a0f 0%, #111118 50%, #0a0a0f 100%);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.service-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0;
  overflow: hidden;
  transition: all 0.4s ease;
  opacity: 0;
  transform: translateY(30px);
}

.service-card.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.service-card:hover {
  border-color: #3333ff;
  transform: scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

.service-gif-wrapper {
  position: relative;
  height: 180px;
  overflow: hidden;
}

.service-gif {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.service-card:hover .service-gif {
  transform: scale(1.1);
}

.service-gif-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(10, 10, 15, 0.9), transparent);
}

.service-content {
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.service-icon {
  width: 36px;
  height: 36px;
  color: #3333ff;
  flex-shrink: 0;
}

.service-content h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: white;
  margin: 0;
}

/* Industries Marquee */
.industries-section {
  background: #050508;
}

.industries-marquee {
  overflow: hidden;
  padding: 2rem 0;
}

.marquee-track {
  display: flex;
  gap: 1.5rem;
  animation: marquee 30s linear infinite;
}

.marquee-track:hover {
  animation-play-state: paused;
}

.industry-card {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0;
  transition: all 0.3s ease;
  cursor: pointer;
}

.industry-card:hover {
  background: rgba(51, 51, 255, 0.2);
  border-color: #3333ff;
  transform: scale(1.05);
}

.industry-icon {
  width: 24px;
  height: 24px;
  color: #3333ff;
}

.industry-card span {
  font-size: 0.95rem;
  font-weight: 500;
  color: white;
  white-space: nowrap;
}

/* CTA Section */
.cta-section {
  background: linear-gradient(135deg, #111118 0%, #0a0a0f 100%);
  text-align: center;
}

.cta-content {
  max-width: 700px;
  margin: 0 auto;
  padding: 4rem;
  background: rgba(51, 51, 255, 0.05);
  border: 1px solid rgba(51, 51, 255, 0.3);
  border-radius: 0;
  opacity: 0;
  transform: scale(0.95);
  transition: all 0.6s ease;
}

.cta-content.animate-in {
  opacity: 1;
  transform: scale(1);
}

.cta-content h2 {
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin: 0 0 1rem 0;
}

.cta-content p {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 2rem 0;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border-radius: 0;
  border: 2px solid;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.cta-btn.primary {
  background: #3333ff;
  border-color: #3333ff;
  color: white;
}

.cta-btn.primary:hover {
  background: transparent;
  color: #3333ff;
  box-shadow: 0 0 30px rgba(51, 51, 255, 0.5);
}

.cta-btn.secondary {
  background: transparent;
  border-color: rgba(255, 255, 255, 0.5);
  color: white;
}

.cta-btn.secondary:hover {
  background: white;
  color: #0a0a0f;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateX(-50%) translateY(0);
  }
  40% {
    transform: translateX(-50%) translateY(-10px);
  }
  60% {
    transform: translateX(-50%) translateY(-5px);
  }
}

@keyframes scroll {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(12px);
    opacity: 0;
  }
}

@keyframes pulse {
  0%,
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.5;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 0.8;
  }
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .close-btn {
    top: 1rem;
    right: 1rem;
    width: 44px;
    height: 44px;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .hero-logo {
    height: 60px;
  }

  .hero-btn {
    padding: 0.875rem 1.5rem;
    font-size: 0.9rem;
  }

  .why-section,
  .services-section,
  .industries-section,
  .cta-section {
    padding: 4rem 1.5rem;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .features-grid,
  .services-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .feature-card {
    padding: 1.5rem;
  }

  .cta-content {
    padding: 2rem 1.5rem;
  }

  .cta-content h2 {
    font-size: 1.8rem;
  }

  .cta-buttons {
    flex-direction: column;
  }

  .cta-btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 1.5rem;
  }

  .hero-subtitle {
    font-size: 0.85rem;
  }

  .section-title {
    font-size: 1.5rem;
  }
}
</style>
