import { memo, useState } from 'react';
import PropTypes from 'prop-types'; // ES6
import './AnimePhoto.css';

/* libs */
import IMG_NOT_FOUND from '../../../../assets/img/no-image.jpg';
import LOADING_IMG from '../../../../assets/img/loading-img.png';
import { FiUpload } from 'react-icons/fi';
import { imageUpload } from '../../../../helpers/image-upload';
import { FiEdit2 } from 'react-icons/fi';
import { useEffect } from 'react';
import { useCallback } from 'react';

function AnimePhoto({
  image,
  title,
  typeAction,
  setAddImage,
  setUpdateImg,
  openFullScreenImg,
}) {
  const [imgSrc, setSrc] = useState(LOADING_IMG || image);

  const onLoad = useCallback(() => {
    setSrc(image);
  }, [image]);

  useEffect(() => {
    const img = new Image();
    img.src = image;
    img.addEventListener('load', onLoad);
    return () => {
      img.removeEventListener('load', onLoad);
    };
  }, [image, onLoad]);

  /* styles */
  const imageContainerStyled = {
    width: '180px',
    height: 'auto',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  };

  const handleAddImg = () => {
    imageUpload({ title, image }, setAddImage);
  };

  const handleUploadImg = () => {
    imageUpload({ title, image }, setUpdateImg);
  };

  return (
    <div style={imageContainerStyled}>
      {image ? (
        <article className="anime-photo-container">
          <button
            className="anime-photo-btn"
            onClick={handleUploadImg}
          >
            <FiEdit2 />
          </button>

          <img
            onClick={openFullScreenImg}
            src={imgSrc}
            style={{
              width: '100%',
              height: '270px',
              objectFit: 'cover',
            }}
            alt={title}
            loading="lazy"
            onError={(e) => {
              e.target.src = IMG_NOT_FOUND;
            }}
            className="rounded img-fluid mt-2 animate__animated animate__fadeIn"
          />
        </article>
      ) : (
        <figure
          className="upload-img"
          onClick={() => {
            typeAction === 'new'
              ? handleAddImg()
              : handleUploadImg();
          }}
        >
          <FiUpload
            size="40"
            className="animate__animated animate__bounce"
          />
          <small>Subir imagen</small>
        </figure>
      )}
    </div>
  );
}

AnimePhoto.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  typeAction: PropTypes.string.isRequired,
  setAddImage: PropTypes.func,
  setUpdateImg: PropTypes.func,
  openFullScreenImg: PropTypes.func,
};

export default memo(AnimePhoto);
