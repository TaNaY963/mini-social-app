function CommentSection({
  post,
  commentText,
  setCommentText,
  handleComment,
}) {
  return (
    <div className="comments-area">

      {post.comments?.map((comment, index) => (
        <div
          className="comment"
          key={index}
        >
          <strong>
            {comment.username}
          </strong>

          <span>
            {comment.text}
          </span>
        </div>
      ))}

      <div className="comment-input-row">
        <input
          type="text"
          placeholder="Write a comment..."
          value={commentText[post._id] || ""}
          onChange={(e) =>
            setCommentText({
              ...commentText,
              [post._id]: e.target.value,
            })
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleComment(post._id);
            }
          }}
        />

        <button
          onClick={() => handleComment(post._id)}
        >
          ➤
        </button>
      </div>

    </div>
  );
}

export default CommentSection;