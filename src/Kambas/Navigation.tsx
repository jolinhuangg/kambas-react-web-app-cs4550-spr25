import { Link } from "react-router-dom";
export default function KambasNavigation() {
  return (
    <div id="wd-kambas-navigation">
      <a href="https://www.northeastern.edu/" id="wd-neu-link" target="_blank">Northeastern</a><br/>
      <Link to="/Kambas/Account" id="wd-account-link">Account</Link><br/>
      <Link to="/Kambas/Dashboard" id="wd-dashboard-link">Dashboard</Link><br/>
      <Link to="/Kambas/Courses/*" id="wd-course-link">Courses</Link><br/>
      <Link to="/Kambas/Calendar" id="wd-calendar-link">Calendar</Link><br/>
      <Link to="/Kambas/Inbox" id="wd-inbox-link">Inbox</Link><br/>
      <Link to="/Labs" id="wd-labs-link">Labs</Link><br/>
    </div>
);}

