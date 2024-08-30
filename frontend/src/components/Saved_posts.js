import React, { useState, useEffect } from 'react'

const Saved_posts = () => {

    const [saved_posts, setsaved_posts] = useState([]);

    useEffect(() => {
        fetch("/api/show_save_post", {
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
                console.log("Connection successful, data pull successful");
                console.log(data, "save_post");

                if (data.status === "ok") {
                    alert("Saved Posts Found.");
                    setsaved_posts(data.data);
                }
                else if (data.status === "error") {
                    alert("Post Could not be Saved. Internal Server Error 500");
                }
            });
    }, []);

    const remove_post = (i, id) => {
        fetch("/api/remove_save_post", {
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
                id: id,
            }),
        }).then((res) => res.json())
            .then((data) => {
                console.log("Connection successful, data pull successful");
                console.log(data, "save_post");

                if (data.status === "ok") {
                    alert("Saved Posts Deleted.");
                }
                else if (data.status === "error") {
                    alert("Post Could not be Deleted. Internal Server Error 500");
                }
            });
    }

    function DisplaySavedPosts(props) {
        return (
            <div className="text-center text-danger">
                {props.saved_posts.map((post, i) => {
                    let text = post.Text;
                    let postedby = post.Posted_By;
                    let postedin = post.Posted_In;
                    let upvotes = post.Upvotes;
                    let downvotes = post.Downvotes;
                    let id = post._id;
                    return (
                        <div>
                            <br />
                            <h3><span>Post Index: {i + 1}</span><span><button htmlFor={i + 9281} type="submit" style={{ "marginLeft": 20 }} className="btn btn-outline-danger" onClick={() => remove_post(i, id)}>Remove Saved Post</button></span></h3>
                            <h3><span id={i + 9281}>Text: {text}</span></h3>
                            <h3><span>Posted By: {postedby}</span></h3>
                            <h3><span>Posted In: {postedin}</span></h3>
                            <h3><span>Upvotes: {upvotes}</span></h3>
                            <h3><span>Downvotes: {downvotes}</span></h3>
                        </div>
                    )
                })}
            </div>
        )
    }

    return (
        <div className='text-center text-danger'>
            <h3>Saved Posts Page</h3>
            <h3>Saved Posts Posted by User across all Joined SubGreiddits are: </h3>
            <DisplaySavedPosts saved_posts={saved_posts} />
        </div>
    )
}

export default Saved_posts