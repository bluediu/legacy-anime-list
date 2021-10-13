import { useEffect, useState } from 'react';
import { IoClipboard } from 'react-icons/io5';
import { FaCheck } from 'react-icons/fa';
import { memo } from 'react';

function Clipboard({ title }) {
  /* styles */
  const ClipStyled = {
    margin: 0,
    padding: 0,
    textDecoration: 'none',
    color: 'white',
    marginTop: '1.6rem',
    cursor: 'pointer',
  };

  const [alert, setAlert] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [alert]);

  return (
    <div style={ClipStyled}>
      <div
        className={alert ? 'clip-success' : 'clip'}
        onClick={() => {
          setAlert(true);
          navigator.clipboard.writeText(title);
        }}
      >
        {alert ? (
          <FaCheck
            size={22}
            className="animate__animated animate__jello"
          />
        ) : (
          <IoClipboard size={22} />
        )}
      </div>
    </div>
  );
}

export default memo(Clipboard);
