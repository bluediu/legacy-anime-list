import React from 'react';
import defaultUser from '../../assets/img/defautUser.png';

function Avatar({ image, name }) {
  return (
    <img
      src={image || defaultUser}
      alt={name}
      className="img-fluid"
      style={{
        verticalAlign: 'middle',
        width: '32px',
        height: '32px',
        borderRadius: '50%',
      }}
    />
  );
}

export default Avatar;
