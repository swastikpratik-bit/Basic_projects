const url = "https://opentdb.com/api.php?amount=1&type=multiple";


// const url = "https://opentdb.com/api.php?amount=1&category=13&difficulty=medium&type=multiple";


const  questionElement = document.getElementById("question");
const  answerButtons = document.getElementById("answer-buttons");
const  nextButton = document.getElementById("next-btn");

const resetBtn = document.querySelector(".reset-btn");

const highScore = document.getElementById("highScore");
let currentQuestionIndex = 0;
let score=0 ;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next"   ;
    showQuestion();
}


function randomInd(){
    return Math.floor(Math.random()*546);
}

function showQuestion(){
    resetState();

    fetch(url)
    .then(response => response.json())
    .then(data => showInfo(data.results[0]))

    function showInfo(obj){

        let options  =  [];
        let f = 1;
        let val = Math.floor(Math.random()*4)-1;
  
        for(let i = 0 ;i < 3 ;i++){
            if(val === -1 && f){
                options.push({text:obj.correct_answer , correctAnswer: true});
                f  =0;
            }
            options.push( {text:obj.incorrect_answers[i], correctAnswer : false});
            if(val === i)options.push({text:obj.correct_answer, correctAnswer: true});
        }
        console.log(options);

        let currobj = {
            question : obj.question, 
            answers : options
        }

        let currentQuestion = currobj;

        let questionNo = currentQuestionIndex + 1;
        questionElement.innerHTML = questionNo+ ". "  + currentQuestion.question;

        currentQuestion.answers.forEach(answer=>{
            const button = document.createElement("button");
            button.innerHTML = answer.text  ;
            button.classList.add("btn");
            answerButtons.appendChild(button);
            if(answer.correctAnswer){
                button.dataset.correctAnswer = answer.correctAnswer;
            }
            button.addEventListener("click", selectAnswer);

        });
    }
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target; 
    const isCorrect = selectedBtn.dataset.correctAnswer === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
        console.log(highScore.innerHTML);
        if(score > highScore.innerHTML){
            highScore.innerHTML = `${score}`;
            saveData();
        }
    }
    else{
        selectedBtn.classList.add("incorrect")    ;
    }

    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correctAnswer === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
    resetBtn.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of 10!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < 10){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < 10){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

startQuiz();



function saveData(){
    localStorage.setItem("high", highScore.innerHTML);
}

function showTask(){
    highScore.innerHTML = localStorage.getItem("high");
}
showTask();




