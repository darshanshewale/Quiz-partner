import { useEffect } from "react";

export default function Timer({ dispatch, secondremaining }) {
  const mins = Math.floor(secondremaining / 60);
  const seconds = secondremaining % 60;

  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "clock" });
      }, 1000);

      return () => clearInterval(id);
    },
    [dispatch]
  );
  // display mins and seconds reamining
  return (
    <div className="timer">
      {mins}:{seconds}
    </div>
  );
}
