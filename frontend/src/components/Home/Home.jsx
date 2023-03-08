import React from "react";
import Post from "../Post/Post";
import User from "../User/User";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <div className="homeleft">
        <Post
          postImage={
            "https://i.scdn.co/image/ab67616d0000b2735f79f39167623aca3e1af0c9"
          }
          ownerName={"Aditya Singh"}
          caption={"Oni chan"}
        />
      </div>
      <div className="homeright">
        <User
          userId={"user._id"}
          name={"Aditya Singh"}
          avatar={"https://adi-ty.github.io/new-portfolio/img/hero.jpg"}
        />
      </div>
    </div>
  );
};

export default Home;
