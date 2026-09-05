import { useState } from "react";
import CommentSection from "./CommentSection";

function Post({
  post,
  userId,
  handleLike,
  handleDelete,
  commentText,
  setCommentText,
  handleComment,
}) {
  const [showMenu, setShowMenu] = useState(false);

  const isLiked = post.likes?.some(
    (like) => like.user?.toString() === userId
  );

  const isOwner = post.user?.toString() === userId;

  return (
    <article className="social-post">
      <div className="post-header">
        <div className="user-info">
          <div className="user-avatar">
            {post.username?.charAt(0).toUpperCase()}
          </div>

          <div>
            <strong>{post.username}</strong>

            <span className="post-time">
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {isOwner && (
          <div className="post-menu-wrapper">
            <button
              className="post-menu-button"
              onClick={() => setShowMenu(!showMenu)}
              title="More options"
            >
              ⋮
            </button>

            {showMenu && (
              <div className="post-menu">
                <button
                  className="delete-menu-item"
                  onClick={() => {
                    setShowMenu(false);
                    handleDelete(post._id);
                  }}
                >
                  🗑️ Delete Post
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="post-content">
        {post.text && (
          <p className="post-text">{post.text}</p>
        )}

        {post.image && (
          <img
            src={post.image}
            alt="Post"
            className="post-image"
          />
        )}
      </div>

      <div className="post-actions">
        <button
          className={isLiked ? "liked" : ""}
          onClick={() => handleLike(post._id)}
        >
          <span className="action-icon">
            {isLiked ? "♥" : "♡"}
          </span>

          <span>{post.likes?.length || 0}</span>
        </button>

        <button>
          <span className="action-icon">💬</span>
          <span>{post.comments?.length || 0}</span>
        </button>
      </div>

      <CommentSection
        post={post}
        commentText={commentText}
        setCommentText={setCommentText}
        handleComment={handleComment}
      />
    </article>
  );
}

export default Post;