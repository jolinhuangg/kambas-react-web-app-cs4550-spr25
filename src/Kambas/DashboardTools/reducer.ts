import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "../Database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  enrollments: enrollments || [],
};

const enrollmentSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    createEnrollment: (state, { payload: enrollment }) => {
      const newEnrollment: any = {
        _id: uuidv4(),
        user: enrollment.user,
        course: enrollment.course,
      };
      state.enrollments = [...state.enrollments, newEnrollment];
    },
    deleteEnrollment: (state, action) => {
      state.enrollments = state.enrollments.filter(
        (enrollment) => enrollment._id !== action.payload
      );
    },
  },
});

export const { createEnrollment, deleteEnrollment } = enrollmentSlice.actions;
export default enrollmentSlice.reducer;