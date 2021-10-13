import React from 'react';

function AnimeViewAnimes({
  allAnime,
  completedAnimes,
  pendingAnimes,
  selectAll,
  selectCompleted,
  selectPending,
}) {
  return (
    <section
      className="view-notes"
      style={{ marginBottom: '8px' }}
    >
      <div
        className={`view-notes-item ${
          selectAll && ' view-note-active'
        }`}
      >
        <span onClick={allAnime}>Todas</span>
      </div>

      <div
        className={`view-notes-item ${
          selectPending && ' view-note-active'
        }`}
      >
        <span onClick={pendingAnimes}>Activas</span>
      </div>

      <div
        className={`view-notes-item ${
          selectCompleted && ' view-note-active'
        }`}
      >
        <span onClick={completedAnimes}>Completadas</span>
      </div>
    </section>
  );
}

export default AnimeViewAnimes;
