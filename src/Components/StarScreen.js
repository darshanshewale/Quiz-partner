export default function StartScreen({ numQuestions, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz !!</h2>
      <h3>{numQuestions} questions to test your React Knowledge</h3>
      {/* onclicking dispatch the function  */}
      <button
        className="btn  btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's Start
      </button>
    </div>
  );
}
