# 🎀 Website Ulang Tahun Romantis (Honey Birthday) 💖

Website ucapan ulang tahun interaktif dan romantis bertema **Pink Pastel, Cream & Coquette Aesthetic** (pita 🎀, bunga 🌸, hati 💖, glitter ✨). Dibuat khusus dengan **HTML, CSS, dan JavaScript Murni (Vanilla)** tanpa backend, tanpa Node.js, dan 100% siap di-deploy langsung ke **GitHub Pages**.

---

## ✨ Fitur-Fitur Utama

1. **🎁 Splash Screen Interaktif**: Animasi kotak kado 3D dengan pita yang terbuka saat diketuk dan efek suara magical.
2. **🔒 Halaman PIN Kunci Hati (Love Lock)**:
   - Gembok hati dengan PIN rahasia `181008` dan dekorasi tanggal `18 • 10 • 08`.
   - Pesan lucu & menggemaskan yang berganti-ganti jika salah memasukkan PIN (lengkap dengan suara buzz lucu dan efek getar).
   - Animasi gembok terbuka menjadi `🔓`, suara arpeggio kecapi, confetti, dan transisi dreamy flash menuju beranda.
3. **🌸 Beranda Romantis (Coquette Theme)**: Ucapan selamat ulang tahun personal yang besar, kartu doa terdalam, dan dekorasi pita manis.
4. **🎂 Kue Ulang Tahun Interaktif**: Kue ulang tahun dengan lilin berapi yang bisa ditiup (dengan efek suara hembusan angin & confetti) dan dinyalakan kembali.
5. **📸 Galeri Foto Scrapbook & Polaroid**: 8 foto romantis dengan efek miring scrapbook, stiker lucu, dan fitur pembesar foto (Lightbox modal) dengan navigasi prev/next saat diklik.
6. **💌 Surat Cinta Amplop 3D & Efek Mengetik**: Animasi membuka amplop dengan segel lilin, kertas surat vintage, dan efek mengetik (*typewriter*) huruf demi huruf dengan kursor hati `♡` yang berkedip.
7. **💖 Alasan Kenapa Aku Mencintaimu**: 8 kartu interaktif 3D flip yang bisa dibalik satu per satu atau sekaligus saat tombol diklik.
8. **🎟️ Kupon Cinta Spesial (Love Coupons)**: 6 voucher cinta eksklusif (kupon peluk, kuliner, jadi ratu seharian, dll.) yang bisa diklaim penerima dengan cap stempel hijau `✓ TERKLAIM`.
9. **🤫 Pesan Rahasia Tersembunyi**: Amplop rahasia tersembunyi yang bisa dibuka dengan sekali ketuk untuk mengungkap bisikan doa terdalam.
10. **💝 Kejutan Spesial Terakhir**: Ledakan confetti penuh layar multi-stage dan popup surat janji cinta manis.
11. **🎵 Pemutar Musik YouTube & Kontrol Volume**: Widget piringan hitam (*vinyl disc*) yang berputar, tombol play/pause, tombol bisu (mute/unmute), dan slider volume suara yang terhubung langsung ke lagu YouTube pilihanmu.
12. **🌸 Animasi Kelopak Bunga, Hati & Efek Sentuhan**: Efek kelopak sakura dan hati melayang di latar belakang canvas (ringan di Android), serta partikel bintang saat layar disentuh/diklik.

---

## 📁 Struktur Folder Proyek

Semua file bersifat statis dan langsung dapat dibuka di peramban (browser) mana pun:

```text
honey-birthday/
├── index.html              # Entry point utama website
├── style.css               # Desain, animasi & layout responsif HP/Desktop
├── script.js               # Logika interaktif, musik, audio fx, typewriter & confetti
├── config.js               # File konfigurasi satu pintu untuk semua teks, nama & PIN
├── .nojekyll               # Mencegah GitHub Pages mem-bypass file aset
├── README.md               # Panduan lengkap penggunaan (bahasa Indonesia)
└── assets/
    └── images/
        ├── photo-1.jpg     # Foto kenangan 1
        ├── photo-2.jpg     # Foto kenangan 2
        ├── photo-3.jpg     # Foto kenangan 3
        ├── photo-4.jpg     # Foto kenangan 4
        ├── photo-5.jpg     # Foto kenangan 5
        ├── photo-6.jpg     # Foto kenangan 6
        ├── photo-7.jpg     # Foto kenangan 7
        └── photo-8.jpg     # Foto kenangan 8
```

---

## 🛠️ Cara Kustomisasi & Edit Pesan

Kamu **TIDAK PERLU** mengedit kode HTML yang rumit! Semua teks, nama, PIN, surat cinta, kupon, dan link lagu sudah dikumpulkan rapi di dalam file **`config.js`**.

### 1. Mengubah Nama & Panggilan
Buka file `config.js` dengan teks editor (Notepad, VS Code, dll). Cari bagian paling atas:
```javascript
window.BIRTHDAY_CONFIG = {
  girlfriendName: "[AYU TRI SAYANGG]", // Ganti dengan nama pacarmu
  nickname: "[SAYANGGKUU]",             // Ganti dengan panggilan sayang
  senderName: "[KHOLIK]",               // Ganti dengan namamu
  ...
```

