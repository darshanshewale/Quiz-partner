export default function Options({ questions, dispatch, answer }) {
  const hasAnswered = answer !== null;
  return (
    <div>
      <div className="options">
        {questions.options.map((option, index) => (
          <button
            // set the classname for correct answe
            className={`btn btn-option ${index === answer ? "answer" : ""}
            ${
              hasAnswered
                ? index === questions.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            key={option}
            // if hasAnswered is true will set options to disabled
            disabled={hasAnswered}
            // send index for newanswer dispatch
            onClick={() => dispatch({ type: "newanswer", payload: index })}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
