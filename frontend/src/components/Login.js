import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = ({ call_logIn }) => {

    const onmouseover = () => {
        console.log(document.getElementById("submit_button"));
        document.getElementById("submit_button").style.backgroundColor = "magenta";
        document.getElementById("submit_button").style.color = "black";
        return;
    }
    const onmouseout = () => {
        console.log(document.getElementById("submit_button"));
        document.getElementById("submit_button").style.backgroundColor = "green";
        document.getElementById("submit_button").style.color = "white";
        return;
    }
    const navigate = useNavigate();

    function onclick() {
        let uname = document.getElementById("inputUsername").value;
        let password = document.getElementById("inputPassword").value;
        console.log(uname, password);
        fetch("/api/login", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Accept-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                uname,
                password,
            }),
        }).then((res)=>res.json())
        .then((data)=>{
            if (data.error === "User Does Not Exist. Please Register First.")
            {
                alert("User Does Not Exist. Please Register First.");
                document.getElementById("inputUsername").value = "";
                document.getElementById("inputPassword").value = "";
            }
            else if (data.status === "ok"){
                alert("Login successful");
                call_logIn();
                window.localStorage.setItem("token", data.data);
                window.localStorage.setItem("userId", data.userId);
                window.localStorage.setItem("fname", data.fname);
                window.localStorage.setItem("lname", data.lname);
                window.localStorage.setItem("uname", data.uname);
                window.localStorage.setItem("contact", data.contact);
                window.localStorage.setItem("age", data.age);
                window.localStorage.setItem("email", data.email);
                window.localStorage.setItem("password", data.password);
                navigate('/profile', { replace: true });
            }
            else if (data.status === "error")
            {
                alert("Please Enter Correct Credentials to Proceed");
                document.getElementById("inputUsername").value = "";
                document.getElementById("inputPassword").value = "";
            }
            console.log(data, "userlogin");
        });

        // }).then((res) => res.json())
        //     .then((data) => {
        //         if (data)
        //         {
        //             console.log("Connection successful, Credentials are correct");
        //             console.log(data, "userregister");
        //             call_logIn();
        //             navigate('/profile', { replace: true });
        //         }
        //         else
        //         {
        //             alert("Please Enter Correct Credentials to Proceed");
        //             document.getElementById("inputUsername").value = "";
        //             document.getElementById("inputPassword").value = "";
        //         }
        //     });

        // if ("admin".localeCompare(document.getElementById("inputUsername").value) === 0 && "admin".localeCompare(document.getElementById("inputPassword").value) === 0) {
        //     call_logIn();
        //     navigate('/profile', { replace: true });
        // }
        // else {
        //     alert("Please Enter Correct Credentials to Proceed");
        //     document.getElementById("inputUsername").value = "";
        //     document.getElementById("inputPassword").value = "";
        // }
    }

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    function SubmitButton() {
        if (username && password) {
            return <button className="btn btn-success" type="button" style={{ "marginTop": 20 }} id="submit_button" onMouseOver={onmouseover} onMouseOut={onmouseout} onClick={onclick}>Submit</button>
        } else {
            return <button className="btn btn-success" type="button" style={{ "marginTop": 20 }} id="submit_button" onMouseOver={onmouseover} onMouseOut={onmouseout} onClick={onclick} disabled>Submit</button>
        };
    };

    return (
        <>
            <h1 className="text-center text-info" style={{ "marginTop": 10 }}>Login Page</h1>
            <label htmlFor="inputUsername" className="text-danger font-weight-bold" style={{ "marginRight": 50, "marginTop": 100 }}>Username</label>
            <input type="text" id="inputUsername" onChange={e => setUsername(e.target.value)} />
            <br />
            <label htmlFor="inputPassword" className="text-danger font-weight-bold" style={{ "marginRight": 50, "marginTop": 20 }}>Password</label>
            <input type="password" id="inputPassword" onChange={e => setPassword(e.target.value)} />
            <br />
            <SubmitButton />
        </>
    )
}

export default Login