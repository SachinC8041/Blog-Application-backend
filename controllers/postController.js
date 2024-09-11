const Post = require('../models/postModel');

const postCreate = async (req, res) => {
    try {
        const { title, body } = req.body;
        const savedPost = await Post.create({ title, body });
        res.status(200).json(savedPost);
        console.log("Post creation is successful");
    } catch (error) {
        res.status(500).json(error); // Fixed typo
        console.log('Post creation failed', error);
    }
};

const getPost = async (req, res) => {
    try {
        const response = await Post.find().populate("comments").exec();
        if (response.length > 0) { // Check if there are any posts
            res.status(200).json(response);
            console.log('Post Fetching is successful');
        } else {
            res.status(400).json({ message: "Posts are not created, you must create some posts" });
            console.log("Posts are empty/Not created at all");
        }
    } catch (error) {
        res.status(500).json(error);
        console.log("Internal Server error");
    }
};

module.exports = {
    postCreate,
    getPost
};
