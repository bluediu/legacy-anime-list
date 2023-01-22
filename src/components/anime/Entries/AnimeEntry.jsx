import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'; // ES6

/* components and lib */
import Confetti from 'react-confetti';
import { BsTrash } from 'react-icons/bs';

import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useWindowSize } from 'react-use';
import { useTimeOut } from '../../../hooks/';

/* redux actions */
import {
  activeEntry,
  startDeleteEntry,
  startUpdateEntry,
} from '../../../context/';

function AnimeEntry({ id, title, completed, date, img }) {
  const dispatch = useDispatch();

  const [checked, setChecked] = useState(false);
  let history = useHistory();

  /* get the current windows height and width */
  const { width, height } = useWindowSize();

  const [showConfetti, setShowConfetti] = useState(false);

  // get value from custom hook
  const { showValue } = useTimeOut(
    showConfetti,
    setShowConfetti
  );

  const handleChecked = (e) => {
    if (e.target.checked) {
      setShowConfetti(true);
    }
    setChecked(e.target.checked);
  };

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
    <>
      {showValue && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={200}
          recycle={false}
        />
      )}

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
    </>
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
