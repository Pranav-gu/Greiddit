import React, { useEffect, useState } from 'react'
import Initial_Following from './Initial_Following';

const Profile_Following = () => {
    // return (
    //     <div className="text-center text-danger">
    //         <h2>No of People to whom I am following= 5</h2>
    //         <h4>Salamence <button >Remove</button></h4>
    //         <h4>Metagross <button>Remove</button></h4>
    //         <h4>Dragonite <button>Remove</button></h4>
    //         <h4>Infernape <button>Remove</button></h4>
    //         <h4>Greninja <button>Remove</button></h4>
    //     </div>
    // )

    const [following, setfollowing] = useState([]);

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
                // console.log("Connection successful, data push successful");
                // console.log(data, "userfollower");

                if (data.status === "ok") {
                    let arr = data.data;
                    // console.log(arr);
                    document.getElementById("following_user").innerHTML = arr[0].User_Name_user;
                    let x = []
                    for (let i = 0; i < arr.length; i++)
                        x = x.concat(arr[i].User_Name_following);
                    setfollowing(x);
                }
                else if (data.error === "error") {
                    alert("Followers not Found. Internal Server Error 500");
                }
            });
    }, []);
    return (
        <div className="text-center text-danger font-weight-bold">
            <p style={{ fontSize: 30, textDecorationLine: "underline" }} >Username: </p><p style={{ fontSize: 30 }} id="following_user"></p>
            <p style={{ fontSize: 30, textDecorationLine: "underline" }} >Following: </p><p style={{ fontSize: 30 }} id="following_following"></p>
            <div>
                {/* {console.log("Before Calling Initial_Following function following = ", following)} */}
                <Initial_Following following={following} />
            </div>
        </div>
    )
}

export default Profile_Following