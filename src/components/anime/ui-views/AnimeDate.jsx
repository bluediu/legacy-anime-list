import React from 'react';
import PropTypes from 'prop-types';

function AnimeDate({ animeDate }) {
  return (
    <article className="mt-4">
      <h6 className="text-white">Fecha de creación:</h6>

      <span className="badge bg-info">
        {animeDate.format('dddd')} {animeDate.format('D')}{' '}
        {animeDate.format('MMMM')} {animeDate.format('YYYY')}
      </span>
    </article>
  );
}

AnimeDate.propTypes = {
  animeDate: PropTypes.object.isRequired,
};

export default AnimeDate;
