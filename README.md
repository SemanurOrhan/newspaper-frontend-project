# Haber Portalı - Angular 20 Frontend Projesi

Modern, responsive ve Türkçe lokalizasyonlu haber portalı uygulaması. NewsAPI kullanarak güncel haberleri listeler, kategorilere göre filtreler ve arama yapma imkanı sunar.

## 🚀 Özellikler

- ✨ **Modern Angular 20** ile standalone components mimarisi
- 🇹🇷 **Tam Türkçe** dil desteği ve lokalizasyon
- 📰 **Gerçek zamanlı haberler** NewsAPI entegrasyonu ile
- 🎨 **Responsive tasarım** tüm cihazlarda uyumlu
- 📱 **Akıllı grid sistem** 2 kolon (desktop), 1 kolon (mobil)
- 🔍 **Gelişmiş arama** fonksiyonu
- 📊 **Kategori filtreleme** (Ekonomi, Teknoloji, Spor, vb.)
- 🔄 **Akıllı sayfalama** sistemi (10 haber/sayfa)
- 🎯 **SEO optimizasyonu** ve meta etiketler
- 🔒 **Güvenli API key yönetimi** runtime configuration ile

## 📋 Gereksinimler

- Node.js (v18 veya üstü)
- npm (v9 veya üstü)
- NewsAPI API Key ([newsapi.org](https://newsapi.org) adresinden ücretsiz alınabilir)

## 🛠️ Kurulum

### 1. Projeyi klonlayın

```bash
git clone <repository-url>
cd newspaper-frontend-project
```

### 2. Bağımlılıkları yükleyin

```bash
npm install
```

### 3. API Key yapılandırması

#### a) `.env` dosyası oluşturun

Proje kök dizininde `.env` dosyası oluşturun:

```bash
# Windows PowerShell
New-Item -Path .env -ItemType File

# veya manuel olarak .env dosyası oluşturun
```

#### b) API Key'inizi ekleyin

`.env` dosyasını açın ve aşağıdaki satırı ekleyin:

```env
NEWS_API_KEY=your_api_key_here
```

> **Not:** `your_api_key_here` yerine [newsapi.org](https://newsapi.org/register) adresinden aldığınız gerçek API key'inizi yazın.

#### c) NewsAPI Key nasıl alınır?

1. [newsapi.org/register](https://newsapi.org/register) adresine gidin
2. Ücretsiz hesap oluşturun
3. API key'inizi email ile alın veya dashboard'dan kopyalayın
4. `.env` dosyasına yapıştırın

## 🚦 Çalıştırma

### Development modunda çalıştırma

```bash
npm start
```

Tarayıcınızda `http://localhost:4200` adresine gidin.

### Production build

```bash
npm run build
```

Build dosyaları `dist/` klasöründe oluşturulur.

### Testleri çalıştırma

```bash
npm test
```

## 📁 Proje Yapısı

```
newspaper-frontend-project/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── header/          # Ana başlık bileşeni
│   │   │   ├── footer/          # Alt bilgi bileşeni
│   │   │   ├── home/            # Ana sayfa (hero + haberler)
│   │   │   ├── category/        # Kategori sayfası
│   │   │   ├── search/          # Arama sonuçları
│   │   │   └── about/           # Hakkımızda sayfası
│   │   ├── services/
│   │   │   ├── news-api.service.ts    # NewsAPI entegrasyonu
│   │   │   └── config.service.ts      # Runtime config yönetimi
│   │   ├── app.routes.ts        # Route tanımları
│   │   └── app.config.ts        # Uygulama konfigürasyonu
│   ├── index.html
│   ├── main.ts
│   └── styles.css               # Global stiller
├── public/
│   └── assets/
│       └── config.json          # Runtime config (otomatik oluşur)
├── scripts/
│   └── generate-config.mjs      # .env → config.json dönüştürücü
├── .env                         # API key (GIT'e eklenmez!)
├── .gitignore
├── package.json
├── angular.json
└── README.md
```

## 🎨 Özellikler Detayları

### Sayfalama Sistemi

- Her sayfada 10 haber gösterilir
- Akıllı sayfa gösterimi (maksimum 5 sayfa butonu)
- Önceki/Sonraki navigasyonu
- Toplam haber ve sayfa sayısı bilgisi

### Kategori Sistemi

Desteklenen kategoriler:
- 📈 **Ekonomi** (Business)
- 💻 **Teknoloji** (Technology)
- ⚽ **Spor** (Sports)
- 🎬 **Eğlence** (Entertainment)
- 🔬 **Bilim** (Science)
- 🏥 **Sağlık** (Health)

### Responsive Tasarım

- **Desktop (>768px):** 2 sütun grid
- **Tablet (640px-768px):** 2 sütun grid
- **Mobil (<640px):** 1 sütun grid

### API Fallback Mekanizması

NewsAPI free plan sınırlamaları nedeniyle:
- İlk denemede `/top-headlines` endpoint kullanılır
- Sonuç bulunamazsa `/everything` endpoint'e fallback yapılır
- Türkçe anahtar kelimelerle filtreleme

## 🔒 Güvenlik

- API key `.env` dosyasında tutulur
- `.env` dosyası `.gitignore` ile GIT'e eklenmez
- Runtime'da `config.json` oluşturulur
- Console logları production'da devre dışı
- API key browser console'da görünmez

## 🔧 Yapılandırma

### environment.ts (Fallback)

```typescript
export const environment = {
  production: false,
  newsApiKey: 'fallback-key',
  newsApiUrl: 'https://newsapi.org/v2'
};
```

### Runtime Configuration

Proje başlatılırken `.env` → `config.json` dönüşümü otomatik yapılır:

```json
{
  "newsApiKey": "your_api_key",
  "newsApiUrl": "https://newsapi.org/v2"
}
```

## 🐛 Sorun Giderme

### "API key geçersiz" hatası alıyorum

- `.env` dosyasının proje kök dizininde olduğundan emin olun
- API key'in doğru kopyalandığını kontrol edin
- `npm start` ile projeyi yeniden başlatın

### Haberler listelenmiyor

- İnternet bağlantınızı kontrol edin
- API key'in geçerli olduğunu doğrulayın
- Browser console'da hata mesajlarını kontrol edin
- NewsAPI günlük limit kontrolü (100 istek/gün - free plan)

### Config.json oluşmuyor

```bash
# Manuel olarak config oluşturma
npm run config

# veya
node scripts/generate-config.mjs
```

## 📝 Lisans

Bu proje eğitim amaçlıdır.

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📧 İletişim

Sorularınız için issue açabilirsiniz.

## 🙏 Teşekkürler

- [NewsAPI](https://newsapi.org) - Haber verileri için
- [Angular](https://angular.dev) - Framework
- [Tailwind CSS](https://tailwindcss.com) tasarım ilhamı için

---

**Not:** Bu proje NewsAPI'nin ücretsiz planını kullanmaktadır. Production kullanımı için ücretli plana geçmeniz önerilir.

## Angular CLI Notları

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.9.

For more information on using the Angular CLI, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
