function loadQuiz() {
    const data = JSON.parse(localStorage.getItem("eduContent") || "{}");
    const quiz = data.quiz || [];
    const form = document.getElementById("quizForm");
    form.innerHTML = "";
    quiz.forEach((q, i) => {
      const block = document.createElement("div");
      block.innerHTML = `<p>${i + 1}) ${q.question}</p>` + q.options.map((opt, j) =>
        `<label><input type="radio" name="q${i}" value="${j}"/> ${opt}</label><br/>`
      ).join("");
      form.appendChild(block);
    });
  }
  
  function submitQuiz() {
    const data = JSON.parse(localStorage.getItem("eduContent") || "{}");
    const quiz = data.quiz || [];
    let score = 0;
    quiz.forEach((q, i) => {
      const answer = document.querySelector(`input[name="q${i}"]:checked`);
      if (answer && parseInt(answer.value) === q.correct) score++;
    });
    document.getElementById("result").textContent = `Сіздің нәтижеңіз: ${score} / ${quiz.length}`;
  }
  
  document.addEventListener("DOMContentLoaded", loadQuiz);