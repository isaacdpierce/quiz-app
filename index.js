const STORE = {
  question: `What?`,
  answer1: `now`,
  answer2: `then`,
  answer3: `here`,
  answer4: `over there`
};

function makeForm() {
  const { question, answer1, answer2, answer3, answer4 } = STORE;

  console.log('makeForm is running');
  return `
  <form class="quiz__form">
  <h3>${question}</h3>
  <ul>
    <li>
      <label for="answer__1">
        <input
          type="radio"
          id="answer_1"
          class="js-answer__1 answer__1"
          name="answer"
          value=""
        />
        ${answer1}
      </label>
    </li>
    <li>
      <label for="answer__2">
        <input
          type="radio"
          id="answer__2"
          class="js-answer__2 answer__2"
          name="answer"
          value=""
        />
        ${answer2}
      </label>
    </li>
    <li>
      <label for="answer__3">
        <input
          type="radio"
          id="answer__3"
          class="js-answer__3 answer__3"
          name="answer"
          value=""
        />
        ${answer3}
      </label>
    </li>
    <li>
      <label for="answer__4">
        <input
          type="radio"
          id="answer__4"
          class="js-answer__4 answer__4"
          name="answer"
          value=""
        />
        ${answer4}
      </label>
    </li>
  </ul>
</form>
  `;
}

function renderQuestions() {
  $('.quiz__container').append(makeForm);
}

function startQuiz() {
  renderQuestions();
}

$(startQuiz);
