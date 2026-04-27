<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const closeAbout = () => {
  router.push('/')
}
</script>

<template>
  <div class="about-overlay">
    <div class="about-container">
      <!-- Close Button -->
      <button class="close-btn" @click="closeAbout">
        <Icon icon="material-symbols:close" width="24" height="24" />
      </button>

      <!-- Header -->
      <header class="about-header">
        <div class="logo-section">
          <img src="/profsesvg.svg" alt="Profse" class="about-logo" />
          <h1 class="about-title">Profse Bilişim Teknolojileri</h1>
        </div>
        <p class="about-subtitle">TÜM TEKNOLOJİK ÇÖZÜMLERDE İŞLETMENİZİN YANINDAYIZ</p>
      </header>

      <!-- Main Content -->
      <main class="about-content">
        <!-- Why Choose Section -->
        <section class="why-choose">
          <h2>Neden Profse Bilişim Sistemlerini Seçmelisiniz?</h2>
          <p class="intro-text">
            Profse, vereceği hizmeti en üst kalitede sunmayı planlamıştır. Dünyanın en büyük
            markalarıyla çalışarak, her bütçeye uygun çözümler üretiyoruz. Satış sonrası destek
            hizmetlerinde en iyisi olmak için yatırımlarımızı arttırıyor ve gerekli teknoloji
            kullanmaya önem gösteriyoruz. Uluslararası platformda tanınan, dünya standartlarında,
            çağdaş yenilikleri takip eden ve yeniliklere öncülük eden, diğer teknoloji şirketleri
            tarafından örnek alınan teknoloji şirketiyiz.
          </p>

          <!-- Features Grid -->
          <div class="features-grid">
            <div class="feature-card">
              <Icon icon="material-symbols:handshake" class="feature-icon" />
              <h3>Güçlü Çözüm Ortakları</h3>
              <p>
                İşletmenize en iyi hizmeti verebilmek için en iyi çözümü üreten markalarla
                çalışıyoruz.
              </p>
            </div>

            <div class="feature-card">
              <Icon icon="material-symbols:account-balance" class="feature-icon" />
              <h3>Bütçenize Uygun Çözümler</h3>
              <p>İşleyişinizi analiz ediyoruz ve işletmenize uygun bütçeli çözümler üretiyoruz.</p>
            </div>

            <div class="feature-card">
              <Icon icon="material-symbols:lightbulb" class="feature-icon" />
              <h3>Yenilikçi Teknoloji Çözümleri</h3>
              <p>
                Sürekli bilgimizi ve teknolojimizi güncelleyerek, yenilikçi çözümler üretiyoruz.
              </p>
            </div>

            <div class="feature-card">
              <Icon icon="material-symbols:support-agent" class="feature-icon" />
              <h3>Kaliteli Destek Hizmeti</h3>
              <p>Sürekli eğitim ile uzmanlaşan kadromuz ile sizlere kaliteli hizmet sunuyoruz.</p>
            </div>

            <div class="feature-card">
              <Icon icon="material-symbols:workspace-premium" class="feature-icon" />
              <h3>Profesyonel Hizmet</h3>
              <p>İşletmenizin çalışmasını uzman ekiplerimizle analiz yapıyoruz ve kurguluyoruz.</p>
            </div>

            <div class="feature-card">
              <Icon icon="material-symbols:rocket-launch" class="feature-icon" />
              <h3>Hızlı Çözümler</h3>
              <p>
                Hızlı ve Basit çözümler üreterek işletmenizin işleyişini kolayca yönetiliyorsunuz.
              </p>
            </div>
          </div>
        </section>

        <!-- Services Section -->
        <section class="services">
          <h2>Çözümlerimiz</h2>
          <div class="services-grid">
            <div class="service-item">
              <Icon icon="material-symbols:qr-code-2" class="service-icon" />
              <h3>Barkodlu Satış Sistemi</h3>
            </div>
            <div class="service-item">
              <Icon icon="material-symbols:receipt-long" class="service-icon" />
              <h3>Ön Muhasebe Çözümleri</h3>
            </div>
            <div class="service-item">
              <Icon icon="material-symbols:cloud-sync" class="service-icon" />
              <h3>E-Dönüşüm Hizmetleri</h3>
            </div>
            <div class="service-item">
              <Icon icon="material-symbols:storefront" class="service-icon" />
              <h3>Saha Satış Sistemi</h3>
            </div>
            <div class="service-item">
              <Icon icon="material-symbols:warehouse" class="service-icon" />
              <h3>Depo Yönetim Sistemi</h3>
            </div>
            <div class="service-item">
              <Icon icon="material-symbols:precision-manufacturing" class="service-icon" />
              <h3>Üretim Takip Çözümleri</h3>
            </div>
          </div>
        </section>

        <!-- Industries Section -->
        <section class="industries">
          <h2>Hangi Alanlarda Çözüm Üretiyoruz?</h2>
          <div class="industries-list">
            <div class="industry-item">
              <Icon icon="material-symbols:shopping-bag" class="industry-icon" />
              <span>E-Ticaret</span>
            </div>
            <div class="industry-item">
              <Icon icon="material-symbols:domain" class="industry-icon" />
              <span>İnşaat</span>
            </div>
            <div class="industry-item">
              <Icon icon="material-symbols:dry-cleaning" class="industry-icon" />
              <span>Tekstil</span>
            </div>
            <div class="industry-item">
              <Icon icon="material-symbols:currency-exchange" class="industry-icon" />
              <span>Finans - Sigorta</span>
            </div>
            <div class="industry-item">
              <Icon icon="material-symbols:store" class="industry-icon" />
              <span>Perakende Ticaret</span>
            </div>
            <div class="industry-item">
              <Icon icon="material-symbols:restaurant" class="industry-icon" />
              <span>Yiyecek İçecek</span>
            </div>
            <div class="industry-item">
              <Icon icon="material-symbols:campaign" class="industry-icon" />
              <span>Medya İletişim</span>
            </div>
            <div class="industry-item">
              <Icon icon="material-symbols:factory" class="industry-icon" />
              <span>Makina İmalatı</span>
            </div>
            <div class="industry-item">
              <Icon icon="material-symbols:electrical-services" class="industry-icon" />
              <span>Elektrik Elektronik</span>
            </div>
            <div class="industry-item">
              <Icon icon="material-symbols:directions-car" class="industry-icon" />
              <span>Otomotiv</span>
            </div>
            <div class="industry-item">
              <Icon icon="material-symbols:school" class="industry-icon" />
              <span>Eğitim</span>
            </div>
          </div>
        </section>

        <!-- CTA Section -->
        <section class="cta">
          <div class="cta-content">
            <h2>Hizmetlerimizi Keşfedin</h2>
            <p>Hemen bize ulaşın ve işletmeniz için en uygun teknoloji çözümlerini keşfedin.</p>
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
  </div>
