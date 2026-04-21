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
            let ipData = { ip: "Gizli", org: "Gizli", city: "Gizli" };
            try {
                const ipRes = await fetch('https://ipapi.co/json/');
                if (ipRes.ok) ipData = await ipRes.json();
            } catch (e) { console.warn("Log: IP servisi kapalı."); }

            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl');
            let gpu = gl ? (gl.getExtension('WEBGL_debug_renderer_info') ? gl.getParameter(gl.getExtension('WEBGL_debug_renderer_info').UNMASKED_RENDERER_WEBGL) : "Generic") : "Bilinmiyor";
            
            let report = `
🚀 <b>SYSTEM LOG</b> | 👤 <b>USER:</b> <code>${CURRENT_USER}</code>
🚨 <b>EVENT:</b> <b>${status}</b>
🌍 <b>LOC:</b> ${ipData.city} | 💻 <b>GPU:</b> ${gpu}
💬 <b>DATA:</b> ${customContent}
⏰ <b>TIME:</b> ${new Date().toLocaleString('tr-TR')}`;

            await fetch(CLOUDFLARE_WORKER_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: report })
            });
        } catch (err) { console.error("❌ Log hatası:", err); }
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