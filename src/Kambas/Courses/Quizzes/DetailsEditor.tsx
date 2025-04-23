import { Container, Form, FormControl, InputGroup, Row, Col, } from "react-bootstrap";
import { useParams, NavLink } from "react-router";
import { useState } from "react";
import { BiBlock } from "react-icons/bi";

export default function DetailsEditor() {
    const { qid, cid } = useParams();
    const [quiz] = useState<any>(null);

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
        color: "black"
      };


    return (
    <Container className="m-2">
      <div className="mt-4 d-flex justify-content-end align-items-center gap-3">
        <div>  Points {quiz?.points ?? 0} </div>
        <div className="text-secondary d-flex align-items-center gap-1">  <BiBlock size={20}/> Not Published </div>
        
      </div>

      <hr/>

      {/** Details & Questions tabs */}  
      <div style={{ display: "flex", borderBottom: ".5px solid #ccc" }}>
        <NavLink
          to={`/Kambas/Courses/${cid}/Quizzes/${qid}/edit/details`}
          style= {activeTabStyle }
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
              value= "Unnamed Quiz" //{quiz.title}
              /** 
              onChange={(e) =>
                setQuiz({ ...quiz, title: e.target.value })
              } 
              */
            />
          </InputGroup>
        </div>

        
        <Form.Group className="mt-3 mb-3">
        <Form.Label htmlFor="wd-name">Quiz Instructions:</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            id="wd-assignment-description"
            value=""//{quiz.description}
            /**
            onChange={(e) =>
              setQuiz({ ...quiz, description: e.target.value })
            }
            */
          />
        </Form.Group>

        <Form.Group as={Row} className="mb-3 align-items-center">
          <Form.Label column sm={3} className="text-end">
            Quiz Type
          </Form.Label>
          <Col sm={4}>
            <Form.Select>
              <option>Graded Quiz</option>
              <option>Practice Quiz</option>
              <option>Graded Survery</option>
              <option>Ungraded Survery</option>
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3 align-items-center">
          <Form.Label column sm={3} className="text-end">
            Assignment Group
          </Form.Label>
          <Col sm={4}>
            <Form.Select>
              <option>Quizzes</option>
              <option>Exams</option>
              <option>Assignments</option>
              <option>Project</option>
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3 align-items-center">
          <Form.Label column sm={3} className="text-end"></Form.Label>
          <Col sm={4}>
            <Form.Label column sm={3} className="text-end fw-bold">
                Options
            </Form.Label>
            <div id="online-entry-options">
            <Form.Check type="checkbox" label="Shuffle Answers" />

            <div className="d-flex align-items-center gap-2 mb-2">
                <Form.Check type="checkbox" label="TimeLimit" />
                <Form.Control type="number" style={{ width: "50px" }} />
                <span>Minutes</span>
            </div>
            </div>
          </Col>

          <Form.Group as={Row} className="mb-3 align-items-start">
          <Form.Label column sm={3} className="text-end"></Form.Label>
          <Col sm={9}>
            <Form.Group className="border p-2 rounded">
            <Form.Check type="checkbox" label="Allow Multiple Attemps" />

            </Form.Group>
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
                  value=""
                />
              </InputGroup>
              <Form.Group as={Row} className="mb-3 align-items-center">
                <Col sm={6}>
                  <Form.Label className="fw-bold">Available from</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="datetime-local"
                      value=""
                    />
                  </InputGroup>
                </Col>
                <Col sm={6}>
                  <Form.Label className="fw-bold">Until</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="datetime-local"
                      value=""
                    />
                  </InputGroup>
                </Col>
              </Form.Group>
            </Form.Group>
          </Col>
        </Form.Group>
        <hr />

        <div className="d-flex justify-content-end">
          <button className="btn btn-secondary me-2" type="button">
            Cancel
          </button>
          <button type="button" className="btn btn-danger">
            Save
          </button>
        </div>
      

          
        </Form.Group>
      </Form>
   

    </Container>
    );
  }
  