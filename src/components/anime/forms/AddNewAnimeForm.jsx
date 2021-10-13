import React from 'react';
import PropTypes from 'prop-types'; // ES6

function AddNewAnimeForm({
  handleValidEntryObserver,
  handleSubmit,
  handleChange,
  addNew,
}) {
  return (
    <form
      onBlur={handleValidEntryObserver}
      onSubmit={handleSubmit}
    >
      <input
        style={{ marginTop: '23px' }}
        type="text"
        className="custom-input"
        placeholder="Escribe tu nuevo anime aquí"
        name="addNew"
        value={addNew}
        onChange={handleChange}
        autoComplete="off"
        autoFocus
      />
    </form>
  );
}

AddNewAnimeForm.propTypes = {
  addNew: PropTypes.string.isRequired,
  handleValidEntryObserver: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default AddNewAnimeForm;
