const quizData = [
  {
    type: "single",
    question: "What is the capital of India?",
    options: ["Delhi", "Mumbai", "Chennai"],
    answer: "Delhi"
  },
  {
    type: "multi",
    question: "Select programming languages:",
    options: ["Python", "HTML", "Java", "CSS"],
    answer: ["Python", "Java"]
  },
  {
    type: "fill",
    question: "Fill in the blank: HTML stands for ______",
    answer: "Hyper Text Markup Language"
  }
];

let currentQuestion = 0;
let score = 0;
let userAnswers = [];

function loadQuestion() {
  const q = quizData[currentQuestion];
  let html = `<h3>${q.question}</h3>`;

  if (q.type === "single") {
    q.options.forEach(opt => {
      html += `<label><input type="radio" name="answer" value="${opt}"> ${opt}</label><br>`;
    });
  }

  if (q.type === "multi") {
    q.options.forEach(opt => {
      html += `<label><input type="checkbox" value="${opt}"> ${opt}</label><br>`;
    });
  }

  if (q.type === "fill") {
    html += `<input type="text" id="fillAnswer">`;
  }

  document.getElementById("quiz-container").innerHTML = html;
}

function nextQuestion() {
  saveAnswer();
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  }
}

function saveAnswer() {
  const q = quizData[currentQuestion];

  if (q.type === "single") {
    const ans = document.querySelector('input[name="answer"]:checked');
    userAnswers.push(ans ? ans.value : "");
  }

  if (q.type === "multi") {
    const checked = document.querySelectorAll('input[type="checkbox"]:checked');
    let values = [];
    checked.forEach(c => values.push(c.value));
    userAnswers.push(values);
  }

  if (q.type === "fill") {
    const val = document.getElementById("fillAnswer").value;
    userAnswers.push(val);
  }
}

function submitQuiz() {
  saveAnswer();

  quizData.forEach((q, index) => {
    if (q.type === "single" && userAnswers[index] === q.answer) {
      score++;
    }

    if (q.type === "multi") {
      if (JSON.stringify(userAnswers[index].sort()) === JSON.stringify(q.answer.sort())) {
        score++;
      }
    }

    if (q.type === "fill") {
      if (userAnswers[index].toLowerCase() === q.answer.toLowerCase()) {
        score++;
      }
    }
  });

  document.getElementById("result").innerText = `Your Score: ${score}/${quizData.length}`;
}

// Load first question
loadQuestion();
