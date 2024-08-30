import "./Navbar.css";
import { useState } from "react";
import Registration from "./Registration";
import Login from "./Login";
const { Link, useNavigate } = require("react-router-dom");

const Navbar = (props) => {

    const [flag, setFlag] = useState(false);

    const navigate = useNavigate();

    const onclick = () => {
        props.logOut()
    }

    const onclick1 = () => {
        navigate('/profile', { replace: true });
    }

    const onclick2 = () => {
        navigate('/my_subgreiddits', { replace: true });
    }

    const onclick3 = () => {
        navigate('/subgreiddits', { replace: true });
    }

    const onclick4 = () => {
        navigate('/subgreiddits', { replace: true });
    }

    const onclick5 = () => {
        navigate('/subgreiddits', { replace: true });
    }

    const onclick6 = () => {
        navigate('/subgreiddits', { replace: true });
    }

    const onclick8 = () => {
        navigate('/saved_posts', { replace: true });
    }
    const navigate_login = () => {
        setFlag(false);
    }

    const navigate_register = () => {
        setFlag(true);
    }

    const call_logIn = () => {
        props.logIn()
    }

    let sg_id = window.location.pathname.split("/")[1] === "subgreiddits" ? window.location.pathname.split("/")[2] : null;

    return (
        <><div>
            {props.isLoggedIn ? <div>
                <nav className="navigation_bar">
                    {/* {console.log(window.location.pathname)} */}
                    {window.location.pathname === "/" ? window.location.pathname = "/profile" : null}
                    <nav className="navigation_bar"></nav>
                    <ul>
                        <li id="nav_1"><Link onClick={onclick} to="/" style={{ padding: "10px" }}><h2>Logout</h2></Link></li>
                        <li id="nav_1"><Link onClick={onclick1} to="/profile" style={{ padding: "10px" }}><h2>Profile</h2></Link></li>
                        <li id="nav_2"><Link onClick={onclick2} to="/my_subgreiddits" style={{ padding: "10px" }}><h2>My Sub Greddits</h2></Link></li>
                        <li id="nav_3"><Link onClick={onclick3} to="/subgreiddits_page" style={{ padding: "10px" }}><h2>Sub Greddits Page</h2></Link></li>
                        <li id="nav_3"><Link onClick={onclick8} to="/saved_posts" style={{ padding: "10px" }}><h2>Saved Posts Page</h2></Link></li>
                        {window.location.pathname.split("/")[1] === "subgreiddits" ?
                            <>
                                <li id="nav_3"><Link onClick={onclick3} to={`/subgreiddits/${sg_id}/users`} style={{ padding: "10px" }}><h2>Users</h2></Link></li>
                                <li id="nav_3"><Link onClick={onclick4} to={`/subgreiddits/${sg_id}/joining_requests`} style={{ padding: "10px" }}><h2>Joining Requests</h2></Link></li>
                                <li id="nav_3"><Link onClick={onclick5} to={`/subgreiddits/${sg_id}/stats`} style={{ padding: "10px" }}><h2>Stats</h2></Link></li>
                                <li id="nav_3"><Link onClick={onclick6} to={`/subgreiddits/${sg_id}/reported_page`} style={{ padding: "10px" }}><h2>Reported Page</h2></Link></li>
                            </> : null}
                    </ul>
                    {/* <Link onClick={onclick} to="/" style={{ padding: "10px" }}>
                    <h2>Logout</h2>
                </Link> */}
                </nav>
            </div> : null}
            {!props.isLoggedIn ? <div className="container font-weight-bold mb-3 text-center">
                {/* <h4 className="animate__animated text-danger animate__slideInLeft">Please Authenticate Yourself before moving to a Wonderful Journey.</h4>
                <Link to="/auth/login" style={{ padding: "10px" }}>
                    <h2>Login</h2>
                </Link>
                <h4 className="animate__animated text-danger animate__slideInRight">Don't have an Account? Click on this Link to Register.</h4>
                <Link to="/auth/register" style={{ padding: "10px" }}>
                    <h2>Register</h2>
                </Link> */}
                <div className="auth_box">
                    <button id="login_css" onClick={navigate_login}>Login</button>
                    <button id="register_css" onClick={navigate_register}>Register</button>
                </div>
                {flag ? <Registration /> : <Login call_logIn={call_logIn} />}
            </div> : null}
        </div>
            {props.children}
        </>
    );
};

Navbar.defaultProps = { children: null };
export default Navbar;