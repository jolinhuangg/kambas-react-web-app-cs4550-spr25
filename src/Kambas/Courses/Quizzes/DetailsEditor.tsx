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

export default function DetailsEditor() {
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
      navigate(`/Kambas/Courses/${cid}/Quizzes/${qid}`);
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
          style={activeTabStyle}
        >
          Details
        </NavLink>
        <NavLink
          to={`/Kambas/Courses/${cid}/Quizzes/${qid}/edit/questions`}
          style={({ isActive }) => (isActive ? activeTabStyle : tabStyle)}
        >
          Questions
        </NavLink>
      </div>

      {/** Fields */}
      <Form>
        <div className="mb-3 mt-4">
          <InputGroup id="wd-name">
            <FormControl
              value={quiz.title}
              placeholder="Unnamed Quiz" //{quiz.title}
              onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
            />
          </InputGroup>
        </div>

        <Form.Group className="mt-3 mb-3">
          <Form.Label htmlFor="wd-name">Quiz Instructions:</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            id="wd-assignment-description"
            value={quiz.description}
            onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
          />
        </Form.Group>

        <Form.Group as={Row} className="mb-3 align-items-center">
          <Form.Label column sm={3} className="text-end">
            Quiz Type
          </Form.Label>
          <Col sm={4}>
            <Form.Select
              value={quiz.quiztype}
              onChange={(e) =>
                setQuiz((old) => ({
                  ...old,
                  quiztype: e.target.value,
                }))
              }
            >
              {[
                "Graded Quiz",
                "Practice Quiz",
                "Graded Survey",
                "Ungraded Survey",
              ].map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3 align-items-center">
          <Form.Label column sm={3} className="text-end">
            Assignment Group
          </Form.Label>
          <Col sm={4}>
            <Form.Select
              value={quiz.assignmentgroup}
              onChange={(e) =>
                setQuiz((old) => ({
                  ...old,
                  assignmentgroup: e.target.value,
                }))
              }
            >
              {["Quizzes", "Exams", "Assignments", "Projects"].map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3 align-items-center">
          <Form.Label column sm={3} className="text-end">
            Points
          </Form.Label>
          <Col sm={4}>
            <Form.Control
              type="number"
              style={{ width: "70px" }}
              value={quiz.points}
              onChange={(e) =>
                setQuiz({
                  ...quiz,
                  points: parseInt(e.target.value, 10) || 0,
                })
              }
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3 align-items-center">
          <Form.Label column sm={3} className="text-end"></Form.Label>
          <Col sm={6}>
            <Form.Label column sm={2} className="text-end fw-bold">
              Options
            </Form.Label>

            <div id="online-entry-options">
              <Form.Check
                type="checkbox"
                label="Show Correct Answers"
                checked={quiz.shuffle}
                onChange={(e) =>
                  setQuiz({ ...quiz, shuffle: e.target.checked })
                }
              />

              <Form.Check
                type="checkbox"
                label="Shuffle Answers"
                checked={quiz.shuffle}
                onChange={(e) =>
                  setQuiz({ ...quiz, shuffle: e.target.checked })
                }
              />

              <div className="d-flex align-items-center gap-2 mb-2">
                <Form.Check
                  type="checkbox"
                  label="TimeLimit"
                  checked={quiz.timelimit !== -1}
                  onChange={(e) =>
                    setQuiz({
                      ...quiz,
                      timelimit: e.target.checked
                        ? quiz.timelimit === -1
                          ? 20
                          : quiz.timelimit
                        : -1,
                    })
                  }
                />
                {quiz.timelimit !== -1 && (
                  <>
                    <Form.Control
                      type="number"
                      style={{ width: "100px" }}
                      value={quiz.timelimit}
                      onChange={(e) =>
                        setQuiz({
                          ...quiz,
                          timelimit: parseInt(e.target.value, 10) || 0,
                        })
                      }
                    />
                    <span>Minutes</span>
                  </>
                )}
              </div>

              <div className="d-flex align-items-center gap-2 mb-2">
                <Form.Check
                  type="checkbox"
                  label="AccessCode"
                  checked={quiz.accesscode !== ""}
                  onChange={(e) =>
                    setQuiz({
                      ...quiz,
                      accesscode: e.target.checked
                        ? quiz.accesscode === ""
                          ? " "
                          : quiz.accesscode
                        : "",
                    })
                  }
                />
                {quiz.accesscode !== "" && (
                  <>
                    <Form.Control
                      type="text"
                      style={{ width: "150px" }}
                      value={quiz.accesscode}
                      onChange={(e) =>
                        setQuiz({
                          ...quiz,
                          accesscode: e.target.value,
                        })
                      }
                    />
                  </>
                )}
              </div>
            </div>
          </Col>

          <Form.Group as={Row} className="mb-3 align-items-start">
            <Form.Label column sm={3} className="text-end"></Form.Label>
            <Col sm={9}>
              <div className="d-flex align-items-center gap-2 mb-2">
                <Form.Check
                  type="checkbox"
                  label="Allow Multiple Attempts"
                  checked={quiz.multipleattempts}
                  onChange={(e) =>
                    setQuiz({
                      ...quiz,
                      multipleattempts: e.target.checked,
                    })
                  }
                />
                {quiz.multipleattempts && (
                  <>
                    <Form.Control
                      type="number"
                      style={{ width: "60px" }}
                      value={quiz.maxattempts}
                      onChange={(e) =>
                        setQuiz({
                          ...quiz,
                          maxattempts: parseInt(e.target.value, 10) || 0,
                        })
                      }
                    />
                    <span>Attempts</span>
                  </>
                )}
              </div>

              <Form.Check
                type="checkbox"
                checked={quiz.onequestion}
                label="One Question at a Time"
                onChange={(e) =>
                  setQuiz({ ...quiz, onequestion: e.target.checked })
                }
              />

              <Form.Check
                type="checkbox"
                checked={quiz.webcam}
                label="Webcam Required"
                onChange={(e) => setQuiz({ ...quiz, webcam: e.target.checked })}
              />

              <Form.Check
                type="checkbox"
                checked={quiz.lockquestions}
                label="Lock Questions After Answering"
                onChange={(e) =>
                  setQuiz({ ...quiz, lockquestions: e.target.checked })
                }
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3 align-items-start">
            <Form.Label column sm={3} className="text-end">
              Assign
            </Form.Label>
            <Col sm={9}>
              <Form.Group className="mb-3 border p-3 rounded">
                <Form.Label className="fw-bold">Assign to</Form.Label>
                <Form.Select className="mb-3">
                  <option>Everyone</option>
                </Form.Select>
                <Form.Label className="fw-bold">Due</Form.Label>
                <InputGroup>
                  <Form.Control
                    className="mb-3"
                    type="datetime-local"
                    value={quiz.duedate}
                    onChange={(e) =>
                      setQuiz({ ...quiz, duedate: e.target.value })
                    }
                  />
                </InputGroup>
                <Form.Group as={Row} className="mb-3 align-items-center">
                  <Col sm={6}>
                    <Form.Label className="fw-bold">Available from</Form.Label>
                    <Form.Control
                      className="mb-3"
                      type="datetime-local"
                      value={quiz.availabledate}
                      onChange={(e) =>
                        setQuiz({ ...quiz, availabledate: e.target.value })
                      }
                    />
                  </Col>
                  <Col sm={6}>
                    <Form.Label className="fw-bold">Until</Form.Label>
                    <Form.Control
                      className="mb-3"
                      type="datetime-local"
                      value={quiz.untildate}
                      onChange={(e) =>
                        setQuiz({ ...quiz, untildate: e.target.value })
                      }
                    />
                  </Col>
                </Form.Group>
              </Form.Group>
            </Col>
          </Form.Group>
          <hr />

          <div className="d-flex justify-content-end">
            <button
              onClick={() => navigate(`/Kambas/Courses/${cid}/Quizzes/${qid}`)}
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
        </Form.Group>
      </Form>
    </Container>
  );
}
