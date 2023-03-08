import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getFollowingPosts } from "../../Actions/User";
import Post from "../Post/Post";
import User from "../User/User";
import "./Home.css";
import Loader from "../Loader/Loader";
import { Typography } from "@mui/material";

const Home = () => {
  const dispatch = useDispatch();

  const { loading, posts, error } = useSelector(
    (state) => state.postOfFollowing
  );

  const { users, loading: usersLoading } = useSelector(
    (state) => state.allUsers
  );

  useEffect(() => {
    dispatch(getFollowingPosts());
    dispatch(getAllUsers());
  }, [dispatch]);

  return loading === true || usersLoading === true ? (
    <Loader />
  ) : (
    <div className="home">
      <div className="homeleft">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Post
              key={post._id}
              postId={post._id}
              caption={post.caption}
              postImage={post.image.url}
              likes={post.likes}
              comments={post.comments}
              ownerImage={post.owner.avatar.url}
              ownerName={post.owner.name}
              ownerId={post.owner._id}
            />
          ))
        ) : (
          <Typography variant="h6">No posts yet</Typography>
        )}
      </div>
      <div className="homeright">
        {users && users.length > 0 ? (
          users.map((user) => (
            <User userId={user._id} name={user.name} avatar={user.avatar.url} />
          ))
        ) : (
          <Typography>No Users yet</Typography>
        )}
      </div>
    </div>
  );
};

export default Home;
