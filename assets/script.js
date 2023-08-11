const questions = [
  {
    questionText: "Commonly used data types DO NOT include:",
    options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    answer: "3. alerts",
  },
  {
    questionText: "Arrays in JavaScript can be used to store ______.",
    options: [
      "1. numbers and strings",
      "2. other arrays",
      "3. booleans",
      "4. all of the above",
    ],
    answer: "4. all of the above",
  },
  {
    questionText:
      "String values must be enclosed within _____ when being assigned to variables.",
    options: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
    answer: "3. quotes",
  },
  {
    questionText:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    options: [
      "1. JavaScript",
      "2. terminal/bash",
      "3. for loops",
      "4. console.log",
    ],
    answer: "4. console.log",
  },
  {
    questionText:
      "Which of the following is a statement that can be used to terminate a loop, switch, or label statement?",
    options: ["1. break", "2. stop", "3. halt", "4. exit"],
    answer: "1. break",
  },
];

const startContainer = document.getElementById("startContainer");
const questionContainer = document.getElementById("questionContainer");
const questionText = document.getElementById("questionText");
const optionsList = document.getElementById("optionsList");
const nextButton = document.getElementById("nextButton");
const resultContainer = document.getElementById("resultContainer");
const scoreText = document.getElementById("scoreText");
const startButton = document.getElementById("startButton");
const leaderboard = document.getElementById("leaderboard");
const highscoresContainer = document.getElementById("highscoresContainer");
const highscoresList = document.getElementById("highscoresList");
const goBackButton = document.getElementById("goBackButton");
const clearScoresButton = document.getElementById("clearScoresButton");
const scoreForm = document.getElementById("scoreForm");
const nameInput = document.getElementById("nameInput");
const submitScoreButton = document.getElementById("submitScoreButton");
const timerElement = document.getElementById("timer");

let currentQuestionIndex = 0;
let score = 0;
let highscores = [];
let timeLeft = 50;
let timerInterval;

function showStartContainer() {
  startContainer.style.display = "block";
  questionContainer.style.display = "none";
  resultContainer.style.display = "none";
  highscoresContainer.style.display = "none";
  clearInterval(timerInterval);
  timerElement.textContent = "Time: --:--";
}

function showQuestionContainer() {
  startContainer.style.display = "none";
  questionContainer.style.display = "block";
  resultContainer.style.display = "none";
  highscoresContainer.style.display = "none";
  startTimer();
}

function showResultContainer() {
  startContainer.style.display = "none";
  questionContainer.style.display = "none";
  resultContainer.style.display = "block";
  highscoresContainer.style.display = "none";
  scoreText.textContent = `Your score: ${score}`;
  clearInterval(timerInterval);
}

function showHighscoresContainer() {
  startContainer.style.display = "none";
  questionContainer.style.display = "none";
  resultContainer.style.display = "none";
  highscoresContainer.style.display = "block";
  renderHighscores();
}

function renderHighscores() {
  highscoresList.innerHTML = "";
  for (let i = 0; i < highscores.length; i++) {
    const highscoreItem = document.createElement("li");
    highscoreItem.textContent = `${highscores[i].name}: ${highscores[i].score}`;
    highscoresList.appendChild(highscoreItem);
  }
}

function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionText.textContent = currentQuestion.questionText;

  optionsList.innerHTML = "";
  for (let i = 0; i < currentQuestion.options.length; i++) {
    const option = document.createElement("li");
    option.textContent = currentQuestion.options[i];
    option.addEventListener("click", checkAnswer);
    optionsList.appendChild(option);
  }
}

function checkAnswer(e) {
  const selectedOption = e.target;
  const currentQuestion = questions[currentQuestionIndex];

  if (selectedOption.textContent === currentQuestion.answer) {
    score++;
    selectedOption.style.backgroundColor = "green";
    selectedOption.style.color = "white";
  } else {
    selectedOption.style.backgroundColor = "red";
    selectedOption.style.color = "white";
    const correctOption = Array.from(optionsList.children).find(
      (option) => option.textContent === currentQuestion.answer
    );
    correctOption.style.backgroundColor = "green";
    correctOption.style.color = "white";
  }

  optionsList.removeEventListener("click", checkAnswer);

  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    setTimeout(() => {
      resetOptions();
      showQuestion();
    }, 1000);
  } else {
    setTimeout(showResultContainer, 1000);
  }
}

function resetOptions() {
  const options = Array.from(optionsList.children);
  options.forEach((option) => {
    option.style.backgroundColor = "";
    option.style.color = "";
  });
}

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  timeLeft = 50;
  startContainer.style.display = "none";
  questionContainer.style.display = "none";
  resultContainer.style.display = "none";
  highscoresContainer.style.display = "none";
  renderHighscores();
  showQuestionContainer();
  showQuestion();
}

function startTimer() {
  timerInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      timerElement.textContent = `Time: ${formatTime(timeLeft)}`;
    } else {
      clearInterval(timerInterval);
      showResultContainer();
    }
  }, 1000);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");
  return `${formattedMinutes}:${formattedSeconds}`;
}

function submitScore(e) {
  e.preventDefault();
  const name = nameInput.value.trim();
  if (name !== "") {
    const newScore = { name, score };
    highscores.push(newScore);
    nameInput.value = "";
    showHighscoresContainer();
  }
}

function clearScores() {
  highscores = [];
  renderHighscores();
}

startButton.addEventListener("click", startQuiz);
leaderboard.addEventListener("click", showHighscoresContainer);
scoreForm.addEventListener("submit", submitScore);
goBackButton.addEventListener("click", showStartContainer);
clearScoresButton.addEventListener("click", clearScores);

// Initial setup
showStartContainer();
