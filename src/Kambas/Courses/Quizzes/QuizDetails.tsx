import { useParams } from "react-router-dom";
import { Container, Row, Col, Table } from "react-bootstrap";
import * as quizzesClient from "./client";
import { useEffect, useState } from "react";
import { FaPencil } from "react-icons/fa6";

//http://localhost:5174/#/Kambas/Courses/RS101/Quizzes/Q101

export default function QuizDetails() {
  const { qid } = useParams();
  const [quiz, setQuiz] = useState<any>(null);

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

  const quizFields = [
    { label: "Quiz Type", value: "Graded Quiz" },
    { label: "Points", value: "" },
    { label: "Assignment Group", value: "QUIZZES"},
    { label: "Shuffle Answers", value: "Yes" },
    { label: "Time Limit", value: "20 Minutes" },
    { label: "Multiple Attempts", value: "No" },
    //label: "How Many Attempts", value: "1" },
    { label: "Show Correct Answers", value: "fill"},
    { label: "Access Code", value: "" },
    { label: "One Question at a Time", value: "Yes"},
    { label: "Webcam Required", value: "No"},
    { label: "Lock Questions After Answering", value: "fill"},
  ];

  

  return (
    <Container className="mt-4">

      
      <div className="container d-flex justify-content-center gap-2">
            {/** Preview Button -> Quiz Preview Screen */}
            <button className="btn btn-light btn-outline-secondary">Preview</button>
            
            {/** Edit Button -> Quiz Editor Screen */}
            <button className="btn btn-light btn-outline-secondary"> <FaPencil/> Edit</button>
      </div>
   
      {/** Quiz Properties */}
      <div className="py-3 px-4 mt-2" style={{border: "2px dotted gray"}}> 
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
                    <td>Due</td>
                    <td>For</td>
                    <td>Available From</td>
                    <td>Until</td>
                </tr>
            </thead>
        </table>
      </div>
    </div>
    </Container>
  );
}