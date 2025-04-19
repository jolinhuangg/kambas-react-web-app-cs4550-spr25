import { v4 as uuidv4 } from "uuid";
import { createSlice } from "@reduxjs/toolkit";

interface Quiz {
  _id: String;
  title: { type: String; default: "New Quiz" };
  course: String;
  availability: String;
  duedate: String;
  points: Number;
  questioncount: Number;
  taken: { type: Boolean; default: false };
  score: { type: Number; default: 0 };
  published: { type: Boolean; default: false };
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
    setQuizzes: (state: QuizState, action) => {
      state.quizzes = action.payload as Quiz[];
    },
    addQuiz: (state: QuizState, { payload: quiz }) => {
      const newQuiz = {
        _id: uuidv4(),
        title: quiz.title,
        course: quiz.course,
        availability: quiz.availability,
        duedate: quiz.duedate,
        points: quiz.points,
        questioncount: quiz.questioncount,
        taken: quiz.taken,
        score: quiz.score,
        published: quiz.published,
      } as Quiz;
      state.quizzes = [...state.quizzes, newQuiz];
    },
    deleteQuiz: (state: QuizState, { payload: quizId }) => {
      state.quizzes = state.quizzes.filter(
        (q) => q._id !== quizId
      );
    },
    updateQuiz: (state: QuizState, { payload: quiz }) => {
      state.quizzes = state.quizzes.map((q) =>
        q._id === quiz._id ? quiz : q
      );
    },
  },
});

export const {
  setQuizzes,
  addQuiz,
  deleteQuiz,
  updateQuiz,
} = quizSlice.actions;
export default quizSlice.reducer;
