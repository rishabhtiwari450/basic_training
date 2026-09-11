const game = {

    gameSequence: null,
    step: 0,
    score: 0,
    life: 3,
    timer: null,
    timeLeft: 20,

    quizArea: document.getElementById("quiz-area"),
    playBtn: document.getElementById("play-btn"),
    timerElement: document.getElementById("timer"),

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
            options: [
                "Virat Kohli",
                "MS Dhoni",
                "Sachin Tendulkar",
                "Rohit Sharma"
            ],
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
            options: [
                "MS Dhoni",
                "Virat Kohli",
                "Rohit Sharma",
                "Kapil Dev"
            ],
            answer: "MS Dhoni"
        },
        {
            question: "How many wickets can a team lose before its innings ends?",
            options: ["8", "9", "10", "11"],
            answer: "10"
        }
    ],

    init: function () {

        const randomInts = (quantity, max) => {

            const set = new Set();

            while (set.size < quantity) {
                set.add(Math.floor(Math.random() * max));
            }

            return [...set];
        };


        const showQuestion = () => {

            this.playBtn.classList.add("hidden");

            if (
                this.step >= this.questions.length ||
                this.life <= 0
            ) {
                endGame();
                return;
            }

            this.timeLeft = 20;

            this.timerElement.value = this.timeLeft;
            this.timerElement.max = 20;
            this.timerElement.classList.remove("hidden");


            const currentQuestion =
                this.questions[this.gameSequence[this.step]];


            this.quizArea.innerHTML = `
                <div class="main-content">

                    <div class="info-container">
                        <button>Score: ${this.score}</button>
                        <button>Lives: ${this.life}</button>
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


            clearInterval(this.timer);

            this.timer = setInterval(() => {

                this.timeLeft--;

                this.timerElement.value = this.timeLeft;

                if (this.timeLeft <= 0) {

                    clearInterval(this.timer);

                    this.step++;
                    this.life--;

                    showQuestion();
                }

            }, 1000);
        };


        const endGame = () => {

            clearInterval(this.timer);

            this.timerElement.classList.add("hidden");


            const won = this.life > 0;

            this.quizArea.innerHTML = `
                <div class="main-content">

                    <h2>
                        ${won ? "You Win!" : "Game Over!"}
                    </h2>

                    <h3>
                        Your Score: ${this.score}
                    </h3>

                    <p>
                        ${won
                    ? "Congratulations! You completed the quiz."
                    : "You ran out of lives."
                }
                    </p>

                    <p>
                        You answered ${this.score} questions correctly.
                    </p>

                    <button id="restart-btn">
                        Play Again
                    </button>

                </div>
            `;

            this.playBtn.classList.add("hidden");
        };


        const startGame = () => {
            if (this.questions.length === 0) {
                alert("No questions available!");
                return;
            }
            this.step = 0;
            this.score = 0;
            this.life = 3;

            this.gameSequence = randomInts(
                this.questions.length,
                this.questions.length
            );

            showQuestion();
        };


        this.playBtn.addEventListener("click", startGame);


        this.quizArea.addEventListener("click", (e) => {

            if (e.target.classList.contains("option-btn")) {

                clearInterval(this.timer);

                const currentQuestion =
                    this.questions[this.gameSequence[this.step]];

                const selectedAnswer =
                    e.target.textContent.trim();


                if (selectedAnswer === currentQuestion.answer) {
                    this.score++;
                } else {
                    this.life--;
                }

                this.step++;

                showQuestion();
            }


            if (e.target.id === "restart-btn") {
                startGame();
            }

        });

    }
};

game.init();