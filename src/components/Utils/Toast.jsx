import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { startLogout } from '../../context/';

/* components */
import { MdExitToApp } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';

function Toast() {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(startLogout());
  };

  return (
    <div
      className="toast show toast-show animate__animated 
      animate__bounceIn animate__faster"
    >
      <div className="toast-header">
        <strong className="me-auto">Cuenta</strong>
        <button
          type="button"
          className="btn-close ms-2 mb-1"
        ></button>
      </div>
      <div className="toast-body">
        <div>
          <Link className="text-dark exit" to={`/p/${name}`}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'start',
              }}
            >
              <FaUserCircle size="18" />
              <span className="mx-3">Perfil</span>
            </div>
          </Link>
        </div>

        <div onClick={handleLogout} className="mt-3">
          <Link className="text-dark exit" to="/auth/login">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'start',
              }}
            >
              <MdExitToApp size="18" />
              <span className="mx-3">Salir</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Toast;
