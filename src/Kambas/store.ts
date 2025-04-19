import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentReducer from "./Courses/Assignments/reducer";
import quizReducer from "./Courses/Quizzes/reducer";
const store = configureStore({
  reducer: {
    modulesReducer,
    accountReducer,
    assignmentReducer,
    quizReducer,
  },
});
export default store;

