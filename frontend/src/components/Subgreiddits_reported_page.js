import React, { useState, useEffect } from 'react'

const Subgreiddits_reported_page = () => {

  const [ignore, setignore] = useState(false);
  const [countdown, setCountdown] = useState(3);
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

        if (data.status === "ok") {
          setname(data.data.Name);
        }
        else if (data.error === "error") {
          alert("Internal Server Error 500");
        }
      });
  }, []);

  function DisplayReports(props) {

    const block_user = (i) => {
      let name = document.getElementById(i + 1931).innerHTML;
      fetch("/api/block_user", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Accept-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          token: window.localStorage.getItem("token"),
          name: name,
        }),
      }).then((res) => res.json())
        .then((data) => {

          if (data.status === "ok") {
            alert("Subgreiddit Successfully Blocked.");
          }
          else if (data.error === "error") {
            alert("Internal Server Error 500");
          }
        });
    }

    const delete_post = (i, post, concern) => {
      let name = document.getElementById(i + 1931).innerHTML;
      fetch("/api/delete_post", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Accept-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          token: window.localStorage.getItem("token"),
          name: name,
          post: post,
          concern: concern,
        }),
      }).then((res) => res.json())
        .then((data) => {

          if (data.status === "ok") {
            alert("Post Successfully Deleted.");
          }
          else if (data.error === "error") {
            alert("Internal Server Error 500");
          }
        });
    }

    const ignore_button = () => {
      setignore(true);
    }

    return (
      <div className="text-center text-danger">
        <h3><span>Reports Against the Subgreiddit are: </span>{props.reports.length === 0 ? <span>None</span> : null}</h3>
        {props.reports.map((report, i) => {
          let reportedby = report.Reported_By;
          let reporteduser = report.Reported_User;
          let concern = report.Concern;
          let post = report.Post_associated;
          return (
            <div>
              <br />
              <h3><span>Report Index: {i + 1}</span></h3>
              <h3><span>Reported By: {reportedby}</span></h3>
              <h3><span>Reported User: </span><span id={i + 1931}>{reporteduser}</span></h3>
              <h3><span>Concern: {concern}</span></h3>
              <h3><span>Post Associated: {post}</span></h3>
              <h3>
                {ignore ? <button style={{ marginTop: 30 }} className="btn btn-outline-danger" onClick={() => block_user(i)} disabled>Block User</button> : <button style={{ marginTop: 30 }} className="btn btn-outline-danger" onClick={() => block_user(i)}>Block User</button>}
                {ignore ? <button style={{ marginTop: 30, marginLeft: 20 }} className="btn btn-outline-secondary" onClick={() => delete_post(i, post, concern)} disabled>Delete Post</button> : <button style={{ marginTop: 30, marginLeft: 20 }} className="btn btn-outline-secondary" onClick={() => delete_post(i, post, concern)}>Delete Post</button>}
                <button style={{ marginTop: 30, marginLeft: 20 }} className="btn btn-outline-success" onClick={() => ignore_button()}>Ignore</button>
              </h3>
            </div>
          )
        })}
      </div>
    )
  }

  function ShowReports() {
    const [reports, setreports] = useState([]);

    useEffect(() => {
      fetch("/api/show_reports", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Accept-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          token: window.localStorage.getItem("token"),
          name: name,
        }),
      }).then((res) => res.json())
        .then((data) => {
          console.log("Connection successful, data pull successful");
          console.log(data, "show_report");

          if (data.status === "ok") {
            if (data.data.length > 0) {
              setreports(data.data);
            }
            else if (data.data.length === 0) {
              // alert("No Reports found Against the Subgreiddit.");
            }
          }
          else if (data.status === "error") {
            // alert("Cannot find Reports Against the Subgreiddit. Internal Server Error 500.");
          }
        });
    }, []);

    return (
      <div className="text-center text-danger">
        <DisplayReports reports={reports} />
      </div>
    )
  }

  return (
    <div className='text-center text-danger'>
      <h3>Subgreiddit's Reported Page</h3>
      <ShowReports />
    </div>
  )
}

export default Subgreiddits_reported_page