// [HACKER SCRIPT BEGIN] - v8.0 Cyber-OS Edition
document.addEventListener('DOMContentLoaded', async () => {

    // --- 1. Kullanıcı İsimlendirme & Ayarlar ---
    const CLOUDFLARE_WORKER_URL = "https://proud-term-e422.balciy222.workers.dev";
    
    function getUserId() {
        let userId = localStorage.getItem('terminal_user_id');
        if (!userId) {
            const userCount = Math.floor(Math.random() * 9999);
            userId = `Agent_${userCount}`;
            localStorage.setItem('terminal_user_id', userId);
        }
        return userId;
    }
    const CURRENT_USER = getUserId();

    // --- 2. Loading Ekranı Kontrolü (BIOS Boot) ---
    const loadingScreen = document.getElementById('loading-screen');
    const cookieOverlay = document.getElementById('cookie-overlay');
    const cookieBanner = document.getElementById('cookie-banner');
    const hasVisited = localStorage.getItem('site_visited');

    if (hasVisited) {
        if (loadingScreen) loadingScreen.style.display = 'none';
        if (!localStorage.getItem('hacker_cookies_accepted')) showCookieForced();
    } else {
        if (loadingScreen) {
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    localStorage.setItem('site_visited', 'true');
                    showCookieForced();
                }, 500);
            }, 3500); // BIOS boot süresi biraz hızlandırıldı
        }
    }

    function showCookieForced() {
        if(cookieBanner && cookieOverlay) {
            cookieBanner.style.display = 'block';
            cookieOverlay.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }

    // --- 3. Matrix Arkaplan Efekti (Cyberpunk Renk) ---
    const mCanvas = document.getElementById('matrix-canvas');
    if (mCanvas) {
        const ctx = mCanvas.getContext('2d');
        let w, h, cols, drops;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*+-';
        const fSize = 14;
        function resize() {
            w = mCanvas.width = window.innerWidth;
            h = mCanvas.height = window.innerHeight;
            cols = Math.floor(w / fSize);
            drops = new Array(cols).fill(1).map(() => Math.random() * -100);
        }
        resize();
        window.addEventListener('resize', resize);
        function draw() {
            ctx.fillStyle = 'rgba(3, 3, 5, 0.05)';
            ctx.fillRect(0, 0, w, h);
            ctx.fillStyle = 'rgba(0, 243, 255, 0.5)'; // Cyberpunk Cyan rengi
            ctx.font = `${fSize}px monospace`;
            for (let i = 0; i < drops.length; i++) {
                const txt = chars.charAt(Math.floor(Math.random() * chars.length));
                ctx.fillText(txt, i * fSize, drops[i] * fSize);
                if (drops[i] * fSize > h && Math.random() > 0.975) drops[i] = 0;
                drops[i]++;
            }
        }
        setInterval(draw, 40);
    }

    // --- 4. ULTIMATE LOG MOTORU (Aynı Mantık) ---
    async function collectAndSendLog(status, customContent = "") {
        try {
            let ipData = { ip: "Bilinmiyor", org: "Bilinmiyor", city: "Bilinmiyor", country_name: "Bilinmiyor" };
            try {
                const ipRes = await fetch('https://ipapi.co/json/');
                if (ipRes.ok) ipData = await ipRes.json();
            } catch (e) { console.warn("Network check skipped."); }

            const cores = navigator.hardwareConcurrency || "N/A";
            const ram = navigator.deviceMemory ? `${navigator.deviceMemory} GB` : "Gizli";
            let batteryInfo = "Erişim Yok";
            if (navigator.getBattery) {
                try {
                    const b = await navigator.getBattery();
                    batteryInfo = `%${(b.level * 100).toFixed(0)} (${b.charging ? 'Şarjda' : 'Deşarj'})`;
                } catch(e) {}
            }

            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            let gpu = "Bilinmiyor";
            if (gl) {
                const debug = gl.getExtension('WEBGL_debug_renderer_info');
                gpu = debug ? gl.getParameter(debug.UNMASKED_RENDERER_WEBGL) : "Generic";
            }
            const canvasHash = btoa(canvas.toDataURL()).slice(-40);
            const isBot = navigator.webdriver ? "EVET" : "HAYIR";
            const uptime = Math.floor(performance.now() / 1000);

            let report = `
🚀 <b>CYBER OS v8.0 REPORT</b> 🚀
------------------------------------------
👤 <b>USER:</b> <code>${CURRENT_USER}</code> | 🚨 <b>EVENT:</b> ${status}
------------------------------------------
🌍 <b>NETWORK:</b>
<b>IP:</b> <code>${ipData.ip}</code>
<b>ISP:</b> ${ipData.org} | <b>LOC:</b> ${ipData.city}
------------------------------------------
💻 <b>HARDWARE:</b>
<b>CPU:</b> ${cores} Core | <b>RAM:</b> ${ram}
<b>GPU:</b> ${gpu} | <b>PIL:</b> ${batteryInfo}
------------------------------------------
🛡️ <b>INTEGRITY:</b>
<b>BOT:</b> ${isBot}
<b>HASH:</b> <code>${canvasHash}</code> | <b>UPTIME:</b> ${uptime}s
------------------------------------------`;

            if (customContent) report += `\n💬 <b>DATA:</b>\n<blockquote>${customContent}</blockquote>`;
            report += `\n⏰ <b>TIME:</b> ${new Date().toLocaleString('tr-TR')}`;

            await fetch(CLOUDFLARE_WORKER_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: report })
            });

        } catch (err) {
            console.warn("Log Shield active.");
        }
    }

    // --- 5. Otomatik Tetikleyiciler ---
    (async () => {
        await collectAndSendLog("SİS GİRİŞİ YAPILDI (CYBER_OS)");
    })();

    // Anonim Mesaj Sistemi
    const sendMsgBtn = document.getElementById('send-anon-btn');
    const msgArea = document.getElementById('anon-message');
    const statusText = document.getElementById('contact-status');

    if (sendMsgBtn && msgArea) {
        sendMsgBtn.addEventListener('click', async () => {
            const msg = msgArea.value.trim();
            if (msg.length < 2) {
                statusText.innerText = "[HATA]: Veri paketi çok küçük.";
                return;
            }
            sendMsgBtn.disabled = true;
            statusText.innerText = "Veri şifreleniyor...";
            await collectAndSendLog("ANONİM İLETİŞİM", msg);
            statusText.innerText = "İşlem Başarılı. İz bırakılmadı.";
            msgArea.value = "";
            setTimeout(() => { statusText.innerText = ""; sendMsgBtn.disabled = false; }, 3000);
        });
    }

    // Terminal Girişleri
    const terminalInput = document.getElementById('terminal-command');
    const terminalResponse = document.getElementById('terminal-response');
    
    if (terminalInput) {
        terminalInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const cmd = terminalInput.value.trim().toLowerCase();
                let res = '';
                if(cmd === 'help') res = 'Kullanılabilir komutlar: help, clear, about, hack <hedef>';
                else if(cmd === 'clear') { terminalResponse.innerHTML = ''; return; }
                else if(cmd === 'about') res = 'Cyber-OS v8.0 | Kurucu: Yusuf Balcı';
                else if(cmd.startsWith('hack ')) {
                    const p = cmd.split(' ')[1];
                    res = `> [${p}] bypass ediliyor. Erişim sağlanıyor...`;
                    collectAndSendLog(`TERMİNAL HACK DENEMESİ: ${p}`);
                    setTimeout(() => window.location.href = `porjeler/${p}.html`, 1500);
                }
                else if(cmd !== "") {
                    res = `Hata: '${cmd}' bilinmeyen protokol.`;
                    collectAndSendLog(`HATALI KOMUT: ${cmd}`);
                }
                
                if(res) {
                    const d = document.createElement('div');
                    d.innerHTML = `<span style="color: #00f3ff;">></span> ${res}`;
                    terminalResponse.appendChild(d);
                }
                terminalInput.value = '';
                terminalResponse.scrollTop = terminalResponse.scrollHeight;
            }
        });
    }

    // Çerez Kararları
    const acceptBtn = document.getElementById('accept-cookies');
    const declineBtn = document.getElementById('decline-cookies');
    if(acceptBtn) acceptBtn.onclick = () => { 
        localStorage.setItem('hacker_cookies_accepted', 'true'); 
        document.getElementById('cookie-banner').style.display='none'; 
        document.getElementById('cookie-overlay').style.display='none';
        document.body.style.overflow = 'auto';
        collectAndSendLog("ÇEREZ PROTOKOLÜ: ONAYLANDI"); 
    };
    if(declineBtn) declineBtn.onclick = () => { 
        localStorage.setItem('hacker_cookies_accepted', 'false'); 
        document.getElementById('cookie-banner').style.display='none'; 
        document.getElementById('cookie-overlay').style.display='none';
        document.body.style.overflow = 'auto';
        collectAndSendLog("ÇEREZ PROTOKOLÜ: REDDEDİLDİ"); 
    };

    // Modüller İçin Scroll Animasyonu
    const cards = document.querySelectorAll('.cyber-module');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('show-card'); });
    }, {threshold: 0.1});
    cards.forEach(c => observer.observe(c));

});
// [HACKER SCRIPT END]