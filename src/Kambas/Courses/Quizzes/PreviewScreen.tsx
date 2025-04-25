import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Container, Form, Button } from "react-bootstrap";
import { FaPencil } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { BsQuestionCircle } from "react-icons/bs";
import * as quizzesClient from "./client";

interface Question {
  id: string;
  question: string;
  answers: string[];
  correctAnswer: string;
  points: number;
}

interface Quiz {
  _id: string;
  title: string;
  onequestion: boolean;
  points: number;
  questions: Question[];
}

interface RootState {
  accountReducer: {
    currentUser?: {
      role?: string;
    };
  };
}

export default function QuizPreview() {
  const navigate = useNavigate();
  const { cid, qid } = useParams<{ cid?: string; qid?: string }>();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";

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

  const handleAnswer = (qid: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [qid]: answer }));
  };

  const handleSubmit = () => {
    let calculatedScore = 0;
    quiz?.questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        calculatedScore += q.points;
      }
    });
    setScore(calculatedScore);
    setSubmitted(true);
  };

  if (!quiz) {
    return (
      <Container className="mt-4">
        <p>Loading quiz…</p>
      </Container>
    );
  }

  if (!quiz.questions || quiz.questions.length === 0) {
    return (
      <Container className="mt-4">
        <p>No questions available for this quiz.</p>
      </Container>
    );
  }

  const QuestionBox = ({ q, index }: { q: Question; index: number }) => (
    <div className="border border-dark" id={`question-${index}`}>
      
      <div className="p-3 bg-secondary border-bottom border-dark">
      <div className="d-flex justify-content-between">
        <h5>Question {index + 1}</h5>
        <div>{q.points ?? 0} pts</div>
      </div>
      </div>

      <div className="p-3 mb-4"> 
      <div className="pb-2">{q.question}</div>

      <Form>
        {q.answers.map((a, aIndex) => (
          <div className="border-top pt-2 mt-2 " key={aIndex}>
           
            <Form.Check
              type="radio"
              id={`${q.id}-${aIndex}`}
              name={`question-${q.id}`}
              label={a}
              value={a}
              checked={answers[q.id] === a}
              onChange={() => handleAnswer(q.id, a)}
              disabled={submitted}
            />
          </div>
        ))}
      </Form>

      {submitted && (
        <div className="mt-2 text-secondary">
          {answers[q.id] === q.correctAnswer ? (
            <span className="text-success">Correct</span>
          ) : (
            <span className="text-danger">Incorrect</span>
          )}
        </div>
      )}
      </div> 
    </div>
  );

  const renderQuestions = () => {
    if (quiz.onequestion) {
      return <QuestionBox q={quiz.questions[currentQuestion]} index={currentQuestion} />;
    } else {
      return quiz.questions.map((q, i) => <QuestionBox q={q} index={i} key={q.id} />);
    }
  };

  return (
    <Container className="mt-4">
      {isFaculty && (
        <div className="d-flex justify-content-end mb-4">
          <button
            className="btn btn-light btn-outline-secondary"
            onClick={() => navigate(`/Kambas/Courses/${cid}/Quizzes/${qid}/edit`)}
          >
            <FaPencil /> Edit
          </button>
        </div>
      )}

      <div className="text-muted">Started: {new Date().toLocaleString()}</div>
      <h3>{quiz.title}</h3>
      <hr />

      {renderQuestions()}

      {quiz.onequestion && !submitted && (
        <div className="d-flex justify-content-between mt-3">
          <Button
            variant="secondary"
            disabled={currentQuestion === 0}
            onClick={() => setCurrentQuestion((prev) => prev - 1)}
          >
            {"<"} Back
          </Button>

          <Button
            variant="secondary"
            disabled={currentQuestion === quiz.questions.length - 1}
            onClick={() => setCurrentQuestion((prev) => prev + 1)}
          >
            Next {">"}
          </Button>
        </div>
      )}

      <div className="d-flex justify-content-end mt-4 border p-2">
        <Button variant="secondary" onClick={handleSubmit} disabled={submitted}>
          Submit Quiz
        </Button>
      </div>

      {submitted && (
        <div className="mt-4">
          <h5>Your Score: {score} / {quiz.points}</h5>
        </div>
      )}

      {!quiz.onequestion && (
        <div className="mt-4">
          <h6 className="mt-3">Questions</h6>
          <div className="d-flex flex-column gap-1">
            {quiz.questions.map((q, i) => (
              <a key={q.id} href={`#question-${i}`} className="text-danger">
                Question {i + 1}
              </a>
            ))}
          </div>
        </div>
      )}

      {quiz.onequestion && (
        <div className="mt-5">
          <h5>Questions</h5>
          <div className="d-flex flex-column gap-1">
            {quiz.questions.map((q, i) => (
              <Button
                key={q.id}
                variant="link"
                className="text-danger text-start p-0"
                onClick={() => setCurrentQuestion(i)}
              >
                <BsQuestionCircle color="black" className="m-1" />
                Question {i + 1}
              </Button>
            ))}
          </div>
        </div>
      )}
    </Container>
  );
}