(function () {
  const targetId = "momentia-create";

  function mount() {
    const el = document.getElementById(targetId);
    if (!el) return;

    el.innerHTML = `
      <div style="max-width:920px;margin:0 auto;padding:24px;font-family:system-ui;">
        <h2 style="margin:0 0 8px 0;font-size:28px;">
          Create your AI photo
        </h2>

        <p style="margin:0 0 16px 0;opacity:.75;">
          Upload a photo, pick a style, submit. We’ll generate your result.
        </p>

        <div style="display:grid;gap:12px;grid-template-columns:1fr 1fr;">
          <input
            id="mm_name"
            placeholder="Full name"
            style="padding:12px;border:1px solid #ddd;border-radius:10px;width:100%;"
          />

          <input
            id="mm_email"
            placeholder="Email"
            style="padding:12px;border:1px solid #ddd;border-radius:10px;width:100%;"
          />
        </div>

        <div style="display:grid;gap:12px;grid-template-columns:1fr 1fr;margin-top:12px;">
          <select
            id="mm_style"
            style="padding:12px;border:1px solid #ddd;border-radius:10px;width:100%;"
          >
            <option value="">Select a style</option>
            <option value="corporate">Corporate Headshot</option>
            <option value="cinematic">Cinematic</option>
            <option value="travel">Travel</option>
            <option value="fashion">Fashion</option>
          </select>

          <input
            id="mm_photo"
            type="file"
            accept="image/*"
            style="padding:10px;border:1px solid #ddd;border-radius:10px;width:100%;background:#fff;"
          />
        </div>

        <button
          id="mm_submit"
          style="margin-top:14px;padding:12px 16px;border-radius:12px;border:0;cursor:pointer;width:100%;background:#111;color:#fff;"
        >
          Submit
        </button>

        <div
          id="mm_status"
          style="margin-top:12px;font-size:14px;opacity:.8;"
        ></div>
      </div>
    `;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
