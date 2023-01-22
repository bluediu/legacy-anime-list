import React from 'react';
import PropTypes from 'prop-types'; // ES6
import { BsFillTrashFill } from 'react-icons/bs';

function AnimeDeleteEntry({ handleDelete }) {
  /* styles */
  const deleteBtnStyled = {
    margin: 0,
    padding: 0,
    textDecoration: 'none',
    color: 'white',
  };

  return (
    <button
      className="btn btn-dark custom-type-delete"
      onClick={handleDelete}
      style={deleteBtnStyled}
    >
      <BsFillTrashFill />
    </button>
  );
}

AnimeDeleteEntry.propTypes = {
  handleDelete: PropTypes.func.isRequired,
};

export default AnimeDeleteEntry;
