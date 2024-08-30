import React from 'react'

const Initial_Following = (props) => {
    const remove_following = (i) => {
        let following = document.getElementById(i + 2000).innerHTML;
        fetch("/api/remove_following", {
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
                following: following
            }),
        }).then((res) => res.json())
            .then((data) => {
                if (data.status === "ok") {
                    alert("Unfollowing Successful");
                    window.location.reload();
                }
                else if (data.error === "error") {
                    alert("Some Error Occured");
                }
            });
    }
    return (
        <div>
            {props.following.map((following, i) => {
                return (
                    <div>
                        <h4><span id={i + 2000}>{following}</span>
                            <span id={i + 2000}></span><button htmlFor={i + 2000} type="submit" style={{ "marginLeft": 20 }} className="btn btn-outline-danger" onClick={() => remove_following(i)}>Unfollow</button></h4>
                    </div>
                )
            })}
        </div>
    )
}

export default Initial_Following