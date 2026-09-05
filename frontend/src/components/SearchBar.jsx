function SearchBar({ username, onSearch }) {
  return (
    <div className="search-section">
      <input
        type="text"
        placeholder="Search posts or users..."
        onChange={(e) => onSearch(e.target.value)}
      />

      <div className="search-avatar">
        {username?.charAt(0).toUpperCase() || "U"}
      </div>
    </div>
  );
}

export default SearchBar;