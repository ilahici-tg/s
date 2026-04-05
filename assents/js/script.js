// [HACKER SCRIPT BEGIN]

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Fake Terminal Loading Ekranı Yönetimi ---
    const loadingScreen = document.getElementById('loading-screen');
    const terminalPrompt = document.querySelector('.terminal-prompt');

    // Loading ekranı 5.5 saniye sonra kaybolsun (Animasyonların bitmesini bekliyoruz)
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        
        // Kaybolduktan sonra DOM'dan tamamen kaldır (Güvenlik ve performans için)
        setTimeout(() => {
            loadingScreen.remove();
        }, 1000); // fade-out transition süresi kadar bekliyoruz
    }, 5500);


    // --- 2. Matrix Kod Yağmuru Animasyonu ---
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');

    // Kanvası ekran boyutuna ayarla
    let width, height;
    function setCanvasSize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize); // Ekran boyutu değişirse güncelle

    // Karakterler ve Sütunlar
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$#@%&^*=-+';
    const fontSize = 16;
    let columns = Math.floor(width / fontSize);
    let drops = [];

    // Her sütun için bir 'damla' (başlangıç y pozisyonu) oluştur
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100; // Rastgele yükseklikten başlasınlar
    }

    // Çizim fonksiyonu
    function drawMatrix() {
        // Arka planı çok hafif şeffaf siyahla kapla (Karakterlerin iz bırakması için)
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, width, height);

        // Karakterlerin rengi (Matrix Yeşili)
        ctx.fillStyle = '#0f0';
        ctx.font = `${fontSize}px monospace`;

        // Her sütun için karakteri çiz
        for (let i = 0; i < columns; i++) {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            // Damla ekranın altına ulaştıysa veya rastgele bir zamanda başa döndür
            if (drops[i] * fontSize > height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++; // Damlayı aşağı kaydır
        }
    }

    // Animasyonu başlat (Yaklaşık 30 FPS)
    setInterval(drawMatrix, 35);


    // --- 3. Özel İmleç (Custom Cursor) Yönetimi ---
    // Sadece masaüstünde (1024px üstü) çalışsın
    if (window.innerWidth >= 1024) {
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorOutline = document.querySelector('.cursor-outline');

        // İmleci fare hareketine göre takip ettir
        window.addEventListener('mousemove', (e) => {
            cursorDot.style.left = `${e.clientX}px`;
            cursorDot.style.top = `${e.clientY}px`;
            
            // Dış halka biraz daha yavaş takip etsin (Gecikme hissi)
            cursorOutline.style.left = `${e.clientX}px`;
            cursorOutline.style.top = `${e.clientY}px`;
        });

        // Tıklanabilir elementlerin (Linkler, Kartlar) üzerine gelince sınıf ekle
        const hoverableElements = document.querySelectorAll('a, .card, button');
        hoverableElements.forEach(elem => {
            elem.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-hover');
            });
            elem.addEventListener('mouseleave', () => {
                document.body.classList.add('cursor-hover');
            });
        });
    }


    // --- 4. Sayfa Kaydırma (Scroll) Animasyonları (Intersection Observer) ---
    const cards = document.querySelectorAll('.container .card');

    // Kartların ekrana girip girmediğini kontrol eden gözlemci
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Ekrana girdiğinde 'show-card' sınıfını ekle
                entry.target.classList.add('show-card');
                // Kart bir kez gösterildikten sonra gözlemlemeyi bırak (Performans için)
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2 // Kartın %20'si ekrana girdiğinde tetikle
    });

    // Her kartı gözlemciye ekle
    cards.forEach(card => {
        observer.observe(card);
    });
