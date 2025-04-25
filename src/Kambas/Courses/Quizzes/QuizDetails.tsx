import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import * as quizzesClient from "./client";
import { useEffect, useState } from "react";
import { FaPencil } from "react-icons/fa6";

//http://localhost:5174/#/Kambas/Courses/RS101/Quizzes/Q101

export default function QuizDetails() {
  const { qid, cid } = useParams();
  const [quiz, setQuiz] = useState<any>(null);
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchQuiz = async () => {
      if (qid) {
        try {
          const data = await quizzesClient.findQuizById(qid);
          setQuiz(data);
        } catch (err) {
          console.error("Error loading quiz:", err);
        }
      }
    };
    fetchQuiz();
  }, [qid]);

  if (!quiz) {
    return (
      <Container className="mt-4">
        <p>Loading quiz…</p>
      </Container>
    );
  }

  const quizFields = [
    { label: "Quiz Type", value: quiz.quiztype },
    { label: "Points", value: quiz.points },
    { label: "Assignment Group", value: quiz.assignmentgroup },
    { label: "Shuffle Answers", value: quiz.shuffle ? "Yes" : "No" },
    { label: "Time Limit", value: quiz.timelimit + " Minutes" },
    { label: "Multiple Attempts", value: quiz.multipleattempts ? "Yes" : "No" },
    { label: "How Many Attempts", value: quiz.maxattempts },
    {
      label: "Show Correct Answers",
      value: quiz.showcorrectanswers ? "Yes" : "No",
    }, //need to edit this to be when is correct answer shown
    { label: "One Question at a Time", value: quiz.onequestion ? "Yes" : "No" },
    { label: "Webcam Required", value: quiz.webcam ? "Yes" : "No" },
    {
      label: "Lock Questions After Answering",
      value: quiz.lockquestions ? "Yes" : "No",
    },
  ];

  return (
    <Container className="mt-4">
      <div className="container d-flex justify-content-center gap-2">
        {/** Preview Button -> Quiz Preview Screen */}
        <button className="btn btn-light btn-outline-secondary">Preview</button>

        {/** Edit Button -> Quiz Editor Screen */}
        <button
          className="btn btn-light btn-outline-secondary"
          onClick={() => navigate(`/Kambas/Courses/${cid}/Quizzes/${qid}/edit`)}
        >
          {" "}
          <FaPencil /> Edit
        </button>
      </div>

      {/** Quiz Properties */}
      <div className="py-3 px-4 mt-2" style={{ border: "2px dotted gray" }}>
        <h2 className="mb-4">Quiz Name</h2>
        <div className="d-flex flex-column gap-1 mb-4">
          {quizFields.map((field, index) => (
            <Row key={index}>
              <Col xs={4} className="text-end fw-bold">
                {field.label}
              </Col>
              <Col xs={7} className="text-start">
                {field.value}
              </Col>
            </Row>
          ))}
        </div>

        <div>
          <table className="table text-start">
            <thead>
              <tr>
                <th style={{ width: "25%" }}>Due</th>
                <th style={{ width: "25%" }}>For</th>
                <th style={{ width: "25%" }}>Available From</th>
                <th style={{ width: "25%" }}>Until</th>
              </tr>
              <tr>
                <td>
                  {formatDateNative(quiz.duedate.split("T")[0])} at{" "}
                  {convert24to12(quiz.duedate.split("T")[1] || "00:00")}
                </td>
                <td>Everyone</td>
                <td>
                  {formatDateNative(quiz.availabledate.split("T")[0])} at{" "}
                  {convert24to12(quiz.availabledate.split("T")[1] || "00:00")}
                </td>
                <td>
                  {formatDateNative(quiz.untildate.split("T")[0])} at{" "}
                  {convert24to12(quiz.untildate.split("T")[1] || "00:00")}
                </td>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </Container>
  );
}
