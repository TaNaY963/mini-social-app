function CreatePost({
  text,
  setText,
  image,
  setImage,
  handleCreatePost,
}) {
  const canPost = text.trim() || image;

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
    }
  };

  return (
    <section className="create-post-card">
      <div className="create-post-header">
        <h2>Create Post</h2>
      </div>

      <form onSubmit={handleCreatePost}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's on your mind?"
        />

        {/* Image Preview */}
        {image && (
          <div className="image-preview">
            <img
              src={URL.createObjectURL(image)}
              alt="Selected"
            />

            <button
              type="button"
              onClick={() => setImage(null)}
              className="remove-image"
            >
              ✕
            </button>
          </div>
        )}

        <div className="create-post-bottom">
          <label className="upload-image-button">
            📷 Upload Image

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />
          </label>

          <button
            type="submit"
            className={
              canPost
                ? "post-button enabled"
                : "post-button"
            }
            disabled={!canPost}
          >
            Post
          </button>
        </div>
      </form>
    </section>
  );
}

export default CreatePost;

