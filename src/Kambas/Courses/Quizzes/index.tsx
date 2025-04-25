import {
  ListGroup,
  Container,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import { IoMdArrowDropdown } from "react-icons/io";
import { RxRocket } from "react-icons/rx";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaSearch } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setQuizzes } from "./reducer";
import * as quizzesClient from "./client";
import QuizControls from "./QuizControls";

export default function Quizzes() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const { quizzes } = useSelector((state: any) => state.quizReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";
  const navigate = useNavigate();

  const [deleteQuizId, setDeleteQuizId] = useState<string | null>(null);

  function formatDateNative(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
  }

  function convert24to12(timeStr: string) {
    if (!timeStr) return "";
    const [hourStr, minuteStr] = timeStr.split(":");
    let hour = parseInt(hourStr, 10);
    const minute = minuteStr;
    const period = hour >= 12 ? "PM" : "AM";
    hour = hour % 12;
    if (hour === 0) {
      hour = 12;
    }
    return `${hour}:${minute}${period}`;
  }

  // Fetch assignments from the server when cid changes
  useEffect(() => {
    const fetchQuizzes = async () => {
      if (cid) {
        try {
          let fetched;
          if (isFaculty) {
            fetched = await quizzesClient.findQuizzesForCourse(cid);
          } else {
            fetched = await quizzesClient.findPublishedQuizzesForCourse(cid);
          }
          dispatch(setQuizzes(fetched));
        } catch (error) {
          console.error("Error fetching quizzes:", error);
        }
      }
    };
    fetchQuizzes();
  }, [cid, dispatch, currentUser]);

  const handleDeleteQuiz = async (quizId: string) => {
    try {
      await quizzesClient.deleteQuiz(quizId);
      if (cid) {
        const updated = await await quizzesClient.findQuizzesForCourse(cid);
        dispatch(setQuizzes(updated));
      }
      setDeleteQuizId(null);
    } catch (error) {
      console.error("Error deleting quiz:", error);
    }
  };

  const handlePublishQuiz = async (quizId: string) => {
    try {
      await quizzesClient.publishQuiz(quizId);
      if (cid) {
        const updated = await quizzesClient.findQuizzesForCourse(cid);
        dispatch(setQuizzes(updated));
      }
    } catch (error) {
      console.error("Error publishing quiz:", error);
    }
  };

  return (
    <Container className="ms-3" id="wd-quizzes">
      <div className="d-flex justify-content-between mb-4">
        <InputGroup id="wd-search-assignment">
          <InputGroup.Text>
            <FaSearch />
          </InputGroup.Text>
          <FormControl placeholder="Search for Quiz" />
        </InputGroup>

        {isFaculty && (
          <div>
            <Button
              variant="danger"
              id="wd-add-quiz"
              onClick={() =>
                navigate(`/Kambas/Courses/${cid}/quizzes/new/edit`)
              }
            >
              + Quiz
            </Button>
          </div>
        )}
      </div>

      <ListGroup className="rounded-0" id="wd-quizzes">
        <ListGroup.Item className="wd-quizzes p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <IoMdArrowDropdown className="me-2 fs-3" />
            Assignment Quizzes
            {/*
            {isFaculty && <quizzeControlButton />}
            */}
          </div>

          <ul id="wd-quizzes" className="list-group rounded-0">
            {quizzes.map((quiz: any) => (
              <li
                key={quiz._id}
                className="wd-quiz list-group-item p-2 border-gray"
              >
                <div className="d-flex align-items-center">
                  <div
                    className="p-auto"
                    style={{ color: "green", paddingLeft: "10px" }}
                  >
                    <RxRocket />
                  </div>
                  <div className="ms-4 flex-grow-1">
                    <a
                      href={`#/Kambas/Courses/${quiz.course}/quizzes/${quiz._id}/`}
                      className="wd-quiz-link"
                      style={{
                        color: "black",
                        textDecoration: "none",
                        cursor: "pointer",
                        fontWeight: 500,
                      }}
                    >
                      {quiz.title}
                    </a>
                    <div className="small">
                      <span className="text-muted fs-6">
                        {(() => {
                          const currentDate = new Date();
                          const availableDate = new Date(quiz.availabledate);
                          const untilDate = new Date(quiz.untildate);
                          if (currentDate < availableDate)
                            return (
                              <>
                                Not available until{" "}
                                {formatDateNative(
                                  quiz.availabledate.split("T")[0]
                                )}{" "}
                                at{" "}
                                {convert24to12(
                                  quiz.availabledate.split("T")[1] || "00:00"
                                )}
                              </>
                            );
                          if (currentDate > untilDate) return <>Closed</>;
                          return (
                            <>
                              Available until{" "}
                              {formatDateNative(quiz.untildate.split("T")[0])}{" "}
                              at{" "}
                              {convert24to12(
                                quiz.untildate.split("T")[1] || "00:00"
                              )}
                            </>
                          );
                        })()}
                      </span>
                      <span className="text-muted"> | </span>
                      <span className="text-muted fw-bold fs-6"> Due </span>
                      <span className="text-muted fs-6">
                        {formatDateNative(quiz.duedate.split("T")[0])} at{" "}
                        {convert24to12(quiz.duedate.split("T")[1] || "00:00")}
                      </span>
                      <span className="text-muted"> | </span>
                      <span className="text-muted fs-6">
                        {quiz.points} points
                      </span>
                      <span className="text-muted"> | </span>
                      <span className="text-muted fs-6">
                        <span className="text-muted fs-6">
                          {quiz.questions?.length ?? 0}{" "}
                          {(quiz.questions?.length ?? 0) === 1
                            ? "Question"
                            : "Questions"}
                        </span>
                      </span>
                    </div>
                  </div>
                  {isFaculty && (
                    <QuizControls
                      onDelete={() => handleDeleteQuiz(quiz._id)}
                      onPublish={() => handlePublishQuiz(quiz._id)}
                      published={quiz.published}
                      qid={quiz._id}
                    />
                  )}
                </div>
              </li>
            ))}
          </ul>
        </ListGroup.Item>
      </ListGroup>
    </Container>
  );
}
