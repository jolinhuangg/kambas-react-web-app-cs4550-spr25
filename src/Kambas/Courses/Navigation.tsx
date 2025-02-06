import { NavLink } from "react-router-dom";

export default function CourseNavigation() {
  return (
    <div id="wd-courses-navigation">
      <NavLink to="/Kambas/Courses/1234/Home" id="wd-course-home-link">Home</NavLink><br/>
      <NavLink to="/Kambas/Courses/1234/Modules" id="wd-course-modules-link">Modules
        </NavLink><br/>
      <NavLink to="/Kambas/Courses/1234/Piazza" id="wd-course-piazza-link">Piazza</NavLink><br/>
      <NavLink to="/Kambas/Courses/1234/Zoom" id="wd-course-zoom-link">Zoom</NavLink><br/>
      <NavLink to="/Kambas/Courses/1234/Assignments" id="wd-course-quizzes-link">
          Assignments</NavLink><br/>
      <NavLink to="/Kambas/Courses/1234/Quizzes" id="wd-course-assignments-link">Quizzes
        </NavLink><br/>
      <NavLink to="/Kambas/Courses/1234/Grades" id="wd-course-grades-link">Grades</NavLink><br/>
      <NavLink to="/Kambas/Courses/1234/People" id="wd-course-people-link">People</NavLink><br/>
    </div>
  );
}