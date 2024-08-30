import React from 'react'

const Initial_Followers = (props) => {
    const remove_follower = (i) => {
        // alert("Button Clicked");
        let follower = document.getElementById(i + 1000).innerHTML;
        fetch("/api/remove_follower", {
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
                follower: follower
            }),
        }).then((res) => res.json())
            .then((data) => {
                if (data.status === "ok") {
                    alert("Follower Removed");
                    window.location.reload();
                }
                else if (data.error === "error") {
                    alert("Some Error Occured");
                }
            });
    }
    return (
        <div>
            {props.follower.map((follower, i) => {
                return (
                    <div>
                        <h4><span id={i + 1000}>{follower}</span>
                            <span id={i + 1000}></span><button htmlFor={i + 1000} type="submit" style={{ "marginLeft": 20 }} className="btn btn-outline-danger" onClick={() => remove_follower(i)}>Remove</button></h4>
                    </div>
                )
            })}
        </div>
    )
}

export default Initial_Followers