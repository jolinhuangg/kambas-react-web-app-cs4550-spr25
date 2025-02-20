import { ListGroup } from "react-bootstrap";
import { Link, useLocation, useParams } from "react-router-dom";
import { courses } from "../Database";

export default function CourseNavigation() {
  const { pathname } = useLocation();
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
  const links = [
    { label: "Home", path: `/Kambas/Courses/${course && course._id}/Home` },
    { label: "Modules", path: `/Kambas/Courses/${course && course._id}/Modules` },
    { label: "Piazza", path: `/Kambas/Courses/${course && course._id}/Piazza` },
    { label: "Zoom", path: `/Kambas/Courses/${course && course._id}/Zoom` },
    { label: "Assignments", path: `/Kambas/Courses/${course && course._id}/Assignments` },
    { label: "Quizzes", path: `/Kambas/Courses/${course && course._id}/Quizzes` },
    { label: "Grades", path: `/Kambas/Courses/${course && course._id}/Grades` },
    { label: "People", path: `/Kambas/Courses/${course && course._id}/People` },
  ];
  return (
    <ListGroup>
      {links.map((link) => (
        <ListGroup.Item
          key={link.path}
          as={Link}
          to={link.path}
          className={`border-0 ${
            pathname.includes(link.label) ? "text-black" : "text-danger"
          }`}
        >
          {link.label}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
