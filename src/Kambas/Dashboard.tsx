import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Card, FormControl } from "react-bootstrap";
import { useState } from "react";
import EnrollmentOptions from "./DashboardTools/EnrollmentOptions";
import * as db from "./Database";
export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (course: any) => void;
  updateCourse: () => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";
  const [enrollment, setEnrollment] = useState(false);

  const visibleCourses = enrollment
    ? courses
    : courses.filter((course) =>
        db.enrollments.some(
          (enr) => enr.course === course._id && enr.user === currentUser._id
        )
      );
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      {isFaculty && (
        <div>
          <h5>
            New Course
            <Button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={addNewCourse}
            >
              {" "}
              Add{" "}
            </Button>
            <Button
              className="btn btn-warning float-end me-2"
              onClick={updateCourse}
              id="wd-update-course-click"
            >
              Update
            </Button>
            <br />
            <FormControl
              value={course.name}
              className="mb-2"
              onChange={(e) => setCourse({ ...course, name: e.target.value })}
            />
            <FormControl
              as="textarea"
              value={course.description}
              rows={3}
              onChange={(e) =>
                setCourse({ ...course, description: e.target.value })
              }
            />
          </h5>
          <hr />
        </div>
      )}
      {!isFaculty && (
        <h5>
          <Button
            className="btn btn-primary float-end"
            id="wd-add-new-course-click"
            onClick={() => setEnrollment(!enrollment)}
          >
            {" "}
            Enrollment{" "}
          </Button>
        </h5>
      )}
      <h2 id="wd-dashboard-published">
        Published Courses ({visibleCourses.length})
      </h2>{" "}
      <hr />
      {!enrollment && (
        <div className="row" id="wd-dashboard-courses">
          <div className="row row-cols-1 row-cols-md-5 g-4">
            {visibleCourses.map((course) => (
              <div key={course._id} className="col" style={{ width: "300px" }}>
                <Card>
                  <Link
                    to={`/Kambas/Courses/${course._id}/Home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <Card.Img
                      src="/images/reactjs.jpg"
                      variant="top"
                      width="100%"
                      height={160}
                    />
                    <Card.Body className="card-body">
                      <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {course.name}{" "}
                      </Card.Title>
                      <Card.Text
                        className="wd-dashboard-course-description overflow-hidden"
                        style={{ height: "100px" }}
                      >
                        {course.description}{" "}
                      </Card.Text>
                      <Button variant="primary"> Go </Button>

                      {isFaculty && (
                        <>
                          <Button
                            onClick={(event) => {
                              event.preventDefault();
                              deleteCourse(course._id);
                            }}
                            className="btn btn-danger float-end"
                            id="wd-delete-course-click"
                          >
                            Delete
                          </Button>

                          <Button
                            id="wd-edit-course-click"
                            onClick={(event) => {
                              event.preventDefault();
                              setCourse(course);
                            }}
                            className="btn btn-warning me-2 float-end"
                          >
                            Edit
                          </Button>

                          <hr />
                        </>
                      )}
                    </Card.Body>
                  </Link>
                </Card>
              </div>
            ))}
          </div>
        </div>
      )}
      {enrollment && <EnrollmentOptions />}
    </div>
  );
}
