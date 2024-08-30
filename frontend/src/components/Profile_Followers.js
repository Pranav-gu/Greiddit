import React, { useEffect, useState } from 'react'
import Initial_Followers from './Initial_Followers';

const Profile_Followers = () => {
  // return (
  //   <div className = "text-center text-danger">
  //       <h2>No of Followers = 5</h2>
  //       <h4>Pikachu <button >Remove</button></h4>
  //       <h4>Charizard <button>Remove</button></h4>
  //       <h4>Electivire <button>Remove</button></h4>
  //       <h4>Swampert <button>Remove</button></h4>
  //       <h4>Sceptile <button>Remove</button></h4>
  //   </div>
  // )

  const [follower, setfollower] = useState([]);

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
        // console.log("Connection successful, data push successful");
        // console.log(data, "userfollower");

        if (data.status === "ok") {
          let arr = data.data;
          document.getElementById("follower_user").innerHTML = arr[0].User_Name_user;
          let x = []
          for (let i = 0; i < arr.length; i++)
            x = x.concat(arr[i].User_Name_follower);
          setfollower(x);
        }
        else if (data.error === "error") {
          alert("Followers not Found. Internal Server Error 500");
        }
      });
  }, []);
  return (
    <div className="text-center text-danger font-weight-bold">
      <p style={{ fontSize: 30, textDecorationLine: "underline" }} >Username: </p><p style={{ fontSize: 30 }} id="follower_user"></p>
      <p style={{ fontSize: 30, textDecorationLine: "underline" }} >Followers: </p><p style={{ fontSize: 30 }} id="follower_followers"></p>
      <div>
        <Initial_Followers follower = {follower} />
      </div>
    </div>
  )
}

export default Profile_Followers