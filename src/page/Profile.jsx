import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import AnimeActionNav from '../components/anime/navbar/AnimeActionNav';
import './Profile.css';

function Profile() {
  const { name, photo } = useSelector((state) => state.auth);
  const { entries } = useSelector((state) => state.entries);

  const complete = entries.filter((w) => w.completed === true);
  const total = entries.length;
  const actives = entries.filter((w) => w.completed === false);

  useEffect(() => {
    document.title = `${name} | AnimeList`;
  }, [name]);

  return (
    <article className="profile-container">
      <AnimeActionNav title="Perfil" />

      <div className="container mt-4">
        <div className="row gx-lg-5">
          <section className="col-lg-4 profile-user mb-4 animate__animated  animate__backInLeft">
            <div className="py-3">
              <img
                src={photo}
                alt={name}
                className="user-photo my-3"
              />
              <h4 className="text-center mb-2">{name}</h4>
            </div>
          </section>

          <section className="col-lg-8 animate__animated animate__fadeInUpBig">
            <h4>Estadísticas:</h4>
            <div className="row">
              <div className="col profile-card">
                <p>Total: </p>
                <span>{total}</span>
              </div>

              <div className="col profile-card">
                <p>Completados: </p>
                <span>{complete.length}</span>
              </div>

              <div className="col profile-card">
                <p>Activos: </p>
                <span>{actives.length}</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}

export default Profile;
