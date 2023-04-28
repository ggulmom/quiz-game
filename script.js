const question = document.getElementById('question');
const startBtn = document.getElementById('start');
const highBtn = document.getElementById('highs');
const clearBtn = document.getElementById('clear');
const timeText = document.getElementById('time');
const msgText = document.getElementById('msg');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const scoreboard = document.getElementById('scoreboard');

startBtn.addEventListener('click', startGame);
highBtn.addEventListener('click', toggleScoreBoard);
clearBtn.addEventListener('click', function() {
    highscores = [];
    showScoreBoard();
});

// click hanlding of choices
for(j=0;j<4;j++) {
    choices[j].addEventListener('click', function() {
        // ignore if waitAnswer is false
        if (!waitAnswer) return;
        waitAnswer = false;

        // check the answer
        checkAnswer(this.dataset['number']);
    });
};


var timeScore = 0;
var questionCounter = 0;
var myInterval = 0;
var waitAnswer = false;
var highscores = [];

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

function showScoreBoard() {
    scoreboard.style.display = "block";
    highBtn.innerText = "Hide High Scores";
    
    // Sort
    var sorted = highscores.sort(function(a,b) {
        return b.score - a.score;
    });

    var topTen = sorted.slice(0,10);
    
    str = "";
    i=0;
    topTen.forEach( function(item) {
        console.log(item);
        str += '<tr><td>' + ++i + '</td>';
        str += '<td>' + item.initial + '</td>';
        str += '<td>' + item.score + '</td></tr>';
    } );
    
    document.getElementById('top10container').innerHTML = str;

}

function hideScoreBoard() {
    scoreboard.style.display = "none";
    highBtn.innerText = "Show High Scores";
}

function toggleScoreBoard() {
    if(scoreboard.style.display == "none") showScoreBoard()
    else hideScoreBoard()
}

function startGame() {
    // hide the scoreboard
    hideScoreBoard(false);
    // reset the game
    // clear existing timer if any, question start from number 0, score start from 30
    if(myInterval != 0) clearInterval(myInterval);
    questionCounter = 0;
    timeScore = 30;
    // display initial time score
    updateTimeText();

    // start the timer, updated everySecond 
    myInterval = setInterval(everySecond, 1000);
    
    // Start Question
    newQuestion()
};

function everySecond() {
    // every second timer counts down
    timeScore --;
    // update timer text whenever the value changes
    updateTimeText();

    // time's up then end the game
    if(timeScore <= 0) endGame();
}

function updateTimeText() {
    timeText.innerText = timeScore;
}

function newQuestion() {
    // display a question and wait the input
    displayQuestion(questionCounter);

    // waitAnswer enables clicking the choices
    waitAnswer = true;
}

function displayQuestion(i) {
    // show the question
    question.innerText = questions[i].question;
    
    // show the choices
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
        
        // wrong answer will decrease the time
        timeScore -= WRONG_PENALTY;
        updateTimeText();
    }

    // prepare for the next question
    questionCounter ++;
    // if end of the question, then call endGame
    if(questionCounter>=totalQs) {
        endGame();
        return;
    }

    // ready to show the next question
    newQuestion();
}

function endGame() {
    // stop the timer
    clearInterval(myInterval);
    myInterval = 0;

    // minimum score is 0
    if(timeScore <=0) timeScore = 0;
    updateTimeText();

    // msgText.innerText = 'score: ' + timeScore;
    var name = prompt('Your Score is ' + timeScore + '. Please enter your initial.');
    highscores.push({
        initial: name,
        score: timeScore
    });

    showScoreBoard();
}


// startGame();