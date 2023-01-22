import React from 'react';

function AuthButton({ isValid, title }) {
  return (
    <button
      type="submit"
      className={`btn btn-primary ${isValid && 'disabled'}`}
    >
      {title}
    </button>
  );
}

export default AuthButton;
