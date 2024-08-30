import React, { useState, useEffect } from 'react'

const Subgreiddits_users = () => {
  const [name, setname] = useState("");

  useEffect(() => {
    fetch("/api/search_user_by_id", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Accept-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
        id: window.location.pathname.split("/")[2],
      }),
    }).then((res) => res.json())
      .then((data) => {
        console.log("Connection successful, data push successful");
        console.log(data, "subgreiddit_users");

        if (data.status === "ok") {
          setname(data.data.Name);
        }
        else if (data.error === "error") {
          alert("Internal Server Error 500");
        }
      });
  }, []);

  function UsersDisplay() {
    const [sg_regular_users, setsg_regular_users] = useState([]);
    const [sg_blocked_users, setsg_blocked_users] = useState([]);
    useEffect(() => {
      fetch("/api/sg_users", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Accept-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          token: window.localStorage.getItem("token"),
          uname: name,
        }),
      }).then((res) => res.json())
        .then((data) => {
          console.log("Connection successful, data push successful");
          console.log(data, "subgreiddit_users");

          if (data.status === "ok") {
            if (data.data.length > 0) {
              console.log("Subgreiddit's Users Found");
              let x = [], y = [];
              for (let i = 0; i < data.data.length; i++) {
                if (data.data[i].Is_Blocked)
                  x = x.concat(data.data[i]);
                else
                  y = y.concat(data.data[i]);
              }
              setsg_blocked_users(x);
              setsg_regular_users(y);
            }
            else {
              console.log("Subgreiddit's Users Not Found");
            }
          }
          else if (data.error === "error") {
            alert("Internal Server Error 500");
          }
        });
    }, []);

    return (
      <div className='text-center text-danger'>
        <h3><span>Regular Users are: </span>
          {sg_regular_users.length > 0 ?
            sg_regular_users.map((element, i) => {
              let name = element.Name;
              return (
                <div>
                  <h3 id={i + 5373}>{name}</h3>
                </div>
              )
            }) : <span>None</span>}
        </h3>
        <h3><span>Blocked Users are: </span>
          {sg_blocked_users.length > 0 ?
            sg_blocked_users.map((element, i) => {
              let name = element.Name;
              return (
                <div>
                  <span id={i + 5736}>{name}</span>
                </div>
              )
            }) : <span>None</span>}
        </h3>
      </div>
    )
  }

  return (
    <div className='text-center text-danger'>
      <h3>Subgreiddits Users</h3>
      <UsersDisplay />
    </div>
  )
}

export default Subgreiddits_users