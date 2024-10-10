const questions = [
    {
        question: "Как называется группа файлов, которая хранится отдельной группой и имеет собственное имя ?",
        answer: [
            {text: "Байт", correct: false},
            {text: "Каталог", correct: true},
            {text: "Дискета", correct: false},
            {text: "Никакой", correct: false},
        ]
    },
    {
        question: "Как называются данные или программа на магнитном диске?",
        answer: [
            {text: "Папка", correct: false},
            {text: "Файл", correct: true},
            {text: "Дискета", correct: false},
            {text: "Никакой", correct: false},
        ]
    },
    {
        question: "Какие символы разрешается использовать в имени файла или имени директории в Windows?",
        answer: [
            {text: "Цифры и только латинские буквы", correct: false},
            {text: "Русские и латинские буквы", correct: false},
            {text: "Любые", correct: false},
            {text: "Латинские, русские букву и цифры", correct: true},
        ]
    },
    {
        question: "Выберите имя файла anketa с расширением txt.",
        answer: [
            {text: "Anketa.txt", correct: true},
            {text: "Anketa. txt.", correct: false},
            {text: "Anketa/txt.", correct: false},
            {text: "Anketa?txt.", correct: false},
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if (isCorrect) {
        selectBtn.classList.add("correct");
        score++;
    }else{
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();