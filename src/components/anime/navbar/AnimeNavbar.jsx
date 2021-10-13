import React, { useState } from 'react';
import { useSelector } from 'react-redux';

/* components */
import Avatar from '../../utils/Avatar';
import Toast from '../../utils/Toast';

function AnimeNavbar() {
  const [isToastOpen, setIsToastOpen] = useState(false);

  const { uid, name, photo } = useSelector(
    (state) => state.auth
  );

  const handleToast = () => setIsToastOpen(!isToastOpen);

  return (
    <nav className="navbar navbar-expand-lg nav-tran">
      <section className="container-fluid">
        <div>
          <h4 className="text-center mt-1">Anime List</h4>
        </div>

        <div className="acount-info d-flex flex-row justify-content-center align-items-center">
          <p className="justify-content-center mt-3 px-2">
            {name}
          </p>

          <div
            onClick={handleToast}
            className="toast-wrapper"
            style={{ cursor: 'pointer' }}
          >
            <Avatar
              key={uid}
              className="align-items-center"
              image={photo}
              name={name}
            />

            {isToastOpen && <Toast />}
          </div>
        </div>
      </section>
    </nav>
  );
}

export default AnimeNavbar;
