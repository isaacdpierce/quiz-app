// CHECK right answer by confirming the radio button id selected matches the correct answer number in the object

////////////////////////////////////////////////////////
// HELPER FUNCTIONS ///////////////////////////////////
//////////////////////////////////////////////////////

function showCorrect(correctAnswer) {
  console.log(`The correct answer is ${correctAnswer}`);
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
  <aside class="card__score">
  <div class="card__score--text">
    <h1>You have</h1>
    <div class="card__score--num">${STORE.rightAnswers}</div>
    <div>out of 10 correct</div>
    </div>
  </aside>
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

function makeRightPopup() {
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
// RENDER TO DOM FUNCTIONS ////////////////////////////
//////////////////////////////////////////////////////

function renderStartPage() {
  $('.quiz__container').append(makeStartPage);
}

function renderForm() {
  if (STORE.questionCount <= 9) {
    $('.quiz__container').append(makeForm);
  } else {
    alert('game over');
  }
}

function renderNextQuestion() {
  let currentQuestion = STORE.questionBlocks[STORE.questionCount];
  STORE.questionCount += 1;
  return currentQuestion;
}

function renderCorrectResponse() {
  $('main').append(makeRightPopup);
  STORE.rightAnswers += 1;
}
function renderWrongResponse() {
  $('main').append(makeWrongPopup);
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
    renderForm();
  });
}

function handleSubmitAnswer() {
  // Onsubmit get correct answer from STORE
  $('.js-quiz__container').on('submit', 'form', function(event) {
    let answer = STORE.questionBlocks[STORE.questionCount - 1].correctAnswer;
    event.preventDefault();

    // check if answer is same as the checked input
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
