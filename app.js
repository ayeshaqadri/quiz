const questions = [
    {
        question:" Which river is the longest in the world?",
        answers: [
            { text: "Amazon", Correct: false },
            { text: "Nile", Correct: true },
            { text: "Yangtze", Correct: false },
            { text: "Mississippi", Correct: false },
        ]
    },
    {
        question:"Which country has the largest population?",
        answers: [
            { text: "United States", Correct: false },
            { text: "Pakistan", Correct: false },
            { text: "Indonesia", Correct: false },
            { text: "China", Correct: true },
        ]
    },
    {
        question:" Which desert  is the largest in the world?",
        answers: [
            { text: "Sahara ", Correct: true },
            { text: "Gobi", Correct: false },
            { text: "Arabian", Correct: false },
            { text: "Kalahari", Correct: false },
        ]
    },
    {
        question:" Which is the smallest country in the world by area?",
        answers: [
            { text: "Monaco", Correct: false },
            { text: "Vatican City  ", Correct: true },
            { text: "San Marino", Correct: false },
            { text: "Liechtenstein", Correct: false },
        ]
    },
    {
        question:" Which ocean is the largest by surface area?",
        answers: [
            { text: "Atlantic Ocean", Correct: false },
            { text: "Indian Ocean", Correct: false },
            { text: "Arctic Ocean", Correct: false },
            { text: "Pacific Ocean", Correct: true },
        ]
    },
    {
        question:" Which mountain is the highest in the world?",
        answers: [
            { text: "K2", Correct: false },
            { text: "Mount Everest", Correct: true },
            { text: "Kangchenjunga", Correct: false },
            { text: "Lhotse", Correct: false },
        ]
    },
    {
        question:" Which continent is known as the Dark Continent?",
        answers: [
            { text: "Asia", Correct: false },
            { text: "Africa ", Correct: true },
            { text: "South America", Correct: false },
            { text: "Australia", Correct: false },
        ]
    },
    {
        question:" Which iconic landmark can be found in Paris, France?",
        answers: [
            { text: "Big Ben", Correct: false },
            { text: "Colosseum", Correct: false },
            { text: "Eiffel Tower", Correct: true },
            { text: "Leaning Tower of Pisa", Correct: false },
        ]
    },
    {
        question:" Which country is famous for its pyramids and the Sphinx?",
        answers: [
            { text: "Egypt ", Correct: true },
            { text: "Greece", Correct: false },
            { text: "Mexico", Correct: false },
            { text: "Turkey", Correct: false },
        ]
    },
    {
        question:"Which U.S. state is famous for Hollywood and the movie industry?",
        answers: [
            { text: "Florida", Correct: false },
            { text: "Texas", Correct: false },
            { text: "California ", Correct: true },
            { text: "New York", Correct: false },
        ]
    }

];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "NEXT QUESTION";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.Correct) {
            button.dataset.Correct = answer.Correct
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while (answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.Correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`;
    Swal.fire({
        title: "CONGRATULATION!!",
        width: 800,
        padding: "3em",
        color: "rgb(176, 140, 118)",      
      });
    nextButton.innerHTML = "PLAY AGAIN";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }
    else{
        startQuiz();
    }
});

startQuiz();
