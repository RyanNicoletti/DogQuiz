let dogArray = [
  {
    qNum: 1,
    question: "What is the most popular dog breed?",
    answerOptions: ['golden retriever', 'labrador retriever', 'poodle', 'pug'],
    correctAnswer: 'labrador retriever'
  },
  {
    qNum: 2,
    question: "What perecent of dogs in the US sleep in their owners bed?",
    answerOptions: ['10%', '25%', '75%', '45%'],
    correctAnswer: '45%'

  },
  {
    qNum: 3,
    question: "How many receptors are on the nose of a dog?",
    answerOptions: ['300', '3000', '3 million', '300 million'],
    correctAnswer: '300 million'
  },
  {
    qNum: 4,
    question: "What breed of dog has been nominated for an Academy Award?",
    answerOptions: ['German Shepherd', 'Golden Retriever', 'Pug', 'Collie'],
    correctAnswer: 'German Shepherd'
  },
  {
    qNum: 5,
    question: "Collie's were initially used to herd which other animal?",
    answerOptions: ['Cows', 'Cats', 'Sheep', 'Elephants'],
    correctAnswer: 'Sheep'
  },
  {
    qNum: 6,
    question: "Where did Australian Shepherd's originate?",
    answerOptions: ['Australia', 'United States', 'China', 'Brazil'],
    correctAnswer: 'United States'
  },
  {
    qNum: 7,
    question: "Where did Labrador Retriever's originate?",
    answerOptions: ['New Zealand', 'Australia', 'Newfoundland', 'United States'],
    correctAnswer: 'Newfoundland'
  },
  {
    qNum: 8,
    question: "What is the most popular dog breed",
    answerOptions: ['golden retriever', 'labrador retriever', 'poodle', 'pug'],
    correctAnswer: 'labrador retriever'
  },
  {
    qNum: 9,
    question: "Approximately how many pet dogs are in the United States?",
    answerOptions: ['75 million', '100 million', '125 million', '200 million'],
    correctAnswer: '75 million'
  },
  {
    qNum: 10,
    question: "What colors do dogs see?",
    answerOptions: ['red and green', 'pink and yellow', 'blue and yellow', 'none'],
    correctAnswer: 'blue and yellow'
  },
];

let currentQ = 0;

function startQuizAtStart() {
$('#start-page').on('click', '.button', event => {
  $('#start-page').addClass('hidden');
  $('#question-page').removeClass('hidden');
  $('#submit-answer').removeClass('hidden');
});
}

function renderQuestions() {
const answer1 = `${dogArray[currentQ].answerOptions[0]}`;
const answer2 = `${dogArray[currentQ].answerOptions[1]}`;
const answer3 = `${dogArray[currentQ].answerOptions[2]}`;
const answer4 = `${dogArray[currentQ].answerOptions[3]}`;
const questionText = `<legend>${currentQ+1}/10: ${dogArray[currentQ].question}<legend>`;
const answersText = 
`<input type='radio' name='option' class='radio-buttons' id='answer1' value='${answer1}'><label for='answer1'>${answer1}</label><br>
<input type='radio' name='option' class='radio-buttons' id='answer2' value='${answer2}'><label for='answer2'>${answer2}</label><br>
<input type='radio' name='option' class='radio-buttons' id='answer3' value='${answer3}'><label for='answer3'>${answer3}</label><br>
<input type='radio' name='option' class='radio-buttons' id='answer4' value='${answer4}'><label for='answer4'>${answer4}</label><br>`;
$('.puppy-question').html(questionText);
$('.puppy-answers').html(answersText);
enableSubmitButton();
}

function enableSubmitButton() {
$('input[name=option]').on('click', function(event) {
  $('#submit-answer').removeClass('disabled').removeAttr('disabled');
});
}
  
function submitQuizAnswer() {
$('#submit-answer').click(function(event) {
  event.preventDefault();
  evaluateAnswers();
  $('#submit-answer').addClass('hidden');
  $('#next-question').removeClass('hidden');
  $('input[type=radio]').attr('disabled', true);
});
}

let userScore = {
correct: 0,
incorrect: 0,
};

function evaluateAnswers() {
let radioValue = $('input[name=option]:checked').val();
if (radioValue == dogArray[currentQ].correctAnswer) {
  userScore.correct++;
  $('#feedbackcorrect').removeClass('hidden');
} else {
  userScore.incorrect++;
  getCorrectAnswer();
  $('#wrong-answer').removeClass('hidden');
  $('.wrong-answer-picture').removeClass('hidden');
}
$('.results-counter').html(`<p>Correct: ${userScore.correct} | Incorrect: ${userScore.incorrect}</p>`);
}  

function getCorrectAnswer() {
let popupAnswerText = `<h3>Incorrect!<br>The correct answer is: ${dogArray[currentQ].correctAnswer}.</h3><br>`;
$('#wrong-answer').html(popupAnswerText);
} 
    
function advanceToNextQuestion() {
$('#next-question').on('click', function(event) {
  if (currentQ < dogArray.length-1) {
    currentQ++;
    renderQuestions();
    resetQuestion();
  } else {
    showFinalScore();
  } 
});
}

function resetQuestion() {
$('input[type=radio]').attr('disabled', false);
$('#next-question').addClass('hidden');
$('#submit-answer').removeClass('hidden');
$('#feedbackcorrect').addClass('hidden');
$('#wrong-answer').addClass('hidden');
$('.wrong-answer-picture').addClass('hidden');
$('#submit-answer').addClass('disabled');
$('#submit-answer').attr('disabled', 'disabled');
}

function showFinalScore() {
    $('#submit-answer').addClass('hidden');
    $('#final-page').removeClass('hidden');
    $('#question-page').addClass('hidden');
    let finalScoreText = `<h3>You answered ${userScore.correct} out of 10 questions correctly!</h3>`;
    $('#final-correct').append(finalScoreText);
}

function restartQuiz() {
$('#retake').click(function() {
  location.reload();
});
}

function handleQuizFunctions() {
startQuizAtStart();
renderQuestions();
submitQuizAnswer();
advanceToNextQuestion();
restartQuiz();
enableSubmitButton();
}

$(handleQuizFunctions);
