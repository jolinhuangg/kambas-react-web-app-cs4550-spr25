import { Container } from "react-bootstrap";
import { useParams, Outlet, NavLink } from "react-router";
import { useState } from "react";
import { BiBlock } from "react-icons/bi";

import ContextMenu from "./ContextMenu";

export default function DetailsEditor() {
    const { qid, cid } = useParams();
    const [quiz] = useState<any>(null);

    const tabStyle = {
        padding: "8px 20px",
        marginRight: "4px",
        textDecoration: "none",
        color: "#000",
        fontWeight: 500,
      };
    
      const activeTabStyle = {
        ...tabStyle,
        backgroundColor: "#ffffff",
        border: "1px solid #ccc",
        borderBottom: "2px solid #ffffff",
        color: "black"
      };

    return (
    <Container>
      <div className="mt-4 d-flex justify-content-end align-items-center gap-3">
        <div>  Points {quiz?.points ?? 0} </div>
        <div className="text-secondary d-flex align-items-center gap-1">  <BiBlock size={20}/> Not Published </div>
        <ContextMenu/>
      </div>

      <hr/>

      <Container className="mt-4">
      <div style={{ display: "flex", borderBottom: ".5px solid #ccc" }}>
        <NavLink
          to={`/Kambas/Courses/${cid}/Quizzes/${qid}/edit/details`}
          style= {activeTabStyle }
        >
          Details
        </NavLink>
        <NavLink
          to={`/Kambas/Courses/${cid}/Quizzes/${qid}/edit/questions`}
          style={({ isActive }) => (isActive ? activeTabStyle : tabStyle)}
        >
          Questions
        </NavLink>
      </div>
      <hr className="mt-0" />
      <Outlet />
    </Container>

    </Container>
    );
  }
  