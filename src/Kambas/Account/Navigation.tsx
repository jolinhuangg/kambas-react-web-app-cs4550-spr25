import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { pathname } = useLocation();
  const active = (path: string) => (pathname.includes(path) ? "active" : "");
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];

  return (
    <div id="wd-account-navigation">
      {links.includes("Signin") && (
        <>
          <NavLink to="/Kambas/Account/Signin">Sign in</NavLink>
          <br />
        </>
      )}
      {links.includes("Signup") && (
        <>
          <NavLink to="/Kambas/Account/Signup">Sign up</NavLink>
          <br />
        </>
      )}
      {links.includes("Profile") && (
        <>
          <NavLink to="/Kambas/Account/Profile">Profile</NavLink>
          <br />
        </>
      )}
      {currentUser && currentUser.role === "ADMIN" && (
        <NavLink
          to={`/Kambas/Account/Users`}
          className={`list-group-item ${active("Users")}`}
        >
          {" "}
          Users{" "}
        </NavLink>
      )}
    </div>
  );
}
