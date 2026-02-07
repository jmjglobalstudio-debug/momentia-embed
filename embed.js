(function () {
  const targetId = "momentia-create";

  // ✅ REPLACE THIS with your Make "Custom webhook" URL
  const MAKE_WEBHOOK_URL = "https://hook.us2.make.com/qg9b9qjsna1dccrq982kb3dgaf01";

  function mount() {
    const el = document.getElementById(targetId);
    if (!el) return;

    el.innerHTML = `
      <div style="max-width:920px;margin:0 auto;padding:24px;font-family:system-ui;">
        <h2 style="margin:0 0 8px 0;font-size:28px;">Create your AI photo</h2>
        <p style="margin:0 0 16px 0;opacity:.75;">
          Upload a photo, pick a style, submit. We’ll generate your result.
        </p>

        <div style="display:grid;gap:12px;grid-template-columns:1fr 1fr;">
          <input id="mm_name" placeholder="Full name"
            style="padding:12px;border:1px solid #ddd;border-radius:10px;width:100%;" />
          <input id="mm_email" placeholder="Email"
            style="padding:12px;border:1px solid #ddd;border-radius:10px;width:100%;" />
        </div>

        <div style="display:grid;gap:12px;grid-template-columns:1fr 1fr;margin-top:12px;">
          <select id="mm_style"
            style="padding:12px;border:1px solid #ddd;border-radius:10px;width:100%;">
            <option value="">Select a style</option>
            <option value="corporate">Corporate Headshot</option>
            <option value="cinematic">Cinematic</option>
            <option value="travel">Travel</option>
            <option value="fashion">Fashion</option>
          </select>

          <input id="mm_photo" type="file" accept="image/*"
            style="padding:10px;border:1px solid #ddd;border-radius:10px;width:100%;background:#fff;" />
        </div>

        <button id="mm_submit"
          style="margin-top:14px;padding:12px 16px;border-radius:12px;border:0;cursor:pointer;width:100%;background:#111;color:#fff;">
          Submit
        </button>

        <div id="mm_status" style="margin-top:12px;font-size:14px;opacity:.85;"></div>
      </div>
    `;

    const $ = (id) => document.getElementById(id);
    const status = $("mm_status");
    const btn = $("mm_submit");

    function setStatus(msg) {
      if (status) status.textContent = msg;
    }

    btn.addEventListener("click", async () => {
      try {
        const fullName = $("mm_name").value.trim();
        const email = $("mm_email").value.trim();
        const style = $("mm_style").value;
        const file = $("mm_photo").files && $("mm_photo").files[0];

        if (!MAKE_WEBHOOK_URL || MAKE_WEBHOOK_URL.includes("PASTE_YOUR_WEBHOOK_HERE")) {
          setStatus("⚠️ Make webhook URL is not set yet in embed.js");
          return;
        }
        if (!fullName) return setStatus("Please enter your full name.");
        if (!email) return setStatus("Please enter your email.");
        if (!style) return setStatus("Please select a style.");
        if (!file) return setStatus("Please choose a photo.");

        btn.disabled = true;
        btn.textContent = "Submitting...";
        setStatus("Uploading request…");

        // For now: send metadata + file name.
        // (Next step: we’ll upload the file to Cloudinary, then send imageUrl to Make)
        const payload = {
          fullName,
          email,
          style,
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
          source: "virexya-create"
        };

        const res = await fetch(MAKE_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const txt = await res.text().catch(() => "");
          throw new Error(`Make webhook failed (${res.status}). ${txt}`);
        }

        setStatus("✅ Submitted! Check Make.com execution log.");
        btn.textContent = "Submitted";
      } catch (err) {
        console.error(err);
        setStatus("❌ " + (err.message || "Something went wrong."));
        btn.disabled = false;
        btn.textContent = "Submit";
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
