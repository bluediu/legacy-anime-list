import React, { useEffect } from 'react';

/* components */
import AnimeEntries from '../components/anime/entries/AnimeEntries';
import AnimeNavbar from '../components/anime/navbar/AnimeNavbar';

function AnimePage() {
  useEffect(() => {
    document.title = 'AnimeList';
  }, []);

  return (
    <main className="main-color-list">
      <AnimeNavbar />

      <div className="container">
        <AnimeEntries />
      </div>
    </main>
  );
}

export default AnimePage;
