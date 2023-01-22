import PropTypes from 'prop-types';

function Alert({ searchTerm }) {
  return (
    <span className="alert d-block text-center alert-transparence text-white">
      <div>
        <span>No hay resultados para</span>

        <mark
          style={{ borderRadius: '4px', marginLeft: '0.4rem' }}
        >
          {searchTerm}
        </mark>
      </div>
    </span>
  );
}

Alert.propTypes = {
  searchTerm: PropTypes.string,
};
export default Alert;
