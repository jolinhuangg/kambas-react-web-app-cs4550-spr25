import * as db from "../Database";
import { useSelector, useDispatch } from "react-redux";
import * as enrollmentsClient from "./client";

import { useEffect, useState } from "react";

export default function EnrollmentOptions({
  addNewCourse,
  deleteCourse,
}: {
  addNewCourse: () => void;
  deleteCourse: (course: any) => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();
  const courses = db.courses;
  const [enrollments, setEnrollments] = useState(db.enrollments);

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

  function getEId(c: any): string | null {
    const enrollment = enrollments.find(
      (e) => e.user === currentUser._id && e.course === c._id
    );
    return enrollment ? enrollment._id : null;
  }

  const handleEnroll = async (course: any) => {
    try {
      const newEnrollment = await enrollmentsClient.enrollInCourse(
        currentUser._id,
        course._id
      );
      setEnrollments((prev) => [...prev, newEnrollment]);
      setEnrolled((prev) => ({
        ...prev,
        [course._id]: true,
      }));
    } catch (error) {
      console.error("Enrollment failed", error);
    }
  };

  const handleUnenroll = async (course: any) => {
    const enrollmentId = getEId(course);
    if (!enrollmentId) return;

    try {
      await enrollmentsClient.unenrollFromCourse(enrollmentId);
      setEnrollments((prev) => prev.filter((e) => e._id !== enrollmentId));
      setEnrolled((prev) => ({
        ...prev,
        [course._id]: false,
      }));
    } catch (error) {
      console.error("Unenrollment failed", error);
    }
  };

  return (
    <div id="wd-enrollment">
      <div id="wd-enrollment-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses.map((course) => (
            <div
              key={course._id}
              className="wd-enrollment-course col"
              style={{ width: "300px" }}
            >
              <div className="card rounded-3 overflow-hidden">
                <img
                  src="/images/reactjs.jpg"
                  width="100%"
                  height={160}
                  alt={course.name}
                />
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

                  {enrolled[course._id] ? (
                    <button
                      onClick={() => handleUnenroll(course)}
                      className="btn btn-danger"
                    >
                      Unenroll
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEnroll(course)}
                      className="btn btn-primary"
                    >
                      Enroll
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