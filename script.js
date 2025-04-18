document.addEventListener("DOMContentLoaded", () => {
  const contentEl = document.getElementById("content");
  if (contentEl) {
    const section = contentEl.getAttribute("data-section");
    const data = JSON.parse(localStorage.getItem("eduContent") || "{}");
    contentEl.innerHTML = data[section] || "Контент табылмады.";
  }

  const themeBtn = document.getElementById("themeToggle");
  if (themeBtn) {
    themeBtn.onclick = () => document.body.classList.toggle("dark-mode");
  }

document.getElementById("fileInput").addEventListener("change", handleFileUpload);

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const url = e.target.result;
    const ext = file.name.split('.').pop().toLowerCase();
    let html = "";

    if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) {
      html = `<img src="${url}" width="300"/>`;
    } else if (["mp4", "webm", "ogg"].includes(ext)) {
      html = `<video controls width="400"><source src="${url}" type="video/${ext}"></video>`;
    } else {
      html = `<a href="${url}" download>📄 ${file.name}</a>`;
    }

    document.getElementById("filePreview").innerHTML = html;
    document.getElementById("generatedCode").value = html;
  };
  reader.readAsDataURL(file);
}
});