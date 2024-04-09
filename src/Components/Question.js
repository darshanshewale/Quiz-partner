import Options from "./Options";

export default function Questions({ questions, dispatch, answer }) {
  return (
    <div>
      {/* display the question and options  */}
      <h4>{questions.question}</h4>
      <Options questions={questions} dispatch={dispatch} answer={answer} />
    </div>
  );
}
