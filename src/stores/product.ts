import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export interface SingleProduct {
  id: string
  name: string
  description: string
  price: number
  image?: string
  category?: string
  stock: number
  type: 'single'
  color?: string
  scent?: string
  width?: string
  height?: string
  depth?: string
  inch?: string
  ram?: string
  battery?: string
}

export interface ProductPackage {
  id: string
  name: string
  description: string
  price: number
  image?: string
  productIds: string[] // Tekil ürünlerin IDlerini içerir
  discount?: number // Paket indirim yüzdesi
  type: 'package'
  badge?: 'ekonomik' | 'popüler' | 'sınırlı' // Badge türü
  color?: string
  scent?: string
  width?: string
  height?: string
  depth?: string
  inch?: string
  ram?: string
  battery?: string
}

export type Product = SingleProduct | ProductPackage

export const useProductStore = defineStore('product', () => {
  const products = ref<SingleProduct[]>([])
  const packages = ref<ProductPackage[]>([])
  const recentlyViewed = ref<Product[]>([])

  // Tüm ürünleri (tekil + paketler) birleştirilmiş şekilde al
  const allProducts = computed(() => {
    // Paketleri başa al (sorted by creation order)
    const packageList = packages.value.map((p) => ({ ...p, _sortOrder: 1 }))
    const productList = products.value.map((p) => ({ ...p, _sortOrder: 2 }))
    return [...packageList, ...productList]
  })

  // Paket içindeki ürünleri döndür
  const getPackageProducts = (packageId: string) => {
    const pkg = packages.value.find((p) => p.id === packageId)
    if (!pkg) return []
    return products.value.filter((p) => pkg.productIds.includes(p.id))
  }

  // Tekil ürün ekle
  const addProduct = (product: Omit<SingleProduct, 'id'>) => {
    const newProduct: SingleProduct = {
      ...product,
      id: `prod_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    }
    products.value.push(newProduct)
    return newProduct
  }

  // Tekil ürün güncelle
  const updateProduct = (id: string, updates: Partial<SingleProduct>) => {
    const index = products.value.findIndex((p) => p.id === id)
    if (index !== -1) {
      products.value[index] = { ...products.value[index], ...updates } as SingleProduct
    }
  }

  // Tekil ürün sil
  const deleteProduct = (id: string) => {
    products.value = products.value.filter((p) => p.id !== id)
    // Paketlerden de bu ürünü kaldır
    packages.value = packages.value.map((pkg) => ({
      ...pkg,
      productIds: pkg.productIds.filter((pid) => pid !== id),
    }))
  }

  // Paket ekle
  const addPackage = (pkg: Omit<ProductPackage, 'id'>) => {
    const newPackage: ProductPackage = {
      ...pkg,
      id: `pkg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    }
    packages.value.push(newPackage)
    return newPackage
  }

  // Paket güncelle
  const updatePackage = (id: string, updates: Partial<ProductPackage>) => {
    const index = packages.value.findIndex((p) => p.id === id)
    if (index !== -1) {
      packages.value[index] = { ...packages.value[index], ...updates } as ProductPackage
    }
  }

  // Paket sil
  const deletePackage = (id: string) => {
    packages.value = packages.value.filter((p) => p.id !== id)
  }

  // Paket fiyatını hesapla (içindeki ürünlerin toplam fiyatı - indirim)
  const calculatePackagePrice = (packageId: string): number => {
    const pkg = packages.value.find((p) => p.id === packageId)
    if (!pkg) return 0

    const productsInPackage = products.value.filter((p) => pkg.productIds.includes(p.id))
    const totalPrice = productsInPackage.reduce((sum, p) => sum + p.price, 0)

    if (pkg.discount) {
      return totalPrice * (1 - pkg.discount / 100)
    }
    return totalPrice
  }

  // Tekil ürün getir
  const getProduct = (id: string) => {
    return products.value.find((p) => p.id === id)
  }

  // Paket getir
  const getPackage = (id: string) => {
    return packages.value.find((p) => p.id === id)
  }

  // localStorage'a kaydet
  const saveToStorage = () => {
    localStorage.setItem('products', JSON.stringify(products.value))
    localStorage.setItem('packages', JSON.stringify(packages.value))
    localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed.value))
  }

  // localStorage'dan yükle
  const loadFromStorage = () => {
    const savedProducts = localStorage.getItem('products')
    const savedPackages = localStorage.getItem('packages')
    const savedHistory = localStorage.getItem('recentlyViewed')

    if (savedProducts) {
      products.value = JSON.parse(savedProducts)
    }
    if (savedPackages) {
      packages.value = JSON.parse(savedPackages)
    }
    if (savedHistory) {
      recentlyViewed.value = JSON.parse(savedHistory)
    }
  }

  // Geçmişe ürün ekle
  const addToHistory = (product: Product) => {
    recentlyViewed.value = recentlyViewed.value.filter((p) => p.id !== product.id)
    recentlyViewed.value.unshift(product)
    if (recentlyViewed.value.length > 20) {
      recentlyViewed.value = recentlyViewed.value.slice(0, 20)
    }
    saveToStorage()
  }

  // Geçmişi temizle
  const clearHistory = () => {
    recentlyViewed.value = []
    saveToStorage()
  }

  // Demo verileri yükle
  const loadDemoData = () => {
    if (products.value.length === 0 && packages.value.length === 0) {
      // Demo ürünleri ekle
      addProduct({
        name: 'Windows 11 Pro Lisansı',
        description: 'Microsoft Windows 11 Professional',
        price: 1499,
        stock: 50,
        category: 'İşletim Sistemi',
        type: 'single',
      })

      addProduct({
        name: 'Microsoft Office 365',
        description: '1 yıllık Microsoft Office 365 aboneliği',
        price: 599,
        stock: 100,
        category: 'Ofis Yazılımı',
        type: 'single',
      })

      addProduct({
        name: 'Antivirus Premium 1 Yıl',
        description: 'Norton 360 Premium',
        price: 399,
        stock: 40,
        category: 'Güvenlik',
        type: 'single',
      })

      addProduct({
        name: 'DDR4 16GB RAM',
        description: 'Kingston 16GB DDR4 3200MHz',
        price: 2999,
        stock: 20,
        category: 'Donanım',
        type: 'single',
      })

      addProduct({
        name: 'SSD 1TB NVMe',
        description: 'Samsung 970 EVO 1TB',
        price: 3499,
        stock: 15,
        category: 'Donanım',
        type: 'single',
      })

      // Barkod sistemi demo ürünleri
      addProduct({
        name: 'Manav Barkod Sistemi Pro',
        description: 'Terazi entegreli manav barkod çözümü',
        price: 4999,
        stock: 10,
        category: 'Manav Barkod Sistemi',
        type: 'single',
      })

      addProduct({
        name: 'Market Barkod Sistemi Lite',
        description: 'Küçük marketler için barkod sistemi',
        price: 3499,
        stock: 15,
        category: 'Market Barkod Sistemi',
        type: 'single',
      })

      addProduct({
        name: 'Nalbur Barkod Sistemi',
        description: 'Hırdavat ve nalburiye barkod takip sistemi',
        price: 3999,
        stock: 8,
        category: 'Nalbur Barkod Sistemi',
        type: 'single',
      })

      addProduct({
        name: 'Butik Barkod Sistemi',
        description: 'Giyim mağazaları için stok takip sistemi',
        price: 2999,
        stock: 12,
        category: 'Butik Barkod Sistemi',
        type: 'single',
      })

      addProduct({
        name: 'Market Barkod Sistemi Pro',
        description: 'Büyük marketler için gelişmiş barkod çözümü',
        price: 7999,
        stock: 6,
        category: 'Market Barkod Sistemi',
        type: 'single',
      })

      // Demo paket oluştur
      const prod1 = products.value[0]
      const prod2 = products.value[1]
      const prod3 = products.value[2]

      if (prod1 && prod2 && prod3) {
        addPackage({
          name: 'İş Paketi - Yazılım Seti',
          description: 'Windows 11 Pro + Office 365 + Antivirus',
          price: 2200,
          productIds: [prod1.id, prod2.id, prod3.id],
          discount: 15,
          badge: 'popüler',
          type: 'package',
        })
      }

      saveToStorage()
    }
  }

  // İnitialize
  loadFromStorage()

  return {
    products: computed(() => products.value),
    packages: computed(() => packages.value),
    recentlyViewed: computed(() => recentlyViewed.value),
    allProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    addPackage,
    updatePackage,
    deletePackage,
    getProduct,
    getPackage,
    getPackageProducts,
    calculatePackagePrice,
    addToHistory,
    clearHistory,
    saveToStorage,
    loadFromStorage,
    loadDemoData,
  }
})
