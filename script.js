/**
 * =========================================================================
 * 💖 HONEY BIRTHDAY - JAVASCRIPT UTAMA 💖
 * Pure Vanilla JavaScript • Tanpa Backend • GitHub Pages Ready
 * =========================================================================
 */

(function () {
  'use strict';

  // Ambil konfigurasi dari window.BIRTHDAY_CONFIG
  const config = window.BIRTHDAY_CONFIG || {};

  // Audio Synthesizer (Web Audio API) - 100% Offline, Tanpa File Eksternal
  const AudioFX = {
    ctx: null,
    init() {
      if (!this.ctx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
          this.ctx = new AudioContextClass();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    },
    playTap() {
      try {
        this.init();
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(659.25, this.ctx.currentTime); // E5
        osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.06); // A5
        gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.06);
      } catch (e) {}
    },
    playWrong() {
      try {
        this.init();
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(260, this.ctx.currentTime);
        osc.frequency.setValueAtTime(200, this.ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.25);
      } catch (e) {}
    },
    playUnlock() {
      try {
        this.init();
        if (!this.ctx) return;
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, i) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.09);
          gain.gain.setValueAtTime(0.1, this.ctx.currentTime + i * 0.09);
          gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + i * 0.09 + 0.35);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(this.ctx.currentTime + i * 0.09);
          osc.stop(this.ctx.currentTime + i * 0.09 + 0.35);
        });
      } catch (e) {}
    },
    playBlow() {
      try {
        this.init();
        if (!this.ctx) return;
        const bufferSize = Math.floor(this.ctx.sampleRate * 0.3);
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * 0.12;
        }
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(600, this.ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.3);
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);
        noise.start();
      } catch (e) {}
    }
  };

  // State Utama Aplikasi
  const state = {
    currentPin: '',
    pinUnlocked: false,
    currentPhotoIndex: 0,
    musicPlaying: false,
    isLetterOpen: false,
    isTyping: false,
    typewriterTimeout: null,
    secretOpened: false
  };

  // Helper Pengganti Placeholder Teks
  function replacePlaceholders(text) {
    if (!text) return '';
    return text
      .replace(/\[AYU TRI SAYANGG\]/g, config.girlfriendName || '[AYU TRI SAYANGG]')
      .replace(/\[SAYANGGKUU\]/g, config.nickname || '[SAYANGGKUU]')
      .replace(/\[KHOLIK\]/g, config.senderName || '[KHOLIK]');
  }

  function setText(selector, text) {
    if (!text) return;
    const el = document.querySelector(selector);
    if (el) el.textContent = text;
  }

  /* ==========================================================================
     1. INISIALISASI & MENGISI KONTEN DARI CONFIG
     ========================================================================== */
  function initContent() {
    // Splash Screen
    setText('#splash-badge', config.splash?.badge);
    setText('#splash-title', replacePlaceholders(config.splash?.title));
    setText('#splash-subtitle', replacePlaceholders(config.splash?.subtitle));
    setText('#splash-btn', config.splash?.buttonText);

    // PIN Screen
    setText('#pin-badge', config.pinPage?.badge);
    setText('#pin-title', config.pinPage?.title);
    setText('#pin-subtitle', config.pinPage?.subtitle);
    setText('#pin-date-tag', config.pinDisplayHint || '18 • 10 • 08');

    // Hero Section
    setText('#hero-tagline', replacePlaceholders(config.hero?.tagline));
    setText('#hero-title', replacePlaceholders(config.hero?.title));
    setText('#hero-subtitle', replacePlaceholders(config.hero?.subtitle));
    setText('#hero-date-badge', `🌸 ${config.birthdayFullDate || '18 • 10 • 2008'} 🌸`);
    setText('#wish-title', config.birthdayWish?.title);
    setText('#wish-quote', `"${replacePlaceholders(config.birthdayWish?.quote)}"`);
    setText('#wish-signature', replacePlaceholders(config.birthdayWish?.signature));

    // Cake Section
    setText('#cake-badge', config.cake?.badge);
    setText('#cake-title', config.cake?.title);
    setText('#cake-instruction', replacePlaceholders(config.cake?.instruction));
    setText('#cake-blow-btn', config.cake?.blowButtonText);
    setText('#cake-wish-banner', replacePlaceholders(config.cake?.wishGrantedMessage));

    // Gallery Section
    setText('#gallery-badge', config.gallery?.badge);
    setText('#gallery-title', config.gallery?.title);
    setText('#gallery-subtitle', replacePlaceholders(config.gallery?.subtitle));
    renderGallery();

    // Love Letter Section
    setText('#letter-badge', config.loveLetter?.badge);
    setText('#letter-title', replacePlaceholders(config.loveLetter?.title));
    setText('#letter-subtitle', replacePlaceholders(config.loveLetter?.subtitle));
    setText('#envelope-label', replacePlaceholders(config.loveLetter?.envelopeLabel));
    setText('#letter-stamp', config.loveLetter?.stampText);
    setText('#letter-greeting', replacePlaceholders(config.loveLetter?.greeting));
    setText('#letter-closing-text', config.loveLetter?.closing);
    setText('#letter-signature', replacePlaceholders(config.loveLetter?.senderSign));
    setText('#letter-open-btn', config.loveLetter?.openButtonText);
    setText('#letter-skip-btn', config.loveLetter?.skipButtonText);
    setText('#letter-reopen-btn', config.loveLetter?.reopenButtonText);

    // Reasons Section
    setText('#reasons-badge', config.reasons?.badge);
    setText('#reasons-title', config.reasons?.title);
    setText('#reasons-subtitle', replacePlaceholders(config.reasons?.subtitle));
    renderReasons();

    // Coupons Section
    setText('#coupons-badge', config.coupons?.badge);
    setText('#coupons-title', config.coupons?.title);
    setText('#coupons-subtitle', replacePlaceholders(config.coupons?.subtitle));
    renderCoupons();

    // Secret Message Box
    setText('#secret-badge', config.secretMessage?.badge);
    setText('#secret-title', config.secretMessage?.title);
    setText('#secret-subtitle', replacePlaceholders(config.secretMessage?.subtitle));
    setText('#secret-hint', config.secretMessage?.hint || 'Ketuk untuk membuka pesan rahasia 🎀');
    setText('#secret-text', `"${replacePlaceholders(config.secretMessage?.content)}"`);

    // Final Surprise
    setText('#surprise-badge', config.finalSurprise?.badge);
    setText('#surprise-title', config.finalSurprise?.title);
    setText('#surprise-subtitle', replacePlaceholders(config.finalSurprise?.subtitle));
    setText('#surprise-open-btn', config.finalSurprise?.buttonText);
    setText('#modal-badge', config.finalSurprise?.modalBadge);
    setText('#modal-title', config.finalSurprise?.modalTitle);
    setText('#modal-message', replacePlaceholders(config.finalSurprise?.modalMessage));
    setText('#modal-signature', replacePlaceholders(config.finalSurprise?.modalSign));
    setText('#modal-close-btn', config.finalSurprise?.closeButtonText);

    // Music Player Text
    setText('#music-player-title', config.music?.title || 'Our Special Song');

    // Footer
    setText('#footer-credit', `Dibuat dengan segenap cinta oleh ${config.senderName} untuk ${config.girlfriendName} ♡`);
  }

  /* ==========================================================================
     2. SPLASH SCREEN (BUKA KADO) & TRANSISI KE PIN
     ========================================================================== */
  function setupSplashScreen() {
    const splashScreen = document.getElementById('splash-screen');
    const giftWrapper = document.getElementById('gift-wrapper');
    const splashBtn = document.getElementById('splash-btn');
    const skipBtn = document.getElementById('splash-skip');

    function openGift() {
      if (!giftWrapper || giftWrapper.classList.contains('opened')) return;
      giftWrapper.classList.add('opened');

      AudioFX.playUnlock();
      playMusic();
      fireConfetti({ particleCount: 35, spread: 65 });

      setTimeout(() => {
        splashScreen.classList.add('hidden');
        const pinScreen = document.getElementById('pin-screen');
        if (pinScreen) pinScreen.classList.remove('hidden');
      }, 750);
    }

    if (giftWrapper) giftWrapper.addEventListener('click', openGift);
    if (splashBtn) splashBtn.addEventListener('click', openGift);
    if (skipBtn) {
      skipBtn.addEventListener('click', () => {
        AudioFX.playTap();
        playMusic();
        splashScreen.classList.add('hidden');
        const pinScreen = document.getElementById('pin-screen');
        if (pinScreen) pinScreen.classList.remove('hidden');
      });
    }
  }

  /* ==========================================================================
     3. SISTEM PIN & KUNCI HATI (LOVE LOCK)
     ========================================================================== */
  function setupPinScreen() {
    const pinScreen = document.getElementById('pin-screen');
    const pinCard = document.getElementById('pin-card');
    const heartLock = document.getElementById('heart-lock');
    const pinDots = document.querySelectorAll('.pin-dot');
    const pinError = document.getElementById('pin-error');
    const keypadButtons = document.querySelectorAll('.pin-keypad button');
    const flashOverlay = document.getElementById('romantic-flash-overlay');

    const expectedPin = (config.pinCode || '181008').replace(/[^0-9]/g, '');
    const errorMessages = config.pinErrorMessages || [
      'Aduh ayanggg masa lupa tanggal spesial kita sih? 🥺💔',
      'Eits salah! Pikir baik-baik lagi ya bidadariku... 🎀',
      'Hayo denda peluk 10 detik kalau salah lagi! 😜💕',
      'Bukan itu cintakuuu, coba diingat-ingat lagi... 🌸',
      'Kunci hatiku belum pas nih, masa kamu lupa sih manis? ✨',
      'Hehe salah lagi, gemes banget! Coba pelan-pelan ya ayang ♡'
    ];

    let errorIndex = 0;

    function updateDots() {
      pinDots.forEach((dot, index) => {
        if (index < state.currentPin.length) {
          dot.classList.add('filled');
        } else {
          dot.classList.remove('filled');
        }
      });
    }

    function checkPin() {
      if (state.currentPin === expectedPin) {
        // PIN Benar!
        state.pinUnlocked = true;
        AudioFX.playUnlock();
        heartLock.classList.add('unlocked');
        heartLock.innerHTML = '🔓';
        pinError.style.color = '#059669';
        pinError.textContent = config.pinPage?.successMessage || 'PIN Benar! Membuka gerbang cinta... 💖';

        fireConfetti({ particleCount: 70, spread: 90 });

        // Efek Dreamy Flash Transisi
        setTimeout(() => {
          if (flashOverlay) flashOverlay.classList.add('active');
        }, 400);

        setTimeout(() => {
          pinScreen.classList.add('hidden');
          const mainContent = document.getElementById('main-content');
          mainContent.classList.add('visible');
          window.scrollTo({ top: 0, behavior: 'smooth' });

          setTimeout(() => {
            if (flashOverlay) flashOverlay.classList.remove('active');
          }, 350);
        }, 900);
      } else {
        // PIN Salah!
        AudioFX.playWrong();
        pinCard.classList.add('shake-animation');
        pinError.style.color = '#e11d48';

        // Tampilkan pesan lucu bergantian
        const msg = errorMessages[errorIndex % errorMessages.length];
        errorIndex++;
        pinError.textContent = msg;

        setTimeout(() => {
          pinCard.classList.remove('shake-animation');
          state.currentPin = '';
          updateDots();
        }, 650);
      }
    }

    function handleKeyPress(key) {
      if (state.pinUnlocked) return;
      playMusic(); // trigger playback jika belum aktif

      if (key === 'clear') {
        AudioFX.playTap();
        state.currentPin = '';
        pinError.textContent = '';
        updateDots();
      } else if (key === 'backspace') {
        AudioFX.playTap();
        state.currentPin = state.currentPin.slice(0, -1);
        pinError.textContent = '';
        updateDots();
      } else if (/^[0-9]$/.test(key)) {
        if (state.currentPin.length < 6) {
          AudioFX.playTap();
          state.currentPin += key;
          pinError.textContent = '';
          updateDots();
          if (state.currentPin.length === 6) {
            setTimeout(checkPin, 180);
          }
        }
      }
    }

    keypadButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const key = btn.getAttribute('data-key');
        handleKeyPress(key);
      });
    });

    // Dukungan Keyboard Desktop (termasuk strip / dash diabaikan dengan mulus)
    window.addEventListener('keydown', (e) => {
      if (state.pinUnlocked) return;
      if (!pinScreen.classList.contains('hidden')) {
        if (e.key >= '0' && e.key <= '9') {
          handleKeyPress(e.key);
        } else if (e.key === 'Backspace') {
          handleKeyPress('backspace');
        } else if (e.key === 'Escape' || e.key === 'Delete') {
          handleKeyPress('clear');
        }
      }
    });
  }

  /* ==========================================================================
     4. KUE ULANG TAHUN INTERAKTIF
     ========================================================================== */
  function setupCake() {
    const blowBtn = document.getElementById('cake-blow-btn');
    const flame = document.getElementById('candle-flame');
    const wishBanner = document.getElementById('cake-wish-banner');
    let blownOut = false;

    if (!blowBtn || !flame) return;

    blowBtn.addEventListener('click', () => {
      if (!blownOut) {
        // Tiup lilin
        AudioFX.playBlow();
        flame.classList.add('blown-out');
        wishBanner.classList.add('visible');
        blowBtn.textContent = config.cake?.relightButtonText || 'Nyalakan Lilin Lagi ✨';
        blownOut = true;
        fireConfetti({ particleCount: 75, spread: 90, origin: { y: 0.6 } });
      } else {
        // Nyalakan kembali
        AudioFX.playTap();
        flame.classList.remove('blown-out');
        wishBanner.classList.remove('visible');
        blowBtn.textContent = config.cake?.blowButtonText || 'Tiup Lilin 🕯️';
        blownOut = false;
      }
    });
  }

  /* ==========================================================================
     5. GALERI FOTO ROMANTIS (POLAROID & LIGHTBOX)
     ========================================================================== */
  function renderGallery() {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;
    const photos = config.gallery?.photos || [];

    grid.innerHTML = '';
    const angles = [-2, 2.5, -1.5, 3, -2.5, 1.8, -2, 2];

    // Placeholder SVG jika gambar lokal belum diganti / gagal load
    const fallbackSvg = "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='600'%20height='600'%20viewBox='0%200%20600%20600'%3E%3Crect%20fill='%23ffe4e9'%20width='600'%20height='600'/%3E%3Ctext%20x='50%25'%20y='46%25'%20dominant-baseline='middle'%20text-anchor='middle'%20font-size='90'%3E📸%3C/text%3E%3Ctext%20x='50%25'%20y='62%25'%20dominant-baseline='middle'%20text-anchor='middle'%20fill='%23be123c'%20font-family='sans-serif'%20font-weight='bold'%20font-size='22'%3EFoto%20Spesial%20Kita%20♡%3C/text%3E%3C/svg%3E";

    photos.forEach((photo, index) => {
      const card = document.createElement('div');
      card.className = 'polaroid-card';
      const angle = angles[index % angles.length];
      card.style.transform = `rotate(${angle}deg)`;

      card.innerHTML = `
        <div class="polaroid-pin">${photo.sticker || '🎀'}</div>
        <div class="polaroid-img-wrapper">
          <img src="${photo.src}" alt="${photo.title || 'Foto Kenangan'}" class="polaroid-img" loading="lazy" />
        </div>
        <div class="polaroid-caption">${photo.title || 'Momen Spesial'}</div>
        <div class="polaroid-date">${photo.date || 'Kenangan Bersama'}</div>
      `;

      const imgEl = card.querySelector('.polaroid-img');
      imgEl.onerror = function () {
        this.src = fallbackSvg;
      };

      card.addEventListener('click', () => {
        AudioFX.playTap();
        openLightbox(index);
      });
      grid.appendChild(card);
    });

    setupLightbox();
  }

  function setupLightbox() {
    const modal = document.getElementById('lightbox-modal');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');

    if (!modal) return;

    closeBtn.addEventListener('click', closeLightbox);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeLightbox();
    });

    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      AudioFX.playTap();
      navigateLightbox(-1);
    });

    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      AudioFX.playTap();
      navigateLightbox(1);
    });

    window.addEventListener('keydown', (e) => {
      if (modal.classList.contains('active')) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
      }
    });
  }

  function openLightbox(index) {
    const photos = config.gallery?.photos || [];
    if (!photos[index]) return;
    state.currentPhotoIndex = index;

    const modal = document.getElementById('lightbox-modal');
    const img = document.getElementById('lightbox-img');
    const title = document.getElementById('lightbox-title');
    const caption = document.getElementById('lightbox-caption');

    const photo = photos[index];
    img.src = photo.src;
    img.alt = photo.title || 'Kenangan';
    img.onerror = function () {
      this.src = "data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='600'%20height='600'%20viewBox='0%200%20600%20600'%3E%3Crect%20fill='%23ffe4e9'%20width='600'%20height='600'/%3E%3Ctext%20x='50%25'%20y='46%25'%20dominant-baseline='middle'%20text-anchor='middle'%20font-size='90'%3E📸%3C/text%3E%3Ctext%20x='50%25'%20y='62%25'%20dominant-baseline='middle'%20text-anchor='middle'%20fill='%23be123c'%20font-family='sans-serif'%20font-weight='bold'%20font-size='22'%3EFoto%20Spesial%20Kita%20♡%3C/text%3E%3C/svg%3E";
    };
    title.textContent = photo.title || '';
    caption.textContent = photo.caption || '';

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    const modal = document.getElementById('lightbox-modal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function navigateLightbox(dir) {
    const photos = config.gallery?.photos || [];
    let newIndex = state.currentPhotoIndex + dir;
    if (newIndex < 0) newIndex = photos.length - 1;
    if (newIndex >= photos.length) newIndex = 0;
    openLightbox(newIndex);
  }

  /* ==========================================================================
     6. SURAT CINTA (AMPLOP 3D & EFEK KETIK / TYPEWRITER ANIMATION)
     ========================================================================== */
  function setupLoveLetter() {
    const envelopeWrapper = document.getElementById('envelope-wrapper');
    const openBtn = document.getElementById('letter-open-btn');
    const paperContainer = document.getElementById('letter-paper-container');
    const letterBody = document.getElementById('letter-body');
    const skipBtn = document.getElementById('letter-skip-btn');
    const reopenBtn = document.getElementById('letter-reopen-btn');

    const paragraphs = (config.loveLetter?.paragraphs || []).map((p) => replacePlaceholders(p));

    function openEnvelope() {
      if (state.isLetterOpen) return;
      state.isLetterOpen = true;

      AudioFX.playUnlock();
      envelopeWrapper.classList.add('open');
      openBtn.style.display = 'none';

      setTimeout(() => {
        paperContainer.classList.add('visible');
        startTypewriter();
        paperContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 700);
    }

    function startTypewriter() {
      letterBody.innerHTML = '';
      state.isTyping = true;
      let pIdx = 0;
      let charIdx = 0;

      const pElement = document.createElement('p');
      pElement.className = 'typewriter-active';
      letterBody.appendChild(pElement);

      function typeChar() {
        if (!state.isTyping) return;
        if (pIdx >= paragraphs.length) {
          state.isTyping = false;
          const active = letterBody.querySelector('.typewriter-active');
          if (active) active.classList.remove('typewriter-active');
          return;
        }

        const text = paragraphs[pIdx];
        if (charIdx < text.length) {
          const char = text.charAt(charIdx);
          pElement.textContent += char;
          charIdx++;
          const delay = char === '.' || char === '!' || char === '?' ? 180 : char === ',' ? 90 : 22;
          state.typewriterTimeout = setTimeout(typeChar, delay);
        } else {
          pElement.classList.remove('typewriter-active');
          pIdx++;
          charIdx = 0;
          if (pIdx < paragraphs.length) {
            const nextP = document.createElement('p');
            nextP.className = 'typewriter-active';
            letterBody.appendChild(nextP);
            state.typewriterTimeout = setTimeout(typeChar, 280);
          } else {
            state.isTyping = false;
          }
        }
      }

      typeChar();
    }

    function showAllText() {
      state.isTyping = false;
      clearTimeout(state.typewriterTimeout);
      letterBody.innerHTML = '';
      paragraphs.forEach((pText) => {
        const p = document.createElement('p');
        p.textContent = pText;
        letterBody.appendChild(p);
      });
      AudioFX.playTap();
    }

    function closeAndReopen() {
      state.isTyping = false;
      clearTimeout(state.typewriterTimeout);
      envelopeWrapper.classList.remove('open');
      paperContainer.classList.remove('visible');
      openBtn.style.display = 'inline-flex';
      state.isLetterOpen = false;
      AudioFX.playTap();
      envelopeWrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    if (envelopeWrapper) envelopeWrapper.addEventListener('click', openEnvelope);
    if (openBtn) openBtn.addEventListener('click', openEnvelope);
    if (skipBtn) skipBtn.addEventListener('click', showAllText);
    if (reopenBtn) reopenBtn.addEventListener('click', closeAndReopen);
  }

  /* ==========================================================================
     7. ALASAN MENCINTAIMU (3D FLIP CARDS)
     ========================================================================== */
  function renderReasons() {
    const grid = document.getElementById('reasons-grid');
    if (!grid) return;
    const items = config.reasons?.items || [];

    grid.innerHTML = '';

    items.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'flip-card';
      card.innerHTML = `
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <span class="card-num-badge">${item.number}</span>
            <div class="card-icon">${item.emoji || '💖'}</div>
            <h3 class="card-front-title">${item.title}</h3>
            <span class="card-front-hint">Ketuk untuk membuka ♡</span>
          </div>
          <div class="flip-card-back">
            <span class="card-num-badge" style="background:#fff;">${item.number}</span>
            <div class="card-icon" style="font-size:28px;">${item.emoji || '✨'}</div>
            <p class="card-back-desc">${item.desc}</p>
          </div>
        </div>
      `;

      card.addEventListener('click', () => {
        AudioFX.playTap();
        card.classList.toggle('is-flipped');
      });

      grid.appendChild(card);
    });

    const flipAllBtn = document.getElementById('reasons-flip-all');
    let allFlipped = false;
    if (flipAllBtn) {
      flipAllBtn.addEventListener('click', () => {
        AudioFX.playTap();
        const cards = document.querySelectorAll('.flip-card');
        allFlipped = !allFlipped;
        cards.forEach((c) => {
          if (allFlipped) c.classList.add('is-flipped');
          else c.classList.remove('is-flipped');
        });
        flipAllBtn.textContent = allFlipped ? 'Balikkan Semua 🔄' : 'Buka Semua Kartu 💖';
      });
    }
  }

  /* ==========================================================================
     8. KUPON CINTA SPESIAL (LOVE COUPONS INTERAKTIF)
     ========================================================================== */
  function renderCoupons() {
    const grid = document.getElementById('coupons-grid');
    if (!grid) return;
    const items = config.coupons?.items || [];

    grid.innerHTML = '';

    items.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'coupon-card';
      card.innerHTML = `
        <div class="coupon-stamp">✓ TERKLAIM</div>
        <div>
          <div class="coupon-icon">${item.icon || '🎟️'}</div>
          <h3 class="coupon-title">${item.title}</h3>
          <p class="coupon-desc">${item.desc}</p>
        </div>
        <div class="coupon-footer">
          <span class="coupon-validity">${item.validity || 'Berlaku Selamanya ♡'}</span>
          <button class="coupon-claim-btn">Klaim Kupon 🎀</button>
        </div>
      `;

      const claimBtn = card.querySelector('.coupon-claim-btn');
      claimBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (card.classList.contains('claimed')) return;
        card.classList.add('claimed');
        claimBtn.textContent = 'Terklaim 💖';
        AudioFX.playUnlock();
        fireConfetti({ particleCount: 30, spread: 60 });
      });

      grid.appendChild(card);
    });
  }

  /* ==========================================================================
     9. PESAN RAHASIA TERSEMBUNYI (SECRET MESSAGE BOX)
     ========================================================================== */
  function setupSecretMessage() {
    const trigger = document.getElementById('secret-trigger');
    const sealed = document.getElementById('secret-sealed');
    const contentBox = document.getElementById('secret-content-box');

    if (!trigger || !sealed || !contentBox) return;

    trigger.addEventListener('click', () => {
      if (state.secretOpened) return;
      state.secretOpened = true;
      AudioFX.playUnlock();
      sealed.style.display = 'none';
      contentBox.classList.remove('hidden');
      fireConfetti({ particleCount: 45, spread: 75 });
    });
  }

  /* ==========================================================================
     10. KEJUTAN TERAKHIR (CONFETTI & POPUP JANJI CINTA)
     ========================================================================== */
  function setupFinalSurprise() {
    const openBtn = document.getElementById('surprise-open-btn');
    const modal = document.getElementById('surprise-modal');
    const closeBtn = document.getElementById('modal-close-btn');

    if (!openBtn || !modal) return;

    openBtn.addEventListener('click', () => {
      AudioFX.playUnlock();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';

      // Pesta Confetti Besar Multi-Stage
      fireConfetti({ particleCount: 100, spread: 100 });
      setTimeout(() => fireConfetti({ particleCount: 80, spread: 80, origin: { x: 0.2, y: 0.5 } }), 300);
      setTimeout(() => fireConfetti({ particleCount: 80, spread: 80, origin: { x: 0.8, y: 0.5 } }), 600);
    });

    closeBtn.addEventListener('click', () => {
      AudioFX.playTap();
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        AudioFX.playTap();
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  /* ==========================================================================
     11. MUSIK LATAR (YOUTUBE BACKGROUND PLAYER & VOLUME CONTROL)
     ========================================================================== */
  let ytPlayer = null;

  function initYouTubePlayer() {
    const youtubeId = config.music?.youtubeId || 'iywHwg1ZO8s';
    const defaultVol = config.music?.defaultVolume !== undefined ? config.music.defaultVolume : 80;

    try {
      ytPlayer = new YT.Player('yt-player-container', {
        height: '1',
        width: '1',
        videoId: youtubeId,
        playerVars: {
          autoplay: 0,
          loop: 1,
          playlist: youtubeId,
          controls: 0,
          showinfo: 0,
          modestbranding: 1,
          rel: 0,
        },
        events: {
          onReady: (event) => {
            try {
              if (ytPlayer && typeof ytPlayer.setVolume === 'function') {
                ytPlayer.setVolume(defaultVol);
              }
            } catch (err) {}
          },
          onStateChange: (event) => {
            if (event.data === YT.PlayerState.PLAYING) {
              setMusicUIPlaying(true);
            } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
              setMusicUIPlaying(false);
            }
          },
        },
      });
    } catch (e) {
      console.warn('YouTube Player fallback:', e);
    }
  }

  if (window.YT && window.YT.Player) {
    initYouTubePlayer();
  } else {
    window.onYouTubeIframeAPIReady = initYouTubePlayer;
  }

  function playMusic() {
    if (ytPlayer && typeof ytPlayer.playVideo === 'function') {
      try {
        ytPlayer.playVideo();
        setMusicUIPlaying(true);
      } catch (e) {
        console.warn('Play video failed:', e);
      }
    }
  }

  function pauseMusic() {
    if (ytPlayer && typeof ytPlayer.pauseVideo === 'function') {
      try {
        ytPlayer.pauseVideo();
        setMusicUIPlaying(false);
      } catch (e) {
        console.warn('Pause video failed:', e);
      }
    }
  }

  function toggleMusic() {
    AudioFX.playTap();
    if (state.musicPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  }

  function setMusicUIPlaying(isPlaying) {
    state.musicPlaying = isPlaying;
    const vinylDisc = document.getElementById('vinyl-disc');
    const musicBtn = document.getElementById('music-toggle-btn');
    const musicStatus = document.getElementById('music-status');

    if (vinylDisc) {
      if (isPlaying) vinylDisc.classList.add('spinning');
      else vinylDisc.classList.remove('spinning');
    }

    if (musicBtn) {
      musicBtn.innerHTML = isPlaying ? '❚❚' : '▶';
    }

    if (musicStatus) {
      musicStatus.textContent = isPlaying ? 'Memutar Musik Romantis ♡' : 'Ketuk untuk putar 🎵';
    }
  }

  function setupMusicWidget() {
    const vinylDisc = document.getElementById('vinyl-disc');
    const musicInfo = document.getElementById('music-info-toggle');
    const toggleBtn = document.getElementById('music-toggle-btn');
    const volSlider = document.getElementById('music-volume-slider');
    const volToggle = document.getElementById('music-vol-toggle');

    if (vinylDisc) vinylDisc.addEventListener('click', toggleMusic);
    if (musicInfo) musicInfo.addEventListener('click', toggleMusic);
    if (toggleBtn) toggleBtn.addEventListener('click', toggleMusic);

    // Kontrol Volume
    if (volSlider) {
      volSlider.addEventListener('input', (e) => {
        e.stopPropagation();
        const val = parseInt(e.target.value, 10);
        if (ytPlayer && typeof ytPlayer.setVolume === 'function') {
          ytPlayer.setVolume(val);
          if (val === 0) {
            ytPlayer.mute();
            if (volToggle) volToggle.textContent = '🔇';
          } else {
            ytPlayer.unMute();
            if (volToggle) volToggle.textContent = val < 40 ? '🔉' : '🔊';
          }
        }
      });
      volSlider.addEventListener('click', (e) => e.stopPropagation());
    }

    if (volToggle) {
      volToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        AudioFX.playTap();
        if (ytPlayer && typeof ytPlayer.isMuted === 'function') {
          if (ytPlayer.isMuted()) {
            ytPlayer.unMute();
            volToggle.textContent = '🔊';
            const cur = (typeof ytPlayer.getVolume === 'function' ? ytPlayer.getVolume() : 80) || 80;
            if (volSlider) volSlider.value = cur;
          } else {
            ytPlayer.mute();
            volToggle.textContent = '🔇';
            if (volSlider) volSlider.value = 0;
          }
        }
      });
    }

    // Unmute / Autoplay trigger pada gestur pertama
    const unlockAudio = () => {
      AudioFX.init();
      document.removeEventListener('click', unlockAudio);
      document.removeEventListener('touchstart', unlockAudio);
    };
    document.addEventListener('click', unlockAudio, { once: true });
    document.addEventListener('touchstart', unlockAudio, { once: true });
  }

  /* ==========================================================================
     12. ANIMASI KELOPAK BUNGA (CANVAS PETALS & FLOATING HEARTS)
     ========================================================================== */
  function setupPetalsCanvas() {
    const canvas = document.getElementById('petals-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = 28; // Ringan dan lancar di HP Android

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 9 + 6,
        speedX: Math.random() * 1.5 - 0.75,
        speedY: Math.random() * 1.2 + 0.8,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        type: Math.random() > 0.4 ? 'petal' : 'heart',
        opacity: Math.random() * 0.45 + 0.35,
        color: ['#ff8da1', '#ffccd5', '#fbcfe8', '#fed7aa'][Math.floor(Math.random() * 4)],
      });
    }

    function drawPetal(p) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(p.size / 2, -p.size / 2, p.size, 0, p.size / 2, p.size);
      ctx.bezierCurveTo(0, p.size / 2, -p.size / 2, p.size, 0, 0);
      ctx.fill();
      ctx.restore();
    }

    function drawHeart(p) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation * 0.3);
      ctx.globalAlpha = p.opacity * 0.8;
      ctx.fillStyle = '#ff6584';

      const s = p.size * 0.6;
      ctx.beginPath();
      ctx.moveTo(0, s / 4);
      ctx.bezierCurveTo(0, 0, -s / 2, 0, -s / 2, s / 4);
      ctx.bezierCurveTo(-s / 2, s / 2, 0, (s * 3) / 4, 0, s);
      ctx.bezierCurveTo(0, (s * 3) / 4, s / 2, s / 2, s / 2, s / 4);
      ctx.bezierCurveTo(s / 2, 0, 0, 0, 0, s / 4);
      ctx.fill();
      ctx.restore();
    }

    let isTabActive = true;
    document.addEventListener('visibilitychange', () => {
      isTabActive = !document.hidden;
    });

    function animate() {
      if (isTabActive) {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.speedX;
          p.y += p.speedY;
          p.rotation += p.rotationSpeed;

          if (p.type === 'petal') drawPetal(p);
          else drawHeart(p);

          // Wrap di layar
          if (p.y > height + 20) {
            p.y = -20;
            p.x = Math.random() * width;
          }
          if (p.x > width + 20) p.x = -20;
          if (p.x < -20) p.x = width + 20;
        }
      }
      requestAnimationFrame(animate);
    }

    animate();
  }

  /* ==========================================================================
     13. EFEK INTERAKTIF TAP SPARKLE (TAP DI MANA SAJA)
     ========================================================================== */
  function setupInteractiveSparkles() {
    const emojis = ['💖', '✨', '🌸', '🎀', '🤍', '🍓'];

    function spawnParticle(x, y) {
      const p = document.createElement('div');
      p.className = 'tap-particle';
      p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      p.style.left = `${x}px`;
      p.style.top = `${y}px`;

      const dx = (Math.random() - 0.5) * 60;
      const dy = -(Math.random() * 50 + 30);
      p.style.setProperty('--dx', `${dx}px`);
      p.style.setProperty('--dy', `${dy}px`);

      document.body.appendChild(p);

      setTimeout(() => {
        if (p && p.parentNode) p.parentNode.removeChild(p);
      }, 1000);
    }

    window.addEventListener('click', (e) => {
      if (e.target.closest('button') || e.target.closest('.key-btn') || e.target.closest('input')) return;
      spawnParticle(e.clientX, e.clientY);
    });
  }

  /* ==========================================================================
     14. LIGHTWEIGHT PURE JS CONFETTI ENGINE (OFFLINE & GITHUB PAGES READY)
     ========================================================================== */
  function fireConfetti(options = {}) {
    const count = options.particleCount || 50;
    const originY = options.origin?.y !== undefined ? options.origin.y : 0.4;
    const originX = options.origin?.x !== undefined ? options.origin.x : 0.5;

    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.inset = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    const colors = ['#ff6f91', '#ffccd5', '#f59e0b', '#fbbf24', '#f43f5e', '#a855f7', '#38bdf8'];
    const particles = [];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 12 + 4;
      particles.push({
        x: width * originX,
        y: height * originY,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity - 3,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        vr: (Math.random() - 0.5) * 10,
        gravity: 0.35,
        drag: 0.96,
        alpha: 1,
      });
    }

    let frame = 0;
    function render() {
      ctx.clearRect(0, 0, width, height);
      let alive = false;

      particles.forEach((p) => {
        p.vx *= p.drag;
        p.vy *= p.drag;
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vr;
        p.alpha -= 0.012;

        if (p.alpha > 0) {
          alive = true;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.5);
          ctx.restore();
        }
      });

      frame++;
      if (alive && frame < 180) {
        requestAnimationFrame(render);
      } else {
        if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      }
    }

    requestAnimationFrame(render);
  }

  /* ==========================================================================
     15. SCROLL SPY UNTUK BOTTOM NAV
     ========================================================================== */
  function setupNavigationSpy() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
      let currentId = '';
      const scrollPos = window.scrollY + 220;

      sections.forEach((sec) => {
        if (scrollPos >= sec.offsetTop) {
          currentId = sec.getAttribute('id');
        }
      });

      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        }
      });
    });
  }

  /* ==========================================================================
     DOM READY INITIATOR
     ========================================================================== */
  document.addEventListener('DOMContentLoaded', () => {
    initContent();
    setupSplashScreen();
    setupPinScreen();
    setupCake();
    setupLoveLetter();
    setupSecretMessage();
    setupFinalSurprise();
    setupMusicWidget();
    setupPetalsCanvas();
    setupInteractiveSparkles();
    setupNavigationSpy();
  });
})();
