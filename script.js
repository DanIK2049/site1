localStorage.setItem("eduContent", JSON.stringify({
   theory: `<h3>Кіріспе</h3><p>Бұл теориялық бөлімнің мазмұны.</p><img src="https://example.com/image.jpg"/>`,
    lab: `<p>Лабораториялық жұмыс №1: Светодиод жағу.</p>`,
    world: `<p>Arduino көмегімен жасалған қызықты жобалар.</p>`,
    glossary: `<ul><li><b>Микроконтроллер</b> — басқарушы құрылғы.</li></ul>`,
    tasks: `<ol><li>Arduino не үшін қолданылады?</li></ol>`,
    quiz: [
      {
        question: "Arduino дегеніміз не?",
        options: ["Бағдарлама", "Құрылғы", "Ойын", "Желі"],
        correct: 1
      },
      {
        question: "LED не үшін керек?",
        options: ["Жарық беру үшін", "Дыбыс үшін", "Су беру үшін", "Мәлімет сақтау үшін"],
        correct: 0
      }
    ]
}));
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

  const fileInput = document.getElementById("fileInput");
  if (fileInput) {
    fileInput.addEventListener("change", handleFileUpload);
  }

  function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
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

      const preview = document.getElementById("filePreview");
      const codeArea = document.getElementById("generatedCode");

      if (preview) preview.innerHTML = html;
      if (codeArea) codeArea.value = html;
    };

    reader.readAsDataURL(file);
  }
});
