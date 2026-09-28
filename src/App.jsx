import React, { useState, useEffect } from 'react';
import { 
  User, 
  Briefcase, 
  Award, 
  Mail, 
  MapPin, 
  ChevronRight, 
  ShieldCheck, 
  Sparkles, 
  Heart, 
  Send, 
  Eye, 
  X, 
  GraduationCap 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [subTab, setSubTab] = useState('bio');
  const [likes, setLikes] = useState(14800);
  const [hasLiked, setHasLiked] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // Data Sertifikat & Dokumentasi
  const galleryItems = [
    {
      id: 1,
      type: 'certificate',
      title: 'Sertifikat Senior Fullstack Developer',
      category: 'Sertifikasi Teknologi Informasi',
      year: '2024',
      issuer: 'PT TechNova Digital Indonesia',
      image: '/avsec.jpeg',
      description: 'Sertifikasi kompetensi resmi pemrograman tingkat lanjut meliputi arsitektur microservices, pengembangan API, dan manajemen database.'
    },
    {
      id: 2,
      type: 'certificate',
      title: 'Sertifikasi Pelatihan Leadership & Tech Lead',
      category: 'Sertifikasi Kepemimpinan',
      year: '2025',
      issuer: 'PT TechNova Digital Indonesia',
      image: '/fmdp.jpeg',
      description: 'Kelulusan pelatihan kepemimpinan tim engineering, kontrol arsitektur sistem, serta standar kualitas penyampaian produk software.'
    },
    {
      id: 3,
      type: 'documentation',
      title: 'Dokumentasi Monitoring & Maintenance Server',
      category: 'Dokumentasi Kerja',
      year: '2025',
      issuer: 'PT TechNova Digital Indonesia',
      image: 'https://images.unsplash.com/photo-1695668548342-c0c1ad479aee?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: 'Kegiatan pemantauan rutin performa server, optimasi database, dan evaluasi lalu lintas jaringan aplikasi.'
    },
  ];

  // Perhitungan Pergerakan Mouse 3D Tilt
  const handleMouseMove = (e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    const { innerWidth, innerHeight } = window;
    const x = ((clientX / innerWidth) - 0.5) * 35;
    const y = ((clientY / innerHeight) - 0.5) * 35;
    setMousePos({ x, y });
  };

  // Perhitungan Efek 3D Otomatis saat Halaman di-Scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      
      if (maxScroll > 0) {
        const scrollPercent = (scrollY / maxScroll) - 0.5;
        const x = Math.sin(scrollPercent * Math.PI) * 15;
        const y = Math.cos(scrollPercent * Math.PI) * 15;

        setMousePos({ x, y });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(prev => prev + 1);
      setHasLiked(true);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#6200ff', '#6304fb', '#470284']
      });
    } else {
      setLikes(prev => prev - 1);
      setHasLiked(false);
    }
  };

  const handleSendWhatsApp = (e) => {
    e.preventDefault();
    
    const phoneNumber = "6289517848065"; 
    
    const text = `Halo Bani Marvel Octavianus Gulo, ada pesan baru dari Portofolio Web:\n\n` +
                 `*Nama:* ${formData.name}\n` +
                 `*Email/Kontak:* ${formData.email}\n` +
                 `*Pesan:* ${formData.message}`;

    const encodedText = encodeURIComponent(text);
    const waUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#9d2dff', '#ffffff', '#ba6bff']
    });

    window.open(waUrl, '_blank');
    setShowContactModal(false);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove}
      className="min-h-screen bg-[#0d0203] text-white font-sans selection:bg-[#ff2d55] selection:text-white pb-28 pt-6 px-4 md:px-8 relative overflow-hidden"
    >
      {/* Background Ambient Glowing Orbs */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#ff2d55]/15 rounded-full blur-[150px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-4xl mx-auto space-y-6 relative z-10">
        
        {/* Header / Status Bar Top */}
        <header className="flex justify-between items-center bg-[#1a0507]/80 backdrop-blur-md p-4 rounded-2xl border border-purple-900/40 shadow-lg shadow-purple-950/50">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-800 to-purple-500 flex items-center justify-center font-bold text-lg shadow-md border border-purple-400/30">
                BM
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0d0203]" />
            </div>
            <div>
              <h1 className="text-sm font-semibold text-gray-200">@banimarvel</h1>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-emerald-400 font-medium">Senior Full-Stack Developer | Jakarta & Bekasi</span>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setShowContactModal(true)}
            className="px-4 py-2 bg-gradient-to-r from-[#ff2d55] to-[#b30024] hover:from-[#e60033] hover:to-[#80001a] text-white text-xs font-semibold rounded-xl shadow-lg shadow-red-600/30 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 border border-red-400/20"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contact Me</span>
          </button>
        </header>

        {/* Dynamic Slide Content */}
        {activeTab === 'home' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* About Me Main Card */}
            <div 
              style={{
                transform: `perspective(1200px) rotateX(${-mousePos.y * 0.4}deg) rotateY(${mousePos.x * 0.4}deg)`,
                transformStyle: 'preserve-3d',
                transition: 'transform 0.1s ease-out'
              }}
              className="relative bg-gradient-to-b from-[#180507] to-[#120304] border border-red-600/30 rounded-3xl p-6 md:p-8 shadow-2xl shadow-red-950/60 overflow-hidden group hover:border-red-500/50"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center" style={{ transform: 'translateZ(20px)' }}>
                <div className="md:col-span-2 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/30 text-red-400 text-xs font-medium">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Personal Portfolio</span>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                    About <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-red-500 to-rose-300">Me</span>
                  </h2>

                  <p className="text-gray-300 text-sm leading-relaxed">
                    Saya <strong className="text-white">Bani Marvel Octavianus Gulo</strong>, berusia 19 tahun. Berpengalaman di bidang <span className="text-purple-400 font-medium">Senior Full-Stack Developer</span> di PT TechNova Digital Indonesia (2024 - sekarang).
                  </p>

                  <div className="pt-2 flex flex-wrap gap-4 border-t border-red-900/30">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <MapPin className="w-4 h-4 text-red-500" />
                      <span>Bekasi & Jakarta</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <User className="w-4 h-4 text-red-500" />
                      <span>19 Tahun</span>
                    </div>
                  </div>
                </div>

                {/* Avatar Card 3D */}
                <div className="flex justify-center md:justify-end" style={{ transform: 'translateZ(40px)' }}>
                  <div className="relative w-48 h-56 rounded-2xl bg-gradient-to-br from-red-900/50 via-black to-red-950/80 border border-red-500/50 p-3 shadow-2xl backdrop-blur-md flex flex-col items-center justify-between group">
                    <div className="w-full h-36 rounded-xl bg-gradient-to-t from-red-950 to-red-800 flex items-center justify-center relative overflow-hidden border border-red-500/30 shadow-inner">
                      <img 
                        src="/profil.jpeg" 
                        alt="Bani Marvel Octavianus Gulo" 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0203] via-transparent to-transparent opacity-40" />
                    </div>

                    <div className="text-center w-full py-1">
                      <p className="text-xs font-bold text-white tracking-wide">BANI MARVEL OCTAVIANUS GULO</p>
                      <p className="text-[10px] text-purple-400 font-medium">Certified Senior Full-Stack Developer</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-purple-900/40" style={{ transform: 'translateZ(15px)' }}>
                <div className="bg-purple-950/30 p-3 rounded-xl border border-purple-900/30 text-center">
                  <h4 className="text-2xl font-bold text-purple-400">99.9%</h4>
                  <p className="text-[11px] text-gray-400">System Uptime & Stability</p>
                </div>
                <div className="bg-purple-950/30 p-3 rounded-xl border border-purple-900/30 text-center">
                  <h4 className="text-2xl font-bold text-purple-400">3+</h4>
                  <p className="text-[11px] text-gray-400">Tahun Pengalaman Kerja</p>
                </div>
                <div className="bg-purple-950/30 p-3 rounded-xl border border-purple-900/30 text-center">
                  <h4 className="text-2xl font-bold text-purple-400">10+</h4>
                  <p className="text-[11px] text-gray-400">Proyek Web Selesai</p>
                </div>
                <div className="bg-purple-950/30 p-3 rounded-xl border border-purple-900/30 text-center">
                  <h4 className="text-2xl font-bold text-purple-400">24/7</h4>
                  <p className="text-[11px] text-gray-400">Pemantauan & Deployment</p>
                </div>
              </div>
            </div>

            {/* Sub Nav Tabs */}
            <div className="flex border-b border-purple-900/40 gap-6 text-sm font-semibold">
              <button 
                onClick={() => setSubTab('bio')}
                className={`pb-3 flex items-center gap-2 border-b-2 transition-colors ${subTab === 'bio' ? 'border-purple-500 text-purple-400' : 'border-transparent text-gray-400 hover:text-gray-200'}`}
              >
                <User className="w-4 h-4" />
                <span>Personal Bio & Informasi Profil</span>
              </button>
            </div>

            {/* Section Rincian Informasi Profil */}
            {subTab === 'bio' && (
              <div className="bg-[#180507] border border-purple-600/30 rounded-3xl p-6 md:p-8 space-y-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <User className="w-5 h-5 text-purple-500" />
                  <span>Rincian Informasi Profil</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[#22070a] border border-purple-900/40 p-4 rounded-xl">
                    <p className="text-[10px] text-purple-400 font-mono">Nama Lengkap</p>
                    <p className="text-sm font-bold text-white mt-1">Bani Marvel Octavianus Gulo</p>
                  </div>

                  <div className="bg-[#22070a] border border-purple-900/40 p-4 rounded-xl">
                    <p className="text-[10px] text-purple-400 font-mono">Usia</p>
                    <p className="text-sm font-bold text-white mt-1">19 Tahun</p>
                  </div>

                  <div className="bg-[#22070a] border border-purple-900/40 p-4 rounded-xl">
                    <p className="text-[10px] text-purple-400 font-mono">Pendidikan Terakhir</p>
                    <p className="text-sm font-bold text-white mt-1">SMA Widya Nusantara</p>
                  </div>

                  <div className="bg-[#22070a] border border-purple-900/40 p-4 rounded-xl">
                    <p className="text-[10px] text-purple-400 font-mono">Lokasi Operasional</p>
                    <p className="text-sm font-bold text-white mt-1">Bekasi & Jakarta</p>
                  </div>

                  <div className="bg-[#22070a] border border-purple-900/40 p-4 rounded-xl">
                    <p className="text-[10px] text-purple-400 font-mono">Ketersediaan Karir</p>
                    <p className="text-sm font-bold text-emerald-400 mt-1">Open for Opportunities</p>
                  </div>

                  <div className="bg-[#22070a] border border-purple-900/40 p-4 rounded-xl">
                    <p className="text-[10px] text-purple-400 font-mono">Fokus Keahlian</p>
                    <p className="text-sm font-bold text-white mt-1">Full-Stack Development</p>
                  </div>
                </div>

                <div className="bg-[#22070a] border border-purple-900/50 p-5 rounded-2xl space-y-3">
                  <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
                    <GraduationCap className="w-5 h-5 text-purple-500" />
                    <span>Latar Belakang Pendidikan Tinggi</span>
                  </div>

                  <div className="flex justify-between items-start flex-wrap gap-2 pt-2 border-t border-purple-900/30">
                    <div>
                      <h4 className="text-sm font-bold text-white">UNIVERSITAS GUNADARMA (S1) Sistem Informasi</h4>
                      <p className="text-xs text-gray-400 mt-0.5">Masih melanjutkan studi</p>
                    </div>
                    <span className="px-3 py-1 bg-purple-950 border border-purple-800/50 rounded-full text-[11px] text-purple-300 font-medium">
                      Status: Aktif
                    </span>
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed pt-1">
                    Fokus pada analisis sistem, rekayasa perangkat lunak, manajemen basis data, serta arsitektur aplikasi berbasis web.
                  </p>
                </div>

                <div className="bg-[#22070a] border border-purple-900/50 p-5 rounded-2xl space-y-3">
                  <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
                    <GraduationCap className="w-5 h-5 text-purple-500" />
                    <span>Latar Belakang Pendidikan Menengah</span>
                  </div>

                  <div className="flex justify-between items-start flex-wrap gap-2 pt-2 border-t border-purple-900/30">
                    <div>
                      <h4 className="text-sm font-bold text-white">SMA Widya Nusantara Bekasi</h4>
                      <p className="text-xs text-gray-400 mt-0.5">Lulus dengan Predikat Baik & Memiliki Sertifikasi Pelatihan</p>
                    </div>
                    <span className="px-3 py-1 bg-purple-950 border border-purple-800/50 rounded-full text-[11px] text-purple-300 font-medium">
                      Status: Lulus
                    </span>
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed pt-1">
                    Fokus pada dasar-dasar ilmu sains, logika pemrograman, dan pengembangan perangkat lunak.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'experience' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-[#180507] border border-purple-600/30 rounded-3xl p-6 md:p-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-purple-500" />
                <span>Pengalaman Kerja</span>
              </h3>

              <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-gradient-to-b before:from-purple-500 before:via-purple-800 before:to-transparent">
                <div className="relative pl-8 group">
                  <div className="absolute left-0 top-1.5 w-7 h-7 rounded-full bg-[#0d0203] border-2 border-purple-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <div className="w-2.5 h-2.5 rounded-full bg-purple-800" />
                  </div>
                  <div className="bg-[#22070a] border border-purple-900/40 p-5 rounded-2xl hover:border-purple-500/50 transition-colors">
                    <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                      <div>
                        <h4 className="text-lg font-bold text-white">Senior Fullstack Developer</h4>
                        <p className="text-xs text-purple-400 font-medium">PT TechNova Digital Indonesia</p>
                      </div>
                      <span className="px-3 py-1 bg-purple-950 border border-purple-800/50 rounded-full text-xs text-purple-300 font-medium">
                        2024 - Sekarang
                      </span>
                    </div>
                    <ul className="text-xs text-gray-300 space-y-2 list-disc list-inside mt-3">
                      <li>Memimpin pengembangan arsitektur front-end dan back-end untuk platform e-commerce berintegrasi tinggi.</li>
                      <li>Mengoptimalkan struktur basis data (PostgreSQL) dan strategi caching (Redis) untuk menangani hingga 50.000 pengguna aktif bulanan.</li>
                      <li>Mengintegrasikan sistem pembayaran (payment gateway) lokal dan internasional.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-[#180507] border border-purple-600/30 rounded-3xl p-6 md:p-8 shadow-xl">
              <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Award className="w-6 h-6 text-purple-500" />
                    <span>Sertifikat & Dokumentasi Kerja</span>
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">Bukti kualifikasi sertifikasi dan rekaman kegiatan pengembangan software.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {galleryItems.map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => setSelectedImage(item)}
                    className="group bg-[#22070a] border border-purple-900/40 rounded-2xl overflow-hidden cursor-pointer hover:border-purple-500/60 transition-all duration-300 hover:-translate-y-1 shadow-lg flex flex-col justify-between"
                  >
                    <div className="relative w-full h-56 bg-black/60 flex items-center justify-center p-2 border-b border-purple-900/30 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="max-w-full max-h-full object-contain rounded-lg group-hover:scale-105 transition-transform duration-500" 
                      />
                      
                      <span className="absolute top-3 left-3 px-3 py-1 bg-purple-950/90 border border-purple-500/40 rounded-full text-[10px] text-purple-300 font-semibold backdrop-blur-md shadow-md">
                        {item.category}
                      </span>

                      <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-purple-600/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                        <Eye className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-baseline gap-2 mb-1">
                          <h4 className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors leading-tight">{item.title}</h4>
                          <span className="text-[10px] text-gray-400 font-mono shrink-0">{item.year}</span>
                        </div>
                        <p className="text-xs text-gray-400 line-clamp-2">{item.description}</p>
                      </div>

                      <div className="pt-2 border-t border-purple-900/20 flex items-center justify-between text-[11px] text-purple-400 font-medium">
                        <span>Penerbit: {item.issuer}</span>
                        <span className="flex items-center gap-1 group-hover:underline">Lihat Detail <ChevronRight className="w-3 h-3" /></span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-[#180507] border border-purple-600/30 rounded-3xl p-6 md:p-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-purple-500" />
                <span>Keahlian & Kompetensi</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'React.js & Next.js Framework', level: '95%' },
                  { name: 'Node.js & Express.js Backend API', level: '92%' },
                  { name: 'PostgreSQL & MongoDB Database', level: '90%' },
                  { name: 'Tailwind CSS & Frontend Styling', level: '95%' },
                  { name: 'System Architecture & Microservices', level: '88%' },
                  { name: 'Git, CI/CD & Cloud Deployment', level: '85%' },
                ].map((skill, index) => (
                  <div key={index} className="bg-[#22070a] border border-purple-900/40 p-4 rounded-xl space-y-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-gray-200">{skill.name}</span>
                      <span className="text-purple-400">{skill.level}</span>
                    </div>
                    <div className="w-full h-2 bg-purple-950 rounded-full overflow-hidden border border-purple-900/30">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-700 to-purple-500 rounded-full"
                        style={{ width: skill.level }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-[#180507] border border-purple-600/30 rounded-3xl p-6 md:p-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-2 text-white flex items-center gap-2">
                <Mail className="w-6 h-6 text-purple-500" />
                <span>Hubungi Saya</span>
              </h3>
              <p className="text-xs text-gray-400 mb-6">Kirimkan pesan langsung untuk tawaran pekerjaan atau kolaborasi.</p>

              <form onSubmit={handleSendWhatsApp} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Nama Lengkap</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Masukkan nama Anda"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-[#22070a] border border-purple-900/40 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Email / Kontak</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="nama@email.com / 0812xxx"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-[#22070a] border border-purple-900/40 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Pesan</label>
                  <textarea 
                    rows="4" 
                    required 
                    placeholder="Tuliskan tawaran atau pertanyaan Anda..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-[#22070a] border border-purple-900/40 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 resize-none transition-colors"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-900/50 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Pesan ke WhatsApp</span>
                </button>
              </form>
            </div>
          </div>
        )}

      </div>

      {/* Floating Likes Control */}
      <div className="fixed right-6 bottom-24 z-30 flex flex-col items-center gap-3">
        <button 
          onClick={handleLike}
          className={`p-3.5 rounded-full border shadow-xl transition-all duration-300 flex items-center justify-center ${
            hasLiked 
              ? 'bg-red-600 border-red-400 text-white scale-110 shadow-red-600/50' 
              : 'bg-[#1a0507]/90 border-red-900/50 text-red-400 hover:scale-105'
          }`}
        >
          <Heart className={`w-5 h-5 ${hasLiked ? 'fill-white' : ''}`} />
        </button>
        <span className="text-[10px] font-bold text-gray-300 bg-black/60 px-2 py-0.5 rounded-full backdrop-blur-md">
          {(likes / 1000).toFixed(1)}k
        </span>
      </div>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-[#1a0507]/90 backdrop-blur-md border border-purple-900/50 px-4 py-2 rounded-2xl shadow-2xl flex items-center gap-2 md:gap-6">
        {[
          { id: 'home', label: 'Beranda', icon: User },
          { id: 'experience', label: 'Pengalaman', icon: Briefcase },
          { id: 'gallery', label: 'Sertifikat', icon: Award },
          { id: 'skills', label: 'Keahlian', icon: ShieldCheck },
          { id: 'contact', label: 'Kontak', icon: Mail },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all ${
                isActive 
                  ? 'bg-purple-900/60 text-purple-300 border border-purple-500/40' 
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[10px] font-medium hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Modal Contact Form Pop-up */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative bg-[#180507] border border-purple-600/40 max-w-md w-full rounded-3xl p-6 shadow-2xl space-y-4 animate-fadeIn">
            <button 
              onClick={() => setShowContactModal(false)}
              className="absolute top-4 right-4 p-2 bg-purple-950 text-gray-300 hover:text-white rounded-full border border-purple-800/40"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Mail className="w-5 h-5 text-purple-500" />
              <span>Kirim Pesan Langsung</span>
            </h3>
            <form onSubmit={handleSendWhatsApp} className="space-y-3">
              <div>
                <label className="block text-[11px] text-gray-400 mb-1">Nama Lengkap</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Masukkan nama Anda"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#22070a] border border-purple-900/40 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] text-gray-400 mb-1">Email / No WhatsApp</label>
                <input 
                  type="text" 
                  required 
                  placeholder="nama@email.com / 0812xxx"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#22070a] border border-purple-900/40 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[11px] text-gray-400 mb-1">Pesan</label>
                <textarea 
                  rows="3" 
                  required 
                  placeholder="Tuliskan tawaran atau pertanyaan Anda..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#22070a] border border-purple-900/40 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 resize-none transition-colors"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-900/50 transition-all flex items-center justify-center gap-2 mt-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Kirim via WhatsApp</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal Preview Gambar Gallery */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-2xl w-full bg-[#180507] border border-purple-600/40 rounded-3xl p-6 shadow-2xl space-y-4">
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 bg-purple-950 text-gray-300 hover:text-white rounded-full border border-purple-800/40"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-full h-64 bg-black/80 rounded-2xl flex items-center justify-center overflow-hidden border border-purple-900/40 p-2">
              <img 
                src={selectedImage.image} 
                alt={selectedImage.title}
                className="max-w-full max-h-full object-contain" 
              />
            </div>

            <div>
              <span className="px-3 py-1 bg-purple-950 border border-purple-500/40 rounded-full text-[10px] text-purple-300 font-semibold">
                {selectedImage.category}
              </span>
              <h3 className="text-lg font-bold text-white mt-2">{selectedImage.title}</h3>
              <p className="text-xs text-gray-300 mt-1">{selectedImage.description}</p>
              <p className="text-[11px] text-purple-400 font-medium mt-3">Penerbit / Lokasi: {selectedImage.issuer} ({selectedImage.year})</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}