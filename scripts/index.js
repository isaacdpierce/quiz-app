////////////////////////////////////////////////////////
// HTML PRODUCTION FUNCTIONS ////////////////////////
////////////////////////////////////////////////////

function makeStartPage() {
  return `
    <header class="js-hero__start hero__start"
      <h1 class="title__name">The SVG Stomping Grounds</h1>
      <h3>Complete your certification in SVG mastery</h3
      <br>
      <button class="js-button__start button__start" type="submit">START</button>
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
  } = renderNextQuestion();

  return `
    <form class="quiz__form">
      <header>
        <span class="number">#${number}</span>
        <h1><span class="question">${question}</span></h1>
      </header>
      <fieldset>
        <ul>
          <li>
            <label for="answer1">
              <input
                type="radio"
                id="answer1"
                class="answer1"
                name="answer"
                value="${answer1}"
                required
              />
              ${answer1}
            </label>
          </li>
          <li>
            <label for="answer2">
              <input
                type="radio"
                id="answer2"
                class="answer2"
                name="answer"
                value="${answer2}"
              />
              ${answer2}
            </label>
          </li>
          <li>
            <label for="answer3">
              <input
                type="radio"
                id="answer3"
                class="answer3"
                name="answer"
                value="${answer3}"
              />
              ${answer3}
            </label>
          </li>
          <li>
            <label for="answer4">
              <input
                type="radio"
                id="answer4"
                class="answer4"
                name="answer"
                value="${answer4}"
              />
              ${answer4}
            </label>
          </li>
        </ul>
      </fieldset>
      <button class="btn__question btn__question-submit" type="submit">Submit</button>
    </form>
  `;
}

function makeScoreCard() {
  return `
    <aside class="card__score position--corner">
      <div class="card__score--text">
        <h1>You have</h1>
        <div class="card__score--num">${STORE.rightAnswers}</div>
        <div>out of 10 correct</div>
      </div>
    </aside>
  `;
}

function makeWrongPopup() {
  let nextQuestion = renderNextQuestion();
  return `
    <section class='js-popup__response popup__response'>
      <header class='popup__text popup__bg-wrong'>
        <h1>Incorrect</h1>
        <h2>The correct response was:</h2>
        <p class="js-popup__response--correct"></p>
        <button class="js-btn__question-next btn__question btn__question-next" type="submit">Next \u{27A1}</button>
      </header>
    </section>
  `;
}

function makeRightPopup() {
  return `
    <section class='js-popup__response popup__response'>
      <div class='popup__text popup__bg-correct'>
        <header>
          <h1>Correct</h1>
          <h2>1 step closer to SVG mastery</h2>
          <button class="js-btn__question-next btn__question btn__question-next" type="submit">Next \u{27A1}</button>
        </header>
      </div>
    </section>
    `;
}

function makeQuizOverPopup() {
  return `
    <section class='js-popup__response-over popup__response popup__response-over'>
      <div class='popup__text'>
        <header>
          <h1>Quiz Complete</h1>
          <h2>You got ${STORE.rightAnswers} out 10 correct</h2>
          <p>You oughta be <span class="feedback"></span> of yourself!</p>
          <button class="js-btn__restart btn__question btn__question-next">Restart</button>
        </header>
      </div>
    </section>
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
function renderWrongResponse(answerText) {
  $('main').append(makeWrongPopup);
  $('.js-popup__response--correct').append(answerText);
}

function renderQuizOverPopup() {
  $('main').append(makeQuizOverPopup);
  renderFeedback();
}

function renderFeedback() {
  totalRight = STORE.rightAnswers;
  if (totalRight < 8) {
    $('.popup__text').addClass('popup__bg-shame');
    $('.feedback').append('ashamed');
  } else {
    $('.popup__text').addClass('popup__bg-praise');
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
  if ('js-popup__response-over') {
    $('.js-popup__response-over').remove();
  }
}

function removeRecentQuestion() {
  if ($('.quiz__form')) {
    $('.quiz__form').remove();
  }
}

function removeScoreCard() {
  if ($('.card__score')) {
    $('.card__score').remove();
  }
}

////////////////////////////////////////////////////
// EVENT HANDLERS /////////////////////////////////
//////////////////////////////////////////////////

function handleStartQuiz() {
  $('.quiz__container').on('click', '.js-button__start', function(event) {
    removeStartPage();
    renderScoreCard();
    renderForm();
  });
}

function handleSubmitAnswer() {
  // Onsubmit get correct answer from STORE
  $('.js-quiz__container').on('submit', 'form', function(event) {
    let currentQuestion = STORE.questionBlocks[STORE.questionCount - 1];
    let { correctAnswer } = currentQuestion;
    let answerText = currentQuestion[correctAnswer];
    let userAnswer = $('input:checked').attr('id');

    event.preventDefault();
    removeRecentQuestion();

    if (userAnswer === correctAnswer) {
      renderCorrectResponse();
    } else {
      renderWrongResponse(answerText);
    }
  });
}

function handleNextQuestionButton() {
  $('main').on('click', '.js-btn__question-next', function(event) {
    removePopup();
    renderForm();
  });
}

function handleRestartQuiz() {
  $('main').on('click', '.js-btn__restart', function(event) {
    STORE.questionCount = 0;
    STORE.rightAnswers = 0;
    removePopup();
    removeScoreCard();
    renderStartPage();
  });
}

function runQuiz() {
  renderStartPage();
  handleStartQuiz();
  handleSubmitAnswer();
  handleNextQuestionButton();
  handleRestartQuiz();
}

$(runQuiz);
