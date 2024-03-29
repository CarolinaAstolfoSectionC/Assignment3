const questions = [ //quesions
    {
        question: "Which city serves as the capital of Brazil?",
        answers: [
            {text: "Rio de Janeiro", correct: false},
            {text: "Brasília", correct: true},
            {text: "São Paulo", correct: false},
            {text: "Salvador", correct: false},]
    },
    {
        question: "Which city is the capital of Korea?",
        answers: [
            {text: "Beijing", correct: false},
            {text: "Tokyo", correct: false},
            {text: "Seoul", correct: true},
            {text: "Bangkok", correct: false},]
    },
    {
        question: "What is the capital of Chile?",
        answers: [
            {text: "Cuzco", correct: false},
            {text: "Punta Arenas", correct: false},
            {text: "Buenos Aires", correct: false},
            {text: "Santiago", correct: true},]
    },
    {
        question: "Which city serves as the capital of India?",
        answers: [
            {text: "New Delhi", correct: true},
            {text: "Jaipur", correct: false},
            {text: "Bombaim", correct: false},
            {text: "Nagpur", correct: false},]
    },
    
    {    question: "Which is the capital of Barbados?",
        answers: [
            {text: "Aruba", correct: false},
            {text: "Saint James", correct: false},
            {text: "Bridgetown", correct: true},
            {text: "Bathsheba", correct: false},]
        }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-btns");
const nextButton = document.getElementById("next-btn");
const submitButton = document.getElementById("input-btn")
const progressText = document.getElementById("progressText")

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){  //to start the quiz
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion()
}

function showQuestion(){ //to show the different questions from the list
    resetState()
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    progressText.innerHTML = `Question ${questionNo} / ${questions.length}` 
    progressBarFull.style.width = `${(questionNo / questions.length) * 100}%`;
    
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button); 
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer); 
    })
}

function resetState(){ //reset the quiz
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
    
}

function selectAnswer(e){ //to choose the correct answer
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++
        }else{
            selectedBtn.classList.add("incorrect");
        }
        Array.from(answerButtons.children).forEach(button => {
            if(button.dataset.correct === "true"){
                button.classList.add("correct");
            }
            button.disabled = true;
        })
        nextButton.style.display = "block";
}

function showScore(){ //to show the score at the end
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`
    nextButton.innerHTML = "Play again";
    nextButton.style.display = "block";
}


function handleNextButton(){ //to show a new question and keep track of the current one
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion()
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", () =>{ //event listener to show a new question
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

function showQuiz (){ //to show the quiz after validation
    const quiz = document.getElementById("quiz");
    quiz.style.display = "block";

}

startQuiz();

function auth(){ //to validate the code to access the quiz
    const codeInput = document.getElementById("codeInput").value;
    const validation = document.querySelector(".validation")
    if(codeInput == "code"){
        showQuiz()
        startQuiz()
        validation.style.display = "none";
    }else{
     submitButton.innerHTML = "Code not valid. Try again!";
    }
 }
 
 submitButton.addEventListener("click", () =>{ //event listener to verify code
     auth();
 })