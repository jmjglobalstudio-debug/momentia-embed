(function () {
  const targetId = "momentia-create";

  function mount() {
    const el = document.getElementById(targetId);
    if (!el) return;

    el.innerHTML = `
      <div style="
        min-height:90vh;
        display:flex;
        align-items:center;
        justify-content:center;
        font-family:system-ui;
        font-size:20px;
      ">
        Momentia Embed Loaded ✅
      </div>
    `;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
