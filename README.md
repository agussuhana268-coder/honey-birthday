# 🎀 Website Ulang Tahun Romantis 💖

Website ucapan ulang tahun interaktif dan romantis bertema **Pink Pastel, Cream & Coquette Aesthetic** (pita 🎀, bunga 🌸, hati 💖, glitter ✨). Dibuat khusus dengan **HTML, CSS, dan JavaScript Murni (Vanilla)** tanpa backend, tanpa Node.js, dan 100% siap di-deploy langsung ke **GitHub Pages**.

---

## ✨ Fitur-Fitur Utama

1. **🎁 Splash Screen Interaktif**: Animasi kotak kado 3D dengan pita yang terbuka saat diketuk.
2. **🔒 Halaman PIN Kunci Hati**: Gembok hati dengan PIN rahasia `181008` dan dekorasi tanggal `18 • 10 • 08`.
3. **🌸 Beranda Romantis (Coquette Theme)**: Ucapan selamat ulang tahun personal, kartu doa terdalam, dan dekorasi pita manis.
4. **🎂 Kue Ulang Tahun Interaktif**: Kue ulang tahun dengan lilin berapi yang bisa ditiup (dengan confetti) dan dinyalakan kembali.
5. **📸 Galeri Foto Scrapbook & Polaroid**: 8 foto romantis dengan efek miring scrapbook dan fitur pembesar foto (Lightbox modal) saat diklik.
6. **💌 Surat Cinta Amplop 3D**: Animasi membuka amplop surat dengan segel lilin dan teks surat yang muncul bertahap.
7. **💖 Alasan Kenapa Aku Mencintaimu**: 8 kartu interaktif 3D flip yang bisa dibalik saat diklik.
8. **💝 Kejutan Spesial Terakhir**: Ledakan confetti penuh layar dan popup surat janji cinta manis.
9. **🎵 Pemutar Musik YouTube**: Widget piringan hitam (*vinyl disc*) yang berputar, terhubung langsung ke lagu YouTube romantis pilihanmu.
10. **🌸 Animasi Kelopak Bunga & Hati**: Efek kelopak sakura dan hati melayang di latar belakang, serta partikel bintang saat layar disentuh/diklik.

---

## 📁 Struktur Folder Proyek

Semua file bersifat statis dan langsung dapat dibuka di peramban (browser) mana pun:

```text
honey-birthday/
├── index.html              # Entry point utama website
├── style.css               # Desain & animasi (Coquette pastel pink aesthetic)
├── script.js               # Logika interaktif, musik, confetti & lightbox
├── config.js               # File konfigurasi satu pintu untuk semua teks & nama
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

Kamu **TIDAK PERLU** mengedit file HTML yang rumit! Semua teks, nama, PIN, dan link lagu sudah dikumpulkan rapi di dalam file **`config.js`**.

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
PIN default adalah `181008`. Jika ingin mengubahnya:
```javascript
  pinCode: "181008",             // 6 digit angka PIN
  pinDisplayHint: "18 • 10 • 08", // Tampilan teks dekorasi di atas keypad
```

### 3. Mengganti Musik YouTube
Lagu default menggunakan ID YouTube: `iywHwg1ZO8s` (dari link `https://youtu.be/iywHwg1ZO8s`).
Jika ingin mengganti lagu:
1. Salin 11 karakter kode video dari link YouTube yang kamu inginkan (misal `https://youtu.be/AbCdEfGhIjK` -> kodenya adalah `AbCdEfGhIjK`).
2. Masukkan ke bagian:
```javascript
  music: {
    youtubeId: "iywHwg1ZO8s", // Ganti dengan ID video YouTube baru
    title: "Our Special Birthday Song",
  }
```

### 4. Mengedit Surat Cinta & Alasan Mencintaimu
Di `config.js`, kamu bisa mengubah setiap paragraf surat cinta pada `loveLetter.paragraphs` dan 8 alasan pada `reasons.items` sesuai dengan kisah cintamu sendiri!

---

## 📸 Cara Mengganti Foto

1. Siapkan 8 foto terbaikmu dan pacarmu (disarankan rasio persegi atau 4:5).
2. Ubah nama file fotomu menjadi:
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
4. Caption dan judul tiap foto bisa disesuaikan di `config.js` pada bagian `gallery.photos`.

---

## 💻 Cara Menjalankan Secara Lokal di Komputer / Laptop

Kamu bisa langsung melihat hasilnya tanpa perlu menginstall server apa pun:

1. Buka folder `honey-birthday`.
2. Klik ganda (*double-click*) pada file **`index.html`**.
3. Website akan langsung terbuka di browser favoritmu (Chrome, Edge, Firefox, Safari).
4. *Tips:* Jika menggunakan VS Code, kamu juga bisa menggunakan ekstensi **Live Server** (klik kanan `index.html` -> *Open with Live Server*).

---

## 🚀 Cara Mengaktifkan di GitHub Pages (Deploy Gratis)

Website ini 100% kompatibel dan siap tayang di GitHub Pages tanpa build script maupun server:

### Langkah 1: Buat Repository di GitHub
1. Buka [GitHub](https://github.com/) dan login ke akunmu.
2. Buat repository baru (misal diberi nama `honey-birthday` atau `happy-birthday`).
3. Pilih repository sebagai **Public**.

### Langkah 2: Upload File
Kamu bisa mengupload file langsung melalui browser atau menggunakan Git:
- **Cara Git Terminal / CMD:**
  ```bash
  git add .
  git commit -m "Buat website ulang tahun romantis HTML murni"
  git branch -M main
  git remote add origin https://github.com/USERNAME_KAMU/NAMA_REPO.git
  git push -u origin main
  ```
- **Atau Cara Drag & Drop di Web GitHub:**
  Buka repository di web GitHub, klik **Add file** -> **Upload files**, lalu seret semua file dan folder (`index.html`, `style.css`, `script.js`, `config.js`, `.nojekyll`, dan folder `assets/`).

### Langkah 3: Aktifkan GitHub Pages
1. Di halaman repository GitHub kamu, klik tab **Settings** (ikon gerigi di atas).
2. Pada menu samping kiri, klik **Pages**.
3. Di bagian **Build and deployment**:
   - Source: Pilih **Deploy from a branch**.
   - Branch: Pilih **`main`** (atau `master`) dan foldernya **`/ (root)`**.
4. Klik tombol **Save**.
5. Tunggu sekitar 1–2 menit, lalu refresh halaman.
6. Link website pacarmu akan muncul di bagian atas, contohnya:
   ```text
   https://USERNAME_KAMU.github.io/honey-birthday/
   ```

Sekarang website ulang tahun romantis siap dikirimkan ke pujaan hatimu! 🌸🎀💌
