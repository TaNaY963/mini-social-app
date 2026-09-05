import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

import SocialHeader from "../components/SocialHeader";
import SearchBar from "../components/SearchBar";
import CreatePost from "../components/CreatePost";
import FeedFilters from "../components/FeedFilters";
import Post from "../components/Post";


function Home() {
    const [posts, setPosts] = useState([]);
    const [text, setText] = useState("");
    const [image, setImage] = useState(null);
    const [commentText, setCommentText] = useState({});
    const [activeFilter, setActiveFilter] = useState("All Post");
    const [searchTerm, setSearchTerm] = useState("");
    const username = localStorage.getItem("username");
    const userId = localStorage.getItem("userId");

    // Get posts
    const fetchPosts = async () => {
        try {
            const response = await axios.get(
                `${BASE_URL}/api/posts`
            );

            setPosts(response.data);
        } catch (error) {
            console.log(
                "Failed to fetch posts",
                error
            );
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    // Create post
    const handleCreatePost = async (e) => {
        e.preventDefault();
        if (!text.trim() && !image) {
            alert("Please add text or an image");
            return;
        }
        try {
            const formData = new FormData();
            formData.append("userId", userId);
            formData.append("text", text);
            if (image) {
                formData.append("image", image);
            }
            await axios.post(`${BASE_URL}/api/posts`, formData);
            setText(""); setImage(null);
            fetchPosts();
        }
        catch (error) {
            alert(error.response?.data?.message || "Failed to create post");
        }
    };

    // Like / Unlike
    const handleLike = async (postId) => {
        try {
            await axios.patch(
                `${BASE_URL}/api/posts/${postId}/like`,
                {
                    userId,
                }
            );

            fetchPosts();
        } catch (error) {
            console.log(
                "Like failed",
                error
            );
        }
    };

    // Comment
    const handleComment = async (postId) => {
        const comment = commentText[postId];

        if (!comment?.trim()) {
            return;
        }

        try {
            await axios.post(
                `${BASE_URL}/api/posts/${postId}/comment`,
                {
                    userId,
                    text: comment,
                }
            );

            setCommentText({
                ...commentText,
                [postId]: "",
            });

            fetchPosts();
        } catch (error) {
            console.log(
                "Comment failed",
                error
            );
        }
    };
    const filteredPosts = posts.filter((post) => {
        const search = searchTerm.toLowerCase();

        return (
            post.username?.toLowerCase().includes(search) ||
            post.text?.toLowerCase().includes(search)
        );
    });
    const sortedPosts = [...filteredPosts].sort((a, b) => {
        if (activeFilter === "Most Liked") {
            return (b.likes?.length || 0) - (a.likes?.length || 0);
        }

        if (activeFilter === "Most Commented") {
            return (
                (b.comments?.length || 0) -
                (a.comments?.length || 0)
            );
        }

        return new Date(b.createdAt) - new Date(a.createdAt);
    });
    const handleDelete = async (postId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this post?"
        );

        if (!confirmed) return;

        try {
            await axios.delete(
                `${BASE_URL}/api/posts/${postId}`,
                {
                    data: { userId },
                }
            );

            fetchPosts();
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to delete post"
            );
        }
    };

    return (
        <div className="social-page">

            <SocialHeader
                username={username}
            />

            <SearchBar
                username={username}
                onSearch={setSearchTerm}
            />

            <CreatePost
                text={text}
                setText={setText}
                image={image}
                setImage={setImage}
                handleCreatePost={handleCreatePost}
            />

            <FeedFilters
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
            />

            <main className="feed">

                {filteredPosts.length === 0 ? (
                    <div className="empty-feed">
                        <div>📱</div>

                        <h3>No posts yet</h3>

                        <p>
                            Be the first one to create a post.
                        </p>
                    </div>
                ) : (
                    sortedPosts.map((post) => (
                        <Post
                            key={post._id}
                            post={post}
                            userId={userId}
                            handleLike={handleLike}
                            handleDelete={handleDelete}
                            commentText={commentText}
                            setCommentText={setCommentText}
                            handleComment={handleComment}
                        />
                    ))
                )}

            </main>



        </div>
    );
}

export default Home;