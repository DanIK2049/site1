document.addEventListener("DOMContentLoaded", () => {
  // Инициализация данных при первом запуске
  if (!localStorage.getItem("eduContent")) {
    const initialContent = {
      theory: `<h3>Кіріспе</h3><p>Теориялық бөлім мазмұны.</p><br>
               <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">🎬 Видео көру</a><br>
               <a href="files/sample.docx" download>📄 Жүктеу: Уорд файл</a>`,
      lab: `<p>🔬 Зертханалық жұмыс 1: Ардуино платасын қосу.</p>`,
      world: `<p>🌍 Қызықты дерек: Ардуиноны NASA қолданған.</p>`,
      glossary: `<ul><li>Микроконтроллер — программаланатын чип.</li></ul>`,
      tasks: `<ol><li>Ардуино мен сенсорды қосу сызбасын сызыңыз.</li></ol>`,
      quiz: [
        {
          question: "Ардуино деген не?",
          options: ["Процессор", "Платформа", "Браузер"],
          correct: 1
        }
      ],
      history: []
    };
    localStorage.setItem("eduContent", JSON.stringify(initialContent));
  }

  // Подключение контента
  const contentEl = document.getElementById("content");
  if (contentEl) {
    const section = contentEl.getAttribute("data-section");
    const data = JSON.parse(localStorage.getItem("eduContent") || "{}");
    contentEl.innerHTML = data[section] || "Контент табылмады.";
  }

  // Темная тема
  const themeBtn = document.getElementById("themeToggle");
  if (themeBtn) {
    themeBtn.onclick = () => document.body.classList.toggle("dark-mode");
  }

  // Загрузка файлов
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

      document.getElementById("filePreview").innerHTML = html;
      document.getElementById("generatedCode").value = html;
    };
    reader.readAsDataURL(file);
  }
});
