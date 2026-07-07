import { states } from "./data/states.js";

const totalChoices = 4;

const promptElement = document.querySelector("#prompt");
const choicesElement = document.querySelector("#choices");
const feedbackElement = document.querySelector("#feedback");
const scoreElement = document.querySelector("#score");
const progressElement = document.querySelector("#progress");
const nextButton = document.querySelector("#next-button");
const resetButton = document.querySelector("#reset-button");

let score = 0;
let questionNumber = 0;
let currentQuestion = null;

function shuffle(items) {
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }

  return copy;
}

function buildQuestion() {
  const promptState = states[Math.floor(Math.random() * states.length)];
  const distractors = shuffle(
    states.filter((state) => state.capital !== promptState.capital)
  )
    .slice(0, totalChoices - 1)
    .map((state) => state.capital);

  return {
    state: promptState.name,
    answer: promptState.capital,
    choices: shuffle([promptState.capital, ...distractors]),
  };
}

function setFeedback(message, variant) {
  feedbackElement.textContent = message;
  feedbackElement.dataset.variant = variant;
}

function updateMeta() {
  scoreElement.textContent = `Score: ${score}`;
  progressElement.textContent = `Question ${questionNumber}`;
}

function handleChoice(selectedCapital) {
  const isCorrect = selectedCapital === currentQuestion.answer;

  if (isCorrect) {
    score += 1;
    setFeedback("Correct! Nice work.", "success");
  } else {
    setFeedback(`Not quite. The capital is ${currentQuestion.answer}.`, "error");
  }

  updateMeta();
  nextButton.disabled = false;

  [...choicesElement.querySelectorAll("button")].forEach((button) => {
    button.disabled = true;

    if (button.textContent === currentQuestion.answer) {
      button.dataset.state = "correct";
    } else if (button.textContent === selectedCapital && !isCorrect) {
      button.dataset.state = "incorrect";
    }
  });
}

function renderQuestion() {
  questionNumber += 1;
  currentQuestion = buildQuestion();
  updateMeta();

  promptElement.textContent = `What is the capital of ${currentQuestion.state}?`;
  choicesElement.replaceChildren();
  setFeedback("Pick the best answer.", "neutral");
  nextButton.disabled = true;

  currentQuestion.choices.forEach((choice) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "choice-button";
    button.textContent = choice;
    button.addEventListener("click", () => handleChoice(choice));
    choicesElement.append(button);
  });
}

function resetGame() {
  score = 0;
  questionNumber = 0;
  renderQuestion();
}

nextButton.addEventListener("click", renderQuestion);
resetButton.addEventListener("click", resetGame);

renderQuestion();
