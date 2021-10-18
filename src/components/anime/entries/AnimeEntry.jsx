import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'; // ES6

import { BsTrash } from 'react-icons/bs';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
  activeEntry,
  startDeleteEntry,
  startUpdateEntry,
} from '../../../context/actions/entries';

function AnimeEntry({ id, title, completed, date, img }) {
  const dispatch = useDispatch();

  const [checked, setChecked] = useState(false);
  let history = useHistory();

  const handleChecked = (e) => setChecked(e.target.checked);

  const handleUpdate = () => {
    let updateNote = { id, title, date, completed: !checked };
    dispatch(startUpdateEntry(updateNote));
  };

  useEffect(() => {
    setChecked(completed);
  }, [completed]);

  const handleSelect = () => {
    dispatch(activeEntry(id, { title, completed, date, img }));
    history.push(`/status/edit/${id}`);
  };

  // delete an anime by id
  const handleDelete = () =>
    dispatch(startDeleteEntry(id, title));

  return (
    <article className="list-container animate__animated animate__fadeIn">
      <div className="cheking">
        <input
          className="form-check-input custom-check"
          type="checkbox"
          name="completed"
          onChange={handleChecked}
          onClick={handleUpdate}
          checked={checked}
        />
      </div>

      <div
        className="list-title"
        onClick={handleSelect}
        style={{ cursor: 'pointer' }}
      >
        {title}
      </div>

      <div className="list-btn" onClick={handleDelete}>
        <BsTrash />
      </div>
    </article>
  );
}

AnimeEntry.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  date: PropTypes.number.isRequired,
  img: PropTypes.string,
};

export default AnimeEntry;
