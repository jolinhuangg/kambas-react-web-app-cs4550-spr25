import { v4 as uuidv4 } from "uuid";
import { createSlice } from "@reduxjs/toolkit";

interface Question {
  id: string;
  question: string;
  answers: string[];        // or a richer type if you like
  correctAnswer: string;
}

interface Quiz {
  _id: String,
        title: { type: String, default: "New Quiz" };
        description : String;
        course: String;
        quiztype: {type: String, default: "Graded Quiz"}; 
        assignmentgroup: {type: String, default: "Quizzes"}; //change to enum
        shuffle: {type: Boolean, default: true};
        timelimit: {type: Number, default: 20};
        multipleattempts: {type: Boolean, default: false};
        maxattempts: {type: Number, default: 1};
        showcorrectanswers: {type: Boolean, default: false};
        accesscode: {type: String, default: ""};
        onequestion: {type: Boolean, default: true};
        webcam: {type: Boolean, default: false};
        lockquestions: {type: Boolean, default: false};
        duedate: String;
        points: Number;
        taken: {type: Boolean, default: false};
        score: {type: Number, default: 0};
        published: {type: Boolean, default: false};
        availabledate: {type: String, required: false};
        untildate: {type: String, required: false};
        questions: {type: Question[], default: []};
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
