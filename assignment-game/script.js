function myRandomInts(quantity, max) {
    const set = new Set();

    while (set.size < quantity) {
        set.add(Math.floor(Math.random() * max));
    }

    return [...set];
}

const game = {
    gameSequence: null,
    step: 0,
    score: 0,
    life: 3,
    timer: null,
    timeLeft: 20,

    questions: [
        {
            question: "How many players are there in a cricket team?",
            options: ["9", "10", "11", "12"],
            answer: "11"
        },
        {
            question: "Which country won the first Cricket World Cup in 1975?",
            options: ["Australia", "West Indies", "India", "England"],
            answer: "West Indies"
        },
        {
            question: "How many balls are there in a standard over?",
            options: ["4", "5", "6", "8"],
            answer: "6"
        },
        {
            question: "Who is known as the 'God of Cricket'?",
            options: ["Virat Kohli", "MS Dhoni", "Sachin Tendulkar", "Rohit Sharma"],
            answer: "Sachin Tendulkar"
        },
        {
            question: "What is the maximum number of runs that can normally be scored from one delivery without running?",
            options: ["4", "5", "6", "8"],
            answer: "6"
        },
        {
            question: "Which format of cricket is played over 20 overs per side?",
            options: ["Test", "ODI", "T20", "First Class"],
            answer: "T20"
        },
        {
            question: "How many overs does each team face in a standard ODI?",
            options: ["20", "40", "50", "60"],
            answer: "50"
        },
        {
            question: "What does LBW stand for?",
            options: [
                "Leg Before Wicket",
                "Long Ball Wicket",
                "Leg Ball Wide",
                "Left Before Wicket"
            ],
            answer: "Leg Before Wicket"
        },
        {
            question: "Which player is popularly known as 'Captain Cool'?",
            options: ["MS Dhoni", "Virat Kohli", "Rohit Sharma", "Kapil Dev"],
            answer: "MS Dhoni"
        },
        {
            question: "How many wickets can a team lose before its innings ends?",
            options: ["8", "9", "10", "11"],
            answer: "10"
        }
    ],

    createSequence: function () {
        this.gameSequence = myRandomInts(
            this.questions.length,
            this.questions.length
        );
    }
};


const quizArea = document.getElementById('quiz-area');
const playBtn = document.getElementById('play-btn');
const timer = document.getElementById('timer');


function showQuestion() {

    playBtn.classList.add("hidden");

    if (game.step >= game.questions.length) {
        endGame();
        return;
    }

    if (game.life <= 0) {
        endGame();
        return;
    }

    game.timeLeft = 20;
    timer.value = game.timeLeft;
    timer.max = 20;
    timer.classList.remove("hidden");




    const currentQuestion =
        game.questions[game.gameSequence[game.step]];


    const quizContent = `
        <div class="main-content">

            <div class="info-container">
                <button>Score: ${game.score}</button>
                <button>Lives: ${game.life}</button>
            </div>

            <h3>${currentQuestion.question}</h3>

            <div class="option-container">

                <button class="option-btn">
                    ${currentQuestion.options[0]}
                </button>

                <button class="option-btn">
                    ${currentQuestion.options[1]}
                </button>

                <button class="option-btn">
                    ${currentQuestion.options[2]}
                </button>

                <button class="option-btn">
                    ${currentQuestion.options[3]}
                </button>

            </div>

        </div>
    `;


    quizArea.innerHTML = quizContent;

    clearInterval(game.timer);

    game.timer = setInterval(() => {

        game.timeLeft--;

        timer.value = game.timeLeft;


        if (game.timeLeft <= 0) {

            clearInterval(game.timer);

            game.step++;
            game.life--;

            showQuestion();
        }

    }, 1000);
}


function endGame() {

    clearInterval(game.timer);

    timer.classList.add('hidden');

        let resultTitle;
    let resultMessage;

    if (game.life <= 0) {
        resultTitle = "Game Over!";
        resultMessage = "You ran out of lives.";
    } else {
        resultTitle = "You Win!";
        resultMessage = "Congratulations! You completed the quiz.";
    }

    quizArea.innerHTML = `
        <div class="main-content">
            <h2>${resultTitle}</h2>
            <h3>Your Score: ${game.score}</h3>
            <p>${resultMessage}</p>
            <p>You answered ${game.score} questions correctly.</p>

            <button id="restart-btn">
                Play Again
            </button>
        </div>
    `;

    playBtn.classList.add("hidden");
}


playBtn.addEventListener('click', () => {

    game.step = 0;
    game.score = 0;
    game.life = 3;

    game.createSequence();

    showQuestion();
});


quizArea.addEventListener('click', (e) => {

    if (e.target.classList.contains('option-btn')) {

        clearInterval(game.timer);


        const currentQuestion =
            game.questions[game.gameSequence[game.step]];


        if (e.target.innerHTML.trim() === currentQuestion.answer) {

            game.score++;

        } else {

            game.life--;
        }

        game.step++;

        showQuestion();
    }

    if (e.target.id === 'restart-btn') {

        game.step = 0;
        game.score = 0;
        game.life = 3;

        game.createSequence();

        showQuestion();
    }

});