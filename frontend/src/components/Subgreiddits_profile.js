import React, { useState, useEffect } from 'react'
import Unknown_person from "../assets/Unknown_person.jpg";


const Subgreiddits_profile = () => {
  const [name, setname] = useState("");
  const [desc, setdesc] = useState("");
  const [tags, settags] = useState("");
  const [ban, setban] = useState("");
  const [post, setpost] = useState(false);
  const [Text, setText] = useState("");
  const [Postedby, setPostedBy] = useState("");
  // const [PostedIn, setPostedIn] = useState("");
  const [Upvotes, setUpvotes] = useState(0);
  const [Downvotes, setDownvotes] = useState(0);

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
        console.log(data, "subgreiddit_profile");

        if (data.status === "ok") {
          setname(data.data.Name);
          settags(data.data.Tags);
          setdesc(data.data.Description);
          setban(data.data.Banned_Keywords);
        }
        else if (data.error === "error") {
          alert("Internal Server Error 500");
        }
      });
  }, []);

  const togglepost = () => {
    setpost(!post);
  }

  const onclick = (ban) => {
    let flag = false;
    let text_send = Text;
    for (let i = 0; i < ban.length; i++)
    {
      if (Text.includes(ban[i])) {
        let startindex = Text.indexOf(ban[i]);
        if (!flag) {
          text_send = Text.replace(Text.substring(startindex, startindex+ban[i].length), "*");
        }
        else {
          text_send = text_send.replace(Text.substring(startindex, startindex+ban[i].length), "*");
        }
        flag = true;
      }
    }
    if (flag)
      alert("Your Post Contains some Banned Keywords and they have been replaced by Asterick Character.");
    fetch("/api/create_post", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Accept-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
        text: text_send,
        postedby: Postedby,
        upvotes: Upvotes,
        downvotes: Downvotes,
        name: name,
      }),
    }).then((res) => res.json())
      .then((data) => {
        console.log("Connection successful, data push successful");
        console.log(data, "post_creation");

        if (data.status === "ok") {
          alert("Post Created Successfully.");
        }
        else if (data.status === "error") {
          alert("Post Could not be Created. Internal Server Error 500");
        }
      });
    setText("");
    setPostedBy("");
    document.getElementById("inputText").value = "";
    document.getElementById("inputPostedBy").value = "";
  }

  function SubmitButtonPost() {
    const [ban, setban] = useState([]);

    useEffect(() => {
      fetch("/api/banned_keywords", {
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
            let x = [];
            for (let i = 0; i < data.data.length; i++)
              x = x.concat(data.data[i].Banned_Keywords.split(" "));
            setban(x);
          }
          else if (data.status === "error") {
            console.log("inside data.status='error' block");
          }
        });
    }, []);

    if (Text && Postedby) {
      return <button className="btn btn-success" type="button" style={{ "marginTop": 20, "marginBottom": 30 }} id="submit_button" onClick={() => onclick(ban)}>Submit</button>
    } else {
      return <button className="btn btn-success" type="button" style={{ "marginTop": 20, "marginBottom": 30 }} id="submit_button" onClick={() => onclick(ban)} disabled>Submit</button>
    };
  }

  function Display(props) {

    const handleClick = (flag, i, id) => {
      let text = document.getElementById(2 * i + 6282 + flag).innerHTML.split(" ")[1];
      fetch("/api/upvotes_downvotes", {
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
          name: name,
          text: text,
          id: id,
        }),
      }).then((res) => res.json())
        .then((data) => {
          console.log("Connection successful, data pull successful");
          console.log(data, "post_display");

          if (data.status === "ok") {
            if (!flag)
              alert("Post Upvoted");
            else
              alert("Post Downvoted");
          }
          else if (data.status === "error") {
            alert("Post Could not be Upvoted/Downvoted. Internal Server Error 500");
          }
        });
    }

    const Add_Comment = (id) => {
      console.log("id = ", id);
      alert("Button Clicked");
    }

    const Save_Post = (id) => {
      fetch("/api/save_post", {
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
          id: id,
        }),
      }).then((res) => res.json())
        .then((data) => {
          console.log("Connection successful, data pull successful");
          console.log(data, "save_post");

          if (data.status === "ok") {
            alert("Post Saved Successfully.")
          }
          else if (data.status === "error") {
            alert("Post Could not be Saved. Internal Server Error 500");
          }
        });
    }

    const Follow_User = (name, postedby) => {
      if (name === postedby)
        alert("A User cannot Follow Himself/Herself");
      else {
        fetch("/api/follow_user", {
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
            postedby: postedby,
          }),
        }).then((res) => res.json())
          .then((data) => {
            console.log("Connection successful, data pull successful");
            console.log(data, "save_post");

            if (data.status === "ok") {
              alert("Following Added")
            }
            else if (data.status === "error") {
              alert("User already Follows The User who Created the Post.");
            }
            else if (data.error === "error") {
              alert("Following could not be Added. Internal Server Error 500.");
            }
          });
      }
    }

    return (
      <div>
        {props.posts.map((post, i) => {
          let text = post.Text;
          let id = post._id;
          let postedby = post.Posted_By;
          let upvotes = post.Upvotes;
          let downvotes = post.Downvotes;
          let Is_Saved = post.Is_Saved;
          return (
            <div className='text-center text-primary'>
              <h3 style={{ marginTop: 50 }} ><span>Post Index: {i + 1}</span><span><button id={2 * i + 6282} style={{ marginLeft: 20 }} className="btn btn-outline-success" onClick={() => handleClick(0, i, id)}>Upvotes: {upvotes}</button></span><span><button id={2 * i + 6283} style={{ marginLeft: 20 }} className="btn btn-outline-danger" onClick={() => handleClick(1, i, id)}>Downvotes: {downvotes}</button></span></h3>
              <h3><span>Text: {text}</span></h3>
              <h3><span>Posted By: {postedby}</span></h3>
              <button className='btn text-info btn-secondary' onClick={() => Add_Comment(id)}>Add a Comment</button>
              {Is_Saved ? <button style={{ marginLeft: 30 }} className='btn text-info btn-secondary' onClick={() => Save_Post(id)} disabled>Save Post</button> : <button style={{ marginLeft: 30 }} className='btn text-info btn-secondary' onClick={() => Save_Post(id)}>Save Post</button>}
              <button style={{ marginLeft: 30 }} className='btn text-warning btn-primary' onClick={() => Follow_User(name, postedby)}>Follow {postedby}</button>
            </div>
          )
        })}
      </div>
    )
  }

  function PostsDisplay() {
    const [posts, setposts] = useState([]);
    useEffect(() => {
      fetch("/api/show_posts", {
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
          console.log(data, "post_display");

          if (data.status === "ok") {
            setposts(data.data);
          }
          else if (data.status === "error") {
            alert("Post Could not be Rendered. Internal Server Error 500");
          }
        });
    }, []);
    return (
      <div>
        <Display posts={posts} />
      </div>
    )
  }

  return (
    <>
      <div>
        <img style={{ width: 300, height: 300, position: 'relative', left: 10 }} src={Unknown_person} alt="Unknown Person" />
      </div>
      <div className='text-center text-danger'>
        <h3>
          <div className="mb-3 row text-center text-danger">
            <label htmlFor="sg_profile_name" className="col-sm-2 col-form-label">Name</label>
            <div className="col-sm-10">
              <input type="text" readOnly className="form-control-plaintext" id="sg_profile_name" value={name} />
            </div>
          </div>
          <div className="mb-3 row text-center text-danger">
            <label htmlFor="sg_profile_tags" className="col-sm-2 col-form-label">Tags</label>
            <div className="col-sm-10">
              <input type="text" readOnly className="form-control-plaintext" id="sg_profile_tags" value={tags} />
            </div>
          </div>
          <div className="mb-3 row text-center text-danger">
            <label htmlFor="sg_profile_desc" className="col-sm-2 col-form-label">Description</label>
            <div className="col-sm-10">
              <input type="text" readOnly className="form-control-plaintext" id="sg_profile_desc" value={desc} />
            </div>
          </div>
          <div className="mb-3 row text-center text-danger">
            <label htmlFor="sg_profile_ban" className="col-sm-2 col-form-label">Banned Keywords</label>
            <div className="col-sm-10">
              <input type="text" readOnly className="form-control-plaintext" id="sg_profile_ban" value={ban} />
            </div>
          </div>
        </h3>
        <button onClick={togglepost} className='btn btn-outline-secondary text-info'>{post ? <h3>Hide Form</h3> : <h3>Create a Post</h3>}</button>
        {post ? <div className='text-primary'>
          <h3 style={{ marginTop: 20 }}>Enter the Details of the New Post</h3>
          <br />
          <label htmlFor="inputText" className="text-danger font-weight-bold" style={{ "marginRight": 200, "marginTop": 10, fontWeight: 'bold', fontSize: 30 }}>Text</label>
          <input type="text" id="inputText" onChange={e => setText(e.target.value)} />
          <br />
          <label htmlFor="inputPostedBy" className="text-danger font-weight-bold" style={{ "marginRight": 120, "marginTop": 20, fontWeight: 'bold', fontSize: 30 }}>Posted By</label>
          <input type="text" id="inputPostedBy" onChange={e => setPostedBy(e.target.value)} />
          <br />
          <br />
          <SubmitButtonPost />
        </div>
          : null}
        <h3 style={{ marginTop: 30 }}><span>Posts Uploaded till now are: </span></h3>
        <PostsDisplay />
      </div>
    </>
  )
}

export default Subgreiddits_profile

// {/* <br /> */}
// <label htmlFor="inputPostedIn" className="text-danger font-weight-bold" style={{ "marginRight": 130, "marginTop": 20, fontWeight: 'bold', fontSize: 30 }}>Posted In</label>
// <input type="text" id="inputPostedIn" onChange={e => setPostedIn(e.target.value)} />