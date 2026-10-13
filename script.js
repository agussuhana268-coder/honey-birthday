/**
 * =========================================================================
 * 💖 HONEY BIRTHDAY - JAVASCRIPT UTAMA 💖
 * Pure Vanilla JavaScript • Tanpa Backend • GitHub Pages Ready
 * =========================================================================
 */

(function () {
  'use strict';

  // Pastikan konfigurasi tersedia
  const config = window.BIRTHDAY_CONFIG || {};

  // State Aplikasi
  const state = {
    currentPin: '',
    pinUnlocked: false,
    currentPhotoIndex: 0,
    musicPlaying: false,
    isLetterOpen: false,
    letterTypingTimeout: null,
  };

  /* ==========================================================================
     1. INISIALISASI & MENGISI KONTEN DARI CONFIG
     ========================================================================== */
  function initContent() {
    // Replace text placeholders jika belum di-replace
    const replacePlaceholders = (text) => {
      if (!text) return '';
      return text
        .replace(/\[AYU TRI SAYANGG\]/g, config.girlfriendName || '[AYU TRI SAYANGG]')
        .replace(/\[SAYANGGKUU\]/g, config.nickname || '[SAYANGGKUU]')
        .replace(/\[KHOLIK\]/g, config.senderName || '[KHOLIK]');
    };

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

  function setText(selector, text) {
    if (!text) return;
    const el = document.querySelector(selector);
    if (el) el.textContent = text;
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
      if (giftWrapper.classList.contains('opened')) return;
      giftWrapper.classList.add('opened');

      // Mulai mainkan musik saat interaksi pertama
      playMusic();

      // Efek confetti kado
      fireConfetti({ particleCount: 30, spread: 60 });

      setTimeout(() => {
        splashScreen.classList.add('hidden');
        document.getElementById('pin-screen').classList.remove('hidden');
      }, 750);
    }

    if (giftWrapper) giftWrapper.addEventListener('click', openGift);
    if (splashBtn) splashBtn.addEventListener('click', openGift);
    if (skipBtn) {
      skipBtn.addEventListener('click', () => {
        playMusic();
        splashScreen.classList.add('hidden');
        document.getElementById('pin-screen').classList.remove('hidden');
      });
    }
  }

  /* ==========================================================================
     3. SISTEM PIN & KUNCI HATI
     ========================================================================== */
  function setupPinScreen() {
    const pinScreen = document.getElementById('pin-screen');
    const pinCard = document.getElementById('pin-card');
    const heartLock = document.getElementById('heart-lock');
    const pinDots = document.querySelectorAll('.pin-dot');
    const pinError = document.getElementById('pin-error');
    const keypadButtons = document.querySelectorAll('.pin-keypad button');

    const expectedPin = config.pinCode || '181008';

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
        // PIN Benar
        state.pinUnlocked = true;
        heartLock.classList.add('unlocked');
        heartLock.innerHTML = '🔓';
        pinError.style.color = '#059669';
        pinError.textContent = config.pinPage?.successMessage || 'PIN Benar! Membuka gerbang cinta... 💖';

        fireConfetti({ particleCount: 60, spread: 80 });

        setTimeout(() => {
          pinScreen.classList.add('hidden');
          const mainContent = document.getElementById('main-content');
          mainContent.classList.add('visible');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 900);
      } else {
        // PIN Salah
        pinCard.classList.add('shake-animation');
        pinError.style.color = '#e11d48';
        pinError.textContent = config.pinErrorMessage || 'Hehe, salah sayang... coba lagi ya ♡';

        setTimeout(() => {
          pinCard.classList.remove('shake-animation');
          state.currentPin = '';
          updateDots();
        }, 600);
      }
    }

    function handleKeyPress(key) {
      if (state.pinUnlocked) return;
      playMusic(); // trigger playback jika belum aktif

      if (key === 'clear') {
        state.currentPin = '';
        pinError.textContent = '';
        updateDots();
      } else if (key === 'backspace') {
        state.currentPin = state.currentPin.slice(0, -1);
        pinError.textContent = '';
        updateDots();
      } else if (/^[0-9]$/.test(key)) {
        if (state.currentPin.length < 6) {
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

    // Dukungan Keyboard Fisik Desktop
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
        flame.classList.add('blown-out');
        wishBanner.classList.add('visible');
        blowBtn.textContent = config.cake?.relightButtonText || 'Nyalakan Lilin Lagi ✨';
        blownOut = true;
        fireConfetti({ particleCount: 70, spread: 90, origin: { y: 0.6 } });
      } else {
        // Nyalakan kembali
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

      card.addEventListener('click', () => openLightbox(index));
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
      navigateLightbox(-1);
    });

    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
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
     6. SURAT CINTA (AMPLOP 3D & EFEK KETIK)
     ========================================================================== */
  function setupLoveLetter() {
    const envelopeWrapper = document.getElementById('envelope-wrapper');
    const openBtn = document.getElementById('letter-open-btn');
    const paperContainer = document.getElementById('letter-paper-container');
    const letterBody = document.getElementById('letter-body');
    const skipBtn = document.getElementById('letter-skip-btn');
    const reopenBtn = document.getElementById('letter-reopen-btn');

    const paragraphs = (config.loveLetter?.paragraphs || []).map((p) => {
      return p
        .replace(/\[AYU TRI SAYANGG\]/g, config.girlfriendName || '[AYU TRI SAYANGG]')
        .replace(/\[SAYANGGKUU\]/g, config.nickname || '[SAYANGGKUU]')
        .replace(/\[KHOLIK\]/g, config.senderName || '[KHOLIK]');
    });

    function openEnvelope() {
      if (state.isLetterOpen) return;
      state.isLetterOpen = true;

      envelopeWrapper.classList.add('open');
      openBtn.style.display = 'none';

      setTimeout(() => {
        paperContainer.classList.add('visible');
        revealLetterText();
        paperContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 700);
    }

    function revealLetterText() {
      letterBody.innerHTML = '';
      paragraphs.forEach((pText) => {
        const p = document.createElement('p');
        p.textContent = pText;
        p.style.opacity = '0';
        p.style.transform = 'translateY(12px)';
        p.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        letterBody.appendChild(p);
      });

      // Fade-in bertahap tiap paragraf
      const pElements = letterBody.querySelectorAll('p');
      pElements.forEach((el, idx) => {
        setTimeout(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, (idx + 1) * 600);
      });
    }

    function showAllText() {
      const pElements = letterBody.querySelectorAll('p');
      pElements.forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
    }

    function closeAndReopen() {
      envelopeWrapper.classList.remove('open');
      paperContainer.classList.remove('visible');
      openBtn.style.display = 'inline-flex';
      state.isLetterOpen = false;
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
        card.classList.toggle('is-flipped');
      });

      grid.appendChild(card);
    });

    // Tombol Buka / Balikkan Semua
    const flipAllBtn = document.getElementById('reasons-flip-all');
    let allFlipped = false;
    if (flipAllBtn) {
      flipAllBtn.addEventListener('click', () => {
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
     8. KEJUTAN TERAKHIR (CONFETTI & POPUP JANJI CINTA)
     ========================================================================== */
  function setupFinalSurprise() {
    const openBtn = document.getElementById('surprise-open-btn');
    const modal = document.getElementById('surprise-modal');
    const closeBtn = document.getElementById('modal-close-btn');

    if (!openBtn || !modal) return;

    openBtn.addEventListener('click', () => {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';

      // Pesta Confetti Besar
      fireConfetti({ particleCount: 100, spread: 100 });
      setTimeout(() => fireConfetti({ particleCount: 70, spread: 80, origin: { x: 0.2, y: 0.5 } }), 300);
      setTimeout(() => fireConfetti({ particleCount: 70, spread: 80, origin: { x: 0.8, y: 0.5 } }), 600);
    });

    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  /* ==========================================================================
     9. MUSIK YOUTUBE PLAYER & FLOATING WIDGET
     ========================================================================== */
  let ytPlayer = null;

  window.onYouTubeIframeAPIReady = function () {
    const youtubeId = config.music?.youtubeId || 'iywHwg1ZO8s';
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
            // Player siap
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
      console.warn('YouTube Player API loading fallback:', e);
    }
  };

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
      musicStatus.textContent = isPlaying ? 'Memutar Musik Romantis ♡' : 'Ketuk untuk putar';
    }
  }

  function setupMusicWidget() {
    const musicWidget = document.getElementById('floating-music-player');
    const toggleBtn = document.getElementById('music-toggle-btn');

    if (musicWidget) {
      musicWidget.addEventListener('click', (e) => {
        toggleMusic();
      });
    }
  }

  /* ==========================================================================
     10. ANIMASI KELOPAK BUNGA (CANVAS PETALS & FLOATING HEARTS)
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
    const particleCount = 28; // Ringan dan lancar di HP

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
     11. EFEK INTERAKTIF TAP SPARKLE (TAP DI MANA SAJA)
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
      // Hindari bila klik tombol penting
      if (e.target.closest('button') || e.target.closest('.key-btn')) return;
      spawnParticle(e.clientX, e.clientY);
    });
  }

  /* ==========================================================================
     12. LIGHTWEIGHT PURE JS CONFETTI ENGINE (OFFLINE & GITHUB PAGES READY)
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
     13. SCROLL SPY UNTUK BOTTOM NAV
     ========================================================================== */
  function setupNavigationSpy() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
      let currentId = '';
      const scrollPos = window.scrollY + 200;

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
    setupFinalSurprise();
    setupMusicWidget();
    setupPetalsCanvas();
    setupInteractiveSparkles();
    setupNavigationSpy();
  });
})();
