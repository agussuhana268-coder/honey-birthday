/**
 * =========================================================================
 * 💖 KONFIGURASI WEBSITE ULANG TAHUN ROMANTIS (HONEY BIRTHDAY) 💖
 * =========================================================================
 * 
 * PANDUAN MUDAH EDIT:
 * 1. Kamu bisa mengubah semua teks, tanggal, nama, PIN, dan foto di file ini.
 * 2. Cukup ganti teks di dalam tanda kutip "..." sesuai keinginanmu.
 * 3. Jangan hapus tanda kutip ("") atau tanda koma (,).
 * 
 * Placeholder default yang digunakan:
 * - Nama Pacar: [AYU TRI SAYANGG]
 * - Panggilan Sayang: [SAYANGGKUU]
 * - Nama Pengirim: [KHOLIK]
 * =========================================================================
 */

window.BIRTHDAY_CONFIG = {
  // === IDENTITAS UTAMA ===
  girlfriendName: "[AYU TRI SAYANGG]",
  nickname: "[SAYANGGKUU]",
  senderName: "[KHOLIK]",

  // === TANGGAL ULANG TAHUN ===
  birthdayDateDisplay: "18 Oktober",
  birthdayFullDate: "18 • 10 • 2008",

  // === KUNCI RAHASIA (PIN) ===
  // PIN default: 181008 (format: 18 • 10 • 08)
  pinCode: "181008",
  pinDisplayHint: "18 • 10 • 08",
  pinHintText: "Gunakan tanggal spesial kita ♡",
  
  // Pesan lucu & menggemaskan jika salah memasukkan PIN
  pinErrorMessages: [
    "Aduh ayanggg masa lupa tanggal spesial kita sih? 🥺💔",
    "Eits salah! Pikir baik-baik lagi ya bidadariku... 🎀",
    "Hayo denda peluk 10 detik kalau salah lagi! 😜💕",
    "Bukan itu cintakuuu, coba diingat-ingat lagi... 🌸",
    "Kunci hatiku belum pas nih, masa kamu lupa sih manis? ✨",
    "Hehe salah lagi, gemes banget! Coba pelan-pelan ya ayang ♡",
    "Waduh denda cium pipi nih kalau sampai salah terus! 🥰💌"
  ],

  // === 1. SPLASH SCREEN (BUKA KADO) ===
  splash: {
    badge: "Spesial Untuk Yang Tersayang 🎀",
    title: "Ada Sebuah Kado Kecil Untukmu ♡",
    subtitle: "Seseorang yang sangat menyayangimu telah menyiapkan kejutan manis ini...",
    buttonText: "Buka Kado Cinta 🎁",
    hintText: "Ketuk kado di atas untuk membuka kejutan",
  },

  // === 2. HALAMAN PIN (GEMBOK HATI) ===
  pinPage: {
    badge: "Kunci Hati Rahasia 🔒",
    title: "Masukkan PIN Cinta",
    subtitle: "Hanya yang memiliki kunci hati ini yang boleh masuk ♡",
    successMessage: "PIN Benar! Membuka gerbang cinta... 💖",
  },

  // === 3. HALAMAN UTAMA (BERANDA & UCAPAN) ===
  hero: {
    tagline: "Happy Birthday to My Favorite Human 🌸",
    title: "Selamat Ulang Tahun, [AYU TRI SAYANGG] ♡",
    subtitle: "Hari ini, semesta merayakan hadirnya dirimu. Dan aku merayakan hari di mana wanita paling istimewa dilahirkan ke dunia.",
    scrollHint: "Gulir ke bawah untuk melihat cerita kita 💖",
  },

  // === WISH & PESAN MANIS ===
  birthdayWish: {
    title: "Doa & Harapan Terdalam",
    quote: "Selamat ulang tahun, [SAYANGGKUU]. Semoga di lembaran usiamu yang baru ini, kamu selalu dihujani kebahagiaan yang membuat matamu berbinar, kedamaian yang menenangkan hatimu, dan cinta yang selalu mengingatkanmu betapa berharganya dirimu. Terima kasih sudah menjadi dirimu sendiri, dan membuat setiap hariku jauh lebih indah.",
    signature: "Selamanya milikmu, [KHOLIK] ♡",
  },

  // === KUE ULANG TAHUN INTERAKTIF ===
  cake: {
    badge: "Tiup Lilin & Harapan 🎂",
    title: "Make a Birthday Wish ♡",
    instruction: "Tutup matamu sejenak, buat satu harapan paling indah dalam hatimu, lalu tiup lilinnya ya...",
    blowButtonText: "Tiup Lilin 🕯️",
    wishGrantedMessage: "Semoga semua doa dan harapanmu terkabul, [SAYANGGKUU] tercinta! 🌸✨",
    relightButtonText: "Nyalakan Lilin Lagi ✨",
  },

  // === 4. GALERI FOTO ROMANTIS ===
  // Ganti foto di folder assets/images/photo-1.jpg sampai photo-8.jpg
  gallery: {
    badge: "Momen Manis Kita 📸",
    title: "Galeri Kenangan Indah",
    subtitle: "Setiap detik yang kulalui bersamamu adalah halaman terindah dalam hidupku.",
    photos: [
      {
        src: "./assets/images/photo-1.jpg",
        title: "Senyum Terindah",
        caption: "Salah satu momen favoritku saat bersamamu ♡",
        date: "Kenangan #1",
        sticker: "🎀"
      },
      {
        src: "./assets/images/photo-2.jpg",
        title: "Hari yang Istimewa",
        caption: "Momen yang selalu ingin kuputar kembali setiap saat.",
        date: "Kenangan #2",
        sticker: "✨"
      },
      {
        src: "./assets/images/photo-3.jpg",
        title: "Golden Hour Bersamamu",
        caption: "Kamu membuat hari yang biasa saja menjadi begitu luar biasa.",
        date: "Kenangan #3",
        sticker: "🌸"
      },
      {
        src: "./assets/images/photo-4.jpg",
        title: "Hanya Kita Berdua",
        caption: "Tatap matamu selalu menjadi tempat paling tenang di dunia.",
        date: "Kenangan #4",
        sticker: "💌"
      },
      {
        src: "./assets/images/photo-5.jpg",
        title: "Momen Manis",
        caption: "Saat waktu terasa berhenti setiap kali aku memandangmu ♡",
        date: "Kenangan #5",
        sticker: "🍓"
      },
      {
        src: "./assets/images/photo-6.jpg",
        title: "Tawa Paling Tulus",
        caption: "Petualangan dan cerita manis bersama orang terfavoritku.",
        date: "Kenangan #6",
        sticker: "🧸"
      },
      {
        src: "./assets/images/photo-7.jpg",
        title: "Pelukan Terhangat",
        caption: "Bersamamu adalah rasa aman dan kebahagiaan yang sesungguhnya.",
        date: "Kenangan #7",
        sticker: "🍯"
      },
      {
        src: "./assets/images/photo-8.jpg",
        title: "Selamanya Bersamamu",
        caption: "Untuk hari ini, esok, dan ribuan hari bahagia lainnya bersamamu.",
        date: "Kenangan #8",
        sticker: "💖"
      }
    ]
  },

  // === 5. SURAT CINTA (AMPLOP INTERAKTIF & EFEK KETIK) ===
  loveLetter: {
    badge: "Surat Dari Lubuk Hati 💌",
    title: "Surat Cinta Untuk [SAYANGGKUU]",
    subtitle: "Untaian kata yang kutulis khusus untukmu di hari bertambahnya usiamu.",
    envelopeLabel: "UNTUK: [AYU TRI SAYANGG] ♡",
    stampText: "SPECIAL DELIVERY • WITH LOVE 🎀",
    dateText: "18 Oktober 2008 • Special Edition",
    greeting: "Untuk [AYU TRI SAYANGG], cinta dalam hidupku,",
    paragraphs: [
      "Selamat ulang tahun untuk perempuan yang telah membuat duniaku jauh lebih lembut, lebih cerah, dan penuh warna.",
      "Jika ada satu hal yang ingin kuberikan kepadamu hari ini, itu adalah kesempatan untuk melihat dirimu sendiri melalui mataku. Supaya kamu tahu betapa luar biasanya dirimu, bagaimana senyumanmu bisa meredakan hari-hariku yang berat, dan betapa besar rasa syukurku karena memilikimu di sisiku.",
      "Mungkin aku tidak selalu pandai merangkai kata-kata manis, dan mungkin aku tidak selalu sempurna dalam mengungkapkannya. Tapi percayalah, kamu sangat berarti bagiku, lebih dari yang bisa kuutarakan dengan kata-kata.",
      "Di usiamu yang baru ini, aku berdoa agar kamu selalu diberikan kesehatan, ketenangan jiwa, langkah yang dimudahkan, serta alasan tak terhingga untuk tersenyum setiap harinya.",
      "Terima kasih sudah menjadi bagian terindah dalam ceritaku. Aku ingin terus menemani langkahmu, merayakan setiap ulang tahunmu, dan membuat lebih banyak kenangan manis bersamamu.",
      "Hari ini adalah harimu, sayangku. Kamu pantas mendapatkan semua cinta, kehangatan, dan hal-hal terindah yang ada di dunia ini.",
      "Selamat ulang tahun, [SAYANGGKUU] tercinta."
    ],
    closing: "Dengan segenap cintaku,",
    senderSign: "[KHOLIK] ♡",
    openButtonText: "Buka Surat Cinta 💌",
    skipButtonText: "Tampilkan Semua Teks ✨",
    reopenButtonText: "Lipat & Buka Ulang ✉️",
  },

  // === 6. ALASAN MENCINTAIMU (KARTU INTERAKTIF) ===
  reasons: {
    badge: "Alasan Hatiku Memilihmu 💖",
    title: "Kenapa Aku Mencintaimu?",
    subtitle: "Ada jutaan alasan di dunia ini, dan berikut adalah beberapa di antaranya ♡",
    instruction: "Klik setiap kartu untuk melihat alasan manis di baliknya 🎀",
    items: [
      {
        id: 1,
        number: "#01",
        title: "Senyummu Menghangatkan Hariku",
        desc: "Setiap kali melihat kamu tersenyum, semua rasa lelah dan kekhawatiran yang ada seketika lenyap begitu saja.",
        emoji: "✨"
      },
      {
        id: 2,
        number: "#02",
        title: "Hal Biasa Menjadi Istimewa",
        desc: "Bahkan sekadar obrolan santai di malam hari atau berjalan pelan berdua terasa seperti momen terbaik dalam hidupku.",
        emoji: "🪄"
      },
      {
        id: 3,
        number: "#03",
        title: "Hatimu Yang Begitu Tulus & Lembut",
        desc: "Caramu peduli, kebaikan hatimu yang murni, dan ketulusanmu membuatku selalu mengagumi kepribadianmu.",
        emoji: "🤍"
      },
      {
        id: 4,
        number: "#04",
        title: "Membuatku Ingin Jadi Lebih Baik",
        desc: "Bersamamu membuatku ingin terus belajar, tumbuh, dan menjadi versi terbaik dari diriku untuk bisa membahagiakanmu.",
        emoji: "🌱"
      },
      {
        id: 5,
        number: "#05",
        title: "Bersamamu Terasa Seperti Pulang",
        desc: "Di dekatmu, aku tidak perlu berpura-pura menjadi orang lain. Kamu adalah rumah paling nyaman untuk hatiku bersandar.",
        emoji: "🏡"
      },
      {
        id: 6,
        number: "#06",
        title: "Notifikasi Paling Kutunggu",
        desc: "Melihat namamu muncul di layar ponsel selalu berhasil membuat bibirku tersenyum tanpa sadar setiap harinya.",
        emoji: "💬"
      },
      {
        id: 7,
        number: "#07",
        title: "Tingkah Lucumu Yang Menggemaskan",
        desc: "Caramu bercerita dengan ceria, ekspresi wajahmu yang lucu, bahkan saat kamu lagi ngambek pun tetap sangat menggemaskan.",
        emoji: "🥰"
      },
      {
        id: 8,
        number: "#08",
        title: "Karena Kamu Adalah Kamu",
        desc: "Bukan karena syarat apa pun, tapi karena kamu adalah dirimu sendiri—anugerah terindah yang selalu kusyukuri setiap detik.",
        emoji: "🎀"
      }
    ]
  },

  // === 7. KUPON CINTA SPESIAL (LOVE COUPONS) ===
  coupons: {
    badge: "Hadiah Cinta Eksklusif 🎟️",
    title: "Kupon Cinta Spesial Untukmu",
    subtitle: "Kupon-kupon ini bisa kamu klaim kapan saja dan berlaku selamanya tanpa batas waktu ♡",
    items: [
      {
        id: 1,
        title: "Kupon Peluk & Manja Sepuasnya",
        desc: "Bisa diklaim kapan saja saat kamu lagi capek, sedih, atau kangen pengen dipeluk erat.",
        icon: "🫂",
        validity: "Berlaku Selamanya ♡"
      },
      {
        id: 2,
        title: "Kupon Ditraktir Makanan Favorit",
        desc: "Bebas pilih makanan, dessert, atau minuman manis apa saja yang lagi kamu inginkan.",
        icon: "🍰",
        validity: "Tanpa Batas ♡"
      },
      {
        id: 3,
        title: "Kupon Jadi Ratu Seharian",
        desc: "Hari ini semua maumu dituruti dan aku siap jadi asisten pribadimu yang paling setia.",
        icon: "👑",
        validity: "Khusus Untukmu ♡"
      },
      {
        id: 4,
        title: "Kupon Jalan-Jalan & Ngedate Santai",
        desc: "Jalan santai, hunting foto, nonton bioskop, atau nongkrong berdua di tempat favoritmu.",
        icon: "🚗",
        validity: "Kapan Saja ♡"
      },
      {
        id: 5,
        title: "Kupon Didengarkan Curhat 24 Jam",
        desc: "Telinga dan bahu yang selalu siap mendengar semua ceritamu sampai hatimu benar-benar lega.",
        icon: "💬",
        validity: "24/7 Siap Sedia ♡"
      },
      {
        id: 6,
        title: "Kupon Maaf & Bebas Ngambek",
        desc: "Gunakan kupon ini saat aku bikin kesel, dan aku wajib minta maaf serta belikan camilan enak.",
        icon: "🥺",
        validity: "Anti Kedaluwarsa ♡"
      }
    ]
  },

  // === 8. PESAN RAHASIA TERSEMBUNYI (SECRET MESSAGE) ===
  secretMessage: {
    badge: "Bisikan Rahasia Tersembunyi 🤫💌",
    title: "Ada Satu Pesan Rahasia...",
    subtitle: "Ketuk amplop rahasia ini untuk membuka apa yang selama ini tersimpan di lubuk hatiku paling dalam ♡",
    hint: "Ketuk untuk membuka pesan rahasia 🎀",
    content: "Di setiap doa yang kupanjatkan di sepertiga malam, namamu tidak pernah absen kusebut. Aku tidak hanya mencintai caramu tersenyum, tapi aku juga mencintai ketulusan dan kebaikan hatimu. Terima kasih sudah memilihku untuk berjalan bersamamu. Aku berjanji akan selalu berusaha menjaga senyum manismu itu selamanya.",
  },

  // === 9. KEJUTAN TERAKHIR (CONFETTI & POPUP CINTA) ===
  finalSurprise: {
    badge: "Satu Bisikan Terakhir 💝",
    title: "Kejutan Spesial Terakhir",
    subtitle: "Sebelum harimu berganti, ketuk kotak ini untuk membuka rahasia cinta terakhir...",
    buttonText: "Buka Kejutan Terakhir 🎁",
    modalBadge: "For My Most Precious Girl 💖",
    modalTitle: "Janji Cintaku Untukmu ♡",
    modalMessage: "Dari miliaran manusia di bumi, aku sangat bersyukur takdir mempertemukanku denganmu. Selamat ulang tahun, [AYU TRI SAYANGG]. Jika aku diberi kesempatan untuk mengulang waktu berkali-kali, aku akan tetap memilihmu. Hari ini, esok, dan di setiap detik dalam hidupku.",
    modalSign: "Dibuat dengan segenap cinta, khusus untuk [AYU TRI SAYANGG] dari [KHOLIK] 💖",
    closeButtonText: "Peluk Erat & Simpan di Hati ♡"
  },

  // === 10. MUSIK LATAR (YOUTUBE & MP3 BACKGROUND PLAYER) ===
  // Prioritas pemutaran:
  // 1. Jika audioUrl diisi (misal './assets/music.mp3' atau URL file mp3 online), musik akan diputar via audio HTML5 langsung.
  // 2. Jika audioUrl kosong, otomatis memutar video YouTube berdasarkan youtubeId (default).
  // 3. Jika offline atau YouTube diblokir, sistem otomatis memutar melodi musik box romantis sintesis (Web Audio API).
  music: {
    youtubeId: "iywHwg1ZO8s", // Lagu romantis: Cassandra - Cinta Terbaik (Akustik)
    audioUrl: "",              // Opsional: link .mp3 langsung atau './assets/music.mp3'
    title: "Our Special Birthday Song",
    artist: "For [AYU TRI SAYANGG] ♡",
    defaultVolume: 80,
    autoplayNotice: "Ketuk di mana saja untuk memutar musik romantis 🎵"
  }
};
