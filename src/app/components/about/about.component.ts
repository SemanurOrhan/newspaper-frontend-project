import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Skill {
  name: string;
  proficiency: number;
}

interface Project {
  name: string;
  type: string;
  description: string;
  technologies: string[];
  year: string;
  logo?: string;
}

interface Experience {
  position: string;
  company: string;
  companyUrl: string;
  period: string;
  description: string;
  responsibilities: string[];
}

interface Education {
  degree: string;
  institution: string;
  period: string;
  description: string;
}

interface Certificate {
  name: string;
  issuer: string;
  date: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  // Hero Section Data
  heroData = {
    name: 'Semanur Orhan',
    title: 'Full Stack Developer',
    description:
      'Web geliştirme alanına odaklanmış bir bilgisayar mühendisliği öğrencisiyim. Modern web teknolojileri ve kullanıcı deneyimi odaklı çalışıyorum.',
    profileImage: 'assets/_pp.jpg',
    resumeUrl: '#',
  };

  // Journey/About paragraphs
  journeyParagraphs = [
    'Selçuk Üniversitesi Bilgisayar Mühendisliği bölümünde eğitimime devam ederken modern web teknolojilerine odaklanıyorum. HTML, CSS ve JavaScript ile başlayan yolculuğum, React, Node.js ve Express gibi teknolojilerle full-stack geliştirme yönünde ilerledi.',
    'Kullanıcı deneyimi odaklı, erişilebilir ve performanslı web uygulamaları geliştirmeyi hedefliyorum. Ayrıca yapay zeka ve veri bilimi alanlarında kendimi geliştirerek çeşitli bootcamp ve kurslarla bilgi birikimimi artırıyorum.',
    'Kod yazmadığım zamanlarda satranç oynamayı, fotoğraf çekmeyi ve yeni teknolojileri keşfetmeyi seviyorum.',
  ];

  // Skills Data
  frontendSkills: Skill[] = [
    { name: 'JavaScript', proficiency: 90 },
    { name: 'React', proficiency: 90 },
    { name: 'Angular', proficiency: 80 },
    { name: 'HTML/CSS', proficiency: 90 },
    { name: 'Tailwind CSS', proficiency: 85 },
    { name: 'Material UI', proficiency: 85 },
  ];

  backendSkills: Skill[] = [
    { name: 'Node.js', proficiency: 75 },
    { name: 'Next.js', proficiency: 80 },
    { name: 'Express', proficiency: 75 },
    { name: 'MongoDB', proficiency: 75 },
    { name: 'MS SQL', proficiency: 70 },
    { name: 'Oracle PL/SQL', proficiency: 70 },
  ];

  otherSkills: Skill[] = [
    { name: 'Git', proficiency: 90 },
    { name: 'Bitbucket', proficiency: 85 },
    { name: 'Docker', proficiency: 80 },
    { name: 'Canva - Figma', proficiency: 90 },
    { name: 'UI/UX Design', proficiency: 95 },
    { name: 'Python', proficiency: 85 },
    { name: 'C#', proficiency: 75 },
    { name: 'SQL', proficiency: 80 },
  ];

  // Projects Data
  specialProjects: Project[] = [
    {
      name: 'Ses Manipülasyon Tespiti',
      type: 'TÜBİTAK 2209A Projesi',
      description:
        'Ses kayıtları üzerindeki manipülasyonları tespit eden, TensorFlow ve sinyal işleme teknikleriyle geliştirilmiş yapay zeka destekli proje.',
      technologies: ['Python', 'TensorFlow', 'YOLO', 'Signal Processing', 'API'],
      year: '2024-2025',
    },
    {
      name: 'Personel Yönetim Sistemi',
      type: 'İş Projesi',
      description:
        'Firma personellerine yönelik servis, yemek ve vardiya yönetim modüllerini içeren, responsive tasarımlı web uygulaması.',
      technologies: ['React', 'Material UI', 'JavaScript', 'RESTful API'],
      year: '2024',
    },
    {
      name: 'DailyFXBot-TR',
      type: 'Telegram Döviz/Altın/Kripto Botu',
      description:
        'CollectAPI ile günlük döviz, altın ve kripto kurlarını otomatik olarak ileten Node.js tabanlı Telegram botu.',
      technologies: ['Node.js', 'Telegram Bot API', 'Axios', 'CollectAPI'],
      year: '2025',
    },
    {
      name: 'Hava Durumu Uygulaması',
      type: 'Kişisel Proje',
      description:
        'OpenWeatherMap API kullanarak gerçek zamanlı hava durumu bilgilerini gösteren interaktif web uygulaması.',
      technologies: ['React', 'JavaScript', 'Axios', 'OpenWeatherMap API', 'CSS3'],
      year: '2024',
    },
    {
      name: 'Nesne Algılama ve Takibi',
      type: 'Computer Vision Projesi',
      description:
        'OpenCV ve Python ile renkli nesneleri algılayan ve takip eden, gerçek zamanlı görüntü işleme sistemi.',
      technologies: ['Python', 'OpenCV', 'NumPy', 'Matplotlib'],
      year: '2024',
    },
    {
      name: 'Görüntü İşleme ve Sinyal Görselleştirme',
      type: 'Akademik Proje',
      description:
        'MATLAB ile görüntü işleme ve sinyal çıkarımı yapan, toplu işlem ve görselleştirme özelliklerine sahip analiz projesi.',
      technologies: ['MATLAB', 'Image Processing', 'Signal Processing'],
      year: '2024',
    },
    {
      name: 'App Store Veritabanı Tasarımı',
      type: 'Database Design',
      description:
        'Kapsamlı bir uygulama mağazası için veritabanı tasarımı, ERD modelleme ve SQL sorguları içeren proje.',
      technologies: ['MS SQL', 'Database Design', 'ERD', 'Data Modeling'],
      year: '2024',
    },
    {
      name: 'HR Analytics Dashboard',
      type: 'Data Analysis Projesi',
      description:
        'Python ve Power BI ile geliştirilen, çalışan analizi ve görselleştirme özellikleri sunan insan kaynakları analiz paneli.',
      technologies: ['Python', 'Power BI', 'Pandas', 'NumPy', 'Data Visualization'],
      year: '2024',
    },
    {
      name: 'Color Changer Suite',
      type: 'Desktop & Web Application',
      description:
        'SVG ve PNG dosyalarındaki renkleri analiz edip değiştiren, Python, React ve Electron ile geliştirilmiş çok platformlu araç.',
      technologies: ['Python', 'Pillow', 'React', 'Flask', 'Electron'],
      year: '2024',
    },
  ];

