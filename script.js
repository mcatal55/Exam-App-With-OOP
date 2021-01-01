let i = 0;
let newQuestion;
let correct = 0;
let wrong = 0;
let questionList = [
    {question:"2+2=?", choices:["1", "2", "3", "4"], answer:"4"},
    {question:"3*2=?", choices:["2", "4", "6", "8"], answer:"6"},
    {question:"12+2=?", choices:["10", "12", "14", "18"], answer:"14"},
    {question:"8*3=?", choices:["18", "22", "24", "28"], answer:"24"},
    {question:"12+8=?", choices:["20", "25", "28", "36"], answer:"20"},
    {question:"8*6=?", choices:["26", "34", "40", "48"], answer:"48"},
    {question:"27*3=?", choices:["71", "81", "84", "91"], answer:"81"},
    {question:"66+27=?", choices:["83", "88", "91", "93"], answer:"93"},
    {question:"100/4=?", choices:["20", "25", "30", "50"], answer:"25"},
    {question:"80*6=?", choices:["440", "480", "490", "496"], answer:"480"}
]

function Question(questionText, questionChoices, questionAnswer) {
    this.questionText = questionText;
    this.questionChoices = questionChoices;
    this.questionAnswer = questionAnswer;
}

Question.prototype.checkAnswer = function (answer) {
    return this.questionAnswer == answer;
}

function createHtml(newQuestion) {
    let questionText = document.getElementById("question");
    questionText.innerText=newQuestion.questionText;

    let questionChoices = document.getElementById("choices");
    questionChoices.innerHTML = "";

    for (let i = 0; i < newQuestion.questionChoices[0].length; i++) {
        let answerBtn = document.createElement("a");
        answerBtn.setAttribute("href","#")
        answerBtn.setAttribute("class","btn btn-primary");
        answerBtn.setAttribute("onclick", "nextQuestion(this)")
        answerBtn.setAttribute("style","margin:10px 10px; width:60px;")
        answerBtn.innerText=newQuestion.questionChoices[0][i]
        questionChoices.appendChild(answerBtn)
    }

    let questionNumber = document.getElementById("questionNumber")
    questionNumber.innerText="Question " + (i+1) + " of "+ questionList.length
}

function resultHtml() {
    document.getElementById("title").innerText="Result";
    document.getElementById("question").remove();
    document.getElementById("questionNumber").remove();
    let questionChoices = document.getElementById("choices")
    questionChoices.innerHTML = "";
    
    let correctText = document.createElement("p");
    let wrongText = document.createElement("p");
    let totalText = document.createElement("p");

    function setAtt(variableText, textType, btnType, resultText) {
        variableText.setAttribute("class",btnType);
        variableText.setAttribute("style","margin:10px 10px; width:150px;")
        variableText.innerText=resultText + textType;
    }
   
    setAtt(correctText, correct, "btn btn-success", "Correct: ")
    setAtt(wrongText, wrong,"btn btn-danger", "Wrong: ")
    setAtt(totalText, questionList.length, "btn btn-dark", "Total: ");


    let brTag = document.createElement("br");
    let brTag2 = document.createElement("br");

    questionChoices.appendChild(correctText)
    questionChoices.appendChild(brTag)
    questionChoices.appendChild(wrongText)
    questionChoices.appendChild(brTag2)
    questionChoices.appendChild(totalText)

}

function nextQuestion(answer) {
    
    if (i < questionList.length) {
        i++;

        if (newQuestion.checkAnswer(answer.innerText)) {
            correct++;
        } else {
            wrong++;
        }
    }  

    if (i < questionList.length) {
        newQuestion = new Question(questionList[i].question, [questionList[i].choices], questionList[i].answer);
        createHtml(newQuestion)
    }else {
        resultHtml();
    } 
}

//First Question //immediate Function 
(function () {
    newQuestion = new Question(questionList[i].question, [questionList[i].choices], questionList[i].answer);
    createHtml(newQuestion)
}());