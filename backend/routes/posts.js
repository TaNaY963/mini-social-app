const express = require("express");
const multer = require("multer");
const Post = require("../models/Post");
const User = require("../models/User");
const cloudinary = require("../config/cloudinary");

const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

// Get all posts
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });

        res.json(posts);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch posts",
        });
    }
});

// Create post
router.post("/", upload.single("image"), async (req, res) => {
    try {
        console.log("BODY:", req.body);
        console.log("FILE:", req.file);

        const { userId, text } = req.body;

        if (!userId) {
            return res.status(400).json({
                message: "User ID is required",
            });
        }

        if (!text?.trim() && !req.file) {
            return res.status(400).json({
                message: "Post must contain text or image",
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        let imageUrl = "";

        // Upload image to Cloudinary
        if (req.file) {
            const uploadResult = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        folder: "social-posts",
                    },
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    }
                );

                stream.end(req.file.buffer);
            });

            imageUrl = uploadResult.secure_url;

            console.log("CLOUDINARY URL:", imageUrl);
        }

        const post = await Post.create({
            user: user._id,
            username: user.username,
            text: text || "",
            image: imageUrl,
        });

        res.status(201).json(post);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to create post",
        });
    }
});
// Delete post
router.delete("/:postId", async (req, res) => {
    try {
        const { userId } = req.body;

        const post = await Post.findById(req.params.postId);

        if (!post) {
            return res.status(404).json({
                message: "Post not found",
            });
        }

        // Only the user who created the post can delete it
        if (post.user.toString() !== userId) {
            return res.status(403).json({
                message: "You can only delete your own posts",
            });
        }

        await Post.findByIdAndDelete(req.params.postId);

        res.json({
            message: "Post deleted successfully",
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to delete post",
        });
    }
});
// Like / Unlike post
router.patch("/:postId/like", async (req, res) => {
    try {
        const { userId } = req.body;

        const post = await Post.findById(req.params.postId);

        if (!post) {
            return res.status(404).json({
                message: "Post not found",
            });
        }

        const alreadyLiked = post.likes.some(
            (like) => like.user.toString() === userId
        );

        if (alreadyLiked) {
            post.likes = post.likes.filter(
                (like) => like.user.toString() !== userId
            );
        } else {
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({
                    message: "User not found",
                });
            }

            post.likes.push({
                user: user._id,
                username: user.username,
            });
        }

        await post.save();

        res.json(post);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to like post",
        });
    }
});

// Add comment
router.post("/:postId/comment", async (req, res) => {
    try {
        const { userId, text } = req.body;

        if (!userId || !text?.trim()) {
            return res.status(400).json({
                message: "User ID and comment are required",
            });
        }

        const post = await Post.findById(req.params.postId);

        if (!post) {
            return res.status(404).json({
                message: "Post not found",
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        post.comments.push({
            user: user._id,
            username: user.username,
            text: text.trim(),
        });

        await post.save();

        res.json(post);
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to add comment",
        });
    }
});

module.exports = router;