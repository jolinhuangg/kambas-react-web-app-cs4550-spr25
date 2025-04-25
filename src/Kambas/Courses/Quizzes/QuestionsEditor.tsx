import {
    Container,
    Form,
    FormControl,
    InputGroup,
    Row,
    Col,
  } from "react-bootstrap";
  import { useParams, NavLink, useNavigate } from "react-router";
  import { useState } from "react";
  import { BiBlock } from "react-icons/bi";
  import { useDispatch, useSelector } from "react-redux";
  import * as quizzesClient from "./client";
  import { addQuiz, updateQuiz } from "./reducer";
  import GreenCheckmark from "../Modules/GreenCheckmark";
  import { BiPlus } from "react-icons/bi";

  const tabStyle = {
    padding: "8px 20px",
    marginRight: "4px",
    textDecoration: "none",
    fontWeight: 500,
    color: "#dc3545",
  };

  const activeTabStyle = {
    ...tabStyle,
    backgroundColor: "#ffffff",
    border: "1px solid #ccc",
    borderBottom: "2px solid #ffffff",
    color: "black",
  };

  export default function QuestionsEditor() {
    const { qid, cid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { quizzes } = useSelector((state: any) => state.quizReducer);
  
    // If editing an existing assignment, pre-populate local state
    const existingQuiz =
      qid !== "new" ? quizzes.find((q: any) => q._id === qid) : null;
  
    const [quiz, setQuiz] = useState({
      _id: String,
      title: existingQuiz?.title || "",
      description: existingQuiz?.description || "",
      quiztype: existingQuiz?.quiztype || "Graded Quiz",
      assignmentgroup: existingQuiz?.assignmentgroup || "Quizzes",
      shuffle: existingQuiz?.shuffle || true,
      timelimit: existingQuiz?.timelimit || 20,
      multipleattempts: existingQuiz?.multipleattempts || false,
      maxattempts: existingQuiz?.maxattempts || 1,
      showcorrectanswers: existingQuiz?.showcorrectanswers || false,
      accesscode: existingQuiz?.accesscode || "",
      onequestion: existingQuiz?.onequestion || true,
      webcam: existingQuiz?.webcam || false,
      lockquestions: existingQuiz?.lockquestions || false,
      duedate: existingQuiz?.duedate || "",
      points: existingQuiz?.points || 100,
      taken: existingQuiz?.taken || false,
      score: existingQuiz?.score || 0,
      published: existingQuiz?.published || false,
      availabledate: existingQuiz?.availabledate || "",
      untildate: existingQuiz?.untildate || "",
      questions: existingQuiz?.questions || [],
    });
  
    const handleSave = async () => {
      try {
        if (qid === "new") {
          const newQuiz = await quizzesClient.createQuizForCourse(cid as string, {
            title: quiz.title,
            description: quiz.description,
            quiztype: quiz.quiztype,
            assignmentgroup: quiz.assignmentgroup, //change to enum
            shuffle: quiz.shuffle,
            timelimit: quiz.timelimit,
            multipleattempts: quiz.multipleattempts,
            maxattempts: quiz.maxattempts,
            showcorrectanswers: quiz.showcorrectanswers,
            accesscode: quiz.accesscode,
            onequestion: quiz.onequestion,
            webcam: quiz.webcam,
            lockquestions: quiz.lockquestions,
            duedate: quiz.duedate,
            points: quiz.points,
            taken: quiz.taken,
            score: quiz.score,
            published: quiz.published,
            availabledate: quiz.availabledate,
            untildate: quiz.untildate,
            quiz: quiz.questions,
          });
          dispatch(addQuiz(newQuiz));
        } else {
          const updatedQuiz = await quizzesClient.updateQuiz({
            _id: qid,
            title: quiz.title,
            description: quiz.description,
            quiztype: quiz.quiztype,
            assignmentgroup: quiz.assignmentgroup, //change to enum
            shuffle: quiz.shuffle,
            timelimit: quiz.timelimit,
            multipleattempts: quiz.multipleattempts,
            maxattempts: quiz.maxattempts,
            showcorrectanswers: quiz.showcorrectanswers,
            accesscode: quiz.accesscode,
            onequestion: quiz.onequestion,
            webcam: quiz.webcam,
            lockquestions: quiz.lockquestions,
            duedate: quiz.duedate,
            points: quiz.points,
            taken: quiz.taken,
            score: quiz.score,
            published: quiz.published,
            availabledate: quiz.availabledate,
            untildate: quiz.untildate,
            quiz: quiz.questions,
          });
          dispatch(updateQuiz(updatedQuiz));
        }
        navigate(`/Kambas/Courses/${cid}/Quizzes`);
      } catch (error) {
        console.error("Error saving quiz:", error);
      }
    };
  
    const tabStyle = {
      padding: "8px 20px",
      marginRight: "4px",
      textDecoration: "none",
      fontWeight: 500,
      color: "#dc3545",
    };
  
    const activeTabStyle = {
      ...tabStyle,
      backgroundColor: "#ffffff",
      border: "1px solid #ccc",
      borderBottom: "2px solid #ffffff",
      color: "black",
    };
  
    return (
      <Container className="m-2">

<div className="mt-4 d-flex justify-content-end align-items-center gap-3">
        <div> Points {quiz?.points ?? 0} </div>
        {quiz.published ? (
          <div className="text-success d-flex align-items-center gap-1">
            <GreenCheckmark /> Published
          </div>
        ) : (
          <div className="text-secondary d-flex align-items-center gap-1">
            <BiBlock size={20} /> Not Published
          </div>
        )}
      </div>

      <hr />

      {/** Details & Questions tabs */}
      <div style={{ display: "flex", borderBottom: ".5px solid #ccc" }}>
        <NavLink
          to={`/Kambas/Courses/${cid}/Quizzes/${qid}/edit`}
          style={tabStyle}
        >
          Details
        </NavLink>
        <NavLink
          to={`/Kambas/Courses/${cid}/Quizzes/${qid}/edit/questions`}
          style={activeTabStyle}
        >
          Questions
        </NavLink>
      </div>


        <div className="d-flex justify-content-center">
        <button
            onClick={() => navigate(`/Kambas/Courses/${cid}/Quizzes`)}
            className="btn btn-secondary m-4"
            type="button">
            <BiPlus/> Add Question
        </button>
        </div>

        <hr/>

            <div className="d-flex justify-content-start">
              <button
                onClick={() => navigate(`/Kambas/Courses/${cid}/Quizzes`)}
                className="btn btn-secondary me-2"
                type="button"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                type="button"
                className="btn btn-danger"
              >
                Save
              </button>
            </div>

      </Container>
    );
  }
  