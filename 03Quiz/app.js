const  questionElement = document.getElementById("question");
const  answerButtons = document.getElementById("answer-buttons");
const  nextButton = document.getElementById("next-btn");

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

    fetch("question.json")
    .then(response => response.json())
    .then(data => showInfo(data));

    function showInfo(data){
        let curr = (data.questions[randomInd()]);
        // console.log(curr);

        let obj = {
            question :  curr.question,
            answers : [
                {text:curr.A, correctAnswer : (curr.answer==="A")?true:false},
                {text:curr.B, correctAnswer : (curr.answer==="B")?true:false},
                {text:curr.C, correctAnswer : (curr.answer==="C")?true:false},
                {text:curr.D, correctAnswer : (curr.answer==="D")?true:false},
            ]
        }
        // console.log(obj);

        let currentQuestion = obj;
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
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of 5!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < 5){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < 5){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

startQuiz();



