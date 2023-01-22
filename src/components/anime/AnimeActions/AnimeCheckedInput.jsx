import React from 'react';
import PropTypes from 'prop-types';
import { memo } from 'react';

function AnimeCheckedInput({ handleChecked, checked }) {
  return (
    <article className="mt-2">
      <input
        className="form-check-input custom-check"
        type="checkbox"
        name="completed"
        id="completed"
        onChange={handleChecked}
        checked={checked}
      />

      <label
        className="form-check-label text-white"
        htmlFor="completed"
      >
        Completar anime
      </label>
    </article>
  );
}

AnimeCheckedInput.propTypes = {
  handleChecked: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
};

export default memo(AnimeCheckedInput);
