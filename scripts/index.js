// TODO Check course requirements to make sure all is done.
//////////////////////////////////////////////////////
// HTML PRODUCTION FUNCTIONS ////////////////////////
////////////////////////////////////////////////////

function makeStartPage() {
  return `
    <header class="js-hero__start hero__start">
      <p class="title__name">The SVG Stomping Ground</p>
      <h3>Complete your certification in SVG badassery</h3>
      <br>
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
  } = renderNextQuestion();

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

function makeScoreCard() {
  return `
    <aside class="card__score">
    <div class="card__score--text">
      <h1>You have</h1>
      <div class="card__score--num">${STORE.rightAnswers}</div>
      <div>out of 10 correct</div>
    </div>
    </aside>
  `;
}

function makeWrongPopup() {
  return `
    <aside class='js-popup__response popup__response'>
      <div class='popup__text popup__bg-wrong'>
        <div>
        <h1>Incorrect</h1>
          <button class="js-btn__question-next btn__question btn__question-next">Next \u{27A1}</button>
        </div>
      </div>
    </aside>
  `;
}

function makeRightPopup() {
  return `
    <aside class='js-popup__response popup__response'>
      <div class='popup__text popup__bg-correct'>
        <div>
          <h1>Correct</h1>
          <button class="js-btn__question-next btn__question btn__question-next">Next \u{27A1}</button>
          <h2>Score: ${STORE.rightAnswers} out of 10</h2>
        </div>
      </div>
    </aside>
    `;
}

function makeQuizOverPopup() {
  return `
    <aside class='js-popup__response-over popup__response popup__response-over'>
      <div class='popup__text'>
        <div>
          <h1>Quiz Complete</h1>
          <h2>You got ${STORE.rightAnswers} out 10</h2>
          <p>You should be <span class="feedback"></span> of yourself!</p>
          <button class="js-btn__restart btn__question btn__question-next">Restart Quiz \u{27A1}</button>
        </div>
      </div>
    </aside>
    `;
}

////////////////////////////////////////////////////////
// RENDER TO DOM FUNCTIONS ////////////////////////////
//////////////////////////////////////////////////////

function renderStartPage() {
  $('.quiz__container').append(makeStartPage);
}

function renderForm() {
  if (STORE.questionCount <= 9) {
    $('.quiz__container').append(makeForm);
  } else {
    renderQuizOverPopup();
  }
}

function renderScoreCard() {
  $('main').append(makeScoreCard);
}

function renderNextQuestion() {
  let currentQuestion = STORE.questionBlocks[STORE.questionCount];
  STORE.questionCount += 1;
  return currentQuestion;
}

function renderCorrectResponse() {
  STORE.rightAnswers += 1;
  renderScoreCard();
  $('main').append(makeRightPopup);
}
function renderWrongResponse() {
  $('main').append(makeWrongPopup);
}

function renderQuizOverPopup() {
  $('main').append(makeQuizOverPopup);
  renderFeedback();
}

function renderFeedback() {
  totalRight = STORE.rightAnswers;
  if (totalRight < 8) {
    // TODO /////////////////////////////////////////////////////
    // Get image to add to background
    $('.popup__text').addClass('.popup__bg-shame');
    $('.feedback').append('ashamed');
  } else {
    $('.popup__text').addClass('.popup__bg-praise');
    $('.feedback').append('proud');
  }
}

////////////////////////////////////////////////////////
// REMOVE FROM DOM FUNCTIONS //////////////////////////
//////////////////////////////////////////////////////

function removeStartPage() {
  $('.js-hero__start').remove();
}

function removePopup() {
  if ('js-popup__response') {
    $('.js-popup__response').remove();
  }
}

function removeRecentQuestion() {
  if ($('.quiz__form')) {
    $('.quiz__form').remove();
  }
}

////////////////////////////////////////////////////
// EVENT HANDLERS /////////////////////////////////
//////////////////////////////////////////////////

function handleStartQuiz() {
  $('.quiz__container').on('click', '#js-button__start', function(event) {
    removeStartPage();
    renderScoreCard();
    renderForm();
  });
}

function handleSubmitAnswer() {
  // Onsubmit get correct answer from STORE
  $('.js-quiz__container').on('submit', 'form', function(event) {
    let answer = STORE.questionBlocks[STORE.questionCount - 1].correctAnswer;
    event.preventDefault();

    // check if answer is same as the checked input id
    if (answer === $('input:checked').attr('id')) {
      renderCorrectResponse();
    } else {
      renderWrongResponse();
    }
  });
}

function handleNextQuestionButton() {
  $('main').on('click', '.js-btn__question-next', function(event) {
    removePopup();
    removeRecentQuestion();
    renderForm();
  });
}

function runQuiz() {
  renderStartPage();
  handleStartQuiz();
  handleSubmitAnswer();
  handleNextQuestionButton();
}

$(runQuiz);

//////////////////////////////////////////////////////////////
// LEGEND ///////////////////////////////////////////////////
////////////////////////////////////////////////////////////

// function runQuiz() {
//   renderStartPage();
//     - > makeStartPage

//   handleStartQuiz();
//     - > removeStartPage();
//     - > renderForm();

//   handleSubmitAnswer();
//     - > renderCorrectResponse(); || renderWrongResponse();

//   handleNextQuestionButton();
//     - > removePopup();
//     - > renderForm();
//     - > increment rightScore;

//   handleQuizOver();
//     - > renderQuizOverPopup();
//       - > removeRecentQuestion();
//       - > makeOverPopup();
//         - > show total rightScore;
//         - > show congratualtionsMessage || shameMessage;
// TODO //////////////////////////////////////////////////////////
//         - > handleRestartQuiz() button;
