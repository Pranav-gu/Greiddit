const connectDB = require('./connectDB');
const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
require("./models/User")
const User = mongoose.model("user");
// const Follower = mongoose.model("follower");
// const Following = mongoose.model("following");

connectDB;
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Available Routes
app.use("/api/auth", require("./routes/register.js"))
app.use("/api/login", require("./routes/login.js"))
app.use("/api/profile", require("./routes/profile.js"))
app.use("/api/update_profile", require("./routes/update.js"))
app.use("/api/follower", require("./routes/follower.js"))
app.use("/api/following", require("./routes/following.js"))
app.use("/api/remove_follower", require("./routes/remove_follower.js"))
app.use("/api/remove_following", require("./routes/remove_following.js"))
app.use("/api/my_subgreiddit", require("./routes/my_subgreiddit.js"))
app.use("/api/my_subgreiddit_list", require("./routes/my_subgreiddit_list.js"))
app.use("/api/my_subgreiddit_removal", require("./routes/my_subgreiddit_removal.js"))
app.use("/api/subgreiddit", require("./routes/subgreiddit_page.js"))
app.use("/api/search_subgreiddit", require("./routes/search_subgreiddit.js"))
app.use("/api/filter_sg_tags", require("./routes/filter_sg_tags.js"))
app.use("/api/sg_users", require("./routes/sg_users.js"))
app.use("/api/search_user_by_id", require("./routes/search_user_by_id.js"))
app.use("/api/search_id_by_user", require("./routes/search_id_by_user.js"))
app.use("/api/sg_join_req", require("./routes/sg_join_req.js"))
app.use("/api/db_users", require("./routes/db_users.js"))
app.use("/api/send_sg_join_req", require("./routes/send_sg_join_req.js"))
app.use("/api/sg_respond_req", require("./routes/sg_respond_req.js"))
app.use("/api/show_joined_sg", require("./routes/show_joined_sg.js"))
app.use("/api/leave_sg", require("./routes/leave_sg.js"))
app.use("/api/create_post", require("./routes/create_post.js"))
app.use("/api/show_posts", require("./routes/show_posts.js"))
app.use("/api/upvotes_downvotes", require("./routes/upvotes_downvotes.js"))
app.use("/api/add_comments", require("./routes/add_comments.js"))
app.use("/api/save_post", require("./routes/save_post.js"))
app.use("/api/follow_user", require("./routes/follow_user.js"))
app.use("/api/show_save_post", require("./routes/show_save_post.js"))
app.use("/api/remove_save_post", require("./routes/remove_save_post.js"))
app.use("/api/my_subgreiddit_post", require("./routes/my_subgreiddit_post.js"))
app.use("/api/banned_keywords", require("./routes/banned_keywords.js"))
app.use("/api/show_reports", require("./routes/show_reports.js"))
app.use("/api/block_user", require("./routes/block_user.js"))
app.use("/api/delete_post", require("./routes/delete_post.js"))

// app.get("/", require())

app.listen(port, () => {
    console.log(`Connection Started at http://localhost:${port}`);
})