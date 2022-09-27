import React from 'react';
import PropTypes from 'prop-types'; // ES6

function EntriesForm({ search, setSearch }) {
  const handleSearch = (e) => setSearch(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        style={{ marginTop: '23px' }}
        type="search"
        className="custom-input"
        placeholder="🔎 Bucar un Anime..."
        autoComplete="off"
        name="search"
        value={search}
        onChange={handleSearch}
      />
    </form>
  );
}

EntriesForm.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
};

export default EntriesForm;
