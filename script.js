// =====================
// Fundo com estrelas animadas
// =====================
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = [];
for (let i = 0; i < 150; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2,
    speed: Math.random() * 0.5 + 0.1,
  });
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  stars.forEach((star) => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
  });
}

function moveStars() {
  stars.forEach((star) => {
    star.y += star.speed;
    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  });
}

function animateStars() {
  drawStars();
  moveStars();
  requestAnimationFrame(animateStars);
}
animateStars();

// =====================
// Efeito mágico no mouse (estrelinhas seguindo)
// =====================
const particles = [];

document.addEventListener("mousemove", (e) => {
  for (let i = 0; i < 3; i++) {
    particles.push({
      x: e.clientX,
      y: e.clientY,
      size: Math.random() * 5 + 2,
      color: `hsl(${Math.random() * 360}, 100%, 70%)`,
      speedX: Math.random() * 3 - 1.5,
      speedY: Math.random() * 3 - 1.5,
      life: 60,
    });
  }
});

function animateParticles() {
  ctx.globalCompositeOperation = "lighter";
  particles.forEach((p, i) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();

    p.x += p.speedX;
    p.y += p.speedY;
    p.life--;
    if (p.life <= 0) {
      particles.splice(i, 1);
    }
  });
  ctx.globalCompositeOperation = "source-over";
  requestAnimationFrame(animateParticles);
}
animateParticles();

// =====================
// Quiz - Jogo "Descubra Sobre Mim"
// =====================
const quizData = [
  {
    question: "Qual minha linguagem de programação favorita?",
    options: ["Python", "JavaScript", "Java", "C#"],
    answer: "JavaScript",
  },
  {
    question: "Qual framework React utilizo mais?",
    options: ["React Native", "Next.js", "React.js", "Vue.js"],
    answer: "React.js",
  },
  {
    question: "Qual meu hobby preferido?",
    options: ["Cozinhar", "Desenhar", "Ler livros", "Viajar"],
    answer: "Viajar",
  },
  {
    question: "Qual meu sistema operacional favorito?",
    options: ["Windows", "Linux", "macOS", "Android"],
    answer: "Windows",
  },
  {
    question: "Qual meu estilo de música favorito?",
    options: ["Sertanejo", "Rock", "Eletrônica", "Jazz"],
    answer: "Sertabejo",
  },
];

const startBtn = document.getElementById("startGame");
const quizContainer = document.getElementById("quiz");
const resultadoContainer = document.getElementById("resultado");

let currentQuestion = 0;
let score = 0;

startBtn.addEventListener("click", () => {
  startBtn.classList.add("hidden");
  resultadoContainer.classList.add("hidden");
  quizContainer.classList.remove("hidden");
  currentQuestion = 0;
  score = 0;
  showQuestion();
});

function showQuestion() {
  const q = quizData[currentQuestion];
  quizContainer.innerHTML = `
    <p><strong>${q.question}</strong></p>
    ${q.options
      .map(
        (opt, idx) =>
          `<button class="quiz-btn" data-answer="${opt}" aria-label="Opção ${idx +
            1}">${opt}</button>`
      )
      .join("")}
  `;
  document.querySelectorAll(".quiz-btn").forEach((btn) =>
    btn.addEventListener("click", checkAnswer)
  );
}

function checkAnswer(e) {
  const selected = e.target.dataset.answer;
  if (selected === quizData[currentQuestion].answer) {
    score++;
  }
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quizContainer.classList.add("hidden");
  resultadoContainer.classList.remove("hidden");
  resultadoContainer.innerHTML = `<p>Você acertou ${score} de ${quizData.length} perguntas! 🎉</p>
  <button class="btn-magico" onclick="restartGame()">Jogar Novamente</button>`;
}

function restartGame() {
  resultadoContainer.classList.add("hidden");
  startBtn.classList.remove("hidden");
}
