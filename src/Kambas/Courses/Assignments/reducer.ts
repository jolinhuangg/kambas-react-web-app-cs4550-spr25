
import { v4 as uuidv4 } from "uuid";
import { createSlice } from "@reduxjs/toolkit";

interface Assignment {
    _id: string;
    title: string;
    course: string;
    description: string;
    points: number;
    due: string;
    available: string;
    end: string;
}

interface AssignmentState {
    assignments: Assignment[];
}

const initialState: AssignmentState = {
    assignments: [],
};

const assignmentsSlice = createSlice({
    name: "assignments",
    initialState,
    reducers: {
        setAssignments: (state: AssignmentState, action) => {
            state.assignments = action.payload as Assignment[];
        },
        addAssignment: (state: AssignmentState, { payload: assignment }) => {
            const newAssignment = {
                _id: new uuidv4(),
                title: assignment.name,
                course: assignment.course,
                description: assignment.description,
                points: assignment.points,
                due: assignment.dueDate,
                available: assignment.startDate,
                end: assignment.endDate,
            } as Assignment;
            state.assignments = [...state.assignments, newAssignment];
        },
        deleteAssignment: (state: AssignmentState, { payload: assignmentId }) => {
            state.assignments = state.assignments.filter(
                (a) => a._id !== assignmentId
            );
        },
        updateAssignment: (state: AssignmentState, { payload: assignment }) => {
            state.assignments = state.assignments.map((a) =>
                a._id === assignment._id ? assignment : a
            );
        },
    },
});

export const { setAssignments, addAssignment, deleteAssignment, updateAssignment } =
    assignmentsSlice.actions;
export default assignmentsSlice.reducer;