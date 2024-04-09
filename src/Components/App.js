import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StarScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progess";
import FinishScreen from "../FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";

//learning  usereducer hook to manage the complex state management
//Json server file hosting on the json server

//set the timing for each question to answer
const SECS_PER_QUESTIONS = 20;

//initialstate for reducer
const initialstate = {
  questions: [],
  status: "Loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondremaining: null,
};

//reducer function recives state and action to perform
function reducer(state, action) {
  switch (action.type) {
    //get the data store to the questions array and set the status  to ready
    case "datarecived":
      return { ...state, questions: action.payload, status: "ready" };
    //if not then set data as failed setstatus to error
    case "datafailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        // will change the status to active
        status: "active",
        // this set the timing accordingly per question
        secondremaining: state.questions.length * SECS_PER_QUESTIONS,
      };
    case "newanswer":
      // for the question
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        // calculatepoints  if current question equal to correct option add points as per question
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextquestion":
      // this will increase the index of quesition and answer set to be null at inital level
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      // this will calculate the highscore and display the same
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    // thiw well got to ready status setting all initial stage
    case "restart":
      return { ...initialstate, questions: state.questions, status: "ready" };
    case "clock":
      return {
        ...state,
        // this will decrease the timer also check if time is remaianing or not if not then hit the finished
        secondremaining: state.secondremaining - 1,
        status: state.secondremaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action un known");
  }
}
export default function App() {
  //destructed state
  //reducer with dispatch and initialstate
  const [
    { questions, status, index, answer, points, highscore, secondremaining },
    dispatch,
  ] = useReducer(reducer, initialstate);

  //this is the lenght of question we have in total
  const numQuestions = questions.length;
  //this is calculate total points adding all
  const maxPossiblepoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  //fetch the all questions data
  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((response) => response.json())
      //sent to dispatch function recived data if not then hit datafailed dispatch function
      .then((data) => dispatch({ type: "datarecived", payload: data }))
      .catch((err) => dispatch({ type: "datafailed" }));
  }, []);

  return (
    <div className="app">
      <Header />

      <Main>
        {/* if status is Loading then display Loader which is at initial stage*/}
        {status === "Loading" && <Loader />}
        {/* if status is having error display error  */}
        {status === "error" && <Error />}
        {/* if ready StartScreen will render with numQuestions and with dispatch */}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {/* as quize start set the status to active which will start the quize */}
        {status === "active" && (
          <>
            {/* provide index,numberofquestion and points , total points, answer as per below */}
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblepoints={maxPossiblepoints}
              answer={answer}
            />

            {/* show the questions and accordingly the option check the correct answer and get the points  */}
            <Question
              questions={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />

            {/* this will display timer  */}
            <Footer>
              <Timer dispatch={dispatch} secondremaining={secondremaining} />

              {/* this will display the next button as soos as select the answer until the end */}
              <NextButton
                dispatch={dispatch}
                answer={answer}
                numQuestions={numQuestions}
                index={index}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPossiblepoints={maxPossiblepoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
