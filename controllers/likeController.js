const Like = require('../models/likeModel');
const Post = require('../models/postModel');

const likePost = async (req, res) => {
    try {
        const { post, user } = req.body;
        const like = await Like.create({ post, user });
        
        const updatedPost = await Post.findByIdAndUpdate(
            post, 
            { $push: { likes: like._id } }, // Use _id explicitly
            { new: true }
        )
        .populate("likes") // Make sure likes is referenced correctly
        .exec();

        if (updatedPost) {
            res.status(200).json(updatedPost);
            console.log('Post is successfully liked');
        } else {
            console.log("Post not found");
            res.status(500).json({ message: "Post Not found" });
        }
    } catch (error) {
        res.status(500).json(error);
        console.log('Error occurred while liking the post');
    }
};

const unlikePost = async (req, res) => {
    try {
        const { post, like } = req.body;

        const unlikedpost = await Like.findOneAndDelete({ post: post, _id: like });
        
        if (!unlikedpost) {
            res.status(400).json({ message: "Like not found" });
            return;
        }

        const updatedPost = await Post.findByIdAndUpdate(
            post, 
            { $pull: { likes: unlikedpost._id } }, // Use _id explicitly
            { new: true }
        );

        if (updatedPost) {
            res.status(200).json(updatedPost);
            console.log('Post is successfully unliked');
        } else {
            console.log("Post not found");
            res.status(500).json({ message: "Post Not found" });
        }
    } catch (error) {
        res.status(500).json(error);
        console.log('Error occurred while unliking the post');
    }
};

const dummy = (req, res) => {
    res.send("You are on dummy routes");
};

module.exports = { likePost, dummy, unlikePost };
