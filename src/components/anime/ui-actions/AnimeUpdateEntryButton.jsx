import React from 'react';
import PropTypes from 'prop-types'; // ES6

import { MdModeEdit } from 'react-icons/md';

function AnimeUpdateEntryButton({ isValidEntry, handleUpdate }) {
  /* styles */
  const updateBtnStyled = {
    margin: 0,
    padding: 0,
    textDecoration: 'none',
    color: 'white',
  };

  return (
    <button
      className={`btn btn-dark custom-type-edit ${
        isValidEntry && 'disabled'
      }`}
      style={updateBtnStyled}
      onClick={handleUpdate}
    >
      <MdModeEdit />
    </button>
  );
}

AnimeUpdateEntryButton.propTypes = {
  isValidEntry: PropTypes.bool.isRequired,
  handleUpdate: PropTypes.func.isRequired,
};

export default AnimeUpdateEntryButton;
