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

import GreenCheckmark from "../Modules/GreenCheckmark";
import { BiPlus } from "react-icons/bi";
import { v4 as uuidv4 } from "uuid";
import type Question from "./reducer";
import { updateQuiz } from "./reducer";
import * as quizzesClient from "./client";

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

//const handleSave (save all questions)
//const handleSaveAnswers (save added answers to a question)

export default function QuestionsEditor() {
  const { qid, cid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { quizzes } = useSelector((state: any) => state.quizReducer);

  // pull questions array straight from your quiz slice
  const questionsFromStore =
    (useSelector((state: any) =>
      state.quizReducer.quizzes.find((q: any) => q._id === qid)
    )?.questions as Question[]) || [];

  // copy into local state so you can add/edit/remove
  const [questions, setQuestions] = useState<Question[]>(questionsFromStore);

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

  const handleAddQuestion = () => {
    const newQuestion: Question = {
      id: uuidv4(),
      title: "",
      type: "Multiple Choice",
      question: "",
      answers: ["", "", "", ""],
      correctAnswer: "",
      points: 0,
    };
    setQuestions((q) => [...q, newQuestion]);
    setQuiz((q) => ({ ...q, questions: [...q.questions, newQuestion] }));
  };

  const handleSaveQuestions = async () => {
    try {
      const updatedQuiz = await quizzesClient.updateQuiz({
        _id: qid,
        title: quiz.title,
        description: quiz.description,
        quiztype: quiz.quiztype,
        assignmentgroup: quiz.assignmentgroup,
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
        questions: questions, // save the updated questions
      });
      dispatch(updateQuiz(updatedQuiz));
      navigate(`/Kambas/Courses/${cid}/Quizzes`);
    } catch (error) {
      console.error("Error saving quiz:", error);
    }
  };

  const handleUpdateQuestion = async (idx: number) => {
    if (!qid) return;
    const questionToSave = questions[idx];
    try {
      await quizzesClient.updateQuestionInQuiz(
        qid,
        questionToSave.id,
        questionToSave
      );

      const refreshed = await quizzesClient.findQuizById(qid);
      dispatch(updateQuiz(refreshed));

    } catch (err) {
      console.error("Error saving question:", err);
    }
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
          onClick={handleAddQuestion}
          className="btn btn-secondary m-4"
          type="button"
        >
          <BiPlus onClick={handleAddQuestion} /> Add Question
        </button>
      </div>

      <div className="mt-4">
        {questions.map((q, idx) => (
          <div key={q.id} className="p-3 mb-3 border ">
            {/* QUESTION HEADER */}
            <Row>
              {/* title */}
              <Col md={4}>
                <Form.Control
                  type="text"
                  placeholder="Question title"
                  value={q.title}
                  onChange={(e) =>
                    setQuestions((prev) => {
                      const next = [...prev];
                      next[idx] = { ...next[idx], title: e.target.value };
                      return next;
                    })
                  }
                />
              </Col>

              {/* question type selector */}
              <Col md={4}>
                <Form.Select
                  value={q.type}
                  onChange={(e) =>
                    setQuestions((prev) => {
                      const next = [...prev];
                      next[idx] = { ...next[idx], type: e.target.value };
                      return next;
                    })
                  }
                >
                  <option>Multiple Choice</option>
                  <option>True or False</option>
                  <option>Fill in the Blank</option>
                </Form.Select>
              </Col>

              {/* question points */}

              <Col
                md={4}
                className="d-flex align-items-center justify-content-end"
              >
                <Form.Label className="me-2">Pts:</Form.Label>
                <Form.Control
                  type="number"
                  style={{ width: "80px" }}
                  min={0}
                  value={q.points}
                  onChange={(e) =>
                    setQuestions((prev) => {
                      const next = [...prev];
                      next[idx] = {
                        ...next[idx],
                        points: Number(e.target.value),
                      };
                      return next;
                    })
                  }
                />
              </Col>
            </Row>

            <hr />

            <p> Enter your question</p>

            <Row className="mb-2">
              <Col>
                <Form.Group>
                  <Form.Label>Question:</Form.Label>
                  <Form.Control
                    type="text"
                    style={{ height: "100px" }}
                    value={q.question}
                    onChange={(e) =>
                      setQuestions((prev) => {
                        const next = [...prev];
                        next[idx] = { ...next[idx], question: e.target.value };
                        return next;
                      })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-2">
              <Col>
                <Form.Group>
                  <Form.Label>Answers: </Form.Label>
                  {q.answers?.map((answer, aIndex) => (
                    <InputGroup key={aIndex} className="mb-2">
                      <InputGroup.Radio
                        checked={q.correctAnswer === answer}
                        onChange={() =>
                          setQuestions((prev) => {
                            const next = [...prev];
                            next[idx] = { ...next[idx], correctAnswer: answer };
                            return next;
                          })
                        }
                      />
                      <FormControl
                        value={answer}
                        onChange={(e) =>
                          setQuestions((prev) => {
                            const next = [...prev];
                            const answers = [...next[idx].answers];
                            answers[aIndex] = e.target.value;
                            next[idx] = { ...next[idx], answers };
                            return next;
                          })
                        }
                      />
                    </InputGroup>
                  ))}
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="btn p-0 border-0 text-danger"
                style={{ background: "none" }}
                onClick={() =>
                  setQuestions((prev) => {
                    const next = [...prev];
                    next[idx] = {
                      ...next[idx],
                      answers: [...next[idx].answers, ""],
                    };
                    return next;
                  })
                }
              >
                <BiPlus />
                Add Another Answer
              </button>
            </div>

            <div className="d-flex justify-content-start">
              <button
                onClick={() => navigate(`/Kambas/Courses/${cid}/Quizzes`)}
                className="btn btn-secondary me-2"
                type="button"
              >
                Cancel
              </button>
              <button
                onClick={(e) => { void handleUpdateQuestion(idx); }}
                type="button"
                className="btn btn-danger"
              >
                Update Question
              </button>
            </div>
          </div>
        ))}
      </div>

      <hr />

      <div className="d-flex justify-content-start">
        <button
          onClick={() => navigate(`/Kambas/Courses/${cid}/Quizzes`)}
          className="btn btn-secondary me-2"
          type="button"
        >
          Cancel
        </button>
        <button
          onClick={handleSaveQuestions}
          type="button"
          className="btn btn-danger"
        >
          Save
        </button>
      </div>
    </Container>
  );
}
