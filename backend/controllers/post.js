const Post = require("../models/Post");
const User = require("../models/User");

exports.createPost = async (req, res) => {
  try {
    //Taking data for the post
    const newPostData = {
      caption: req.body.caption,
      image: {
        public_id: "req.body.public_id",
        url: "req.body.url",
      },
      owner: req.user._id,
    };
    //Creating post
    const post = await Post.create(newPostData);
    //pushing post into the post array for the user id who is creating the post
    const user = await User.findById(req.user._id);

    user.posts.push(post._id);

    // Saving and res
    await user.save();
    res.status(201).json({
      success: true,
      post,
    });
  } catch (error) {
    //Internal server error
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    // finding post
    const post = await Post.findById(req.params.id);
    // if post not found
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    // checking post to be deleted request is from the same user id who created the post or not
    if (post.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }
    // removing post
    await post.remove();
    // removing post from posts array in user id
    const user = await User.findById(req.user._id);

    const index = user.posts.indexOf(req.params.id);
    user.posts.splice(index, 1);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Post Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.likeAndUnlikePost = async (req, res) => {
  try {
    // finding post
    const post = await Post.findById(req.params.id);
    // if post not found
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }
    // if post already liked delete like
    if (post.likes.includes(req.user._id)) {
      const index = post.likes.indexOf(req.user._id);

      post.likes.splice(index, 1);

      await post.save();

      return res.status(200).json({
        success: true,
        message: "Post Unliked",
      });
    } else {
      // if not liked then like
      post.likes.push(req.user._id);

      await post.save();

      return res.status(200).json({
        success: true,
        message: "Post liked",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getPostOfFollowing = async (req, res) => {
  try {
    // const user = await User.findById(req.user._id).populate( //finding user and populating the following by the posts of the user
    //   "following",
    //   "posts"
    // );
    // res.status(200).json({
    //   success: true,
    //   following: user.following,
    // });
    // better way to find following posts
    const user = await User.findById(req.user._id); //finding user

    // Matching the user id from following lists with all the owner id of the posts to find posts
    const posts = await Post.find({
      owner: {
        $in: user.following, // $in operator in mongoDB => value of owner is equal to any value in user.following array
      },
    });

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateCaption = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    if (post.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    post.caption = req.body.caption;
    await post.save();
    res.status(200).json({
      success: true,
      message: "Post Updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
