import React from 'react';
import { Redirect, Route, Switch } from 'react-router';

import authImage from '../assets/img/login.svg';

// components
import { LoginScreen,RegisterScreen } from '../components/Auth/';
import {Wave} from '../components/Utils/';

function AuthRouter() {
  return (
    <main
      className="main-color-page d-flex justify-content-center 
    align-items-center wrapper"
    >
      <section className="container">
        <div className="row">
          <div className="col-lg-6 movil-view-img animate__animated animate__lightSpeedInLeft">
            <img
              src={authImage}
              alt="auth"
              className="img-fluid p-5"
            />
          </div>

          <div className="col-lg-6 card p-3 form-tran">
            <Switch>
              <Route
                exact
                path="/auth/login"
                component={LoginScreen}
              />

              <Route
                exact
                path="/auth/register"
                component={RegisterScreen}
              />

              <Redirect to="/auth/login" />
            </Switch>
          </div>
        </div>
      </section>
      <Wave />
    </main>
  );
}

export default AuthRouter;
