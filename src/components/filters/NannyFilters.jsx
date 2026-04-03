const NannyFilters = ({ sortBy, setSortBy }) => {
  return (
    <div className="filters-bar">
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="name_asc">A to Z</option>
        <option value="name_desc">Z to A</option>
        <option value="rating_desc">Popular</option>
        <option value="rating_asc">Not popular</option>
      </select>
    </div>
  );
};

export default NannyFilters;