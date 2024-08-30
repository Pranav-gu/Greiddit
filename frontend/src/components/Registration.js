import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Login from "./Login";

const Registration = () => {

    const onmouseover = () => {
        console.log(document.getElementById("submit_button_reg"));
        document.getElementById("submit_button_reg").style.backgroundColor = "magenta";
        document.getElementById("submit_button_reg").style.color = "black";
        return;
    }

    const onmouseout = () => {
        console.log(document.getElementById("submit_button_reg"));
        document.getElementById("submit_button_reg").style.backgroundColor = "green";
        document.getElementById("submit_button_reg").style.color = "white";
        return;
    }

    const navigate = useNavigate();

    const onclick = () => {
        //change logic and check whether the email is unique or not.
        let str1 = document.getElementById("inputFirstname").value;
        let str2 = document.getElementById("inputLastname").value;
        let str3 = document.getElementById("inputUsernameReg").value;
        let str4 = document.getElementById("inputEmail").value;
        let str5 = document.getElementById("inputAge").value;
        let str6 = document.getElementById("inputPasswordReg").value;
        if (str1 === "" || str2 === "" || str3 === "" || str4 === "" || str5 === "" || str6 === "") {
            alert("First Name, Last Name, UserName, Email, Age and Password columns cannot be left blank.");
        }
        else {
            let fname = document.getElementById("inputFirstname").value;
            let lname = document.getElementById("inputLastname").value;
            let uname = document.getElementById("inputUsernameReg").value;
            let email = document.getElementById("inputEmail").value;
            let age = document.getElementById("inputAge").value;
            let password = document.getElementById("inputPasswordReg").value;
            let contact = document.getElementById("inputContact").value;
            console.log(fname, lname, uname, email, age, password, contact);
            fetch("/api/auth", {
                method: "POST",
                crossDomain: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Accept-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    fname,
                    lname,
                    uname,
                    email,
                    age,
                    contact,
                    password
                }),
            }).then((res)=>res.json())
            .then((data)=>{
                console.log("Connection successful, data push successful");
                console.log(data, "userregister");
            });
            alert("Registration Successful");
            // navigate('/', { replace: true });
        }
        document.getElementById("inputFirstname").value = "";
        document.getElementById("inputLastname").value = "";
        document.getElementById("inputUsernameReg").value = "";
        document.getElementById("inputEmail").value = "";
        document.getElementById("inputContact").value = "";
        document.getElementById("inputAge").value = "";
        document.getElementById("inputPasswordReg").value = "";
    }
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [age, setAge] = useState('');
    const [contact, setContact] = useState('');
    const [password, setPassword] = useState('');

    function SubmitButton() {
        if (firstname && lastname && email && username && age && contact && password) {
            return <button className="btn btn-success" type="button" id="submit_button_reg" onMouseOver={onmouseover} onMouseOut={onmouseout} onClick={onclick}>Submit</button>
        } else {
            return <button className="btn btn-success" type="button" id="submit_button_reg" onMouseOver={onmouseover} onMouseOut={onmouseout} onClick={onclick} disabled>Submit</button>
        };
    };

    return (
        <div>
            <h1 className="text-center text-info" style={{"marginTop": 10}}>Registration Page</h1>

            <label htmlFor="inputFirstname" className="text-danger font-weight-bold" style={{"marginRight": 70, "marginTop": 100}}>First Name</label>
            <input value={firstname} id="inputFirstname" placeholder="First Name" onChange={e => setFirstname(e.target.value)} />
            <br />

            <label htmlFor="inputLastname" className="text-danger font-weight-bold" style={{"marginRight": 71, "marginTop": 10}}>Last Name</label>
            <input value={lastname} id="inputLastname" placeholder="Last Name" onChange={e => setLastname(e.target.value)} />
            <br />

            <label htmlFor="inputUsernameReg" className="text-danger font-weight-bold" style={{"marginRight": 69, "marginTop": 10}}>User Name</label>
            <input value={username} id="inputUsernameReg" placeholder="User Name" onChange={e => setUsername(e.target.value)} />
            <br />

            <label htmlFor="inputEmail" className="text-danger font-weight-bold" style={{"marginRight": 107, "marginTop": 10}}>Email</label>
            <input value={email} id="inputEmail" placeholder="Email (example@gmail.com)" onChange={e => setEmail(e.target.value)} />
            <br />

            <label htmlFor="inputAge" className="text-danger font-weight-bold" style={{"marginRight": 117, "marginTop": 10}}>Age</label>
            <input value={age} id="inputAge" placeholder="Age" onChange={e => setAge(e.target.value)} />
            <br />

            <label htmlFor="inputContact" className="text-danger font-weight-bold" style={{"marginRight": 26, "marginTop": 10}}>Contact Number</label>
            <input value={contact} id="inputContact" placeholder="Contact" onChange={e => setContact(e.target.value)} />
            <br />

            <label htmlFor="inputPasswordReg" className="text-danger font-weight-bold" style={{"marginRight": 77, "marginTop": 10}}>Password</label>
            <input value={password} type="password" id="inputPasswordReg" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            <br />
            <br />

            <SubmitButton />
        </div>
    )
}

export default Registration