const terminalInput = document.getElementById('terminal-command');
    const terminalResponse = document.getElementById('terminal-response');

    if (terminalInput) {
        terminalInput.addEventListener('keypress', function (e) {
            // Sadece Enter tuşuna basıldığında çalışsın
            if (e.key === 'Enter') {
                const command = terminalInput.value.trim().toLowerCase();
                let response = '';

                // Komut Kontrolleri
                if (command === 'help') {
                    response = 'Mevcut Komutlar:\n> help - Komutları listeler\n> clear - Ekranı temizler\n> about - Sistem bilgisini gösterir\n> social - Sosyal medya linkleri\n> hack <proje> - Projeye gider (Örn: hack tree)';
                } 
                else if (command === 'clear') {
                    terminalResponse.innerHTML = '';
                    terminalInput.value = '';
                    return;
                } 
                else if (command === 'about') {
                    response = 'Sistem: İlahici Terminal v3.0\nAdmin: Yusuf Balcı\nStatus: Online\nYear: 2026';
                } 
                else if (command === 'social') {
                    response = 'Bağlantılar:\n- Instagram: @ilahici_tg\n- Telegram: @ilahiici\n- GitHub: ilahici-tg';
                }
                else if (command.startsWith('hack ')) {
                    const project = command.replace('hack ', '').trim();
                    response = `> [${project}] sızma işlemi başlatıldı...\n> Yönlendiriliyorsunuz...`;
                    
                    // 1.5 saniye sonra projeye yönlendir (Proje isimleri klasörlerinle aynı olmalı)
                    setTimeout(() => {
                        window.location.href = `porjeler/${project}/`;
                    }, 1500);
                } 
                else if (command === '') {
                    response = '';
                } 
                else {
                    response = `Hata: '${command}' komutu bulunamadı. 'help' yazarak yardım alabilirsiniz.`;
                }

                // Cevabı ekrana bas ve inputu temizle
                if (response !== '') {
                    terminalResponse.innerHTML = response;
                }
                terminalInput.value = '';
                
                // Cevap geldikten sonra otomatik aşağı kaysın
                terminalResponse.scrollTop = terminalResponse.scrollHeight;
            }
        });
    }



// --- 6. Çerez Onayı ve Telegram Log Gönderimi ---
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');
    const declineBtn = document.getElementById('decline-cookies');

    // Kendi Telegram Bilgilerini Buraya Gir
    const TG_BOT_TOKEN = '6148601754:AAF426y4bYpeerM0bUD2V8HDB3oui4sQSlY'; 
    const TG_CHAT_ID = '2094053613';

    // Kullanıcının IP adresini ve bilgilerini çeken fonksiyon
    async function collectAndSendLog() {
        try {
            // Ücretsiz bir API kullanarak IP ve konum çekiyoruz
            const ipResponse = await fetch('https://ipapi.co/json/');
            const data = await ipResponse.json();

            // Gönderilecek mesajı hazırlıyoruz (Hacker tarzı)
            const message = `
🚨 [YENİ ERİŞİM KAYDI] 🚨
-----------------------------
🌐 IP: ${data.ip}
📍 Konum: ${data.city} / ${data.country_name}
🏢 ISP: ${data.org}
📱 Tarayıcı: ${navigator.userAgent.slice(0, 100)}...
⏰ Zaman: ${new Date().toLocaleString('tr-TR')}
-----------------------------
            `;

            // Telegram API'sine POST isteği atıyoruz
            fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: TG_CHAT_ID,
                    text: message
                })
            });

        } catch (error) {
            console.log('Log gönderilemedi, muhtemelen adblocker açık.');
        }
    }

    // Daha önce onay verilmiş mi kontrol et
    if (!localStorage.getItem('hacker_cookies_accepted')) {
        // Eğer verilmemişse, Loading ekranı bittikten sonra çerez bandını göster
        setTimeout(() => {
            cookieBanner.style.display = 'flex';
        }, 6000); // Loading ekranının bitiş süresine göre ayarlıdır
    } else if (localStorage.getItem('hacker_cookies_accepted') === 'true') {
        setTimeout(() => {
            cookieBanner.style.display = 'flex';}, 6000);
    }

    // Kabul Et Butonu
    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('hacker_cookies_accepted', 'true');
        cookieBanner.style.display = 'none';
        collectAndSendLog(); // Onayladığı an hemen ilk logu gönder
    });

    // Reddet Butonu
    declineBtn.addEventListener('click', () => {
        localStorage.setItem('hacker_cookies_accepted', 'false');
        cookieBanner.style.display = 'none';
    });
});

// [HACKER SCRIPT END]