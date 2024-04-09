export default function FinishScreen({
  points,
  maxPossiblepoints,
  highscore,
  dispatch,
}) {
  const percentage = (points / maxPossiblepoints) * 100;
  //  display the higher score and accordingly the emoji
  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 80) emoji = "🥳";
  if (percentage >= 50 && percentage < 80) emoji = "😄";
  if (percentage >= 0 && percentage < 50) emoji = "🤔";
  if (percentage === 0) emoji = "🤦";

  return (
    <>
      <p className="result">
        <span>{emoji}</span>
        You Scored <strong>{points}</strong> out of {maxPossiblepoints}(
        {Math.ceil(percentage)}%)
      </p>
      <p className="highscore">highscore : {highscore} </p>

      {/* this will hit the restarts function  */}
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart
      </button>
    </>
  );
}
