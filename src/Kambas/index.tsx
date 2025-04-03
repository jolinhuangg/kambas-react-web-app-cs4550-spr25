import React, { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Session from "./Account/Session";
import ProtectedRoute from "./Account/ProtectedRoute";
import KambasNavigation from "./Navigation";
import Account from "./Account";
import Courses from "./Courses";
import Dashboard from "./Dashboard";
import * as userClient from "./Account/client";
import * as courseClient from "./Courses/client";

export default function Kambas() {
  const addNewCourse = async () => {
    const newCourse = await userClient.createCourse(course);
    setCourses([...courses, newCourse]);
  };

  const [courses, setCourses] = useState<any[]>([]);
  const [course, setCourse] = useState<any>({
    _id: "1234",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    description: "New Description",
  });

  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const fetchCourses = async () => {
    try {
      const serverCourses = await userClient.findMyCourses();
      setCourses(serverCourses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchCourses();
    }
  }, [currentUser]);

  const deleteCourse = async (courseId: string) => {
    await courseClient.deleteCourse(courseId);
    setCourses(courses.filter((course) => course._id !== courseId));
  };

  const updateCourse = async () => {
    await courseClient.updateCourse(course);
    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return course;
        } else {
          return c;
        }
      })
    );
  };


  return (
    <Session>
      <div id="wd-kambas">
        <KambasNavigation />
        <div className="wd-main-content-offset p-3">
          <Routes>
            {/* Default route redirects to Account */}
            <Route path="/" element={<Navigate to="Account" />} />

            {/* Account routes */}
            <Route path="/Account/*" element={<Account />} />

            {/* Dashboard route, protected */}
            <Route
              path="Dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard
                    courses={courses}
                    course={course}
                    setCourse={setCourse}
                    addNewCourse={addNewCourse}
                    deleteCourse={deleteCourse}
                    updateCourse={updateCourse}
                  />
                </ProtectedRoute>
              }
            />

            {/* Individual course route, protected */}
            <Route
              path="Courses/:cid/*"
              element={
                <ProtectedRoute>
                  <Courses courses={courses} />
                </ProtectedRoute>
              }
            />

            {/* Other routes */}
            <Route path="/Calendar" element={<h1>Calendar</h1>} />
            <Route path="/Inbox" element={<h1>Inbox</h1>} />
          </Routes>
        </div>
      </div>
    </Session>
  );
}
