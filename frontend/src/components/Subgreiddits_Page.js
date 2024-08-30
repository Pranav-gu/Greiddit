import React, { useState, useEffect } from 'react'

const Subgreiddits_Page = () => {
  const [search, setsearch] = useState("");
  const [arr, setarr] = useState([]);
  // let selected_tags = [];
  const [selected_tags, setselected_tags] = useState([]);
  const [db_users, setdb_users] = useState([]);


  const search_sg = () => {
    setarr([]);
    let str = document.getElementById("search_bar").value;
    if (selected_tags.length > 0) {
      fetch("/api/search_subgreiddit", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Accept-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          token: window.localStorage.getItem("token"),
          selected_tags: selected_tags,
        }),
      }).then((res) => res.json())
        .then((data) => {
          console.log("Connection successful, data push successful");
          console.log(data, "subgreiddit_page");

          if (data.status === "ok") {
            if (data.data.length === 0)
              alert("Subgreiddits Not Found");
            else {
              alert("Subgreiddits Found");
              // let x = [];
              // for (let i = 0; i < data.data.length; i++)
              // x = x.concat(data.data[i].Name);
              // setarr(x);
              setarr(data.data);
            }
            document.getElementById("search_bar").value = "";
            setsearch(false);
          }
          else if (data.error === "error") {
            alert("Internal Server Error 500");
          }
        });
    }
    else {
      fetch("/api/search_subgreiddit", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Accept-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          token: window.localStorage.getItem("token"),
          str: str,
        }),
      }).then((res) => res.json())
        .then((data) => {
          console.log("Connection successful, data push successful");
          console.log(data, "subgreiddit_page");

          if (data.status === "ok") {
            if (data.data.length === 0)
              alert("Subgreiddits Not Found");
            else {
              alert("Subgreiddits Found");
              // let x = [];
              // for (let i = 0; i < data.data.length; i++)
              // x = x.concat(data.data[i].Name);
              // setarr(x);
              setarr(data.data);
            }
            document.getElementById("search_bar").value = "";
            setsearch(false);
          }
          else if (data.error === "error") {
            alert("Internal Server Error 500");
          }
        });
    }
    console.log("xerneas used x-scissor");
  }


  const include_tag = (i) => {
    let str = document.getElementById(i + 5673).innerHTML;
    let x = [];
    x = x.concat(selected_tags);
    if (!selected_tags.includes(str)) {
      x = x.concat(str);
      setselected_tags(x);
      // selected_tags = selected_tags.concat(str);
    }
  }

  const remove_tag = (i) => {
    let str = document.getElementById(i + 5673).innerHTML;
    let x = [];
    x = x.concat(selected_tags);
    const index = x.indexOf(str);
    const y = x.splice(index, 1);
    console.log(y);
    setselected_tags(x);
  }

  function DisplayTags(props) {
    return (
      <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          Filter Based On Tags
        </button>
        <ul className="dropdown-menu">
          <h6><center>Available Tags are: </center></h6>
          {props.tags.map((tag, i) => {
            return (
              <div>
                <li><button id={i + 5673} className="dropdown-item" onClick={() => include_tag(i)}>{tag}</button></li>
              </div>
            )
          })}
        </ul>
        {selected_tags.length > 0 ? <div>
          <br />
          <h3>Selected Tags:</h3>
          {selected_tags.map((element, i) => {
            return (
              <div>
                <h3><span>{element}<button style={{ marginLeft: 50 }} className="btn btn-outline-danger" onClick={() => remove_tag(i)}>Remove</button></span></h3>
              </div>
            )
          })}
          <h3>In Case you have Selected all The Tags you want, Type Yes in the Search Bar and Press the Submit Button to Continue</h3>
        </div> : null}
      </div>
    )
  }

  function SearchTags() {
    const [tags, settags] = useState([]);
    useEffect(() => {
      fetch("/api/filter_sg_tags", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Accept-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          token: window.localStorage.getItem("token"),
        }),
      }).then((res) => res.json())
        .then((data) => {
          console.log("Connection successful, data push successful");
          console.log(data, "subgreiddit_page");

          if (data.status === "ok") {
            settags(data.data);
          }
          else if (data.error === "error") {
            alert("Internal Server Error 500");
          }
        });
    }, []);
    return (
      <div>
        <DisplayTags tags={tags} />
      </div>
    )
  }

  const ascending_sort = () => {
    let x = [];
    for (let i = 0; i < arr.length; i++)
      x = x.concat(arr[i]);
    x.sort(function (a, b) {
      const nameA = a.Name.toUpperCase();
      const nameB = b.Name.toUpperCase();
      if (nameA > nameB)
        return 1;
      if (nameA < nameB)
        return -1;
      return 0;
    });
    setarr(x);
  }

  const descending_sort = () => {
    let x = [];
    for (let i = 0; i < arr.length; i++)
      x = x.concat(arr[i]);
    x.sort(function (a, b) {
      const nameA = a.Name.toUpperCase();
      const nameB = b.Name.toUpperCase();
      if (nameA > nameB)
        return -1;
      if (nameA < nameB)
        return 1;
      return 0;
    });
    setarr(x);
  }


  var dateFromObjectId = function (objectId) {
    return new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
  };

  const sort_time = () => {
    let x = [];
    for (let i = 0; i < arr.length; i++)
      x = x.concat(arr[i]);
    x.sort(function (a, b) {
      var m = dateFromObjectId(a._id);
      var n = dateFromObjectId(b._id);
      if (n.getTime() > m.getTime()) {
        return -1;
      }
      if (m.getTime() < n.getTime()) {
        return 1;
      }
      return 0;
    });
    setarr(x);
  }

  function SubgreidditMatch(props) {
    return (
      <div className='text-center text-danger'>
        <h3>
          {/* {arr.map((element) => {
            return (
              <div>
                <span>{element}</span>
              </div>
            )
          })} */}
          {props.arr.map((element) => {
            let name = element.Name;
            let desc = element.Description;
            let tags = element.Tags;
            let ban = element.Banned_Keywords;
            return (
              <div>
                <h3><span>Name: </span><span style={{ marginRight: 20 }}>{name}</span></h3>
                <h3><span>Tags: </span><span>{tags}</span></h3>
                <h3><span>Description: </span><span>{desc}</span></h3>
                <h3><span>Banned Keywords: </span><span>{ban}</span></h3>
                <br />
                <br />
                <br />
              </div>
            )
          })}
        </h3>
      </div>
    )
  }

  useEffect(() => {
    fetch("/api/db_users", {
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
      }),
    }).then((res) => res.json())
      .then((data) => {
        console.log("Connection successful, data push successful");
        console.log(data, "subgreiddit_joining_req_page");

        if (data.status === "ok") {
          setdb_users(data.data);
        }
      });
  }, []);

  function SubmitSearch() {
    if ((selected_tags.length === 0 && search) || (selected_tags.length > 0 && search === "Yes")) {
      return <button style={{ marginTop: 10 }} className='btn btn-success' onClick={() => search_sg()}>Submit</button>
    } else {
      return <button style={{ marginTop: 10 }} className='btn btn-success' onClick={() => search_sg()} disabled>Submit</button>
    }
  }

  const send_join_req = (i) => {
    let name = document.getElementById(i + 8463).innerHTML;
    fetch("/api/send_sg_join_req", {
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
        name: name,
      }),
    }).then((res) => res.json())
      .then((data) => {
        console.log("Connection successful, data push successful");
        console.log(data, "send_subgreiddit_joining_req");

        if (data.status === "ok") {
          alert("Joining Request Sent");
        }
        else if (data.error === "error" && data.data === "Request Already Sent") {
          alert("Request Already Sent");
        }
        else if (data.error === "error" && data.data === "Can not Join this Subgreiddit") {
          alert("Can not Join this Subgreiddit. The Subgreiddit Left it.");
        }
        else if (data.error === "error" && data.data === "Joining Request Could Not be Sent") {
          alert("Joining Request Could Not be Sent. Internal Server Error 500");
        }
      });
  }

  function SortFunctionality() {
    const [send_req, setsend_req] = useState(false);

    const invertsend_req = () => {
      setsend_req(true);
    }

    return (
      <div>
        <button className="btn btn-outline-secondary my-2 mx-2" onClick={ascending_sort}>Sort Based on Name (Ascending)</button>
        <button className="btn btn-outline-secondary my-2 mx-2" onClick={descending_sort}>Sort Based on Name (Descending)</button>
        <button className="btn btn-outline-secondary my-2 mx-2" onClick={sort_time}>Sort Based on Creation Time (Descending)</button>
        <br /> <br />
        <button className='btn btn-outline-dark' onClick={invertsend_req}>Send a Joining Request.</button>
        {send_req ? <div>{db_users.map((element, i) => {
          let name = element.User_Name;
          return (
            <div>
              <h4 style={{ marginTop: 10 }}><span id={i + 8463}>{name}</span>
                <button htmlFor={i + 8463} type="submit" style={{ "marginLeft": 20 }} className="btn btn-outline-primary" onClick={() => send_join_req(i)}>Send</button></h4>
            </div>
          )
        })}
        </div> : null}
      </div>
    )
  }

  function JoinedSubgreiddits() {

    const leave_sg = (i) => {
      let name = document.getElementById(i + 4483).innerHTML;
      fetch("/api/leave_sg", {
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
          name: name,
        }),
      }).then((res) => res.json())
        .then((data) => {
          console.log("Connection successful, data push successful");
          console.log(data, "leave_sg");

          if (data.status === "ok") {
            alert("Subgreiddit Removed");
          }
          else if (data.status === "error" && data.data === "Subgreddit could not be Removed") {
            alert("Subgreddit could not be Removed. Internal Server Error 500");
          }
        });
    }

    const [sg, setsg] = useState([]);

    useEffect(() => {
      fetch("/api/show_joined_sg", {
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
        }),
      }).then((res) => res.json())
        .then((data) => {
          console.log("Connection successful, data push successful");
          console.log(data, "send_subgreiddit_joining_req");

          if (data.status === "ok") {
            // alert("Subgreiddits Found");
            let x = []
            for (let i = 0; i < data.data.length; i++)
              x = x.concat(data.data[i]);
            setsg(x);
          }
          else if (data.status === "error" && data.data === "Subgreiddit Information Not Found") {
            alert("Subgreiddit Information Not Found. Internal Server Error 500");
          }
        });
    }, []);

    async function search_id(name) {
      let sg_id = null;
      await fetch("/api/search_id_by_user", {
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
          console.log("Connection successful, data push successful");
          console.log(data, "send_subgreiddit_joining_req");

          if (data.status === "ok") {
            console.log("data.data = ", data.data);
            sg_id = data.data;
          }
          else if (data.status === "error" && data.data === "Subgreiddit Information Not Found") {
            alert("Subgreiddit Information Not Found. Internal Server Error 500");
          }
        });
      console.log("sg_id = ", sg_id);
      window.location.pathname = `subgreiddits_page/${sg_id}/profile`;
    }

    const desc_sg = (i) => {
      console.log("i = ", i);
      console.log("hi hello");
      let name = document.getElementById(i + 4483).innerHTML;
      search_id(name);
    }

    return (
      <div style={{ marginTop: 20 }} className="text-center text-danger">
        <h3>Number of People in the Subgreiddit: {sg.length}</h3>
        {sg.map((element, i) => {
          let name = element.Name;
          return (
            <div>
              <h3><span>Subgreiddit Index: {i + 1}</span><span><button onClick={() => desc_sg(i)} className='btn btn-ouline-primary'>Click Here To Open Subgreiddit's Description</button></span></h3>
              <h3><span>Name: </span><span id={i + 4483} style={{ marginRight: 20 }}>{name}</span>
                {window.localStorage.getItem("uname") === name ? <button className='btn btn-outline-danger' disabled>Leave</button> : <button onClick={() => leave_sg(i)} className='btn btn-outline-danger'>Leave</button>}</h3>
            </div>
          )
        })}
      </div >
    )
  }

  return (
    <div className='text-center text-danger'>
      <h3><span>Subgreiddits_Page</span></h3><textarea id="search_bar" style={{ width: 500, height: 30 }} placeholder="Search for Subgreiddits Info" onChange={e => setsearch(e.target.value)}></textarea>
      <SearchTags />
      <SubmitSearch />
      <SortFunctionality />
      {arr.length > 0 ? <div className='text-center text-danger'>
        <h3>Subgreiddits that Matched the Search are: </h3>
        <SubgreidditMatch arr={arr} />
      </div> : null}
      <JoinedSubgreiddits />
    </div>
  )
}

export default Subgreiddits_Page