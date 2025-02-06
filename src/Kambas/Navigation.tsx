import { AiOutlineDashboard } from "react-icons/ai";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import './styles.css';

export default function KambasNavigation() {
  return (
    <div
      id="wd-kambas-navigation"
      className="list-group rounded-0 position-fixed
       bottom-0 top-0 d-none d-md-block bg-black z-2"
    >
      <a
        id="wd-neu-link"
        target="_blank"
        href="https://www.northeastern.edu/"
        className="list-group-item"
      >
        <img src="/images/NEU.png" width="75px" />
      </a>
      <NavLink
        to="/Kambas/Account"
        id="wd-account-link"
        className="list-group-item"
      >
        <FaRegCircleUser className="fs-1 text-white" />
        <br />
        Account{" "}
      </NavLink>

      <NavLink
        to="/Kambas/Dashboard"
        id="wd-dashboard-link"
        className="list-group-item"
      >
        <AiOutlineDashboard className="fs-1" />
        <br />
        Dashboard{" "}
      </NavLink>

      <NavLink
        to="/Kambas/Courses/*"
        id="wd-course-link"
        className="list-group-item"
      >
        <LiaBookSolid className="fs-1" />
        <br />
        Courses{" "}
      </NavLink>

      <NavLink
        to="/Kambas/Calendar"
        id="wd-calendar-link"
        className="list-group-item"
      >
        <FaCalendarAlt className="fs-1" />
        <br />
        Calendar{" "}
      </NavLink>

      <NavLink
        to="/Kambas/Inbox"
        id="wd-inbox-link"
        className="list-group-item"
      >
        <FaInbox className="fs-1" />
        <br />
        Inbox{" "}
      </NavLink>

      <NavLink
        to="/Labs"
        id="wd-labs-link"
        className="list-group-item"
      >
        <LiaCogSolid className="fs-1" />
        <br />
        Labs{" "}
      </NavLink>
    </div>
  );
}
