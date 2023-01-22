import React, { useEffect } from 'react';

/* Components */
import { AnimeNavbar } from '../components/anime/Navbar/';
import { AnimeEntries } from '../components/anime/Entries/index.';

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
