
import * as db from "../Database";
import { useSelector, useDispatch } from "react-redux";
import { createEnrollment, deleteEnrollment } from "./reducer";
import { useEffect, useState } from "react";

export default function EnrollmentsOptions({
  addNewCourse,
  deleteCourse,
}: {
  addNewCourse: () => void;
  deleteCourse: (course: any) => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();
  const courses = db.courses;
  const enrollments = db.enrollments;

  function checkEnrolled(c: any): boolean {
    return enrollments.some(
      (enrollment) =>
        enrollment.course === c._id && enrollment.user === currentUser._id
    );
  }
  const [enrolled, setEnrolled] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const status = courses.reduce((acc, course) => {
      acc[course._id] = checkEnrolled(course);
      return acc;
    }, {} as { [key: string]: boolean });
    setEnrolled(status);
  }, [courses, enrollments]);

  function getEId(c: any): number {
    enrollments.filter((e) => e.user === currentUser._id && e.course === c._id);
    const id = enrollments[0]._id;
    return parseInt(id);
  }

  return (
    <div id="wd-enrollment">
      <div id="wd-enrollment-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses.map((course) => (
            <div
              className="wd-enrollment-course col"
              style={{ width: "300px" }}
            >
              <div className="card rounded-3 overflow-hidden">
                <img src="/images/reactjs.jpg" width="100%" height={160} />
                <div className="card-body">
                  <h5 className="wd-enrollment-course-title card-title">
                    {course.name}{" "}
                  </h5>
                  <p
                    className="wd-enrollment-course-title card-text overflow-y-hidden"
                    style={{ maxHeight: 100 }}
                  >
                    {course.description}{" "}
                  </p>

                  {enrolled[course._id] && (
                    <button
                      onClick={() => {
                        dispatch(deleteEnrollment(getEId(course)));
                        setEnrolled((prev) => ({
                          ...prev,
                          [course._id]: false,
                        }));
                      }}
                      className="btn btn-danger"
                    >
                      {" "}
                      Unenroll{" "}
                    </button>
                  )}
                  {!enrolled[course._id] && (
                    <button
                      onClick={() => {
                        dispatch(
                          createEnrollment({
                            user: currentUser._id,
                            course: course,
                          })
                        );
                        setEnrolled((prev) => ({
                          ...prev,
                          [course._id]: true,
                        }));
                      }}
                      className="btn btn-primary"
                    >
                      {" "}
                      Enroll{" "}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}