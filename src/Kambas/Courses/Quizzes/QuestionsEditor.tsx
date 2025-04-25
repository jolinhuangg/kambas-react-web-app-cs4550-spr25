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

  type Question = {
    id: string;
    question: string;
    answers: string[];
    correctAnswer: string;
  };

  //const handleSave (save all questions)
  //const handleSaveAnswers (save added answers to a question)

  export default function QuestionsEditor() {
    const { qid, cid } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { quizzes } = useSelector((state: any) => state.quizReducer);
  
    // If editing an existing assignment, pre-populate local state
  // If editing an existing assignment, pre-populate local state
  const existingQuiz =
    qid !== "new" ? quizzes.find((q: any) => q._id === qid) : null;

    const [quiz, setQuiz] = useState<{
        _id: string;
        title: string;
        description: string;
        quiztype: string;
        assignmentgroup: string;
        shuffle: boolean;
        timelimit: number;
        multipleattempts: boolean;
        maxattempts: number;
        showcorrectanswers: boolean;
        accesscode: string;
        onequestion: boolean;
        webcam: boolean;
        lockquestions: boolean;
        duedate: string;
        points: number;
        taken: boolean;
        score: number;
        published: boolean;
        availabledate: string;
        untildate: string;
        questions: Question[];
      }>({
        _id: "",
        title: existingQuiz?.title || "",
        description: existingQuiz?.description || "",
        quiztype: existingQuiz?.quiztype || "Graded Quiz",
        assignmentgroup: existingQuiz?.assignmentgroup || "Quizzes",
        shuffle: existingQuiz?.shuffle ?? true,
        timelimit: existingQuiz?.timelimit ?? 20,
        multipleattempts: existingQuiz?.multipleattempts ?? false,
        maxattempts: existingQuiz?.maxattempts ?? 1,
        showcorrectanswers: existingQuiz?.showcorrectanswers ?? false,
        accesscode: existingQuiz?.accesscode || "",
        onequestion: existingQuiz?.onequestion ?? true,
        webcam: existingQuiz?.webcam ?? false,
        lockquestions: existingQuiz?.lockquestions ?? false,
        duedate: existingQuiz?.duedate || "",
        points: existingQuiz?.points ?? 100,
        taken: existingQuiz?.taken ?? false,
        score: existingQuiz?.score ?? 0,
        published: existingQuiz?.published ?? false,
        availabledate: existingQuiz?.availabledate || "",
        untildate: existingQuiz?.untildate || "",
        questions: existingQuiz?.questions || [],
      });
  
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

        <div className="mt-4">

            
  {quiz.questions.map((q) => (
    <div
      key={q.id}
      className="p-3 mb-3 border "
    >

{/* QUESTION HEADER */}
<Row>
  {/* title */}
  <Col md={4}>
    <Form.Control
      type="text"
      placeholder="Question title"
      value="easy question" //question.title
      //onCHange
    />
  </Col>

  {/* question type selector */}
  <Col md={4}>
    <Form.Select
      value="Multiple Choice" //question.type
      //onChange
    >
      <option>Multiple Choice</option>
      <option>True/False</option>
      <option>Fill in the Blank</option>
    </Form.Select>
  </Col>

  {/* question points */}

  <Col md={4} className="d-flex align-items-center justify-content-end">
    <Form.Label className="me-2">Pts:</Form.Label>
    <Form.Control
      type="number"
      style={{ width: "80px" }}
      min={0}
      value="3" //question.points
      //onChange
    />
  </Col>
</Row>

<hr/>

<p> Enter your question</p> 

      <Row className="mb-2">
        <Col>
          <Form.Group>
            <Form.Label>Question:</Form.Label>
            <Form.Control
              type="text"
              style={{ height: "100px" }}
              value={q.question}
              //onChange
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
                  checked={q.correctAnswer === String(aIndex)}
                  //onChange
                />
                <FormControl
                  value={answer}
                  //onChange
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
            //onClick (add a question)
        >
            <BiPlus/>
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
                //onClick={handleSaveAnswers}
                type="button"
                className="btn btn-danger"
              >
                Update Question
              </button>
        </div>

    </div>
  ))}
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
                //onClick={handleSave}
                type="button"
                className="btn btn-danger"
              >
                Save
              </button>
            </div>

      </Container>
    );
  }
  