  // Experience Data
  experiences: Experience[] = [
    {
      position: 'Full Stack Web Developer Stajyeri',
      company: 'YCP Bilgi Teknolojileri',
      companyUrl: 'https://ycp.com.tr/',
      period: 'Haziran 2025 - Eylül 2025',
      description:
        'Zorunlu yaz stajım kapsamında, stajyer ekip arkadaşlarımla birlikte AI Quiz yönetimi uygulaması geliştirdik.',
      responsibilities: [
        'Kullanıcı deneyimi odaklı web arayüzleri tasarladım ve geliştirdim',
        'Backend API entegrasyonları gerçekleştirdim',
        'Ekip içi kod incelemelerine katıldım ve geri bildirim sağladım',
        'Backend tarafında AI entegrasyonları için destek sağladım',
      ],
    },
    {
      position: 'Web Developer - Kariyer Ofisi',
      company: 'Selçuk Üniversitesi',
      companyUrl: 'https://selcuk.edu.tr/',
      period: 'Mart 2025 - Haziran 2025',
      description:
        'Kariyer merkezi faaliyetlerinin geliştirilmesi kapsamında web uygulamaları geliştirme ve bakımını yapma.',
      responsibilities: [
        'Fakülte web sayfalarının güncellenmesi ve iyileştirilmesi',
        'İşletmede mesleki eğitim otomasyonu için veritabanı iyileştirme çalışmaları',
      ],
    },
    {
      position: 'Front-End Web Developer',
      company: 'Siem Grup',
      companyUrl: 'https://siemgrup.com.tr/',
      period: 'Kasım 2024 - Haziran 2025',
      description: 'Web uygulamaları geliştirme ve bakımını yapma.',
      responsibilities: [
        'React ve Node.js ile web uygulamaları geliştirdim',
        'Kullanıcı arayüzü tasarımları oluşturdum',
        'Backend API entegrasyonları gerçekleştirdim',
      ],
    },
  ];

  // Education Data
  educationList: Education[] = [
    {
      degree: 'Bilgisayar Mühendisliği',
      institution: 'Selçuk Üniversitesi',
      period: '2022 - 2026',
      description:
        'Bilgisayar bilimi, yazılım mühendisliği ve web teknolojileri üzerine odaklandım.',
    },
  ];

  // Certificates Data
  certificates: Certificate[] = [
    {
      name: 'Yapay Zeka Bootcamp',
      issuer: 'Pupilica',
      date: 'Şubat 2025',
    },
    {
      name: 'PL SQL, ORACLE Veri Tabanı Programlama Eğitimi',
      issuer: 'Miuul',
      date: 'Ocak 2025',
    },
    {
      name: 'İleri Seviye Python ve Makine Öğrenmesi',
      issuer: 'Turkcell Genç Yetenek',
      date: 'Aralık 2024',
    },
    {
      name: 'Data Science Python & PowerBI Bootcamp',
      issuer: 'Techcareer.net',
      date: 'Eylül 2024',
    },
    {
      name: 'React.JS ile WEB Programlama',
      issuer: 'Üretken Akademi',
      date: 'Mart 2024',
    },
    {
      name: "VERİ TABANI'NA GİRİŞ",
      issuer: 'GLOBAL AI HUB',
      date: 'Şubat 2024',
    },
    {
      name: 'VERSİYON KONTROLLERİ: Git ve GitHub',
      issuer: 'BTK Akademi',
      date: 'Ocak 2024',
    },
    {
      name: 'Introduction To Machine Learning',
      issuer: 'AI BUSINESS SCHOOL',
      date: 'Temmuz 2023',
    },
    {
      name: 'Node.js ile Web Programlama',
      issuer: 'BTK Akademi',
      date: 'Ekim 2023',
    },
    {
      name: 'Yapay Zeka ve Teknoloji Akademisi',
      issuer: 'Google',
      date: 'Mart 2024',
    },
  ];

  // Social Links
  socialLinks = {
    github: 'https://github.com/SemanurOrhan',
    linkedin: 'https://www.linkedin.com/in/semanur-orhan-262372259/',
    instagram: 'https://www.instagram.com/semanurrorhan/?hl=en',
    email: 'mailto:semanurorhan.dev@gmail.com',
    website: 'https://semanur-orhan.vercel.app',
  };
}
