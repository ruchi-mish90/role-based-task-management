const SearchBar = ({ value, onChange }) => {
  return (
    <label className="search-wrap">
      <span>Search</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        type="text"
        placeholder="title or description..."
      />
    </label>
  );
};

export default SearchBar;
