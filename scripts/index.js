// CHECK right answer by confirming the radio button id selected matches the correct answer number in the object

////////////////////////////////////////////////////////
// HELPER FUNCTIONS ///////////////////////////////////
//////////////////////////////////////////////////////

function showCorrect(correctAnswer) {
  console.log(`The correct answer is ${correctAnswer}`);
}

function nextQuestion() {
  const question = questionSet[questionNum - 1];

  const questionsAnswered = questionNum - 1;

  $('#container').html(
    questionTemplate(correctAnswers, question, questionsAnswered)
  );
}

//////////////////////////////////////////////////////
// HTML PRODUCTION FUNCTIONS //////////////////////////////
////////////////////////////////////////////////////

function makeStartPage() {
  return `
    <header class="js-hero__start hero__start">
      <h1>The SVG Stomping Ground</h1>
      <h3>Complete your certification in SVG badassery</h3>
      <p>( make the internet a better place )</p>
      <button id="js-button__start" class="button__start" type="submit">START</button>
    </header>
  `;
}

function makeForm() {
  const {
    number,
    question,
    answer1,
    answer2,
    answer3,
    answer4,
    correctAnswer,
  } = STORE.questionBlocks;

  console.log('makeForm is running');
  showCorrect(correctAnswer);

  return `
  <form class="quiz__form">
  <h3>#${number}. ${question}</h3>
  <ul>
    <li>
      <label for="answer1">
        <input
          type="radio"
          id="answer1"
          class="js-answer1 answer1"
          name="answer"
          value=""
        />
        ${answer1}
      </label>
    </li>
    <li>
      <label for="answer2">
        <input
          type="radio"
          id="answer2"
          class="js-answer2 answer2"
          name="answer"
          value=""
        />
        ${answer2}
      </label>
    </li>
    <li>
      <label for="answer3">
        <input
          type="radio"
          id="answer3"
          class="js-answer3 answer3"
          name="answer"
          value=""
        />
        ${answer3}
      </label>
    </li>
    <li>
      <label for="answer4">
        <input
          type="radio"
          id="answer4"
          class="js-answer4 answer4"
          name="answer"
          value=""
        />
        ${answer4}
      </label>
    </li>
  </ul>
  <button class="btn__question btn__question-submit">Submit Answer</button>
</form>
  `;
}

function makeWrongPopup() {
  return `
    <aside class='js-popup__response popup__response'>
      <div class='popup__text'>
        <div>
        <p>Sadly mistaken</p>
          <button class="js-btn__question-next btn__question btn__question-next">Next \u{27A1}</button>
        </div>
      </div>
    </aside>
  `;
}

function makeCorrectPopup() {
  return `
    <aside class='js-popup__response popup__response'>
    <div class='popup__text'>
      <div>
      <p>Dead on</p>
        <button class="js-btn__question-next btn__question btn__question-next">Next \u{27A1}</button>
      </div>
    </div>
</aside>
  `;
}

////////////////////////////////////////////////////////
// RENDER TO AND REMOVE FROM DOM FUNCTIONS ////////////
//////////////////////////////////////////////////////

function renderStartPage() {
  $('.quiz__container').append(makeStartPage);
}

function removeStartPage() {
  $('.js-hero__start').remove();
}

function removePopup() {
  $('.js-popup__response').remove();
}

function renderQuestions() {
  $('.quiz__container').append(makeForm);
}

function renderNextQuestion() {
  let questionCount = 0;
  let currentQuestion = STORE.questionBlocks[questionCount];
  console.log(currentQuestion);

  // if (questionCount > 10) {
  //   // game over
  //   // reveal score and praise or shame
  //   console.log('Gameover');
  // }
  questionCount++;
  console.log(questionCount);
  return questionCount;
}

function renderCorrectResponse() {
  $('main').append(makeCorrectPopup);
}
function renderWrongResponse() {
  $('main').append(makeWrongPopup);
}

////////////////////////////////////////////////////
// EVENT HANDLERS /////////////////////////////////
//////////////////////////////////////////////////

function handleStartQuiz() {
  $('.quiz__container').on('click', '#js-button__start', function(event) {
    // console.log(event);
    removeStartPage();
    renderQuestions();
  });
}

function handleSubmitAnswer() {
  const answer = STORE.questionBlocks[0].correctAnswer;

  // Onsubmit get correct answer from STORE
  $('.js-quiz__container').on('submit', 'form', function(e) {
    e.preventDefault();
    console.log(`Correct answer is ${answer}`);

    // check if answer is same as the checked input
    if (answer === $('input:checked').attr('id')) {
      renderCorrectResponse();
    } else {
      renderWrongResponse();
    }
  });
}

function handleNextQuestionButton() {
  $(document).on('click', function() {
    removePopup();
    // get next question
    renderNextQuestion();
  });
}

function runQuiz() {
  renderStartPage();
  handleStartQuiz();
  handleSubmitAnswer();
  handleNextQuestionButton();
}

$(runQuiz);
