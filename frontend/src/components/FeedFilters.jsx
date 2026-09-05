function FeedFilters({
  activeFilter,
  setActiveFilter,
}) {
  const filters = [
    "All Post",
    "Most Liked",
    "Most Commented",
  ];

  return (
    <div className="feed-filters">
      {filters.map((filter) => (
        <button
          key={filter}
          className={
            activeFilter === filter
              ? "filter active"
              : "filter"
          }
          onClick={() => setActiveFilter(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

export default FeedFilters;