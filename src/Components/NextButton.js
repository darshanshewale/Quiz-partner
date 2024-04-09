export default function NextButton({ index, numQuestions, dispatch, answer }) {
  // if no answer selected then return null
  if (answer === null) return null;

  // display till index is less then last question
  if (index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextquestion" })}
      >
        Next
      </button>
    );

  // if reached to end hit  finished
  if (index === numQuestions - 1) console.log("hello");
  return (
    <button className="btn btn-ui" onClick={() => dispatch({ type: "finish" })}>
      Finished
    </button>
  );
}
