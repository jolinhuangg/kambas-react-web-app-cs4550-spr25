import { v4 as uuidv4 } from "uuid";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Question {
  id: { type: String; required: true };
  title: { type: String; required: true };
  question: { type: String; required: true };
  answers: { type: [{ type: String }], default: [] };
  correctAnswer: { type: String; required: true };
  points: { type: Number; default: 1 };
  type: { type: String; default: "Multiple Choice" };
}

interface Quiz {
  _id: String;
  title: { type: String; default: "New Quiz" };
  description: String;
  course: String;
  quiztype: { type: String; default: "Graded Quiz" };
  assignmentgroup: { type: String; default: "Quizzes" }; //change to enum
  shuffle: { type: Boolean; default: true };
  timelimit: { type: Number; default: 20 };
  multipleattempts: { type: Boolean; default: false };
  maxattempts: { type: Number; default: 1 };
  showcorrectanswers: { type: Boolean; default: false };
  accesscode: { type: String; default: "" };
  onequestion: { type: Boolean; default: true };
  webcam: { type: Boolean; default: false };
  lockquestions: { type: Boolean; default: false };
  duedate: String;
  points: Number;
  taken: { type: Boolean; default: false };
  score: { type: Number; default: 0 };
  published: { type: Boolean; default: false };
  availabledate: { type: String; required: false };
  untildate: { type: String; required: false };
  questions: { type: Question[]; default: [] };
}

interface QuizState {
  quizzes: Quiz[];
}

const initialState: QuizState = {
  quizzes: [],
};

const quizSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state: QuizState, action: PayloadAction<Quiz[]>) => {
      state.quizzes = action.payload;
    },
    addQuiz: (state: QuizState, { payload: quiz }: PayloadAction<Quiz>) => {
      const newQuiz = {
        _id: uuidv4(),
        title: quiz.title,
        description: quiz.description,
        course: quiz.course,
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
        questions: quiz.questions,
      } as Quiz;
      state.quizzes = [...state.quizzes, newQuiz];
    },
    deleteQuiz: (state: QuizState, { payload: quizId }: PayloadAction<string>) => {
      state.quizzes = state.quizzes.filter((q) => q._id !== quizId);
    },
    updateQuiz: (state: QuizState, { payload: quiz }: PayloadAction<Quiz>) => {
      state.quizzes = state.quizzes.map((q) => (q._id === quiz._id ? quiz : q));
    },
  },
});

export const { setQuizzes, addQuiz, deleteQuiz, updateQuiz } =
  quizSlice.actions;
export default quizSlice.reducer;
