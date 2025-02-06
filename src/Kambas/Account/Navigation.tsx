import { NavLink } from "react-router-dom";

export default function AccountNavigation() {
    return (
        <div id="wd-account-navigation">
            <NavLink to="/Kambas/Account/Signin">Sign in</NavLink>
            <br />
            <NavLink to="/Kambas/Account/Signup">Sign up</NavLink>
            <br />
            <NavLink to="/Kambas/Account/Profile">Profile</NavLink>
        </div>
    );
}