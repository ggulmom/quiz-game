const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const startBtn = document.getElementById('start');
const timeText = document.getElementById('time');
const msgText = document.getElementById('msg');

startBtn.addEventListener('click', function() {
    startGame();
});

var currentQuestion = {};
var acceptingAnswers = false;
var timeScore = 0;
var questionCounter = 0;
var myInterval;

var questions = [
    {
        question: 'Inside which HTML element do we put the JavaScript?',
        choice1: '<script>',
        choice2: '<javascript>',
        choice3: '<js>',
        choice4: '<scripting>',
        answer: 1,
    },
    {
        question:
            "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choice1: "<script href='xxx.js'>",
        choice2: "<script name='xxx.js'>",
        choice3: "<script src='xxx.js'>",
        choice4: "<script file='xxx.js'>",
        answer: 3,
    },
    {
        question: " How do you write 'Hello World' in an alert box?",
        choice1: "msgBox('Hello World');",
        choice2: "alertBox('Hello World');",
        choice3: "msg('Hello World');",
        choice4: "alert('Hello World');",
        answer: 4,
    },
];

//CONSTANTS
const WRONG_PENALTY = 10;
const totalQs = questions.length;

var waitAnswer = false;

var startGame = function() {
    questionCounter = 0;
    timeScore = 30;        // timer initial value

    // display initial time
    updateTimeText();

    // start the timer
    myInterval = setInterval(everySecond, 1000);
    newQuestion()
};

function everySecond() {
    timeScore --;
    if(timeScore === 0) endGame();
    updateTimeText();
}

function updateTimeText() {
    timeText.innerText = timeScore;
}

function newQuestion() {
    // display a question and wait the input
    displayQuestion(questionCounter);
    waitAnswer = true;
}

function displayQuestion(i) {
    question.innerText = questions[i].question;
    for(j=0;j<4;j++) {
        const number = choices[j].dataset['number'];
        choices[j].innerText = questions[i]['choice' + number];
    };
}

function checkAnswer(j) {
    if (j == questions[questionCounter].answer)
    {
        msgText.innerText = 'Correct';
    } else {
        msgText.innerText = 'Wrong. The answer is ' + questions[questionCounter].answer;
        timeScore -= WRONG_PENALTY;
        updateTimeText();
    }

    questionCounter ++;
    if(questionCounter>=totalQs) {
        endGame();
        return;
    }
    waitAnswer = false;
    newQuestion();
}

function endGame() {
    clearInterval(myInterval);
    if(timeScore <=0) timeScore = 0;
    updateTimeText();
    msgText.innerText = 'score: ' + timeScore;
}

for(j=0;j<4;j++) {
    choices[j].addEventListener('click', function() {
        if (!waitAnswer) return;
        checkAnswer(this.dataset['number']);
    });
};

// startGame();