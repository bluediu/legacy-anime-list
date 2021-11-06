import PropTypes from 'prop-types';
import { animeViewData } from './data/animeViewData';

function AnimeViewAnimes({
  filterAnimes,
  animesSelected,
  type,
  category,
}) {
  return (
    <article
      className="view-notes"
      style={{ marginBottom: '8px' }}
    >
      {animeViewData.map((view) => (
        <section
          key={view.id}
          className={`view-notes-item ${
            view.category === category && view.class
          } `}
          onClick={() => {
            filterAnimes(view.state);
            animesSelected(view.state, view.category);
          }}
        >
          <span>{view.title}</span>
        </section>
      ))}
    </article>
  );
}

AnimeViewAnimes.propTypes = {
  filterAnimes: PropTypes.func.isRequired,
  animesSelected: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
};

export default AnimeViewAnimes;