### 2. Mengubah PIN Gembok Cinta
PIN default adalah `181008` (sesuai format tanggal `18 • 10 • 08`). Jika ingin mengubahnya:
```javascript
  pinCode: "181008",             // 6 digit angka PIN
  pinDisplayHint: "18 • 10 • 08", // Tampilan teks dekorasi di atas keypad
```

### 3. Mengganti Musik (YouTube atau File MP3 Langsung)
Sistem pemutar musik mendukung 3 mode otomatis:
1. **File MP3 Sendiri (Paling Cepat & Pasti Berbunyi di Semua Browser)**: Cukup letakkan file lagu `.mp3` (misal `assets/lagu.mp3`) atau link file mp3 online ke bagian `audioUrl`.
2. **Video YouTube**: Masukkan 11 karakter kode ID video YouTube (default: `iywHwg1ZO8s` - Cassandra Cinta Terbaik Fingerstyle).
3. **Melodi Romantis Otomatis (Offline)**: Jika YouTube sedang diblokir/offline, website otomatis memainkan melodi musik box romantis sintesis murni tanpa hening!

```javascript
  music: {
    youtubeId: "iywHwg1ZO8s", // ID video YouTube pilihanmu
    audioUrl: "",              // Opsional: link audio mp3 lokal './assets/lagu.mp3' atau URL mp3
    title: "Our Special Birthday Song",
    defaultVolume: 80,
  }
```

### 4. Mengedit Surat Cinta, Kupon & Alasan
Di `config.js`, kamu bisa mengubah:
- `loveLetter.paragraphs`: Paragraf surat cinta yang akan diketik otomatis.
- `reasons.items`: 8 alasan manis mengapa kamu mencintainya.
- `coupons.items`: Kupon-kupon hadiah yang bisa diklaim olehnya.
- `secretMessage.content`: Pesan rahasia yang tersembunyi.

---

## 📸 Cara Mengganti Foto

1. Siapkan 8 foto kenangan terbaikmu dan pacarmu (disarankan rasio persegi 1:1 atau 4:5).
2. Beri nama file fotomu persis seperti berikut:
   - `photo-1.jpg`
   - `photo-2.jpg`
   - `photo-3.jpg`
   - `photo-4.jpg`
   - `photo-5.jpg`
   - `photo-6.jpg`
   - `photo-7.jpg`
   - `photo-8.jpg`
3. Masukkan dan timpa file-file tersebut ke dalam folder:
   ```text
   assets/images/
   ```
4. Judul dan caption manis tiap foto bisa disesuaikan di `config.js` pada bagian `gallery.photos`.

---

## 💻 Cara Menjalankan Secara Lokal di Komputer / Laptop

Kamu bisa langsung melihat hasilnya tanpa perlu menginstall server apa pun:

1. Buka folder `honey-birthday`.
2. Klik ganda (*double-click*) pada file **`index.html`**.
3. Website akan langsung terbuka di peramban favoritmu (Chrome, Edge, Firefox, Safari).
4. *Tips:* Jika menggunakan VS Code, kamu juga bisa menggunakan ekstensi **Live Server** (klik kanan `index.html` -> *Open with Live Server*).

---

## 🚀 Cara Mengaktifkan di GitHub Pages (Hosting Gratis)

Website ini 100% kompatibel dan siap tayang di GitHub Pages tanpa konfigurasi server yang rumit:

### Langkah 1: Buat Repository di GitHub
1. Buka [GitHub](https://github.com/) dan login ke akunmu.
2. Buat repository baru (misal diberi nama `honey-birthday`).
3. Pastikan pilih opsi **Public**.

### Langkah 2: Upload File
Kamu bisa mengupload file melalui Git atau langsung melalui browser:
- **Cara Git Terminal / Command Prompt:**
  ```bash
  git add .
  git commit -m "Buat website ulang tahun romantis HTML/CSS/JS murni"
  git branch -M main
  git remote add origin https://github.com/USERNAME_KAMU/honey-birthday.git
  git push -u origin main
  ```
- **Atau Cara Drag & Drop di Web GitHub:**
  Buka repository di web GitHub, klik **Add file** -> **Upload files**, lalu seret semua file dan folder (`index.html`, `style.css`, `script.js`, `config.js`, `.nojekyll`, dan folder `assets/`).

### Langkah 3: Aktifkan GitHub Pages
1. Di halaman repository GitHub kamu, klik tab **Settings** (ikon gerigi di kanan atas).
2. Pada menu bilah samping kiri, pilih menu **Pages**.
3. Di bagian **Build and deployment**:
   - Source: Pilih **Deploy from a branch**.
   - Branch: Pilih **`main`** (atau `master`) dan foldernya **`/ (root)`**.
4. Klik tombol **Save**.
5. Tunggu sekitar 1–2 menit, lalu refresh halaman.
6. Tautan website pacarmu akan muncul di bagian atas, contohnya:
   ```text
   https://USERNAME_KAMU.github.io/honey-birthday/
   ```

Sekarang website hadiah ulang tahun romantis siap kamu bagikan ke orang tersayang! 🌸🎀💌
