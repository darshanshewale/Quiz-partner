export default function Progress({
  index,
  numQuestions,
  points,
  maxPossiblepoints,
  answer,
}) {
  return (
    <header className="progress">
      {/* this will display progress bar where max set to total number of questions as select the answer increases the progress */}
      <progress
        max={numQuestions}
        value={index + Number(answer !== null)}
      ></progress>
      <p>
        {/* display current question number out of total */}
        Questions <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        {/* points out of total points  */}
        <strong>{points}</strong>/{maxPossiblepoints}
      </p>
    </header>
  );
}