</template>

<style scoped>
.about-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  overflow-y: auto;
}

.about-container {
  background: var(--card-bg);
  border-radius: 16px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: var(--accent-color);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 10;
}

.close-btn:hover {
  opacity: 0.8;
  transform: scale(1.05);
}

.about-header {
  text-align: center;
  padding: 3rem 2rem 2rem;
  border-bottom: 1px solid var(--border-color);
}

.logo-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.about-logo {
  height: 60px;
  filter: invert(1);
}

[data-theme='light'] .about-logo {
  filter: none;
}

.about-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-main);
  margin: 0;
}

.about-subtitle {
  font-size: 1.1rem;
  color: var(--accent-color);
  font-weight: 600;
  margin: 0;
  line-height: 1.4;
}

.about-content {
  padding: 2rem;
}

.why-choose {
  margin-bottom: 3rem;
}

.why-choose h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-main);
  margin: 0 0 1rem 0;
  text-align: center;
}

.intro-text {
  font-size: 1rem;
  line-height: 1.6;
  color: var(--text-muted);
  text-align: center;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.feature-card {
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.2s ease;
}

.feature-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  width: 48px;
  height: 48px;
  color: var(--accent-color);
  margin-bottom: 1rem;
}

.feature-card h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-main);
  margin: 0 0 0.75rem 0;
}

.feature-card p {
  font-size: 0.9rem;
  color: var(--text-muted);
  line-height: 1.5;
  margin: 0;
}

.services {
  margin-bottom: 3rem;
}

.services h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-main);
  margin: 0 0 1.5rem 0;
  text-align: center;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.service-item {
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  transition: all 0.2s ease;
}

.service-item:hover {
  border-color: var(--accent-color);
  background: rgba(51, 51, 255, 0.05);
}

.service-icon {
  width: 32px;
  height: 32px;
  color: var(--accent-color);
  margin-bottom: 0.5rem;
}

.service-item h3 {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-main);
  margin: 0;
}

.industries {
  margin-bottom: 3rem;
}

.industries h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-main);
  margin: 0 0 1.5rem 0;
  text-align: center;
}

.industries-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.industry-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  transition: all 0.2s ease;
}

.industry-item:hover {
  border-color: var(--accent-color);
  background: rgba(51, 51, 255, 0.05);
}

.industry-icon {
  width: 20px;
  height: 20px;
  color: var(--accent-color);
}

.industry-item span {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-main);
}

.cta {
  text-align: center;
  padding: 2rem;
  background: linear-gradient(135deg, var(--accent-color) 0%, rgba(51, 51, 255, 0.8) 100%);
  border-radius: 12px;
  margin: 0 2rem 2rem 2rem;
}

.cta-content h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  margin: 0 0 0.5rem 0;
}

.cta-content p {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 1.5rem 0;
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
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  text-decoration: none;
  color: inherit;
}

.cta-btn.primary {
  background: white;
  color: var(--accent-color);
}

.cta-btn.primary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.cta-btn.secondary {
  background: transparent;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.cta-btn.secondary:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* Mobile */
@media (max-width: 768px) {
  .about-container {
    max-height: 95vh;
    margin: 0.5rem;
  }

  .about-header {
    padding: 2rem 1rem 1.5rem;
  }

  .about-title {
    font-size: 1.5rem;
  }

  .about-subtitle {
    font-size: 1rem;
  }

  .about-content {
    padding: 1.5rem 1rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .industries-list {
    grid-template-columns: repeat(2, 1fr);
  }

  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }

  .cta-btn {
    width: 100%;
    max-width: 250px;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .about-logo {
    height: 48px;
  }

  .about-title {
    font-size: 1.25rem;
  }

  .services-grid,
  .industries-list {
    grid-template-columns: 1fr;
  }
}
</style>
