// CHANGE THIS to your deployed backend later:
// Example: https://api.danhaitrieu.com  OR  https://your-app.up.railway.app
const API_BASE = "https://YOUR-BACKEND-URL-HERE";

const form = document.getElementById("leadForm");
const statusEl = document.getElementById("leadStatus");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    statusEl.textContent = "Đang gửi...";

    const fd = new FormData(form);
    const payload = {
      name: fd.get("name"),
      email: fd.get("email"),
      message: fd.get("message"),
      mode: fd.get("mode") || "hybrid",
    };

    try {
      const res = await fetch(`${API_BASE}/lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        statusEl.textContent = `Có lỗi xảy ra (HTTP ${res.status}). Vui lòng thử lại.`;
        return;
      }

      if (data.status === "sent") {
        statusEl.textContent = "Đã gửi thành công. Chúng tôi sẽ liên hệ sớm!";
      } else {
        statusEl.textContent = "Đã nhận thông tin. Chúng tôi sẽ xem xét và phản hồi.";
      }

      form.reset();
    } catch (err) {
      statusEl.textContent = "Không kết nối được máy chủ. Vui lòng thử lại sau.";
    }
  });
}
