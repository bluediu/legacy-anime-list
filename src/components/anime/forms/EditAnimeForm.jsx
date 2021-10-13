import React from 'react';
import PropTypes from 'prop-types'; // ES6
import { memo } from 'react';

function EditAnimeForm({
  handleValidEntryObserver,
  title,
  handleChange,
}) {
  return (
    <form onBlur={handleValidEntryObserver}>
      <input
        style={{ marginTop: '23px' }}
        type="text"
        className="custom-input"
        name="title"
        value={title}
        onChange={handleChange}
        autoComplete="off"
      />
    </form>
  );
}

EditAnimeForm.propTypes = {
  handleValidEntryObserver: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default memo(EditAnimeForm);
