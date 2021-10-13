import loaderImg from '../../../assets/img/tail-spin.svg';

function LoadingData() {
  return (
    <img
      style={{
        marginTop: '1.4rem',
        width: '80px',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
      src={loaderImg}
      alt="loading..."
    />
  );
}

export default LoadingData;
