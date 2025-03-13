import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../Database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  assignments: assignments,
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, { payload }) => {
      const newAssignment: any = {
        _id: uuidv4(),
        title: payload.title,
        course: payload.course,
        available: payload.available,
        availableuntil: payload.availableuntil,
        duedate: payload.duedate,
        points: payload.points,
        description: payload.description,
      };
      state.assignments = [...state.assignments, newAssignment];
    },
    deleteAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.filter(
        (a: any) => a._id !== assignmentId
      );
    },
    updateAssignment: (state, { payload }) => {
        state.assignments = state.assignments.map((a) =>
            a._id === payload._id ? { ...a, ...payload } : a
        );
    },
  },
});

export const { addAssignment, deleteAssignment, updateAssignment } =
  assignmentsSlice.actions;
export default assignmentsSlice.reducer;
