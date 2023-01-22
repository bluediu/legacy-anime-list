import React from 'react';
import PropTypes from 'prop-types';

import { IoMdArrowRoundBack } from 'react-icons/io';
import { useHistory } from 'react-router-dom';

function AnimeActionNav({ title }) {
  let history = useHistory();

  const handleBackHome = () => history.goBack();

  return (
    <nav className="navbar navbar-expand-lg nav-tran">
      <div className="action-nav-title">
        <div
          className="action-nav-back"
          style={{
            margin: 0,
            padding: 0,
            textDecoration: 'none',
            color: 'white',
          }}
          onClick={handleBackHome}
        >
          <IoMdArrowRoundBack size="18" />
        </div>

        <h6>{title}</h6>
      </div>
    </nav>
  );
}

AnimeActionNav.propTypes = {
  title: PropTypes.string.isRequired,
};

export default AnimeActionNav;
