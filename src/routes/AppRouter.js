import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

/* Components */
import AuthRouter from './AuthRouter';
import AnimePage from '../page/AnimePage';
import {Error404, Loader} from '../components/Utils/';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

import {AnimeActions} from '../components/anime/Navbar/';
import {AddNewAnime, EditAnime} from '../components/anime/AnimeViews';
import Profile from '../page/Profile';

// services and others
import {authAction, startGetEntriesWhenUserLogged} from '../context/';
import {firebase} from '../services/firebase-config';

function AppRouter() {
  const dispatch = useDispatch();
  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user?.uid) {
        dispatch(
          authAction(user.uid, user.displayName, user.photoURL)
        );
        setIsLoggedIn(true);
        dispatch(startGetEntriesWhenUserLogged(user.uid));
      } else setIsLoggedIn(false);

      setChecking(false);
    });
  }, [dispatch, setChecking]);

  if (checking) return <Loader/>;

  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute
            isAuthenticated={isLoggedIn}
            path="/auth"
            component={AuthRouter}
          />

          <PrivateRoute
            exact
            path="/"
            isAuthenticated={isLoggedIn}
            component={AnimePage}
          />

          <PrivateRoute
            exact
            path="/status/add"
            isAuthenticated={isLoggedIn}
          >
            <AnimeActions>
              <AddNewAnime/>
            </AnimeActions>
          </PrivateRoute>

          <PrivateRoute
            exact
            path="/status/edit/:id"
            isAuthenticated={isLoggedIn}
          >
            <AnimeActions>
              <EditAnime/>
            </AnimeActions>
          </PrivateRoute>

          <PrivateRoute
            exact
            path="/p/:name"
            isAuthenticated={isLoggedIn}
            component={Profile}
          />

          <Route path="*" component={Error404}/>
        </Switch>
      </div>
    </Router>
  );
}

export default AppRouter;
