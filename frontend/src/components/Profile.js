import React, { useState, useEffect } from 'react'
import "animate.css";
// import Profile_Followers from './Profile_Followers';
import { useNavigate } from 'react-router-dom';

import DefaultProfilePic from "../assets/default_profile_picture.jpg";

const Profile = (props) => {

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');

  const [follower_no, setfollower_no] = useState(0);
  const [following_no, setfollowing_no] = useState(0);

  useEffect(() => {
    fetch("/api/follower", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Accept-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
        uname: window.localStorage.getItem("uname")
      }),
    }).then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          let arr = data.data;
          setfollower_no(arr.length);
        }
      });
  }, []);


  useEffect(() => {
    fetch("/api/following", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Accept-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
        uname: window.localStorage.getItem("uname")
      }),
    }).then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          let arr = data.data;
          setfollowing_no(arr.length);
        }
        else if (data.error === "error") {
          alert("Followers not Found. Internal Server Error 500");
        }
      });
  }, []);

  function DefaultValues() {
    fetch("/api/profile", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Accept-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
        userId: window.localStorage.getItem("userId")
      }),
    }).then((res) => res.json())
      .then((data) => {
        // console.log("Connection successful, profile push successful");
        console.log(data, "userdata");
      });
    setFirstname(window.localStorage.getItem("fname"));
    setLastname(window.localStorage.getItem("lname"));
    setUsername(window.localStorage.getItem("uname"));
    setEmail(window.localStorage.getItem("email"));
    setAge(window.localStorage.getItem("age"));
    setContact(window.localStorage.getItem("contact"));
    setPassword(window.localStorage.getItem("password"));
  }


  const onclick = () => {
    let fname = document.getElementById("examplefirst").value;
    let lname = document.getElementById("examplelast").value;
    let uname = document.getElementById("exampleuser").value;
    let age = document.getElementById("exampleage").value;
    let email = document.getElementById("exampleInputEmail1").value;
    let contact = document.getElementById("examplecontact").value;
    let password = document.getElementById("exampleInputPassword1").value;
    // console.log(fname, lname, uname, password, age, contact, email);
    fetch("/api/update_profile", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Accept-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
        userId: window.localStorage.getItem("userId"),
        fname: fname,
        lname: lname,
        uname: uname,
        email: email,
        password: password,
        age: age,
        contact: contact
      }),
    }).then((res) => res.json())
      .then((data) => {
        // console.log("Connection successful, profile push successful");
        if (data.status === "error" && data.message === "User With this Email already Exists") {
          alert("Error, User With this Email already Exists");
          setFirstname(window.localStorage.getItem("fname"));
          setLastname(window.localStorage.getItem("lname"));
          setUsername(window.localStorage.getItem("uname"));
          setEmail(window.localStorage.getItem("email"));
          setAge(window.localStorage.getItem("age"));
          setContact(window.localStorage.getItem("contact"));
          setPassword(window.localStorage.getItem("password"));
        }
        else if (data.status === "error") {
          alert("Internal Server Error");
          setFirstname(window.localStorage.getItem("fname"));
          setLastname(window.localStorage.getItem("lname"));
          setUsername(window.localStorage.getItem("uname"));
          setEmail(window.localStorage.getItem("email"));
          setAge(window.localStorage.getItem("age"));
          setContact(window.localStorage.getItem("contact"));
          setPassword(window.localStorage.getItem("password"));
        }
        else if (data.status === "ok") {
          alert("Values Updated Successfully");
          window.localStorage.setItem("token", data.data.token);
          window.localStorage.setItem("userId", data.userId);
          window.localStorage.setItem("fname", data.fname);
          window.localStorage.setItem("lname", data.lname);
          window.localStorage.setItem("uname", data.uname);
          window.localStorage.setItem("contact", data.contact);
          window.localStorage.setItem("age", data.age);
          window.localStorage.setItem("email", data.email);
          window.localStorage.setItem("password", data.password);
        }
        console.log(data, "userupdateprofile");
      });
  }

  function ProfilePicture() {
    const [file, setFile] = useState();
    const [fileChosen, setfileChosen] = useState(false);
    function handleChange(e) {
      // console.log(e.target.files);
      setfileChosen(true);
      setFile(URL.createObjectURL(e.target.files[0]));
    }

    const remove_photo = (e) => {
      setFile("No file chosen");
      setfileChosen(false);
    }

    return (
      <div className="App">
        <h2 style={{ "marginBottom": 30 }}>Profile Picture:</h2>
        <input type="file" onChange={handleChange} />
        {fileChosen ? <img src={file} /> : <img src={DefaultProfilePic} />}
        {fileChosen ? <><button className="btn btn-success" style={{ "marginLeft": 50 }} type="button" id="submit_button_reg" onClick={remove_photo}>Remove Photo</button></> : <button className="btn btn-success" style={{ "marginLeft": 50 }} type="button" id="submit_button_reg" disabled>Remove Photo</button>}
        <br />
      </div>
    );
  }

  function SubmitButton() {
    if (firstname && lastname && email && username && age && contact && password) {
      document.getElementById("examplefirst").value = firstname;
      document.getElementById("examplelast").value = lastname;
      document.getElementById("exampleuser").value = username;
      document.getElementById("exampleInputEmail1").value = email;
      document.getElementById("exampleInputPassword1").value = password;
      document.getElementById("exampleage").value = age;
      document.getElementById("examplecontact").value = contact;
      return <button className="btn btn-success" type="button" id="submit_button_reg" onMouseOver={onmouseover} onMouseOut={onmouseout} onClick={onclick}>Submit</button>
    } else {
      return <button className="btn btn-success" type="button" id="submit_button_reg" onMouseOver={onmouseover} onMouseOut={onmouseout} onClick={onclick} disabled>Submit</button>
    };
  };

  const navigate = useNavigate();

  const handle_follower = () => {
    navigate('/followers', { replace: true });
  }

  const handle_following = () => {
    navigate('/following', { replace: true });
  }

  const throwerror = () => {
    alert("Internal Server Error, Email ID once set cannot be changed.");
  }
  return (
    <div>
      <br /><br />
      <ProfilePicture />
      <DefaultValues />
      <form className="container mb-3">
        {/* <div className="form-group">
          <label htmlFor="examplefirst">First Name</label>
          <input value={firstname} type="text" className="form-control" id="examplefirst" placeholder="First Name" onChange={e => setFirstname(e.target.value)} />
        </div> */}
        <div className="form-group">
          <label htmlFor="examplefirst">First Name</label>
          <input type="text" className="form-control" id="examplefirst" placeholder="First Name" />
        </div>

        {/* <div className="form-group">
          <label htmlFor="examplelast">Last Name</label>
          <input value={lastname} type="text" className="form-control" id="examplelast" placeholder="Last Name" onChange={e => setLastname(e.target.value)} />
        </div> */}
        <div className="form-group">
          <label htmlFor="examplelast">Last Name</label>
          <input type="text" className="form-control" id="examplelast" placeholder="Last Name" />
        </div>

        {/*<div className="form-group">
          <label htmlFor="exampleuser">Username</label>
          <input value={username} type="text" className="form-control" id="exampleuser" placeholder="Username" onChange={e => setUsername(e.target.value)} />
        </div> */}
        <div className="form-group">
          <label htmlFor="exampleuser">Username</label>
          <input type="text" className="form-control" id="exampleuser" placeholder="Username" />
        </div>

        {/* <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email</label>
          <input value={email} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={e => setEmail(e.target.value)} />
          <small id="emailHelp" className="form-text text-muted">Email ID is Unique for Security Purposes</small>
        </div> */}
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email</label>
          <input value={email} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={throwerror} placeholder="Enter email" />
          <small id="emailHelp" className="form-text text-muted">Email ID is Unique for Security Purposes</small>
        </div>

        {/* <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input value={password} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" onChange={e => setPassword(e.target.value)} />
          <small id="emailHelp" className="form-text text-muted">Password is not shown for Security Purposes</small>
        </div> */}
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
          <small id="emailHelp" className="form-text text-muted">Password is not shown for Security Purposes</small>
        </div>

        {/* <div className="form-group">
          <label htmlFor="exampleage">Age</label>
          <input value={age} type="text" className="form-control" id="exampleage" placeholder="Age" onChange={e => setAge(e.target.value)} />
        </div> */}
        <div className="form-group">
          <label htmlFor="exampleage">Age</label>
          <input type="text" className="form-control" id="exampleage" placeholder="Age" />
        </div>

        {/* <div className="form-group">
          <label htmlFor="examplecontact">Contact Number</label>
          <input value={contact} type="text" className="form-control" id="examplecontact" placeholder="Contact" onChange={e => setContact(e.target.value)} />
        </div> */}
        <div className="form-group">
          <label htmlFor="examplecontact">Contact Number</label>
          <input type="text" className="form-control" id="examplecontact" placeholder="Contact" />
        </div>

        {/* <div className="form-check">
        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
      </div> */}
        <br></br>
        {/* <button type="submit" className="btn btn-primary" onClick={onclick}>Submit</button> */}
        <SubmitButton />
        <br /><br />
        <h2 className="text-danger text-center">Followers - <button onClick={handle_follower} style={{ "backgroundColor": "transparent" }}>{follower_no}</button></h2>
        <br />
        <br />
        <h2 className="text-danger text-center">Following - <button onClick={handle_following} style={{ "backgroundColor": "transparent" }}>{following_no}</button></h2>
      </form>
    </div>
  )
}

export default Profile