const Comment = require('../models/commentModel');
const Post = require('../models/postModel');

const createComment = async (req, res) => {
    try {
        const { post, user, body } = req.body; // Fetch data from request body
        
        // Create and save the comment in one step
        const savedComment = await Comment.create({ post, user, body });

        // Find the post by ID and add the new comment to the comments array
        const updatedPost = await Post.findByIdAndUpdate(
            post,
            { $push: { comments: savedComment._id } },
            { new: true }
        )
        .populate("comments") // Populate the comments array with full comment documents
        .exec();

        res.status(200).json({ post: updatedPost });
    } catch (error) {
        res.status(500).json({ message: "Error occurred while creating a comment" });
        console.log('Error occurred:', error);
    }
};

const getComment = async (req, res) => {
    try {
        const response = await Comment.find();
        if (response.length > 0) { // Check if there are any posts
            res.status(200).json(response);
            console.log('Comment Fetching is successful');
        } else {
            res.status(400).json({ message: "Comment are not created, you must create some Comments" });
            console.log("Comment are empty/Not created at all");
        }
    } catch (error) {
        res.status(500).json(error);
        console.log("Internal Server error");
    }
};

module.exports = {
    createComment,
    getComment
};
