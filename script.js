let i = 0;
let q;
let correct = 0;
let wrong = 0;
let questionList = [
    {q:"2+2=?", choices:["1", "2", "3", "4"], answer:"4"},
    {q:"3*2=?", choices:["2", "4", "6", "8"], answer:"6"},
    {q:"12+2=?", choices:["10", "12", "14", "18"], answer:"14"},
    {q:"8*3=?", choices:["18", "22", "24", "28"], answer:"24"},
    {q:"12+8=?", choices:["20", "25", "28", "36"], answer:"20"},
    {q:"8*6=?", choices:["26", "34", "40", "48"], answer:"24"}
]

function Question(questionText, questionChoices, questionAnswer) {
    this.questionText = questionText;
    this.questionChoices = questionChoices;
    this.questionAnswer = questionAnswer;
} 

function createHtml(q) {
    let questionText = document.getElementById("question");
    questionText.innerText=q.questionText;

    let questionChoices = document.getElementById("choices");
    questionChoices.innerHTML = "";

    for (let i = 0; i < q.questionChoices[0].length; i++) {
        var answerBtn = document.createElement("a");
        answerBtn.setAttribute("href","#")
        answerBtn.setAttribute("class","btn btn-primary");
        answerBtn.setAttribute("onclick", "nextQuestion(this)")
        answerBtn.setAttribute("style","margin:10px 10px; width:60px;")
        answerBtn.innerText=q.questionChoices[0][i]
        questionChoices.appendChild(answerBtn)
    }

    let questionNumber = document.getElementById("questionNumber")
    questionNumber.innerText="Question " + (i+1) + " of "+ questionList.length
}

function resultHtml() {
    document.getElementById("title").innerText="Result";
    document.getElementById("question").remove();
    document.getElementById("questionNumber").remove();
    var questionChoices = document.getElementById("choices")
    questionChoices.innerHTML = "";
    
    var correctText = document.createElement("p");
    var wrongText = document.createElement("p");
    var totalText = document.createElement("p");

    function setAtt(variableText, textType, btnType, resultText) {
        variableText.setAttribute("class",btnType);
        variableText.setAttribute("style","margin:10px 10px; width:150px;")
        variableText.innerText=resultText + textType;
    }
   
    setAtt(correctText, correct, "btn btn-success", "Correct: ")
    setAtt(wrongText, wrong,"btn btn-danger", "Wrong: ")
    setAtt(totalText, questionList.length, "btn btn-dark", "Total: ");


    var brTag = document.createElement("br");
    var brTag2 = document.createElement("br");

    questionChoices.appendChild(correctText)
    questionChoices.appendChild(brTag)
    questionChoices.appendChild(wrongText)
    questionChoices.appendChild(brTag2)
    questionChoices.appendChild(totalText)

}

function nextQuestion(answer) {
    
    if (i < questionList.length) {
        i++;
        checkAnswer(answer.innerText, q.questionAnswer)
    }  

    if (i < questionList.length) {
        q = new Question(questionList[i].q, [questionList[i].choices], questionList[i].answer);
        q.prototype = Object.create(Question.prototype)
        createHtml(q)
    }else {
        resultHtml();
    } 
}

function checkAnswer(answerU, answerQ) {
    if (answerU==answerQ) {
        correct++
    } else {
        wrong++
    }
}

    //First Question //immediate Function 
    (function () {
        q = new Question(questionList[i].q, [questionList[i].choices], questionList[i].answer);
        q.prototype = Object.create(Question.prototype)
        createHtml(q)
    }());