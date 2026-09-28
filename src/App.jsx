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
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop',
      description: 'Sertifikasi kompetensi pemrograman web full-stack, mencakup arsitektur microservices, manajemen basis data, dan CI/CD.'
    },
    {
      id: 2,
      type: 'certificate',
      title: 'Sertifikasi Pelatihan Keamanan Penerbangan (AVSEC)',
      category: 'Sertifikasi Keamanan',
      year: '2022',
      issuer: 'Kementerian Perhubungan / Bandara Soekarno-Hatta',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1200&auto=format&fit=crop',
      description: 'Lisensi resmi personel keamanan penerbangan untuk pemeriksaan penumpang, barang kargo, dan akses area terbatas bandara.'
    },
    {
      id: 3,
      type: 'documentation',
      title: 'Dokumentasi Monitoring Server & Infrastruktur',
      category: 'Dokumentasi Kerja',
      year: '2024',
      issuer: 'PT TechNova Digital Indonesia',
      image: 'https://images.unsplash.com/photo-1695668548342-c0c1ad479aee?q=80&w=1170&auto=format&fit=crop',
      description: 'Kegiatan pemantauan rutin performa server, keandalan basis data, dan optimalisasi trafik aplikasi web.'
    },
  ];

  // Perhitungan Pergerakan Mouse 3D Tilt
  const handleMouseMove = (e) => {
    import { useState, useEffect } from 'react';

export default function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    // Mendaftarkan event listener pergerakan mouse
    window.addEventListener('mousemove', handleMouseMove);

    // Membersihkan listener saat komponen dilepas (unmount)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.text}>Arahkan kursor Anda di mana saja</h1>

      {/* Kotak yang mengikuti kursor */}
      <div
        style={{
          ...styles.box,
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
    </div>
  );
}

// Styling sederhana menggunakan CSS-in-JS
const styles = {
  container: {
    height: '100vh',
    width: '100vw',
    backgroundColor: '#121212',
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'crosshair',
  },
  text: {
    color: '#ffffff',
    fontFamily: 'sans-serif',
    userSelect: 'none',
  },
  box: {
    width: '50px',
    height: '50px',
    backgroundColor: '#00f2fe',
    borderRadius: '8px',
    position: 'fixed',
    transform: 'translate(-50%, -50%)', // Mengetengahkan kotak di posisi kursor
    pointerEvents: 'none', // Menjaga agar kursor tidak terhalang kotak
    boxShadow: '0 0 15px rgba(0, 242, 254, 0.6)',
    transition: 'transform 0.05s ease-out', // Menambah efek pergerakan yang mulus
  },
};
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
        colors: ['#a855f7', '#7e22ce', '#c084fc']
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
      colors: ['#c084fc', '#ffffff', '#9333ea']
    });

    window.open(waUrl, '_blank');
    setShowContactModal(false);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove}
      className="min-h-screen bg-[#0f0728] text-white font-sans selection:bg-purple-500 selection:text-white pb-28 pt-6 px-4 md:px-8 relative overflow-hidden"
    >
      {/* Ambient Glowing Purple Orbs */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/25 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed top-[40%] right-[30%] w-[350px] h-[350px] bg-fuchsia-600/15 rounded-full blur-[130px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-4xl mx-auto space-y-6 relative z-10">
        
        {/* Header / Status Bar Top */}
        <header className="flex justify-between items-center bg-[#1d0c42]/80 backdrop-blur-md p-4 rounded-2xl border border-purple-500/30 shadow-lg shadow-purple-950/60">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-700 to-indigo-500 flex items-center justify-center font-bold text-lg shadow-md border border-purple-300/40">
                BM
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0f0728]" />
            </div>
            <div>
              <h1 className="text-sm font-semibold text-purple-100">@banimarvel</h1>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-emerald-400 font-medium">Full-Stack Dev & Operations | Jakarta & Bekasi</span>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setShowContactModal(true)}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-purple-600/30 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 border border-purple-300/30"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contact Me</span>
          </button>
        </header>

        {/* Home Tab */}
        {activeTab === 'home' && (
          <div className="space-y-6 animate-fadeIn">
            <div 
              style={{
                transform: `perspective(1200px) rotateX(${-mousePos.y * 0.4}deg) rotateY(${mousePos.x * 0.4}deg)`,
                transformStyle: 'preserve-3d',
                transition: 'transform 0.1s ease-out'
              }}
              className="relative bg-gradient-to-b from-[#1c0b40] to-[#140730] border border-purple-500/30 rounded-3xl p-6 md:p-8 shadow-2xl shadow-purple-950/80 overflow-hidden group hover:border-purple-400/50"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center" style={{ transform: 'translateZ(20px)' }}>
                <div className="md:col-span-2 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-400/30 text-purple-300 text-xs font-medium">
                    <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                    <span>Personal Portfolio</span>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                    About <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 via-fuchsia-300 to-indigo-200">Me</span>
                  </h2>

                  <p className="text-purple-100/90 text-sm leading-relaxed">
                    Saya <strong className="text-white">Bani Marvel Octavianus Gulo</strong>, berusia 19 tahun. Berpengalaman di bidang <span className="text-purple-300 font-medium">Senior Full-Stack Developer</span> di PT TechNova Digital Indonesia (2024 - sekarang).
                  </p>

                  <div className="pt-2 flex flex-wrap gap-4 border-t border-purple-800/40">
                    <div className="flex items-center gap-2 text-xs text-purple-200/80">
                      <MapPin className="w-4 h-4 text-purple-400" />
                      <span>Bekasi & Jakarta</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-purple-200/80">
                      <User className="w-4 h-4 text-purple-400" />
                      <span>19 Tahun</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center md:justify-end" style={{ transform: 'translateZ(40px)' }}>
                  <div className="relative w-48 h-56 rounded-2xl bg-gradient-to-br from-purple-900/60 via-[#13072e] to-indigo-950/80 border border-purple-400/40 p-3 shadow-2xl backdrop-blur-md flex flex-col items-center justify-between group">
                    <div className="w-full h-36 rounded-xl bg-gradient-to-t from-purple-950 to-purple-800 flex items-center justify-center relative overflow-hidden border border-purple-400/30 shadow-inner">
                      <img 
                        src="/profil.jpeg" 
                        alt="Bani Marvel Octavianus Gulo" 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                        onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500&auto=format&fit=crop"; }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0f0728] via-transparent to-transparent opacity-40" />
                    </div>

                    <div className="text-center w-full py-1">
                      <p className="text-xs font-bold text-white tracking-wide">BANI MARVEL O. GULO</p>
                      <p className="text-[10px] text-purple-300 font-medium">Senior Full-Stack Developer</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-purple-800/40" style={{ transform: 'translateZ(15px)' }}>
                <div className="bg-[#241050]/60 p-3 rounded-xl border border-purple-500/20 text-center">
                  <h4 className="text-2xl font-bold text-purple-300">100%</h4>
                  <p className="text-[11px] text-purple-200/70">Kepatuhan SOP & Keamanan</p>
                </div>
                <div className="bg-[#241050]/60 p-3 rounded-xl border border-purple-500/20 text-center">
                  <h4 className="text-2xl font-bold text-purple-300">2+</h4>
                  <p className="text-[11px] text-purple-200/70">Tahun Pengalaman Kerja</p>
                </div>
                <div className="bg-[#241050]/60 p-3 rounded-xl border border-purple-500/20 text-center">
                  <h4 className="text-2xl font-bold text-purple-300">15+</h4>
                  <p className="text-[11px] text-purple-200/70">Proyek Web Selesai</p>
                </div>
                <div className="bg-[#241050]/60 p-3 rounded-xl border border-purple-500/20 text-center">
                  <h4 className="text-2xl font-bold text-purple-300">24/7</h4>
                  <p className="text-[11px] text-purple-200/70">Sistem Reliability</p>
                </div>
              </div>
            </div>

            {/* Sub Nav Tabs */}
            <div className="flex border-b border-purple-800/40 gap-6 text-sm font-semibold">
              <button 
                onClick={() => setSubTab('bio')}
                className={`pb-3 flex items-center gap-2 border-b-2 transition-colors ${subTab === 'bio' ? 'border-purple-400 text-purple-300' : 'border-transparent text-purple-300/60 hover:text-purple-200'}`}
              >
                <User className="w-4 h-4" />
                <span>Personal Bio & Informasi Profil</span>
              </button>
            </div>

            {subTab === 'bio' && (
              <div className="bg-[#1c0b40] border border-purple-500/30 rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <User className="w-5 h-5 text-purple-400" />
                  <span>Rincian Informasi Profil</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[#261054] border border-purple-500/25 p-4 rounded-xl">
                    <p className="text-[10px] text-purple-300 font-mono">Nama Lengkap</p>
                    <p className="text-sm font-bold text-white mt-1">Bani Marvel Octavianus Gulo</p>
                  </div>

                  <div className="bg-[#261054] border border-purple-500/25 p-4 rounded-xl">
                    <p className="text-[10px] text-purple-300 font-mono">Usia</p>
                    <p className="text-sm font-bold text-white mt-1">19 Tahun</p>
                  </div>

                  <div className="bg-[#261054] border border-purple-500/25 p-4 rounded-xl">
                    <p className="text-[10px] text-purple-300 font-mono">Pendidikan Terakhir</p>
                    <p className="text-sm font-bold text-white mt-1">SMA Widya Nusantara</p>
                  </div>

                  <div className="bg-[#261054] border border-purple-500/25 p-4 rounded-xl">
                    <p className="text-[10px] text-purple-300 font-mono">Lokasi Operasional</p>
                    <p className="text-sm font-bold text-white mt-1">Bekasi & Jakarta</p>
                  </div>

                  <div className="bg-[#261054] border border-purple-500/25 p-4 rounded-xl">
                    <p className="text-[10px] text-purple-300 font-mono">Ketersediaan Karir</p>
                    <p className="text-sm font-bold text-emerald-400 mt-1">Open for Opportunities</p>
                  </div>

                  <div className="bg-[#261054] border border-purple-500/25 p-4 rounded-xl">
                    <p className="text-[10px] text-purple-300 font-mono">Fokus Keahlian</p>
                    <p className="text-sm font-bold text-white mt-1">Full-Stack Web Development</p>
                  </div>
                </div>

                <div className="bg-[#261054] border border-purple-500/30 p-5 rounded-2xl space-y-3">
                  <div className="flex items-center gap-2 text-purple-300 font-bold text-sm">
                    <GraduationCap className="w-5 h-5 text-purple-400" />
                    <span>Latar Belakang Pendidikan Tinggi</span>
                  </div>

                  <div className="flex justify-between items-start flex-wrap gap-2 pt-2 border-t border-purple-800/40">
                    <div>
                      <h4 className="text-sm font-bold text-white">UNIVERSITAS GUNADARMA (S1) Sistem Informasi</h4>
                      <p className="text-xs text-purple-200/70 mt-0.5">Sedang menempuh studi lanjut</p>
                    </div>
                    <span className="px-3 py-1 bg-purple-950 border border-purple-700/50 rounded-full text-[11px] text-purple-300 font-medium">
                      Status: Aktif
                    </span>
                  </div>
                </div>

                <div className="bg-[#261054] border border-purple-500/30 p-5 rounded-2xl space-y-3">
                  <div className="flex items-center gap-2 text-purple-300 font-bold text-sm">
                    <GraduationCap className="w-5 h-5 text-purple-400" />
                    <span>Latar Belakang Pendidikan Menengah</span>
                  </div>

                  <div className="flex justify-between items-start flex-wrap gap-2 pt-2 border-t border-purple-800/40">
                    <div>
                      <h4 className="text-sm font-bold text-white">SMA Widya Nusantara Bekasi</h4>
                      <p className="text-xs text-purple-200/70 mt-0.5">Lulus dengan Predikat Baik</p>
                    </div>
                    <span className="px-3 py-1 bg-purple-950 border border-purple-700/50 rounded-full text-[11px] text-purple-300 font-medium">
                      Status: Lulus
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Experience Tab */}
        {activeTab === 'experience' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-[#1c0b40] border border-purple-500/30 rounded-3xl p-6 md:p-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                <Briefcase className="w-6 h-6 text-purple-400" />
                <span>Pengalaman Kerja</span>
              </h3>

              <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-gradient-to-b before:from-purple-500 before:via-purple-800 before:to-transparent">
                <div className="relative pl-8 group">
                  <div className="absolute left-0 top-1.5 w-7 h-7 rounded-full bg-[#0f0728] border-2 border-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <div className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                  </div>
                  <div className="bg-[#261054] border border-purple-500/30 p-5 rounded-2xl hover:border-purple-400/60 transition-colors">
                    <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                      <div>
                        <h4 className="text-lg font-bold text-white">Senior Fullstack Developer</h4>
                        <p className="text-xs text-purple-300 font-medium">PT TechNova Digital Indonesia</p>
                      </div>
                      <span className="px-3 py-1 bg-purple-950 border border-purple-700/50 rounded-full text-xs text-purple-300 font-medium">
                        2024 - Sekarang
                      </span>
                    </div>
                    <ul className="text-xs text-purple-100/90 space-y-2 list-disc list-inside mt-3">
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

        {/* Gallery Tab */}
        {activeTab === 'gallery' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-[#1c0b40] border border-purple-500/30 rounded-3xl p-6 md:p-8 shadow-xl">
              <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Award className="w-6 h-6 text-purple-400" />
                    <span>Sertifikat & Dokumentasi Kerja</span>
                  </h3>
                  <p className="text-xs text-purple-200/70 mt-1">Bukti kualifikasi sertifikasi dan rekaman kegiatan operasional kerja.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {galleryItems.map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => setSelectedImage(item)}
                    className="group bg-[#261054] border border-purple-500/30 rounded-2xl overflow-hidden cursor-pointer hover:border-purple-400/70 transition-all duration-300 hover:-translate-y-1 shadow-lg flex flex-col justify-between"
                  >
                    <div className="relative w-full h-56 bg-black/50 flex items-center justify-center p-2 border-b border-purple-800/30 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500" 
                      />
                      
                      <span className="absolute top-3 left-3 px-3 py-1 bg-purple-950/90 border border-purple-400/40 rounded-full text-[10px] text-purple-200 font-semibold backdrop-blur-md shadow-md">
                        {item.category}
                      </span>

                      <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-purple-600/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                        <Eye className="w-4 h-4" />
                      </div>
                    </div>

                    <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-baseline gap-2 mb-1">
                          <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors leading-tight">{item.title}</h4>
                          <span className="text-[10px] text-purple-300/70 font-mono shrink-0">{item.year}</span>
                        </div>
                        <p className="text-xs text-purple-200/70 line-clamp-2">{item.description}</p>
                      </div>

                      <div className="pt-2 border-t border-purple-800/30 flex items-center justify-between text-[11px] text-purple-300 font-medium">
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

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-[#1c0b40] border border-purple-500/30 rounded-3xl p-6 md:p-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-purple-400" />
                <span>Keahlian & Kompetensi</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'Full-Stack Web Development', level: '95%' },
                  { name: 'React.js & Next.js Ecosystem', level: '92%' },
                  { name: 'Node.js & Express RESTful API', level: '90%' },
                  { name: 'Database Management (SQL/NoSQL)', level: '88%' },
                  { name: 'System Architecture & Optimization', level: '85%' },
                  { name: 'Aviation Security Standard SOP', level: '90%' },
                ].map((skill, index) => (
                  <div key={index} className="bg-[#261054] border border-purple-500/30 p-4 rounded-xl space-y-2">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-purple-100">{skill.name}</span>
                      <span className="text-purple-300">{skill.level}</span>
                    </div>
                    <div className="w-full h-2 bg-purple-950 rounded-full overflow-hidden border border-purple-800/40">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-600 to-indigo-400 rounded-full"
                        style={{ width: skill.level }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Contact Tab */}
        {activeTab === 'contact' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-[#1c0b40] border border-purple-500/30 rounded-3xl p-6 md:p-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-2 text-white flex items-center gap-2">
                <Mail className="w-6 h-6 text-purple-400" />
                <span>Hubungi Saya</span>
              </h3>
              <p className="text-xs text-purple-200/70 mb-6">Kirimkan pesan langsung untuk tawaran pekerjaan atau kolaborasi.</p>

              <form onSubmit={handleSendWhatsApp} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-purple-200 mb-1">Nama Lengkap</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Masukkan nama Anda"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-[#261054] border border-purple-500/30 rounded-xl text-xs text-white focus:outline-none focus:border-purple-400 transition-colors placeholder:text-purple-300/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-purple-200 mb-1">Email / Kontak</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="nama@email.com / 0812xxx"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-[#261054] border border-purple-500/30 rounded-xl text-xs text-white focus:outline-none focus:border-purple-400 transition-colors placeholder:text-purple-300/40"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-purple-200 mb-1">Pesan</label>
                  <textarea 
                    rows="4" 
                    required 
                    placeholder="Tuliskan tawaran atau pertanyaan Anda..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-[#261054] border border-purple-500/30 rounded-xl text-xs text-white focus:outline-none focus:border-purple-400 resize-none transition-colors placeholder:text-purple-300/40"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-900/50 transition-all flex items-center justify-center gap-2 border border-purple-300/20"
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
              ? 'bg-purple-600 border-purple-300 text-white scale-110 shadow-purple-600/50' 
              : 'bg-[#1d0c42]/90 border-purple-500/40 text-purple-300 hover:scale-105'
          }`}
        >
          <Heart className={`w-5 h-5 ${hasLiked ? 'fill-white' : ''}`} />
        </button>
        <span className="text-[10px] font-bold text-purple-100 bg-[#13072e]/80 px-2.5 py-0.5 rounded-full backdrop-blur-md border border-purple-500/30">
          {(likes / 1000).toFixed(1)}k
        </span>
      </div>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-[#1d0c42]/90 backdrop-blur-md border border-purple-500/40 px-4 py-2 rounded-2xl shadow-2xl flex items-center gap-2 md:gap-6">
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
                  ? 'bg-purple-600/50 text-white border border-purple-300/40 shadow-inner' 
                  : 'text-purple-300/60 hover:text-purple-100'
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
          <div className="relative bg-[#1c0b40] border border-purple-500/40 max-w-md w-full rounded-3xl p-6 shadow-2xl space-y-4 animate-fadeIn">
            <button 
              onClick={() => setShowContactModal(false)}
              className="absolute top-4 right-4 p-2 bg-purple-950 text-purple-300 hover:text-white rounded-full border border-purple-700/40"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Mail className="w-5 h-5 text-purple-400" />
              <span>Kirim Pesan Langsung</span>
            </h3>
            <form onSubmit={handleSendWhatsApp} className="space-y-3">
              <div>
                <label className="block text-[11px] text-purple-200 mb-1">Nama Lengkap</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Masukkan nama Anda"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#261054] border border-purple-500/30 rounded-xl text-xs text-white focus:outline-none focus:border-purple-400 transition-colors placeholder:text-purple-300/40"
                />
              </div>

              <div>
                <label className="block text-[11px] text-purple-200 mb-1">Email / No WhatsApp</label>
                <input 
                  type="text" 
                  required 
                  placeholder="nama@email.com / 0812xxx"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#261054] border border-purple-500/30 rounded-xl text-xs text-white focus:outline-none focus:border-purple-400 transition-colors placeholder:text-purple-300/40"
                />
              </div>

              <div>
                <label className="block text-[11px] text-purple-200 mb-1">Pesan</label>
                <textarea 
                  rows="3" 
                  required 
                  placeholder="Tuliskan tawaran atau pertanyaan Anda..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#261054] border border-purple-500/30 rounded-xl text-xs text-white focus:outline-none focus:border-purple-400 resize-none transition-colors placeholder:text-purple-300/40"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-900/50 transition-all flex items-center justify-center gap-2 border border-purple-300/20"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Kirim via WhatsApp</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal Lightbox Preview Gambar Sertifikat */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4">
          <div className="relative bg-[#1c0b40] border border-purple-500/40 max-w-2xl w-full rounded-3xl p-6 shadow-2xl space-y-4">
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 bg-purple-950 text-purple-300 hover:text-white rounded-full border border-purple-700/40"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-full h-80 bg-black/70 rounded-2xl overflow-hidden flex items-center justify-center border border-purple-500/30">
              <img 
                src={selectedImage.image} 
                alt={selectedImage.title}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            <div>
              <span className="px-3 py-1 bg-purple-950 border border-purple-400/40 rounded-full text-[10px] text-purple-200 font-semibold">
                {selectedImage.category} ({selectedImage.year})
              </span>
              <h3 className="text-lg font-bold text-white mt-2">{selectedImage.title}</h3>
              <p className="text-xs text-purple-200/80 mt-1">{selectedImage.description}</p>
              <p className="text-xs text-purple-300 mt-2 font-medium">Penerbit: {selectedImage.issuer}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}