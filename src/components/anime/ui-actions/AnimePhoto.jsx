import { memo } from 'react';
import PropTypes from 'prop-types'; // ES6

/* libs */
import IMG_NOT_FOUND from '../../../assets/img/no-image.jpg';
import { FiUpload } from 'react-icons/fi';
import { imageUpload } from '../../../helpers/image-upload';

function AnimePhoto({
  image = '',
  title,
  typeAction,
  setAddImage,
  setUpdateImg,
}) {
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
        <img
          onClick={handleUploadImg}
          src={image}
          alt={title}
          loading="eager"
          onError={(e) => {
            e.target.src = IMG_NOT_FOUND;
          }}
          className="rounded img-fluid mt-2 animate__animated animate__fadeIn"
        />
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
};

export default memo(AnimePhoto);
