import React, { useState, useEffect } from 'react'

const Subgreiddits_join_req = () => {

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

  function JoiningRequestsDisplay() {

    const respond_request = (flag, i) => {
      let sender = document.getElementById(i+3688).innerHTML;
      fetch("/api/sg_respond_req", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Accept-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          token: window.localStorage.getItem("token"),
          flag: flag,
          receiver: name,
          sender: sender,
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
    }


    const [join_req, setjoin_req] = useState([]);
    useEffect(() => {
      fetch("/api/sg_join_req", {
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
          console.log(data, "subgreiddit_joining_req_page");

          if (data.status === "ok") {
            if (data.data.length > 0) {
              alert("Joining Requests Found");
              setjoin_req(data.data);
            }
            else
              alert("No Joining Requests to Display");
          }
          else if (data.error === "error") {
            alert("Internal Server Error 500");
          }
        });
    }, []);

    return (
      <div className='text-center text-danger'>
        <h3><span>Joining Requests: </span>
          {join_req.length > 0 ?
            join_req.map((element, i) => {
              let sender = element.Sender;
              return (
                <div>
                  <br />
                  <h3><span id={i + 3688}>{sender}</span>
                    <span><button onClick={() => respond_request(1, i)} style={{ marginLeft: 10 }} className='btn btn-outline-success'>Accept</button></span>
                    <span><button onClick={() => respond_request(0, i)} style={{ marginLeft: 10 }} className='btn btn-outline-danger'>Reject</button></span></h3>
                </div>
              )
            }) : <span>None</span>}
        </h3>
      </div>
    )
  }

  return (
    <div className='text-center text-danger'>
      <h3>Subgreiddits Joining Requests</h3>
      <JoiningRequestsDisplay />
    </div>
  )
}

export default Subgreiddits_join_req