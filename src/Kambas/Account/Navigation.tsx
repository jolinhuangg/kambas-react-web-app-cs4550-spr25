import { Link } from "react-router-dom";

export default function AccountNavigation() {
    return (
        <div id="wd-account-navigation">
            <Link to="/Kambas/Account/Signin">Sign in</Link>
            <br />
            <Link to="/Kambas/Account/Signup">Sign up</Link>
            <br />
            <Link to="/Kambas/Account/Profile">Profile</Link>
        </div>
    );
}