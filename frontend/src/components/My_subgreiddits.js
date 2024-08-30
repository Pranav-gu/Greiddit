import React, { useState, useEffect } from 'react'
import "animate.css"
import { useNavigate } from 'react-router-dom';

const My_subgreiddits = () => {

    const [openForm, setopenForm] = useState(false);

    const [Name, setName] = useState('');
    const [Description, setDescription] = useState('');
    const [Tags, setTags] = useState('');
    const [Banned_keywords, setBanned_keywords] = useState('');

    function open_form() {
        setopenForm(true);
    }

    function close_form() {
        setopenForm(false);
    }

    const onclick = () => {
        fetch("/api/my_subgreiddit", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Accept-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                token: window.localStorage.getItem("token"),
                uname: window.localStorage.getItem("uname"),
                Name: Name,
                Description: Description,
                Tags: Tags,
                Banned_keywords: Banned_keywords,
            }),
        }).then((res) => res.json())
            .then((data) => {
                console.log("Connection successful, data push successful");
                console.log(data, "subgreidditdata");

                if (data.status === "ok") {
                    alert("Subgreiddit Created");
                }
                else if (data.error === "error") {
                    alert("Subgreiddit not Created. Internal Server Error 500");
                }
                else if (data.status === "error" && data.data === "User Exists") {
                    alert("Subgreiddit not Created. Subgreiddit Exists");
                }
            });
        setName("");
        setDescription("");
        setTags("");
        setBanned_keywords("");
        document.getElementById("inputName").value = "";
        document.getElementById("inputDescription").value = "";
        document.getElementById("inputTags").value = "";
        document.getElementById("inputBannedKeywords").value = "";
    }

    function SubmitButtonSG() {
        if (Name && Description && Tags && Banned_keywords) {
            return <button className="btn btn-success" type="button" style={{ "marginTop": 20, "marginBottom": 30 }} id="submit_button" onClick={onclick}>Submit</button>
        } else {
            return <button className="btn btn-success" type="button" style={{ "marginTop": 20, "marginBottom": 30 }} id="submit_button" onClick={onclick} disabled>Submit</button>
        };
    };

    const remove_sg = (i) => {
        let name = document.getElementById(i+30000).innerHTML;
        let desc = document.getElementById(i+40000).innerHTML;
        let banned_keywords = document.getElementById(i+50000).innerHTML;
        fetch("/api/my_subgreiddit_removal", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Accept-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                token: window.localStorage.getItem("token"),
                uname: window.localStorage.getItem("uname"),
                Name: name,
                Description: desc,
                Banned_keywords: banned_keywords,
            }),
        }).then((res) => res.json())
            .then((data) => {
                console.log("Connection successful, data push successful");
                console.log(data, "subgreidditremoval");

                if (data.status === "ok") {
                    alert("Subgreiddit Removed");
                }
                else if (data.error === "error" && data.data === "Subgreiddit Does not Exist"){
                    alert("Subgreiddit Does not Exist");
                }
                else if (data.error === "error") {
                    alert("Subgreiddit could not be Removed. Internal Server Error 500");
                }
            });
    }
    
    const navigate = useNavigate();

    const open_web_page = (i) => {
        alert("Web Page of Subgreiddit Button");
        let name = document.getElementById(i+30000).innerHTML;
        let desc = document.getElementById(i+40000).innerHTML;
        let ban = document.getElementById(i+50000).innerHTML;
        console.log("i = ", i, "name = ", name, "desc = ", desc, "ban = ", ban);
        let subgreiddit_id = null;
        fetch("/api/subgreiddit", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Accept-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                token: window.localStorage.getItem("token"),
                uname: window.localStorage.getItem("uname"),
                Name: name,
                Description: desc,
                Banned_keywords: ban,
            }),
        }).then((res) => res.json())
            .then((data) => {
                console.log("Connection successful, data push successful");
                console.log(data, "subgreiddit_page");

                if (data.status === "ok") {
                    console.log("Hello cndskjvbfcbjlm");
                    console.log(data.data._id);
                    subgreiddit_id = data.data._id;
                    console.log("helljcnsjdb");
                    console.log("subgreiddit_id = ", subgreiddit_id);
                    navigate(`/subgreiddits/${subgreiddit_id}`, { replace: true });
                }
                else if (data.error === "error") {
                    alert("Internal Server Error 500");
                }
            });
    }

    function Display_ban_words(props) {
        const str = props.replaceAll(" ", ", ");
        return str;
    }

    function Display_Details_SG(props) {
        // console.log(props.data_sg);
        return (
            <div className="text-info text-center">
                <h3>Number of People in the Subgreiddit: {props.number}</h3>
                <h3>Number of Posts in the Subgreiddit: {props.post_number}</h3>
                {props.data_sg.map((element, i) => {
                    let name = element.Name;
                    let desc = element.Description;
                    let ban = element.Banned_Keywords;
                    return (
                        <div>
                            <br />
                            <br />
                            <h3>Subgreiddit Serial Number: {i + 1}<button style={{ marginLeft: 50 }} className="btn btn-outline-danger" onClick={() => remove_sg(i)}>Remove</button>
                            <button style={{ marginLeft: 50 }} className="btn btn-outline-success" onClick={() => open_web_page(i)}>Open Web Page</button></h3> 
                            <h3><span>Name: </span><span style={{ marginRight: 20 }} id={i + 30000}>{name}</span></h3>
                            <h3><span>Description: </span><span id={i + 40000}>{desc}</span></h3>
                            <h3><span>Banned Keywords: </span><span id={i + 50000}>{Display_ban_words(ban)}</span></h3>
                        </div>
                    )
                })}
            </div>
        )
    }

    function Details_SG() {
        const [number, setnumber] = useState(0);
        const [post_number, setpost_number] = useState(0);
        const [A, setA] = useState([]);
        useEffect(() => {
            fetch("/api/my_subgreiddit_list", {
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
                    console.log(data, "mysubgreidditlist");

                    if (data.status === "ok") {
                        // alert("Subgreiddit Information Found");
                        setnumber(data.data.length);
                        setA(data.data);
                    }
                    else if (data.status === "error" && data.data === "Subgreiddit Information Not Found") {
                        alert("Subgreiddit Information Not Found");
                    }
                });
        }, []);

        useEffect(() => {
            fetch("/api/my_subgreiddit_post", {
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
                    console.log(data, "mysubgreidditposts");

                    if (data.status === "ok") {
                        setpost_number(data.data.length);
                    }
                    else if (data.status === "error" && data.data === "Subgreiddit Information Not Found") {
                        alert("Subgreiddit Information Not Found");
                    }
                });
        }, []);
        
        return (
            <div>
                <Display_Details_SG post_number={post_number} number={number} data_sg={A} />
            </div>
        )
    }

    return (
        <div className="text-center text-danger">
            {/* <h2 className="animate__fadeInLeft"><strong>HELLO THIS IS MY SUBGREIDDITS PAGE</strong></h2> */}
            {openForm ? <button className="text-info btn btn-secondary my-5" onClick={() => close_form()}>Click Here to Hide The Form</button>
                : <button className="text-info btn btn-secondary my-5" onClick={() => open_form()}>Click Here to make a New Subgreiddit</button>}
            {openForm ? <>
                <h3>Enter the Details of the New Subgreiddit</h3>
                <br />
                <label htmlFor="inputName" className="text-danger font-weight-bold" style={{ "marginRight": 200, "marginTop": 10, fontWeight: 'bold', fontSize: 30 }}>Name</label>
                <input type="text" id="inputName" onChange={e => setName(e.target.value)} />
                <br />
                <label htmlFor="inputDescription" className="text-danger font-weight-bold" style={{ "marginRight": 115, "marginTop": 20, fontWeight: 'bold', fontSize: 30 }}>Description</label>
                <input type="text" id="inputDescription" onChange={e => setDescription(e.target.value)} />
                <br />
                <label htmlFor="inputTags" className="text-danger font-weight-bold" style={{ "marginRight": 215, "marginTop": 20, fontWeight: 'bold', fontSize: 30 }}>Tags</label>
                <input type="text" id="inputTags" onChange={e => setTags(e.target.value)} />
                <br />
                <label htmlFor="inputBannedKeywords" className="text-danger font-weight-bold" style={{ "marginRight": 25, "marginTop": 20, fontWeight: 'bold', fontSize: 30 }}>Banned Keywords</label>
                <input type="text" id="inputBannedKeywords" onChange={e => setBanned_keywords(e.target.value)} />
                {/* <textarea class="form-control" style = {{ width: 1000, height: 200}} id="inputDescription" /> */}
                <br />
                <SubmitButtonSG />
            </> : null}
            <h2><span className="badge bg-secondary text-info my-3">Subgreiddit Info: </span></h2>
            <Details_SG />
        </div>
    )
}

export default My_subgreiddits