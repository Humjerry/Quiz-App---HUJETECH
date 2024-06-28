const questions = [
  {
    question: "What is the firstame of this Developer?",
    answers: [
      { text: "Elijah", correct: false },
      { text: "Andrew", correct: false },
      { text: "Humphrey", correct: true },
      { text: "Peter", correct: false },
    ],
  },
  {
    question: "Which country is this Developer from?",
    answers: [
      { text: "Gabon", correct: false },
      { text: "United Kingdom", correct: false },
      { text: "Nigeria", correct: true },
      { text: "Chad", correct: false },
    ],
  },
  {
    question: "Which year was JavaScript invented?",
    answers: [
      { text: "1995", correct: true },
      { text: "1890", correct: false },
      { text: "2000", correct: false },
      { text: "2005", correct: false },
    ],
  },
  {
    question: "Who invented JavaScript?",
    answers: [
      { text: "Asaolu Elijah", correct: false },
      { text: "Funke Olasupo", correct: false },
      { text: "Brendan Eich", correct: true },
      { text: "David Adeleke", correct: false },
    ],
  },
];

const questionElement = document.getElementById("Question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + "." + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}
function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}
function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Try again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
