// script.js
const questions = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        correct: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Mars", "Earth", "Jupiter", "Saturn"],
        correct: "Mars"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic", "Indian", "Arctic", "Pacific"],
        correct: "Pacific"
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["William Shakespeare", "Charles Dickens", "Mark Twain", "Jane Austen"],
        correct: "William Shakespeare"
    },
    {
        question: "What is the smallest country in the world?",
        options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
        correct: "Vatican City"
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        options: ["Oxygen", "Osmium", "Ozone", "Opium"],
        correct: "Oxygen"
    },
    {
        question: "What is the square root of 64?",
        options: ["6", "7", "8", "9"],
        correct: "8"
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent Van Gogh", "Leonardo Da Vinci", "Pablo Picasso", "Claude Monet"],
        correct: "Leonardo Da Vinci"
    },
    {
        question: "Which is the largest mammal?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Shark"],
        correct: "Blue Whale"
    },
    {
        question: "How many continents are there?",
        options: ["5", "6", "7", "8"],
        correct: "7"
    }
];

let currentQuestionIndex = 0;
let userName = "";
let score = 0;
let leaderboard = [];

// Show the welcome screen when the page loads
document.getElementById('welcome-screen').style.display = 'block';
document.getElementById('quiz-screen').style.display = 'none';
document.getElementById('leaderboard-screen').style.display = 'none';

// Event listener to start the quiz after entering name
document.getElementById('start-btn').addEventListener('click', startQuiz);
document.getElementById('next-btn').addEventListener('click', nextQuestion);
document.getElementById('play-again-btn').addEventListener('click', playAgain);

function startQuiz() {
    userName = document.getElementById('username').value;

    // Check if the user has entered their name
    if (!userName) {
        alert("Please enter your name!");
        return;
    }

    // Hide the welcome screen and show the quiz screen
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('quiz-screen').style.display = 'block';

    // Show the first question
    showQuestion();
}

function showQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById('question-title').textContent = question.question;

    const answersDiv = document.getElementById('answers');
    answersDiv.innerHTML = ""; // Clear previous answers

    question.options.forEach(option => {
        const btn = document.createElement('button');
        btn.textContent = option;
        btn.onclick = () => checkAnswer(option, btn);
        answersDiv.appendChild(btn);
    });
}

function checkAnswer(answer, btn) {
    const question = questions[currentQuestionIndex];
    if (answer === question.correct) {
        score++;
        btn.classList.add('correct');
    } else {
        btn.classList.add('wrong');
    }
    disableOptions();
    showNextButton();
}

function disableOptions() {
    const buttons = document.querySelectorAll('#answers button');
    buttons.forEach(btn => btn.disabled = true);
}

function showNextButton() {
    document.getElementById('next-btn').style.display = 'block';
}

function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
        document.getElementById('next-btn').style.display = 'none';
    } else {
        showLeaderboard();
    }
}

function showLeaderboard() {
    leaderboard.push({ name: userName, score });
    leaderboard.sort((a, b) => b.score - a.score);

    document.getElementById('quiz-screen').style.display = 'none';
    document.getElementById('leaderboard-screen').style.display = 'block';

    const leaderboardList = document.getElementById('leaderboard-list');
    leaderboardList.innerHTML = "";
    leaderboard.forEach((entry, index) => {
        const leaderboardItem = document.createElement('p');
        leaderboardItem.textContent = `${index + 1}. ${entry.name} - ${entry.score}`;
        leaderboardList.appendChild(leaderboardItem);
    });
}

function playAgain() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('leaderboard-screen').style.display = 'none';
    document.getElementById('welcome-screen').style.display = 'block';
    document.getElementById('username').value = '';  // Reset the username field
}
