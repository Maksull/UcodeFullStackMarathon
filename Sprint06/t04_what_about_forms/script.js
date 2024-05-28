document.getElementById('quiz-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const answers = {
        q1: "3", // Sacrifice Gamora
        q2: "4", // Captain America
        q3: "2"  // Mjolnir
    };

    let correctCount = 0;

    for (let key in answers) {
        const userAnswer = document.querySelector(`input[name="${key}-answer"]:checked`);
        if (userAnswer && userAnswer.value === answers[key]) {
            correctCount++;
        }
    }

    const resultElement = document.getElementById('result');
    if (correctCount === Object.keys(answers).length) {
        resultElement.textContent = "All answers are correct!";
        resultElement.style.color = 'green';
    } else {
        resultElement.textContent = `You got ${correctCount} out of ${Object.keys(answers).length} correct. Try again!`;
        resultElement.style.color = 'red';
    }
});

function nextQuestion(currentQuestion) {
    document.getElementById(`question${currentQuestion}`).style.display = 'none';
    document.getElementById(`question${currentQuestion + 1}`).style.display = 'block';
}

function previousQuestion(currentQuestion) {
    document.getElementById(`question${currentQuestion}`).style.display = 'none';
    document.getElementById(`question${currentQuestion - 1}`).style.display = 'block';
}
